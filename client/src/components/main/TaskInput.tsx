"use client";

import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import { IoMdAddCircle } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import { TaskInputProps } from "@/types/task.types";

import React, { ChangeEvent, SubmitEventHandler } from "react";

const TaskInput = ({ fetchTasks }: TaskInputProps) => {
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState("");
  const handleAdd: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    try {
      setLoading(true);
      const response = await api.post("/task/add", { task: task.trim() });
      setTask("");
      fetchTasks();
      toast.success(response?.data?.message);
    } catch (error) {
      const errMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to add task";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  return (
    <form
      className="border-2 border-foreground relative w-full"
      style={{ minHeight: "3.5rem" }}
      onSubmit={handleAdd}
    >
      <label htmlFor="new-task-input" className="sr-only">
        New task
      </label>
      <input
        required
        type="text"
        name="task"
        value={task}
        id="new-task-input"
        onChange={handleChange}
        placeholder="Type to add a new todo..."
        className="absolute inset-0 w-full h-full pl-3 pr-16 md:pr-17 bg-transparent outline-none placeholder:text-placeholder text-foreground text-sm lg:text-base font-medium"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full bg-accent w-15 md:w-16 lg:w-17 flex items-center justify-center z-10"
        aria-label="Add task"
      >
        {loading ? (
          <LuLoaderCircle
            className="text-3xl text-background animate-spin"
            aria-hidden="true"
          />
        ) : (
          <IoMdAddCircle
            className="text-3xl text-background"
            aria-hidden="true"
          />
        )}
      </button>
    </form>
  );
};

export default TaskInput;
