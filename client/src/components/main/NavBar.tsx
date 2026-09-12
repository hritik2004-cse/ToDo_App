import React from "react";
import Logo from "../utility/Logo";
import LinkButton from "../utility/LinkButton";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiMenu3Fill } from "react-icons/ri";
import useAuth from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const { user, userLoading } = useAuth();

  // if (!user) {
  //   return null;
  // }

  return (
    <nav className="w-full border-b-2 border-b-foreground flex items-center justify-center nav">
      <div className="w-[95%] mx-auto flex items-center justify-between">
        <Logo />
        {user ? (
          <div>
            <Link href="/profile" className="flex items-center justify-center gap-2">
              <Image
                src={user?.profileImgUrl || "/temp.jpg"}
                height={100}
                width={100}
                alt={`${user.firstname} ${user.lastName}'s profile img`}
                loading="eager"
                className="w-10 h-10 md:h-12 md:w-12 lg:w-15 lg:h-15 rounded-full object-cover border-2 border-foreground"
              />
              <div className="">
                <p className="text-foreground/70 text-xs md:text-sm font-medium">Hi</p>
                <h2 className="text-accent font-semibold text-base md:text-lg">{user.firstname} {user.lastName}</h2>
              </div>
            </Link>
          </div>
        ) : (
          <div className="">
            <LinkButton href="/login" varient="primary" className="inline-block md:hidden">
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
