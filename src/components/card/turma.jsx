'use client'
import { useState } from "react";
import Image from "next/image";
import Buscar from "../pesquisa/buscar";
import { useRouter } from 'next/navigation';

export default function CardTurma({ totalCard, couteudo1}) {
    const router = useRouter();
    const [visual, setVisual] = useState(true);
    const [lista, setLista] = useState(false);

    const cardsArray = Array.from({ length: totalCard }, (_, i) => i);

    const handleClick = () => {
        router.push(`/paginaProfessor/turma`);
    };

    return (
        <>
            <Buscar visual={visual} lista={lista} setVisual={setVisual} setLista={setLista} />

            {visual && (
                <div
                    onClick={handleClick}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-10 w-full">
                    {cardsArray.map((card) => (
                        <button
                            key={card}
                        >
                            <div className="flex flex-col gap-20 bg-[#02335E] rounded-lg shadow-2xl w-full cursor-pointer">
                                <div>
                                    <Image
                                        className="max-h-20"
                                        src="/card/image.png"
                                        alt="Imagem"
                                        width={600}
                                        height={600}
                                    />
                                </div>
                                <div className="pb-20">
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
                    <div className="flex mt-20 justify-between">
                        <p className="text-[#02335E] text-2xl font-semibold">Nome da Turma</p>
                        <p className="text-[#02335E] text-2xl font-semibold">Status</p>
                        <p className="text-[#02335E] text-2xl font-semibold">Visualizado Recentemente</p>
                    </div>

                    {cardsArray.map((card, index) => (
                        <button
                            key={card}
                            className="flex justify-between cursor-pointer">
                            <div className="flex flex-col items-center">
                                <p className="text-white opacity-0 pointer-events-none text-2xl font-semibold">Nome da Turma</p>
                                <p className="text-2xl">MI-75 PSIN 2023/2</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-white opacity-0 pointer-events-none text-2xl font-semibold">Status</p>
                                <p className="text-2xl">Finalizado</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-white opacity-0 pointer-events-none text-2xl font-semibold">Visualizado Recentemente</p>
                                <p className="text-2xl">Hoje</p>
                            </div>
                        </button>
                    ))}

                </div>
            )}

        </>
    );
}
