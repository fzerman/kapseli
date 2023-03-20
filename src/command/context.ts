import { createContext } from "react";

export const CommandContext = createContext({
  commands: {},
  add: (
    command: string,
    config: {
      run: (args: any) => void;
      stop?: ((args: any) => void) | undefined;
    }
  ) => {},
  has: (command: string) => {},
  get: (command: string) => {},
  getAll: (command: string) => {},
  run: (command: string, args: any) => {},
  stop: (command: string, args: any) => {},
  isActive: (command: string) => {},
  getActives: () => {},
});
