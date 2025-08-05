import DropdownRadio from "./sidebar-Inputs/DropdownRadio"
import PassoPrincipal from "./sidebar-Inputs/PassoPrincipal"
import { useState } from "react"

export default function SidebarEsquerdo() {
    const [tipoDeCamada, setTipoDeCamada] = useState(null);
    const [polaridade, setPolaridade] = useState(null);
    const [tipoDeEnrolamento, setTipoDeEnrolamento] = useState(null);
    const [sentidoDeRotacao, setSentidoDeRotacao] = useState(null);
    const [tipoDeInterligacao, setTipoDeInterligacao] = useState(null);
    const [passoPrincipal, setPassoPrincipal] = useState(['1', '', '', '', '', '']);
    const [QtdCabos, setQtdCabos] = useState(null);

    const tipoDeCamadaOptions = [
        { label: 'Simples', value: 'simples' },
        { label: 'Dupla', value: 'dupla' },
        { label: 'Mista', value: 'mista' },
    ];

    const polaridadesOptions = [
        { label: '2 polos', value: '2 polos' },
        { label: '4 polos', value: '4 polos' },
        { label: '6 polos', value: '6 polos' },
        { label: '8 polos', value: '8 polos' },
        { label: '10 polos', value: '10 polos' },
        { label: '12 polos', value: '12 polos' },
        { label: '14 polos', value: '14 polos' }
    ];

    const tipoDeEnrolamentoOptions = [
        { label: 'Concêntrico', value: 'concêntrico' },
        { label: 'Imbricado', value: 'imbricado' },
    ];

    const sentidoDeRotacaoOptions = [
        { label: 'Horário', value: 'horário' },
        { label: 'Anti-horário', value: 'anti-horário' },
    ];

    const tipoDeInterligacaoOptions = [
        { label: 'Série', value: 'série' },
        { label: '2x Paralelo', value: '2x paralelo' },
        { label: '4x Paralelo', value: '4x paralelo' },
        { label: '6x Paralelo', value: '6x paralelo' }
    ];

    const QtdCabos =[
        { label: 'Y - 3 cabos', value: 'Y - 3 cabos' },
        { label: '△ - 3 cabos', value: '△ - 3 cabos'},
    ]

    return (
        <div className="fixed left-0 h-full w-[390px] max-w-xs p-4 bg-[#02335E] text-white space-y-3 z-10 ">
            <label className="flex items-center flex-col gap-10 p-4">
                <input type="text" className="bg-white rounded-full focus:outline-none text-black px-6 py-1 w-full h-9" placeholder="Ranhuras" />

                <DropdownRadio
                    label="Tipo de Camada"
                    options={tipoDeCamadaOptions}
                    selected={tipoDeCamada}
                    onChange={setTipoDeCamada}
                />
                <DropdownRadio
                    label="Polaridade"
                    options={polaridadesOptions}
                    selected={polaridade}
                    onChange={setPolaridade}
                />
                <DropdownRadio
                    label="Tipo de Enrolamento"
                    options={tipoDeEnrolamentoOptions}
                    selected={tipoDeEnrolamento}
                    onChange={setTipoDeEnrolamento}
                />

                <DropdownRadio
                    label="Sentido de Rotacao"
                    options={sentidoDeRotacaoOptions}
                    selected={sentidoDeRotacao}
                    onChange={setSentidoDeRotacao}
                />

                <DropdownRadio
                    label="Tipo de Interligacao"
                    options={tipoDeInterligacaoOptions}
                    selected={tipoDeInterligacao}
                    onChange={setTipoDeInterligacao}
                />

                <PassoPrincipal
                    label="Passo principal:"
                    onChange={setPassoPrincipal}
                />

            </label>
        </div>
    )
}