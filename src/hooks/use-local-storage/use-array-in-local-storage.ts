import { useEffect, useState } from "react";
import { isObject } from "../../utils/is-object";

export default function useArrayInLocalStorage<T extends string | Record<string, any>>(key: string) {

    const [localArray, setLocalArray] = useState<T[]>([]);

    function setArray(arr: T[]): void {
        setLocalArray([...arr]);
        localStorage.setItem(key, JSON.stringify(arr));
    }

    function getItem(): T[] | null {
        const stringifiedArray = localStorage.getItem(key);
        if (stringifiedArray) {
            return JSON.parse(stringifiedArray);
        }
        return null;
    }

    function incrementArray(newItem: T): void {
        const arr = getItem();
        if (!arr) return;

        arr.push(newItem);
        setArray(arr);
    }

    function decrementArray(key: keyof T | null, value: T | T[keyof T]): void {
        const arr = getItem();
        if (!arr) return;

        const filteredArray = arr.filter((item) => {
            if (isObject(item)) return item[key as keyof T] !== value;
            return item !== value;
        })
        setArray(filteredArray)
    }

    function editItemFromArray(key: keyof T | null, value: T, newValue: T) {
        const arr = getItem();
        if (!arr) return;

        const filteredArray = arr.map((item) => {
            if (isObject(item) && item[key as keyof T] === value) {
                return newValue
            } else if (item === value) {
                return newValue;
            } return item;
        })
        setArray(filteredArray);
    }

    useEffect(() => {
        const arr = getItem();
        if (arr) setLocalArray(arr);
    }, [])

    return { editItemFromArray, decrementArray, incrementArray, getItem, setArray, localArray }

}