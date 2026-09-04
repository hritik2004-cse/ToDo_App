"use client";

import React from "react";
import { TiPencil } from "react-icons/ti";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TaskModelProps = {
  id: string;
  name: string;
  updatedAt: Date;
};

const TaskModel = ({ id, name, updatedAt }: TaskModelProps) => {
  const [checked, setChecked] = React.useState<boolean>(false);

  // handle task delete
  const handleDelete = async (id: string) => {};

  // handle task edit
  const handleEdit = async (id: string) => {};

  // handle task status
  const handleStatus = async () => {
    try {
      setChecked(true);
    } catch (error) {}
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
          checked={checked}
          onChange={handleStatus}
          className="w-4 h-4 md:w-5 md:h-5 appearance-none border border-foreground bg-background checked:bg-accent cursor-pointer relative
            after:content-[''] after:absolute after:hidden checked:after:block after:left-1/2 after:top-[45%] after:-translate-x-1/2 after:-translate-y-1/2 after:w-1.5 after:h-3 after:border-r-[3px] after:border-b-[3px] after:border-background after:rotate-45"
        />
        <p
          className={`text-sm md:text-base text-foreground font-medium truncate max-w-70 md:max-w-120 xl:max-w-none ${checked ? "line-through text-foreground/70" : ""}`}
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
          {updatedAt.toDateString()}
        </p>
        <button className="bg-delete p-1 cursor-pointer hover:bg-delete/70 transition-all duration-300">
          <MdOutlineDeleteOutline className="text-xl md:text-2xl text-background" />
        </button>
        <button className="bg-edit p-1 cursor-pointer hover:bg-edit/70 transition-all duration-300">
          <TiPencil className="text-xl md:text-2xl text-background" />
        </button>
      </div>
    </article>
  );
};

export default TaskModel;
