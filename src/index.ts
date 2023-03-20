import { KapseliProvider } from "./app/provider";
import type { KapseliProviderProp } from "./app/provider";

import { CommandContext } from "./command/context";
import { useCommand } from "./command/hook";
import type {
  CommandConfigProp,
  CommandProp,
  StateProp,
} from "./command/provider";
import { CommandProvider } from "./command/provider";
import type { CommandProviderProp } from "./command/provider";

import { DataContext } from "./data/context";
import { useData } from "./data/hook";
import { DataProvider, KapseliData } from "./data/provider";

import { EventContext } from "./event/context";
import { useEvent } from "./event/hook";
import { EventProvider, EventProviderProp } from "./event/provider";

import { I18nContext } from "./i18n/context";
import { useI18n } from "./i18n/hook";
import {
  I18nProvider,
  I18nProviderProp,
  I18nConfigProps,
  I18nLocaleProp,
  I18nMessagesProp,
} from "./i18n/provider";

export {
  KapseliProvider,
  CommandContext,
  CommandProvider,
  useCommand,
  DataContext,
  useData,
  DataProvider,
  EventContext,
  EventProvider,
  useEvent,
  I18nContext,
  I18nProvider,
  useI18n,
};

export type {
  KapseliProviderProp,
  CommandProviderProp,
  StateProp,
  CommandProp,
  CommandConfigProp,
  KapseliData,
  EventProviderProp,
  I18nProviderProp,
  I18nConfigProps,
  I18nLocaleProp,
  I18nMessagesProp,
};
