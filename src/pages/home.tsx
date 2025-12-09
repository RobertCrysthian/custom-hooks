import { useState } from "react";
import useArrayInLocalStorage from "../hooks/use-local-storage/use-array-in-local-storage";
import { userSchema } from "../hooks/use-zod-errors/schemas/user-schema";
import { useZodErrors } from "../hooks/use-zod-errors/use-zod-errors";

type PersonType = {
    id: number,
    name: string,
    age: number,
}

const defaultArray = [
    {
        id: 1,
        name: "Ana",
        age: 20
    },
    {
        id: 2,
        name: "Jorge",
        age: 22
    },
    {
        id: 3,
        name: "Claudio",
        age: 30
    },
    {
        id: 4,
        name: "Bruno",
        age: 55
    },
    {
        id: 5,
        name: "Marcia",
        age: 35
    },
    {
        id: 6,
        name: "Laura",
        age: 55
    },

]

export default function PageHome() {
    // const { decrementArray, editItemFromArray, getItem, incrementArray, localArray, setArray } = useArrayInLocalStorage<PersonType>("array");

    const [data, setData] = useState({
        name: "",
        age: "",
        gender: ""
    })

    const { errors, handleErrors } = useZodErrors(userSchema);

    return (
        <main className="w-full flex flex-col items-center justify-center min-h-screen">
            <section className="w-[30%] flex flex-col items-center gap-10">
                <div className="mb-4 w-full">
                    <label className="pl-2">Nome</label>
                    <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="border w-full p-3 rounded-lg" placeholder="Informe o nome" />
                    <p>{errors.name}</p>
                </div>
                <div className="mb-4 w-full">
                    <label className="pl-2">Idade</label>
                    <input value={data.age} onChange={(e) => setData({ ...data, age: e.target.value })} className="border w-full p-3 rounded-lg" placeholder="Informe a idade" />
                    <p>{errors.age}</p>
                </div>
                <div className="w-full">
                    <label className="pl-2">Gênero</label>
                    <input value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })} className="border w-full p-3 rounded-lg" placeholder="Informe o gênero" />
                    <p>{errors.gender}</p>
                </div>
                <button
                    className="border p-2 rounded-lg m-10 w-[50%]  cursor-pointer"
                    onClick={() => handleErrors(data)}
                >Enviar</button>
            </section>
        </main >
    )
}