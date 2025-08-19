import { useState } from 'react';

export default function SidebarDireito() {
    const [corSelecionada, setCorSelecionada] = useState('Preto');

    return (
        <div className="fixed flex flex-col items-center right-0 h-full w-[250px] p-4 bg-[#02335E] text-white space-y-4 z-10">
            {/* Header */}
            <div className="bg-white rounded-full p-2 w-40 text-center">
                <span className="text-black font-semibold text-[15px]">MONOFÁSICO</span>
            </div>

            {/* Código do Esquema */}
            <div className="space-y-2 b">
                <label className="block text-sm font-medium">Código do esquema:</label>
                <div className="flex items-center gap-1">
                    <input type="text" maxLength="1" className="w-6 h-6 bg-white text-black rounded text-center text-sm" />
                    <span>-</span>
                    <input type="text" maxLength="1" className="w-6 h-6 bg-white text-black rounded text-center text-sm" />
                    <span>-</span>
                    <input type="text" maxLength="1" className="w-6 h-6 bg-white text-black rounded text-center text-sm" />
                    <span>/</span>
                    <input type="text" maxLength="1" className="w-6 h-6 bg-white text-black rounded text-center text-sm" />
                    <span>-</span>
                    <input type="text" maxLength="1" className="w-6 h-6 bg-white text-black rounded text-center text-sm" />
                </div>
            </div>

            {/* Cor */}
            <div className="space-y-2">
                <label className="block text-sm font-medium">Cor:</label>
                <div className="bg-white rounded-lg p-2 w-40 flex items-center justify-between text-black">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-black"></div>
                        <span>{corSelecionada}</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Informações */}
            <div className="space-y-2">
                <h3 className="text-center font-semibold">Informações</h3>
                <div className="flex gap-2 flex-">
                    <div className="bg-white rounded-lg p-3 text-center">
                        <span className="text-black font-medium">G/F = 2</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                        <span className="text-black font-medium ">B/G = 2</span>
                    </div>
                </div>
            </div>

            {/* Cálculo de Distribuição */}
            <div className="space-y-2">
                <h3 className="text-center font-semibold">Cálculo de Distribuição</h3>
                <div className="bg-white rounded-lg p-1 text-center">
                    <span className="text-black font-medium">D = n° R / n° G/F</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="bg-white rounded-lg p-2 text-center">
                        <span className="text-black font-medium">D = 24 / 2</span>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                        <span className="text-black font-medium">=</span>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                        <span className="text-black font-medium">12</span>
                    </div>
                </div>
            </div>

            {/* Cálculo de Defasagem */}
            <div className="space-y-2">
                <h3 className="text-center font-semibold">Cálculo de Defasagem</h3>
                <div className="bg-white rounded-lg p-3 text-center">
                    <span className="text-black font-medium">0 = 2.n° R / 3.n° P</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="bg-white rounded-lg p-2 text-center">
                        <span className="text-black font-medium">0 = 2.24 / 3.2</span>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                        <span className="text-black font-medium">=</span>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
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