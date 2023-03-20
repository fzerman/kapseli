import { createContext } from "react";
import { I18nLocaleProp, I18nMessagesProp } from "./provider";

export const I18nContext = createContext({
  config: { locale: "en", messages: {} },
  getConfig: () => {},
  setLocale: (locale: I18nLocaleProp) => {},
  getLocale: (): string => "",
  getMessages: () => {},
  setMessages: (locale: I18nLocaleProp, messages: I18nMessagesProp) => {},
  addMessages: (locale: I18nLocaleProp, messages: I18nMessagesProp) => {},
  t: (id: string): string => "",
});
