import { createContext } from "react";
export type EventFunc = (args: any) => void;
export const EventContext = createContext({
  events: {},
  register: (name: string) => {},
  run: (name: string, args: any) => {},
  on: (name: string, cb: EventFunc) => {},
  off: (name: string, cb: EventFunc) => {},
  once: (name: string, cb: EventFunc) => {},
  get: (name: string) => {},
  getAll: () => {},
  remove: (name: string) => {},
});
