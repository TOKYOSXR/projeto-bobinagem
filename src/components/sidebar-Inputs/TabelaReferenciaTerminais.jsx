import { useState } from 'react';

export default function TabelaReferenciaTerminais() {
    const [padraoSelecionado, setPadraoSelecionado] = useState('ABNT');

    const dadosTerminais = {
        ABNT: {
            primeira: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
            segunda: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12']
        },
        NEMA: {
            primeira: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
            segunda: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12']
        },
        IEC: {
            primeira: ['U1', 'V1', 'W1', 'U2', 'V2', 'W2'],
            segunda: ['U3', 'V3', 'W3', 'U4', 'V4', 'W4']
        },
        JIS: {
            primeira: ['U1', 'V1', 'W1', 'U2', 'V2', 'W2'],
            segunda: ['U5', 'V5', 'W5', 'U6', 'V6', 'W6']
        }
    };

    const padroes = ['ABNT', 'NEMA', 'IEC', 'JIS'];

    return (
        <>
            {/* Primeira Tabela - Primeira Série */}
            <div className="mb-3">
                
                <div className="border rounded overflow-hidden">
                    <table className="w-full text-xs">
                        <tbody>
                            {padroes.map((padrao) => (
                                <tr
                                    key={`primeira-${padrao}`}
                                    className={`border-t ${padraoSelecionado === padrao ? 'bg-[#02335E]' : 'hover:bg-[#02335e] '
                                        }`}
                                >
                                    <td className="px-1 py-1 font-medium text-white border-r text-xs">
                                        {padrao}
                                    </td>
                                    {dadosTerminais[padrao].primeira.map((terminal, index) => (
                                        <td
                                            key={`primeira-${padrao}-${index}`}
                                            className="px-1 py-1 text-center border-r  text-xs"
                                        >
                                            {terminal}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Segunda Tabela - Segunda Série */}
            <div>
                <div className="border rounded overflow-hidden">
                    <table className="w-full text-xs">
                        <tbody>
                            {padroes.map((padrao) => (
                                <tr
                                    key={`segunda-${padrao}`}
                                    className={`border-t ${padraoSelecionado === padrao ? 'bg-[#02335E]' : 'hover:bg-[#02335E]'
                                        }`}
                                >
                                    <td className="px-1 py-1 font-medium text-white border-r text-xs">
                                        {padrao}
                                    </td>
                                    {dadosTerminais[padrao].segunda.map((terminal, index) => (
                                        <td
                                            key={`segunda-${padrao}-${index}`}
                                            className="px-1 py-1 text-center border-r text-white text-xs"
                                        >
                                            {terminal}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>


    );
} 