import React, { FC, ReactNode, useState } from "react";
import { DataContext } from "./context";

export type KapseliData = {
  [key: string]: any;
};

export interface DataProviderProp {
  datas?: KapseliData;
  children: ReactNode;
}

export const DataProvider: FC<DataProviderProp> = ({ datas, children }) => {
  const [data, setData] = useState<KapseliData>(datas || {});

  const set_data = (namespace: string, value: any) => {
    setData({
      ...data,
      [namespace]: value,
    });
  };

  const get_data = (namespace: string, default_value: any) => {
    return namespace in data ? data[namespace] : default_value;
  };

  const delete_data = (namespace: string) => {
    const tempData = JSON.parse(JSON.stringify(data));
    delete tempData[namespace];
    setData(tempData);
  };

  return (
    <DataContext.Provider
      value={{
        data: data,
        get_data,
        set_data,
        delete_data,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
