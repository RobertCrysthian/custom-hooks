import { X } from "lucide-react";
import useLocalStorage from "../hooks/use-local-storage/use-local-storage";
import vehicleList from "./mock-data.json";
import { useState } from "react";

type VehicleType = {
    id: number,
    brand: string,
    model: string
}

export default function PageHome() {
    const [cardId, setCardId] = useState<string>("");

    const vehicles = useLocalStorage<VehicleType>({
        key: "vehicles",
        typeElement: "array"
    });

    const vehicle = useLocalStorage<string>({
        key: "vehicle",
        typeElement: "primary"
    })

    const newVehicle = {
        id: Math.floor(Math.random() * 10000),
        brand: "Marca - template",
        model: "Modelo - template"
    }

    return (
        <main className="w-full p-8 h-full flex flex-col items-center">
            <h1 className="mb-2 font-bold text-2xl">useLocalStorage</h1>
            <p className="mb-5">Usado para trabalhar com informações do localStorage mantendo seu estado sempre salvo e atualizado na memória!</p>
            <div className="w-full mb-2 mt-13 flex flex-col items-start">
                <p className="font-bold mb-2">typeElement = "array"</p>
                <div className="flex justify-center flex-wrap gap-4 mb-5 pb-4">
                    <button
                        className="border p-2 rounded-lg  cursor-pointer"
                        onClick={() => vehicles.set(vehicleList)}
                    >Adicionar lista de items</button>
                    <button
                        className="border p-2 rounded-lg  cursor-pointer"
                        onClick={() => vehicles.incrementArray(newVehicle)}
                    >Adicionar novo item no registro existente
                    </button>

                    <button
                        className="border p-2 rounded-lg  cursor-pointer"
                        onClick={() => cardId && vehicles.removeFromArray("id", +cardId)}
                    >{"Remover item por id ->"}
                    </button>
                    <input
                        className="p-2 rounded-lg w-[150px] border"
                        placeholder="ID do card"
                        value={cardId}
                        onChange={(e) => setCardId(e.target.value)}
                    />
                    <button
                        className="border p-2 rounded-lg  cursor-pointer"
                        onClick={() => vehicles.remove()}
                    >Remover tudo
                    </button>
                </div>

                <div className="flex gap-5 justify-center flex-wrap">
                    {
                        vehicles.value.length ?
                            vehicles.value.map((vehicle) => (
                                <div className=" border p-4 relative w-[250px]">
                                    <X className="absolute right-3 cursor-pointer" onClick={() => vehicles.removeFromArray("id", vehicle.id)} />
                                    <p>ID: {vehicle.id}</p>
                                    <p>MARCA: {vehicle.brand}</p>
                                    <p>MODELO: {vehicle.model}</p>
                                </div>
                            )) :
                            <p className="text-gray-300">Clique no primeiro botão para adicionar a lista de items no localstorage e exibir aqui!</p>
                    }
                </div>
            </div>

            <div className="w-full mb-2 mt-13 flex flex-col items-start">
                <p className="font-bold mb-2">typeElement = "primary"</p>
                <div className="flex justify-center flex-wrap gap-4 pb-4">
                    <input
                        className="p-2 rounded-lg border"
                        placeholder="Digite o nome do veículo"
                        value={vehicle.value || ""}
                        onChange={(e) => vehicle.set(e.target.value)}
                    />
                    <button
                        className="border p-2 rounded-lg  cursor-pointer"
                        onClick={() => vehicle.remove()}
                    >{"Remover item"}
                    </button>
                </div>
                <p className="font-bold text-2xl">Veículo: {vehicle.value}</p>
            </div>

            <div className="w-full mb-2 mt-13 flex flex-col items-start">
                <p className="font-bold mb-2">typeElement = "object"</p>
                <p>WIP</p>
            </div>
        </main>
    )
}