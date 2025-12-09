import z from "zod";


export const userSchema = z.object({
    name: z.string("O nome deve ser uma string").min(3, "O nome deve ter pelo menos 3 caracteres"),
    age: z.number("A idade deve ser um número").min(1, "Informe uma idade válida."),
    gender: z.enum(["feminino", "masculino", "outros"], "Os gêneros devem ser 'feminino' ou 'masculino' ou 'outros'.")
})

export type UserData = z.infer<typeof userSchema>;

