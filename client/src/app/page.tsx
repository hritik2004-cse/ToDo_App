"use client";

import React from "react";
import { LuInbox } from "react-icons/lu";
import NavBar from "@/components/main/NavBar";
import { IoMdAddCircle } from "react-icons/io";
import Button from "@/components/utility/Button";
import TaskInput from "@/components/main/TaskInput";
import TaskModel from "@/components/main/TaskModel";

export default function Home() {
  const [tasks, setTasks] = React.useState([]);

  return (
    <div className="w-full h-screen page">
      <NavBar />
      <main className="main">
        {tasks.length <= 0 ? (
          <section className="h-full w-full flex items-center justify-center ">
            <div className="w-[95%] mx-auto flex flex-col items-center justify-between gap-2.5 lg:gap-3.5 xl:gap-3">
              <LuInbox className="text-5xl lg:text-7xl xl:text-6xl text-foreground" />
              <h2 className="text-foreground text-2xl lg:text-3xl xl:text-2xl font-bold">
                No todos found?
              </h2>
              <p className="text-lg lg:text-xl xl:text-lg text-center text-foreground/70 leading-5">
                No todo has been added till now. Click the below button to
                create a new task.
              </p>
              <Button varient="new" className="gap-2">
                <IoMdAddCircle className="text-2xl lg:text-3xl xl:text-2xl" />{" "}
                Create a new task
              </Button>
            </div>
          </section>
        ) : (
          <section className="w-full mt-8 flex items-center justify-center">
            <div className="w-[95%] md:w-[90%] lg:w-[80%] xl:w-[75%] h-full flex flex-col">
              <ul className="w-full flex items-center justify-start gap-3 md:gap-4 mb-3 md:mb-4">
                <li className="py-2 md:py-3 px-3 md:px-5 bg-gray border-2 border-foreground capitalize text-xs md:text-base font-medium">
                  all todos
                </li>
                <li className="py-2 md:py-3 px-3 md:px-5 bg-gray border-2 border-foreground capitalize text-xs md:text-base font-medium">
                  pending
                </li>
                <li className="py-2 md:py-3 px-3 md:px-5 bg-gray border-2 border-foreground capitalize text-xs md:text-base font-medium">
                  completed
                </li>
              </ul>
              <TaskInput />
              {/* {tasks.map((task, index) => (
                <TaskModel id="" key={index} name="" updatedAt={}/>
              ))} */}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
