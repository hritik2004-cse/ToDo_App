import { SetStateAction } from "react";

export type MenuProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};
