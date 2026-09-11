"use client";

import { useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import { TiPencil } from "react-icons/ti";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import type { TaskModelProps } from "@/types/task.types";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "../ui/alert-dialog";

const TaskModel = ({
  id,
  name,
  updatedAt,
  fetchTasks,
  isCompleted,
}: TaskModelProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(isCompleted);
  const [updatedTask, setUpdatedTask] = useState<string>(name);

  // handle task delete
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/task/delete/${id}`);
      toast.success(response?.data?.message);
      fetchTasks();
    } catch (error) {
      const errorMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to delete task";
      toast.error(errorMsg);
    }
  };

  // handle task save
  const handleSave = async () => {
    try {
      const response = await api.patch(`task/update/${id}`, {
        task: updatedTask,
      });
      toast.success(response?.data?.message);
    } catch (error) {
      const errMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to update task";
      toast.error(errMsg);
    } finally {
      setEdit(false);
      fetchTasks();
    }
  };

  // handle task status
  const handleStatus = async () => {
    setCheck(true);
    try {
      await api.patch(`/task/update/status/${id}`);
      toast.success("Marked as completed");
      fetchTasks();
    } catch (error) {
      setCheck(false);
      toast.error("Unable to update task");
    }
  };

  return (
    <article
      className={`relative border-2 ${edit ? "border-accent" : "border-foreground border-t-transparent"}`}
      id={id}
      style={{ minHeight: "3.5rem" }}
    >
      {/* Text input — fills the entire article */}
      <input
        type="text"
        value={updatedTask}
        onChange={(e) => setUpdatedTask(e.target.value)}
        className={`absolute inset-0 w-full h-full bg-transparent pl-8 md:pl-10 pr-10 md:pr-52 text-sm md:text-base font-medium outline-none ${
          check ? "line-through text-foreground/70" : "text-foreground"
        }`}
        aria-label={`Task: ${name}`}
        readOnly={!edit}
      />

      {/* Checkbox — absolute left */}
      <label htmlFor={`taskStatus-${id}`} className="sr-only">
        Mark "{name}" as completed
      </label>
      <input
        type="checkbox"
        name="taskStatus"
        id={`taskStatus-${id}`}
        checked={check}
        disabled={check}
        onChange={handleStatus}
        className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 w-4 h-4 md:w-5 md:h-5 appearance-none border border-foreground bg-background checked:bg-accent cursor-pointer
          after:content-[''] after:absolute after:hidden checked:after:block after:left-1/2 after:top-[45%] after:-translate-x-1/2 after:-translate-y-1/2 after:w-1.5 after:h-3 after:border-r-[3px] after:border-b-[3px] after:border-background after:rotate-45"
      />

      {/* Mobile dropdown — absolute right */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button aria-label={`More options for ${name}`}>
                <IoEllipsisVerticalSharp
                  className="text-lg"
                  aria-hidden="true"
                />
              </button>
            }
          />
          <DropdownMenuContent className="bg-gray border border-foreground/30">
            <DropdownMenuItem className="flex items-center justify-start gap-2 text-foreground capitalize">
              <TiPencil className="text-edit text-2xl" /> edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-start gap-2 text-foreground capitalize">
              <MdOutlineDeleteOutline className="text-delete text-3xl" />
              delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop actions — absolute right */}
      {edit ? (
        <button
          className="bg-accent p-1 cursor-pointer hover:bg-accent/70 transition-all duration-300 absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10"
          onClick={handleSave}
        >
          <FaRegSave className="text-xl md:text-2xl text-background" />
        </button>
      ) : (
        <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center gap-2">
          <p className="border py-1 px-2 border-foreground text-sm text-foreground font-medium">
            {new Date(updatedAt).toLocaleDateString("en-IN", {
              year: "2-digit",
              month: "short",
              day: "2-digit",
            })}
          </p>
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <button
                  className="bg-delete p-1 cursor-pointer hover:bg-delete/70 transition-all duration-300"
                  aria-label={`Delete task: ${name}`}
                >
                  <MdOutlineDeleteOutline
                    className="text-xl md:text-2xl text-background"
                    aria-hidden="true"
                  />
                </button>
              }
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete task?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this task? Once deleted, it
                  cannot be recovered.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} variant="destructive">
                  delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <button
            className={`bg-edit p-1 cursor-pointer hover:bg-edit/70 transition-all duration-300 ${isCompleted ? "hidden" : ""}`}
            onClick={() => setEdit(true)}
            aria-label={`Edit task: ${name}`}
          >
            <TiPencil
              className="text-xl md:text-2xl text-background"
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </article>
  );
};

export default TaskModel;
