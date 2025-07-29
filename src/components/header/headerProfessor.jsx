import Image from "next/image";
import Link from "next/link"

export default function HeaderProfessor() {
    return (
        <>
            <header className="h-[100px] bg-[#02335E] p-5">
                <section className="flex flex-row justify-between items-center">
                    <div>
                        <Link href= "/paginaProfessor">
                            <Image
                                src="/logo-weg 1.png"
                                alt="Logo"
                                width={100}
                                height={100}
                            />
                        </Link>
                    </div>

                    <div>
                        <nav className="flex items-center gap-10 pr-10">
                            <Image
                                src="/headerProfessor/+.png"
                                alt="adicionar"
                                width={30}
                                height={30}
                            />
                            <Image
                                src="/headerProfessor/hamb.png"
                                alt="hamburguer"
                                width={35}
                                height={35}
                            />
                        </nav>
                    </div>

                </section>

            </header>
        </>
    )
}