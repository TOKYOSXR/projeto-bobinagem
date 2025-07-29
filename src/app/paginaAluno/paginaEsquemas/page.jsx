import "@/app/globals.css";
import Header from "@/components/header/header";
import SidebarEsquerdo from "@/components/sidebarEsquerdo";

export default function PaginaEsquemas() {
    return (
        <>
            <Header />
            <SidebarEsquerdo />
            <section className="flex justify-center items-center min-h-screen">
                <div className="relative flex flex-col items-center justify-center h-full w-full">
                    
                    {/* SVG de conexões */}
                    <svg
                        id="conexoes-svg"
                        width="100%"
                        height="100%"
                        className="absolute top-0 left-0 pointer-events-none"
                    ></svg>

                    {/* Ranhuras Superiores */}
                    <div className="flex flex-row justify-center items-end gap-[54px] mb-5" id="ranhuras-superior">
                        <div className="w-1 h-9 bg-black relative cursor-pointer"></div>
                        {[...Array(23)].map((_, index) => (
                            <div
                                key={index}
                                className="w-1 h-9 bg-black relative cursor-pointer"
                                data-index={index + 1}
                            ></div>
                        ))}
                    </div>

                    {/* Numeração */}
                    <div className="flex justify-center gap-[56px] mb-5">
                        {[...Array(24)].map((_, index) => (
                            <div key={index} className="w-[2px] text-center text-base -translate-x-[5px]">
                                {index + 1}
                            </div>
                        ))}
                    </div>

                    {/* Ranhuras Inferiores */}
                    <div className="flex flex-row justify-center items-end gap-[54px]" id="ranhuras-inferior">
                        <div className="w-1 h-9 bg-black relative cursor-pointer"></div>
                        {[...Array(23)].map((_, index) => (
                            <div
                                key={index}
                                className="w-1 h-9 bg-black relative cursor-pointer"
                                data-index={index + 1}
                            ></div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
}