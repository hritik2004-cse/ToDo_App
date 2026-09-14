"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../utility/Logo";
import LinkButton from "../utility/LinkButton";
import { FaArrowRightLong } from "react-icons/fa6";
import useAuth from "@/context/AuthContext";

const NavBar = () => {
  const { user } = useAuth();

  return (
    <nav className="w-full border-b-2 border-b-foreground flex items-center justify-center nav">
      <div className="w-[95%] mx-auto flex items-center justify-between">
        <Logo />
        {user ? (
          <div>
            <Link
              href="/account/profile"
              className="flex items-center justify-center gap-2"
            >
              <Image
                width={100}
                height={100}
                loading="eager"
                src={user?.profileImgUrl || "/temp.jpg"}
                alt={`${user.firstname} ${user.lastName}'s profile img`}
                className="w-10 h-10 md:h-12 md:w-12 lg:w-15 lg:h-15 rounded-full object-cover border-2 border-foreground"
              />
              <div>
                <p className="text-foreground/70 text-xs md:text-sm font-medium">
                  Hi
                </p>
                <h2 className="text-accent font-semibold text-base md:text-lg">
                  {user.firstname} {user.lastName}
                </h2>
              </div>
            </Link>
          </div>
        ) : (
          <div className="">
            <LinkButton
              href="/login"
              varient="primary"
              className="inline-block md:hidden"
            >
              login
            </LinkButton>
            <div className="hidden md:flex items-center justify-center gap-5">
              <LinkButton href="/login" varient="primary">
                login
              </LinkButton>
              <LinkButton
                href="/register"
                varient="secondary"
                className="gap-3"
              >
                get started <FaArrowRightLong />
              </LinkButton>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
