"use client";

import React, { ChangeEvent } from "react";
import { IoMdAddCircle } from "react-icons/io";

const TaskInput = () => {
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState("");
  const handleAdd = () => {};

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  return (
    <form className="flex items-center justify-between py-3 border-2 border-foreground h-auto relative w-full">
      <input
        type="text"
        name=""
        id=""
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
      >
        <IoMdAddCircle className="text-3xl text-background" />
      </button>
    </form>
  );
};

export default TaskInput;
