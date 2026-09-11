import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-center gap-2">
      <Image
        src="/icon.png"
        height={100}
        width={100}
        alt="todo icon"
        loading="eager"
        className="h-10 w-10 md:h-12 md:w-12 lg:w-15 lg:h-15 xl:h-12 xl:w-12"
      />
      <h1 className="text-foreground text-xl md:text-2xl lg:text-3xl xl:text-2xl font-bold">ToDo App</h1>
    </Link>
  );
};

export default Logo;
