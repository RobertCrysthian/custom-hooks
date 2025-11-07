import { useEffect, useState } from "react";
import type { ArrayReturn, PrimaryReturn, TypeElement } from "./types/types";

export default function useLocalStorage<T>(props: { key: string; typeElement: "array" }): ArrayReturn<T>;
export default function useLocalStorage<T>(props: { key: string; typeElement: "primary" }): PrimaryReturn<T>;

export default function useLocalStorage<T>(props: { key: string; typeElement: TypeElement }) {
    const { key, typeElement } = props;
    const [value, setValue] = useState<any>(typeElement === "array" ? [] : null);

    function set(v: any) {
        localStorage.setItem(key, JSON.stringify(v));
        setValue(v);
    }

    function remove() {
        localStorage.removeItem(key);
        setValue(typeElement === "array" ? [] : null);
    }

    function incrementArray(item: T) {
        if (Array.isArray(value)) {
            const newValue = [...value, item];
            set(newValue);
        }
    }

    function removeFromArray(field: string | null, val: string | number) {
        if (Array.isArray(value)) {
            const filtered = value.filter((item: any) =>
                field ? item[field] !== val : item !== val
            );
            set(filtered);
        }
    }

    useEffect(() => {
        const item = localStorage.getItem(key);
        setValue(item ? JSON.parse(item) : typeElement === "array" ? [] : null);
    }, []);

    if (typeElement === "array") {
        return {
            value,
            set,
            remove,
            incrementArray,
            removeFromArray,
        };
    }

    return { value, set, remove };
}
