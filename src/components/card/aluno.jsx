'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Buscar from "../pesquisa/buscar";
import { useRouter } from 'next/navigation';


export default function CardAluno({ totalCard, couteudo1 }) {
    const router = useRouter();
    const [visual, setVisual] = useState(true);
    const [lista, setLista] = useState(false);
    const [par, setPar] = useState(false);
    const [card, setCard] = useState();

    const cardsArray = Array.from({ length: totalCard }, (_, i) => i);

    const handleClick = () => {
        router.push(`/paginaAluno/paginaEsquemas`);
    };

    useEffect(() => {
        if (card !== null && card % 2 === 0) {
            setPar(true);
        } else {
            setPar(false);
        }
    }, [card]);

    return (
        <>
            <Buscar visual={visual} lista={lista} setVisual={setVisual} setLista={setLista} roleAluno />

            {visual && (
                <div
                    onClick={handleClick}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-10 w-full">
                    {cardsArray.map((card) => (
                        <button
                            key={card}
                        >
                            <div className="flex flex-col gap-2 bg-[#02335E] rounded-lg shadow-2xl w-full cursor-pointer">
                                <div className="flex items-center mt-2 mx-4 gap-10">
                                    <hr className="bg-green-700 p-2.5 rounded-sm" />
                                    <p className="text-white text-2xl">
                                        {couteudo1}
                                    </p>
                                </div>
                                <div>
                                    <Image
                                        className="flex flex-col w-[300rem] rounded-br-lg rounded-bl-lg bg-[#02335E] shadow-2xl cursor-pointer"
                                        src="/card/alunoAtividade.png"
                                        alt="Imagem"
                                        width={800}
                                        height={800}
                                    />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {lista && (
                <div className="flex flex-col">
                    <div className="flex mt-10 justify-between">
                        <p className="text-[#02335E] text-xl font-semibold ml-10 whitespace-nowrap">Nome da Turma</p>
                        <p className="text-[#02335E] text-xl font-semibold whitespace-nowrap mr-6">Status</p>
                        <p className="text-[#02335E] text-xl font-semibold whitespace-nowrap">Visualizado Recentemente</p>
                    </div>

                    {cardsArray.map((card) => (
                        <>
                            <button
                                key={card}
                                className={`flex justify-between cursor-pointer rounded-lg ${card % 2 === 1 ? 'bg-white' : 'bg-gray-400'}`}>
                                <div className="flex flex-col items-center bg-gray-400">
                                    <p className="text-white opacity-0 pointer-events-none text-xl font-semibold ">Nome da Turma</p>
                                    <div className="flex ">
                                        <hr className="bg-green-700 p-2.5 rounded-sm" />
                                        <p className="text-xl">Atividade 1</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-white opacity-0 pointer-events-none text-xl font-semibold">Status</p>
                                    <p className="text-xl">Finalizado</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-white opacity-0 pointer-events-none text-xl font-semibold">Visualizado Recentemente</p>
                                    <p className="text-xl">Hoje</p>
                                </div>
                            </button >
                        </>
                    ))
                    }
                </div >
            )
            }

        </>
    );
}
