"use client";

import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import React, { ChangeEvent } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";

const TaskInput = () => {
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState("");
  const handleAdd = async () => {
    try {
      setLoading(true);
      const response = await api.post("/task/add", { task });
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
    <form className="flex items-center justify-between py-3 border-2 border-foreground h-auto relative w-full">
      <label htmlFor="new-task-input" className="sr-only">
        New task
      </label>
      <input
        type="text"
        name="task"
        id="new-task-input"
        value={task}
        onChange={handleChange}
        className="h-10 w-full pl-3 outline-none placeholder:text-placeholder text-foreground text-base font-medium"
        placeholder="Type to add a new todo..."
        required
      />
      <button
        className="absolute right-0 bg-accent h-full w-15 md:w-16 lg:w-17 flex items-center justify-center"
        onClick={handleAdd}
        type="submit"
        aria-label="Add task"
      >
        {loading ? (
          <LuLoaderCircle className="text-3xl text-background animate-spin" aria-hidden="true" />
        ) : (
          <IoMdAddCircle className="text-3xl text-background" aria-hidden="true" />
        )}
      </button>
    </form>
  );
};

export default TaskInput;
