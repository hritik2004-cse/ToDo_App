"use client";

import React from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import { TiPencil } from "react-icons/ti";
import { MdOutlineDeleteOutline } from "react-icons/md";
import type { TaskModelProps } from "@/types/task.types";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const TaskModel = ({ id, name, updatedAt, isCompleted }: TaskModelProps) => {
  // handle task delete
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/task/delete/${id}`);
      toast.success(response?.data?.message);
    } catch (error) {
      const errorMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to delete task";
      toast.error(errorMsg);
    }
  };

  // handle task edit
  const handleEdit = async () => {};

  // handle task status
  const handleStatus = async () => {
    try {
      await api.patch(`/task/update/status/${id}`);
    } catch (error) {

    }
  };

  return (
    <article
      className="flex items-center justify-between px-2 py-4 md:p-4 border-2 border-foreground"
      id={id}
    >
      <div className="flex items-center justify-start gap-2">
        <input
          type="checkbox"
          name="taskStatus"
          id="taskStatus"
          checked={isCompleted}
          disabled={isCompleted}
          onChange={handleStatus}
          className="w-4 h-4 md:w-5 md:h-5 appearance-none border border-foreground bg-background checked:bg-accent cursor-pointer relative
            after:content-[''] after:absolute after:hidden checked:after:block after:left-1/2 after:top-[45%] after:-translate-x-1/2 after:-translate-y-1/2 after:w-1.5 after:h-3 after:border-r-[3px] after:border-b-[3px] after:border-background after:rotate-45"
        />
        <p
          className={`text-sm md:text-base text-foreground font-medium truncate max-w-70 md:max-w-120 xl:max-w-none ${isCompleted ? "line-through text-foreground/70" : ""}`}
        >
          {name}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button className="md:hidden">
              <IoEllipsisVerticalSharp className="text-lg" />
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
      <div className="hidden md:flex items-center justify-end gap-2">
        <p className="border py-1 px-2 border-foreground text-base text-foreground font-medium">
          {updatedAt.toLocaleDateString("en-IN", {
            year: "2-digit",
            month: "short",
            day: "2-digit",
          })}
        </p>
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <button className="bg-delete p-1 cursor-pointer hover:bg-delete/70 transition-all duration-300">
                <MdOutlineDeleteOutline className="text-xl md:text-2xl text-background" />
              </button>
            }
          />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                {" "}
                This action cannot be undone. This will permanently delete your
                account from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <button className="bg-edit p-1 cursor-pointer hover:bg-edit/70 transition-all duration-300">
          <TiPencil className="text-xl md:text-2xl text-background" />
        </button>
      </div>
    </article>
  );
};

export default TaskModel;
