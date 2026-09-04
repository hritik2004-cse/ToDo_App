import React from "react";
import Logo from "../utility/Logo";
import LinkButton from "../utility/LinkButton";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiMenu3Fill } from "react-icons/ri";

const NavBar = () => {
  return (
    <nav className="w-full border-b-2 border-b-foreground flex items-center justify-center nav">
      <div className="w-[95%] mx-auto flex items-center justify-between">
        <Logo />
        <RiMenu3Fill className="inline-block md:hidden text-foreground text-3xl"/>
        <div className="hidden md:flex items-center justify-center gap-5">
          <LinkButton href="/login" varient="primary">
            login
          </LinkButton>
          <LinkButton href="/register" varient="secondary" className="gap-3">
            get started <FaArrowRightLong />
          </LinkButton>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
