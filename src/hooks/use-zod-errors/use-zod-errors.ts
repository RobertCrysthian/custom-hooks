import { useEffect, useState } from "react";
import { z, type ZodObject } from "zod";

export function useZodErrors<T extends ZodObject<any>>(schema: T) {
    type SchemaType = z.infer<T>;

    const [errors, setErrors] = useState<Partial<Record<keyof SchemaType, string | undefined>>>({});

    function handleErrors(data: Record<keyof SchemaType, unknown>) {
        try {
            schema.parse(data);

        } catch (error: unknown) {
            if (error instanceof z.ZodError) {
                const objErrors: Partial<Record<keyof SchemaType, string | undefined>> = {};

                error.issues.forEach((error) => {
                    const key = error.path[0] as keyof SchemaType;
                    objErrors[key] = error.message;
                })
                throw setErrors(objErrors);
            }
        }
    }

    return { errors, handleErrors };
}