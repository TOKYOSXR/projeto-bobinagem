import { useState } from 'react';

export default function SidebarDireito({ corSelecionada, setCorSelecionada }) {
    const cores = ['black', 'red', 'blue', 'green', 'purple'];
    const [dropdownAberto, setDropdownAberto] = useState(false);

    return (
        <div className="fixed flex flex-col items-center right-0 h-full md:w-[150px] lg:w-[200px] p-4 bg-[#02335E] text-white space-y-4 z-10">
            {/* Header */}
            <div className="bg-white rounded-full p-2 md:w-30 lg:w-40 text-center">
                <span className="text-black font-semibold md:text-[13px] lg:text-[15px]">MONOFÁSICO</span>
            </div>

            {/* Código do Esquema */}
            <div className="space-y-2 b">
                <label className="block md:text-[12px] lg:text-sm font-medium">Código do esquema:</label>
                <div className="flex items-center gap-1">
                    <input type="text" maxLength="1" className="md:w-4 md:h-4 lg:w-6 lg:h-6 bg-white text-black rounded text-center text-sm" />
                    <span>-</span>
                    <input type="text" maxLength="1" className="md:w-4 md:h-4 lg:w-6 lg:h-6 bg-white text-black rounded text-center text-sm" />
                    <span>-</span>
                    <input type="text" maxLength="1" className="md:w-4 md:h-4 lg:w-6 lg:h-6 bg-white text-black rounded text-center text-sm" />
                    <span>/</span>
                    <input type="text" maxLength="1" className="md:w-4 md:h-4 lg:w-6 lg:h-6 bg-white text-black rounded text-center text-sm" />
                    <span>-</span>
                    <input type="text" maxLength="1" className="md:w-4 md:h-4 lg:w-6 lg:h-6 bg-white text-black rounded text-center text-sm" />
                </div>
            </div>

            {/* Cor */}
            <div className="space-y-2 relative">
                <label className="block md:text-[12px] lg:text-sm font-medium">Cor:</label>
                
                {/* Botão do dropdown */}
                <button
                    onClick={() => setDropdownAberto(!dropdownAberto)}
                    className="bg-white rounded-lg md:w-25 p-2 lg:w-40 flex items-center justify-between text-black cursor-pointer"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: corSelecionada }}></div>
                        <span>{corSelecionada}</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Lista do dropdown */}
                {dropdownAberto && (
                    <ul className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow z-20">
                        {cores.map(cor => (
                            <li
                                key={cor}
                                onClick={() => {
                                    setCorSelecionada(cor);
                                    setDropdownAberto(false);
                                }}
                                className="cursor-pointer px-3 py-1 flex items-center gap-2 hover:bg-gray-100"
                            >
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cor }}></div>
                                <span className="text-black">{cor}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Informações */}
            <div className="space-y-2">
                <h3 className="text-center font-semibold lg:text-sm md:text-[12px]">
                    Informações
                </h3>
                <div className="flex gap-1 md:gap-2">
                    <div className="bg-white rounded-lg lg:p-2 md:p-1 text-center">
                        <span className="text-black font-medium lg:text-xs md:text-[12px]">
                            G/F = 2
                        </span>
                    </div>
                    <div className="bg-white rounded-lg lg:p-2 md:p-1 text-center">
                        <span className="text-black font-medium lg:text-xs md:text-[12px]">
                            B/G = 2
                        </span>
                    </div>
                </div>
            </div>

            {/* Cálculo de Distribuição */}
            <div className="space-y-2">
                <h3 className="text-center font-semibold lg:text-[15px] md:text-[12px]">
                    Cálculo de Distribuição
                </h3>
                <div className="bg-white rounded-lg lg:p-2 md:p-1 text-center">
                    <span className="text-black font-medium lg:text-xs md:text-[12px]">
                        D = n° R / n° G/F
                    </span>
                </div>
                <div className="flex items-center justify-center lg:gap-2 md:gap-1">
                    <div className="bg-white rounded-lg lg:p-2 md:p-1 text-center">
                        <span className="text-black font-medium lg:text-[15px] md:text-[12px]">
                            D = 24 / 2
                        </span>
                    </div>
                    <div className="bg-white rounded-lg md:p-1 lg:p-2 text-center">
                        <span className="text-black font-medium text-xs md:text-sm">
                            =
                        </span>
                    </div>
                    <div className="bg-white rounded-lg md:p-1 lg:p-2 text-center">
                        <span className="text-black font-medium text-xs md:text-sm">
                            12
                        </span>
                    </div>
                </div>
            </div>

            {/* Cálculo de Defasagem */}
            <div className="space-y-2">
                <h3 className="text-center font-semibold md:text-[12px] lg:text-[15px]">Cálculo de Defasagem</h3>
                <div className="bg-white rounded-lg lg:p-3 md:p-1 text-center">
                    <span className="text-black font-medium md:text-[12px] lg:text-[15px]">0 = 2.n° R / 3.n° P</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="bg-white rounded-lg lg:p-2 md:p-1 text-center">
                        <span className="text-black font-medium md:text-[12px] lg:text-[15px] ">0 = 2.24 / 3.2</span>
                    </div>
                    <div className="bg-white rounded-lg lg:p-2 md:p-1 text-center">
                        <span className="text-black font-medium">=</span>
                    </div>
                    <div className="bg-white rounded-lg lg:p-2 md:p-1 text-center">
                        <span className="text-black font-medium">8</span>
                    </div>
                </div>
            </div>

            {/* Botão Entregar */}
            <div className="mt-6">
                <button className="w-full bg-white rounded-lg p-3 text-center hover:bg-gray-100 transition-colors">
                    <span className="text-black font-semibold text-lg">ENTREGAR</span>
                </button>
            </div>
        </div>
    );
}
