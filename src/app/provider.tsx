import React, { FC, ReactNode } from "react";
import { CommandConfigProp, CommandProvider } from "../command";
import { DataProvider, KapseliData } from "../data";
import { EventProvider } from "../event";
import { EventProp } from "../event/provider";
import { I18nConfigProps, I18nProvider } from "../i18n";

export interface KapseliProviderProp {
  events?: EventProp;
  commands?: CommandConfigProp;
  i18n?: I18nConfigProps;
  data?: KapseliData;
  children: ReactNode;
}

export const KapseliProvider: FC<KapseliProviderProp> = ({
  events,
  commands,
  i18n,
  data,
  children,
}) => {
  return (
    <DataProvider datas={data}>
      <EventProvider events={events}>
        <CommandProvider commands={commands}>
          <I18nProvider config={i18n}>{children}</I18nProvider>
        </CommandProvider>
      </EventProvider>
    </DataProvider>
  );
};
