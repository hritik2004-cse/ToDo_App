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
      className="flex items-center justify-between py-3 border-2 border-foreground h-auto relative w-full"
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
        className="h-10 w-full pl-3 outline-none placeholder:text-placeholder text-foreground text-base font-medium"
      />
      <button
        type="submit"
        className="absolute right-0 bg-accent h-full w-15 md:w-16 lg:w-17 flex items-center justify-center"
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
