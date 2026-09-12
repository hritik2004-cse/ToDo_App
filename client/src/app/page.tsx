"use client";

import React from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import { LuInbox } from "react-icons/lu";
import { Task } from "@/types/task.types";
import useAuth from "@/context/AuthContext";
import NavBar from "@/components/main/NavBar";
import { IoMdAddCircle } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import Button from "@/components/utility/Button";
import TaskInput from "@/components/main/TaskInput";
import TaskModel from "@/components/main/TaskModel";
import Image from "next/image";

export default function Home() {
  const { fetchCurrentUser } = useAuth();
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [addTask, setAddTask] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<"all" | "pending" | "completed">(
    "all",
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const filterTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/task/all");
      fetchCurrentUser();
      setTasks(response?.data?.tasks);
    } catch (error) {
      const errorMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to get tasks";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // on every mount the update tasks will be called to get all tasks from api
  React.useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="w-full h-screen page">
      <NavBar />
      <main className="main">
        {loading ? (
          <section className="w-full h-full flex items-center justify-center">
            <LuLoaderCircle className="text-3xl text-accent animate-spin" />
          </section>
        ) : tasks.length <= 0 ? (
          <section className="h-full w-full flex items-center justify-center">
            <div className="w-[95%] mx-auto flex flex-col items-center justify-between gap-2.5 lg:gap-3.5 xl:gap-3">
              {addTask ? (
                <div className="w-[95%] mx-auto flex flex-col items-center justify-between gap-2.5 lg:gap-3.5 xl:gap-3">
                  <TaskInput fetchTasks={fetchTasks} />
                </div>
              ) : (
                <article className="w-full mx-auto flex flex-col items-center justify-between gap-2.5 lg:gap-3.5 xl:gap-3">
                  <LuInbox className="text-5xl lg:text-7xl xl:text-6xl text-foreground" />
                  <h2 className="text-foreground text-2xl lg:text-3xl xl:text-2xl font-bold">
                    No todos found?
                  </h2>
                  <p className="text-lg lg:text-xl xl:text-lg text-center text-foreground/70 leading-5">
                    No todo has been added till now. Click the below button to
                    create a new task.
                  </p>
                  <Button
                    varient="new"
                    className="gap-2"
                    onClick={() => setAddTask(true)}
                  >
                    <IoMdAddCircle className="text-2xl lg:text-3xl xl:text-2xl" />{" "}
                    Create a new task
                  </Button>
                </article>
              )}
            </div>
          </section>
        ) : (
          <section className="w-full mt-8 flex items-center justify-center">
            <article className="w-[95%] md:w-[90%] lg:w-[80%] xl:w-[75%] h-full flex flex-col">
              <nav
                aria-label="task filters"
                className="w-full flex items-center justify-between gap-3 md:gap-4 mb-3 md:mb-4"
              >
                <article className="w-full flex items-center justify-start gap-3">
                  <button
                    className={`py-2 md:py-3 px-3 md:px-5 capitalize text-xs md:text-base font-medium ${filter === "all" ? "bg-gray border-2 border-foreground" : ""}`}
                    onClick={() => setFilter("all")}
                  >
                    all
                  </button>
                  <button
                    className={`py-2 md:py-3 px-3 md:px-5 capitalize text-xs md:text-base font-medium ${filter === "pending" ? "bg-gray border-2 border-foreground" : ""}`}
                    onClick={() => setFilter("pending")}
                  >
                    pending
                  </button>
                  <button
                    className={`py-2 md:py-3 px-3 md:px-5 capitalize text-xs md:text-base font-medium ${filter === "completed" ? "bg-gray border-2 border-foreground" : ""}`}
                    onClick={() => setFilter("completed")}
                  >
                    completed
                  </button>
                </article>
                <div className="hidden md:flex items-center justify-end gap-2">
                  <div className="capitalize text-sm md:text-base lg:text-lg font-semibold text-accent flex items-center justify-center gap-1">
                    <h3>{filter}</h3>
                    <h3>tasks:</h3>
                  </div>
                  <p className="text-sm md:text-base lg:text-lg font-medium">{filterTasks.length}</p>
                </div>
              </nav>
              <TaskInput fetchTasks={fetchTasks} />

              {filterTasks.length === 0 ? (
                <div className="w-full min-h-[50vh] flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src="/task.gif"
                      height={100}
                      width={100}
                      alt={`no ${filter} tasks found`}
                      loading="lazy"
                      className="h-60 md:h-80 w-auto"
                    />
                    {filter === "completed" ? (
                      <div className="flex flex-col items-center justify-center">
                        <h2 className="text-base  md:text-lg text-accent font-semibold">No completed task found</h2>
                        <p className="text-xs md:text-sm text-foreground/70 font-medium">
                          You can complete some tasks to show them here
                        </p>
                      </div>
                    ) : filter === "pending" ? (
                      <div className="flex flex-col items-center justify-center">
                        <h2 className="text-base  md:text-lg text-accent font-semibold">No pending task found</h2>
                        <p className="text-xs md:text-sm text-foreground/70 font-medium">
                          You can add more tasks to show them here
                        </p>
                      </div>
                    ) : (
                      <p className=""></p>
                    )}
                  </div>
                </div>
              ) : (
                filterTasks.map((task) => (
                  <TaskModel
                    id={task.id}
                    key={task.id}
                    name={task.task}
                    fetchTasks={fetchTasks}
                    updatedAt={task.updatedAt}
                    isCompleted={task.isCompleted}
                  />
                ))
              )}
            </article>
          </section>
        )}
      </main>
    </div>
  );
}
