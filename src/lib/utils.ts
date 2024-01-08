import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type DefObject = {
    [key: string]: any;
};

export type ResponseType<T> = {
    data: { body: T };
};

export const evalProp = (value: any, values?: DefObject) => {
    if (typeof value === "function") {
        return value(values);
    }

    return value;
};

const getKeys = (keyString = ""): string[] => keyString?.split(/\]?[[.]/);

export const pickValue = (obj: DefObject, keyString: string): any => {
    const keys = getKeys(keyString);
    let value: DefObject = obj;
    keys.forEach((key) => {
        value = value?.[key];
    });
    return value;
};

export const setValue = (obj: any, keyString: string, value: any) => {
    const keys = getKeys(keyString);
    const result = { ...(obj || {}) };
    let target = result;
    keys.forEach((key, idx) => {
        if (idx === keys.length - 1) {
            target[key] = value;
        } else {
            if (!target[key]) {
                const nextKey = keys[idx + 1];
                if (/^\d+$/.test(nextKey) && new RegExp(`${key}]?[${nextKey}]`).test(keyString)) {
                    target[key] = [];
                } else {
                    target[key] = {};
                }
            }

            target = target[key];
        }
    });

    return result;
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
