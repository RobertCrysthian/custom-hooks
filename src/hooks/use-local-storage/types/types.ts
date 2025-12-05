export type ArrayReturn<T> = {
    value: T[];
    set: (value: T[]) => void;
    remove: () => void;
    incrementArray: (item: T) => void;
    removeFromArray: (key: string | null, arrayValue: string | number) => void;
}

export type PrimaryReturn<T> = {
    value: T | null;
    set: (value: T) => void;
    remove: () => void;
};

export type ObjectReturn<T> = {
    value: T | null;
    set: (value: T) => void;
    remove: () => void;
}

export type TypeElement = "primary" | "array" | "object";
export type TypeStorage = "sessionStorage" | "localStorage"