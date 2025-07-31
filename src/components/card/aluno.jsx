'use client'
import { useState } from "react";
import Image from "next/image";
import Buscar from "../pesquisa/buscar";
import { useRouter } from 'next/navigation';

export default function CardAluno({ totalCard, couteudo1 }) {
    const router = useRouter();
    const [visual, setVisual] = useState(true);
    const [lista, setLista] = useState(false);
    const [par, setPar] = useState(false);

    const cardsArray = Array.from({ length: totalCard }, (_, i) => i);

    const isPar () = ()
        if (card % 2 == 0) {
            setPar(true)
        }
    }
    


    const handleClick = () => {
        router.push(`/paginaProfessor/turma/aluno/atividade`);
    };

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
                            <div className="flex flex-col gap-10 bg-[#02335E] rounded-lg shadow-2xl w-full cursor-pointer">
                                <div>
                                    <Image
                                        className="max-h-20"
                                        src="/card/image.png"
                                        alt="Imagem"
                                        width={600}
                                        height={600}
                                    />
                                </div>
                                <div className="pb-16">
                                    <p className="text-white text-2xl">
                                        {couteudo1}
                                    </p>
                                </div>

                            </div>
                        </button>
                    ))}
                </div>
            )}

            {lista && (
                <div className="flex flex-col">
                    <div className="flex mt-10 justify-between">
                        <p className="text-[#02335E] text-xl font-semibold">Nome da Turma</p>
                        <p className="text-[#02335E] text-xl font-semibold">Status</p>
                        <p className="text-[#02335E] text-xl font-semibold">Visualizado Recentemente</p>
                    </div>

                    {cardsArray.map((card) => (
                        <>
                            {par ? (
                                <button
                                    key={card}
                                    className="flex justify-between cursor-pointer">
                                    <div className="flex flex-col items-center bg-gray-400">
                                        <p className="text-white opacity-0 pointer-events-none text-xl font-semibold">Nome da Turma</p>
                                        <div className="flex ">
                                            <hr className="bg-green-600 p-2" />
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
                                </button>
                            ) : (
                                <button
                                    key={card}
                                    className="flex justify-between cursor-pointer">
                                    <div className="flex flex-col items-center">
                                        <p className="text-white opacity-0 pointer-events-none text-xl font-semibold">Nome da Turma</p>
                                        <div className="flex ">
                                            <hr className="bg-green-600 p-2" />
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
                                </button>
                            )}
                        </>
                    ))}

                </div >

            )
            }

        </>
    );
}
