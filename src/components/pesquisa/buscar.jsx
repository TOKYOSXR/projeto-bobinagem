'use client'

import Image from "next/image";

export default function Buscar({ visual, lista, setVisual, setLista }) {

    const handleClickVisual = () => {
        setVisual(true);
        setLista(false);
    };

    const handleClickLista = () => {
        setLista(true);
        setVisual(false);
    };

    return (
        <>
            <div className="flex items-center justify-between  mt-10">
                <div className="flex items-center gap-4 bg-[#4E4E4E]/18 w-1/3 rounded-lg">
                    <div className="bg-[#02335E] p-3 rounded-tl-lg rounded-bl-lg">
                        <Image
                            src="/pesquisa/lupa.png"
                            alt="Lupa"
                            width={20}
                            height={20}
                        />
                    </div>
                    <div
                        type="text"
                        className="text-[#4E4E4E]/30"
                    >
                        <p className="text-xl">Pesquisa Turma</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleClickLista}
                        className="cursor-pointer">
                        <Image
                            src={lista ? "/modoVisao/lista(com cor).png" : "/modoVisao/lista(sem cor).png"}
                            alt="Lista"
                            width={40}
                            height={40}
                        />
                    </button>
                    <button
                        onClick={handleClickVisual}
                        className="cursor-pointer"
                    >
                        <Image
                            src={visual ? "/modoVisao/visual(com cor).png" : "/modoVisao/visual(sem cor).png"}
                            alt="Visual"
                            width={40}
                            height={40}
                        />
                    </button>
                </div>
            </div>
        </>
    )
}