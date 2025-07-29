"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeaderProfessor() {
    const router = useRouter();

    const [hamburguer, setHamburguer] = useState(false)
    const [add, setAdd] = useState(false)

    const handleClick = () => {
        router.push("/paginaProfessor")
    };

    return (
        <>
            <header className="h-[100px] bg-[#02335E] p-5">

                <section className="flex flex-row justify-between items-center">
                    <button
                        onClick={handleClick}
                        className="cursor-pointer"
                    >
                        <Image
                            src="/logo-weg 1.png"
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    </button>

                    <div>
                        <nav className="flex items-center gap-10 pr-10">
                            <button
                                onClick={() => setAdd(true)}
                                className="cursor-pointer"
                            >
                                <Image
                                    src={add ? "/headerProfessor/x.png" : "/headerProfessor/+.png"}
                                    alt="adicionar"
                                    width={30}
                                    height={30}
                                />
                            </button>
                            <button
                                onClick={() => setHamburguer(true)}
                                className="cursor-pointer"
                            >
                                <Image
                                    src="/headerProfessor/hamb.png"
                                    alt="hamburguer"
                                    width={35}
                                    height={35}
                                />
                            </button>
                        </nav>
                    </div>

                </section>

            </header>
        </>
    )
}