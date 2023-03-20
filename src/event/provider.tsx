import React, { FC, ReactNode, useState } from "react";
import { EventContext } from "./context";

export interface EventProviderProp {
  events?: EventProp;
  children: ReactNode;
}

export type EventFunc = (args: any) => void;

export interface EventProp {
  [key: string]: EventFunc[];
}

export type EventObj = {
  name: string;
  listeners: EventFunc[];
};

export const EventProvider: FC<EventProviderProp> = ({
  events = {},
  children,
}) => {
  const [_events, setEvents] = useState<EventProp>(events);

  /**
   * Register New Event
   * @param name
   */
  const register = (name: string) => {
    if (!(name in _events)) {
      setEvents({
        ..._events,
        [name]: [],
      });
    }
  };

  /**
   * Run a event with custom args
   * @param name
   * @param args
   * @returns if event has registered already, true, otherwise false.
   */
  const run = (name: string, args: any) => {
    if (name in _events) {
      _events[name].forEach(function (e) {
        e(args);
      });
      return true;
    } else {
      console.log(`EventError: '${name}' Event is not found!`);
      return false;
    }
  };

  /**
   * Add an listener to an event
   * @param name
   * @param cb
   * @returns unsubscribe function
   */
  const on = (name: string, cb: EventFunc) => {
    if (name in _events) {
      setEvents({
        ..._events,
        [name]: [..._events[name], cb],
      });
      return () => off(name, cb);
    } else {
      console.log(`EventError: '${name}' Event is not found!`);
      return false;
    }
  };

  /**
   * Remove an listener from an event
   * @param name
   * @param cb
   */
  const off = (name: string, cb: EventFunc) => {
    if (name in _events) {
      let index = _events[name].indexOf(cb);
      if (index > -1) {
        setEvents({
          ..._events,
          [name]: [
            ..._events[name].slice(0, index),
            ..._events[name].slice(index + 1),
          ],
        });
      }
    } else {
      console.log(`EventError: '${name}' Event is not found!`);
    }
  };

  /**
   * Add only onetime listener to an event
   * @param name
   * @param cb
   */
  const once = (name: string, cb: EventFunc) => {
    on(name, (args) => {
      cb(args);
      off(name, cb);
    });
  };

  /**
   * Get an event object
   * @param name
   * @returns if event has registered already, EventObj, otherwise false
   */
  const get = (name: string): EventObj | false => {
    if (name in _events) {
      return {
        name: name,
        listeners: _events[name],
      };
    }
    return false;
  };

  /**
   * Returns all events
   * @returns EventProp
   */
  const getAll = () => {
    return _events;
  };

  /**
   * Remove an event
   * @param name
   * @returns if event has registered already, true, otherwise false
   */
  const remove = (name: string) => {
    if (name in _events) {
      setEvents({
        ..._events,
        [name]: [],
      });
      return true;
    } else {
      console.log(`EventError: '${name}' Event is not found!`);
      return false;
    }
  };

  return (
    <EventContext.Provider
      value={{
        events: _events,
        register,
        run,
        on,
        off,
        once,
        get,
        getAll,
        remove,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
