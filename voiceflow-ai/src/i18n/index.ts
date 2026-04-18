import en from "./translations";
import es from "./es";
import fr from "./fr";
import de from "./de";
import pt from "./pt";
import ja from "./ja";
import zh from "./zh";
import ko from "./ko";
import ar from "./ar";

export type { TranslationKeys } from "./translations";

export const languages = {
  en, es, fr, de, pt, ja, zh, ko, ar,
} as const;

export type LangCode = keyof typeof languages;

export const langCodes = Object.keys(languages) as LangCode[];
