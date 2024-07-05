import { createSharedPathnamesNavigation } from "next-intl/navigation";
export const locales = ["en-us", "zh-cn", "ja-jp"] as const;
export type Locale = (typeof locales)[number];
export const localeNames: Record<Locale, string> = {
    "en-us": "English",
    "zh-cn": "中文",
    "ja-jp": "日本語",

};
export const { Link, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales });