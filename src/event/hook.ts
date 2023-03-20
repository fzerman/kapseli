import { useContext } from "react";
import { EventContext } from "./context";

export const useEvent = () => {
  return useContext(EventContext);
};
