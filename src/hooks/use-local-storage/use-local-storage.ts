import { useEffect, useState } from "react";
import type { TypeElement, TypeStorage } from "./types/types";

export default function useLocalStorage<T>(props: {
    key: string;
    typeElement: TypeElement;
    storage: TypeStorage
}) {
    const { key, typeElement, storage } = props;
    const [value, setValue] = useState<string>("");

    function set(v: string) {
        localStorage.setItem(key, JSON.stringify(v));
        setValue(v);
    }

    function remove() {
        localStorage.removeItem(key);
        setValue("");
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

    // function editItemFromArray(identifier: string | null, val: string | number) {
    // if (Array.isArray(value)) {
    //     setValue(prev => prev.)
    // }
    // }

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
