import { createContext } from "react";

export const DataContext = createContext({
  data: {},
  get_data: (namespace: string, default_value: any) => {},
  set_data: (namespace: string, value: any) => {},
  delete_data: (namespace: string) => {},
});
