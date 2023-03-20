import { useContext } from "react";
import { CommandContext } from "./context";

export const useCommand = () => {
  return useContext(CommandContext);
};
