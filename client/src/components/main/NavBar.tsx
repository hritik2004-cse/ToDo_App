import React from "react";
import Logo from "../utility/Logo";
import LinkButton from "../utility/LinkButton";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiMenu3Fill } from "react-icons/ri";
import useAuth from "@/context/AuthContext";
import Image from "next/image";

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
            <figure className="">
              <Image
                src={user?.profileImgUrl || "/temp.jpg"}
                height={100}
                width={100}
                alt={`${user.firstname} ${user.lastName}'s profile img`}
                loading="eager"
                className="w-12 h-12 object-cover border-2 border-foreground"
              />
            </figure>
          </div>
        ) : (
          <div className="">
            <RiMenu3Fill className="inline-block md:hidden text-foreground text-3xl" />
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
