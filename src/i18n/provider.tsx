import React, { FC, ReactNode, useState } from "react";
import { useEvent } from "../event";
import { I18nContext } from "./context";

export type I18nLocaleProp = string;

export type I18nMessagesProp = {
  [key: string]: string;
};

export interface I18nConfigProps {
  locale: I18nLocaleProp;
  messages: { [key: string]: I18nMessagesProp };
}

export interface I18nProviderProp {
  config?: I18nConfigProps;
  children: ReactNode;
}

export const I18nProvider: FC<I18nProviderProp> = ({
  config: _config,
  children,
}) => {
  const event = useEvent();
  const [config, setConfig] = useState<I18nConfigProps>({
    locale: "en",
    messages: {},
    ..._config,
  });

  /**
   * Get I18n Configs
   * @returns I18nConfigProps
   */
  const getConfig = () => {
    return config;
  };

  /**
   * Change the current locale
   * @param locale
   */
  const setLocale = (locale: I18nLocaleProp) => {
    setConfig({
      ...config,
      locale,
    });
  };

  /**
   * Get Current Locale
   * @returns locale
   */
  const getLocale = () => {
    return config.locale;
  };

  /**
   * Get all I18n messages
   * @returns
   */
  const getMessages = () => {
    return config.messages;
  };

  /**
   * Override messages to current locale
   * @param locale
   * @param messages
   */
  const setMessages = (locale: I18nLocaleProp, messages: I18nMessagesProp) => {
    setConfig({
      ...config,
      messages: {
        ...config.messages,
        [locale]: messages,
      },
    });
  };

  /**
   * Add new messages to current locale
   * @param locale
   * @param messages
   */
  const addMessages = (locale: I18nLocaleProp, messages: I18nMessagesProp) => {
    if (locale in config.messages) {
      setConfig({
        ...config,
        messages: {
          ...config.messages,
          [locale]: {
            ...config.messages[locale],
            ...messages,
          },
        },
      });
    } else {
      setMessages(locale, messages);
    }
  };

  /**
   * Translate a message for current locale
   * @param id
   * @returns Localized Message
   */
  const t = (id: string) => {
    let localized_message =
      config.messages[config.locale] !== undefined
        ? config.messages[config.locale][id]
        : undefined;
    return localized_message !== undefined ? localized_message : "?";
  };

  const useSetLocale = (locale: I18nLocaleProp) => {
    setLocale(locale);

    event.run("i18n:locale", {
      locale: locale,
    });
  };

  const useSetMessages = (
    locale: I18nLocaleProp,
    messages: I18nMessagesProp
  ) => {
    setMessages(locale, messages);
    event.run("i18n:setMessages", {
      locale: locale,
    });
  };

  const useAddMessages = (
    locale: I18nLocaleProp,
    messages: I18nMessagesProp
  ) => {
    addMessages(locale, messages);

    event.run("i18n:addMessages", {
      locale: locale,
    });
  };

  return (
    <I18nContext.Provider
      value={{
        config,
        getConfig,
        setLocale: useSetLocale,
        getLocale,
        getMessages,
        setMessages: useSetMessages,
        addMessages: useAddMessages,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};
