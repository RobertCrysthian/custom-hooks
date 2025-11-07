import { useEffect, useState } from "react";
import type { ArrayReturn, PrimaryReturn, TypeElement, TypeStorage } from "./types/types";

export default function useLocalStorage<T>(props: { key: string; typeElement: "array", storage: TypeStorage }): ArrayReturn<T>;
export default function useLocalStorage<T>(props: { key: string; typeElement: "primary", storage: TypeStorage }): PrimaryReturn<T>;

export default function useLocalStorage<T>(props: {
    key: string;
    typeElement: TypeElement;
    storage: TypeStorage
}) {
    const { key, typeElement, storage } = props;
    const [value, setValue] = useState<any>(typeElement === "array" ? [] : null);

    function set(v: any) {
        storage === "localStorage" ? localStorage.setItem(key, JSON.stringify(v)) : sessionStorage.setItem(key, JSON.stringify(v));
        setValue(v);
    }

    function remove() {
        storage === "localStorage" ? localStorage.removeItem(key) : sessionStorage.removeItem(key);
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
        const item = storage === "localStorage" ? localStorage.getItem(key) : sessionStorage.getItem(key);
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
