import React, { FC, ReactNode, useEffect, useState } from "react";
import { useEvent } from "../event";
import { CommandContext } from "./context";

export interface CommandProp {
  run: (args: any) => void;
  stop: (args: any) => void;
}

export interface CommandConfigProp {
  [key: string]: CommandProp;
}

export interface CommandProviderProp {
  commands?: CommandConfigProp;
  children: ReactNode;
}

export interface StateProp {
  [key: string]: boolean;
}

export const CommandProvider: FC<CommandProviderProp> = ({
  commands,
  children,
}) => {
  const [_commands, setCommands] = useState<CommandConfigProp>(commands || {});
  const [states, setStates] = useState<StateProp>({});

  const event = useEvent();

  useEffect(() => {
    event.register("run");
    event.register("stop");
  }, [event]);

  /**
   * Add an command
   * @param command
   * @param config
   */
  const add = (
    command: string,
    config: {
      run: (args: any) => void;
      stop?: (args: any) => void;
    }
  ) => {
    if (!has(command)) {
      setCommands({
        ..._commands,
        [command]: {
          run: config.run,
          stop: config.stop !== undefined ? config.stop : () => {},
        },
      });

      setStates({
        ...states,
        [command]: false,
      });
    }
  };

  /**
   * Check command has already added or not
   * @param command
   * @returns boolean
   */
  const has = (command: string) => {
    return command in _commands ? true : false;
  };

  /**
   * Get command object
   * @param command
   * @returns Command Object
   */
  const get = (command: string) => {
    if (has(command)) {
      return _commands[command];
    }
    return false;
  };

  /**
   * Get all command objects
   * @returns
   */
  const getAll = () => {
    return _commands;
  };

  /**
   * Run a command with custom args
   * @param command
   * @param args
   * @returns if command has already added nothing, otherwise false
   */
  const run = (command: string, args: any) => {
    if (has(command)) {
      setStates({
        ...states,
        [command]: true,
      });

      _commands[command].run(args);

      if (!("stop" in _commands[command])) {
        setStates({
          ...states,
          [command]: false,
        });
      }
    }
    return false;
  };

  /**
   * Stop a command with custom args
   * @param command
   * @param args
   * @returns if command has already added nothing, otherwise false
   */
  const stop = (command: string, args: any) => {
    if (has(command)) {
      if (_commands[command].stop !== undefined) {
        _commands[command].stop(args);

        setStates({
          ...states,
          [command]: false,
        });
      }
    }
    return false;
  };

  /**
   * Check a command is active or not
   * @param command
   * @returns if command has already added and active true, otherwise false
   */
  const isActive = (command: string) => {
    if (has(command)) {
      return states[command];
    }
    return false;
  };

  /**
   * Get Active commands
   * @returns Command Object Array
   */
  const getActives = () => {
    let actives = [];
    for (const command in states) {
      if (Object.hasOwnProperty.call(states, command)) {
        const state = states[command];
        if (state) {
          actives.push(_commands[command]);
        }
      }
    }
    return actives;
  };

  const useRun = (command: string, args: any) => {
    event.run(`run`, args);
    event.run(`run:${command}:before`, args);
    const res = run(command, args);
    event.run(`run:${command}:after`, args);

    return res;
  };

  const useStop = (command: string, args: any) => {
    event.run(`stop`, args);
    event.run(`stop:${command}:before`, args);
    const res = stop(command, args);
    event.run(`stop:${command}:after`, args);

    return res;
  };

  return (
    <CommandContext.Provider
      value={{
        commands: _commands,
        add,
        has,
        get,
        getAll,
        run: useRun,
        stop: useStop,
        isActive,
        getActives,
      }}
    >
      {children}
    </CommandContext.Provider>
  );
};
