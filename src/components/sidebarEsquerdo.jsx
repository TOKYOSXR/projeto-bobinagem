import DropdownRadio from "./sidebar-Inputs/DropdownRadio"
import { useState } from "react"

export default function SidebarEsquerdo() {
    const [tipoDeCamada, setTipoDeCamada] = useState(null);

    const tipoDeCamadaOptions = [
        { label: 'Simples', value: 'simples' },
        { label: 'Dupla', value: 'dupla' },
        { label: 'Tripla', value: 'tripla' },
    ];
    return (
        <div className="left-0 h-full w-64  max-w-xs p4 bg-[#02335E] text-white space-y-3 z-10 ">
            <label className="flex items-center flex-col gap-6 p-4">
                <input type="text" className="bg-white rounded-2xl focus:outline-none text-black px-2" placeholder="Ranhuras" />
               <DropdownRadio 
                    Label="Tipo de Camada"

               
               
               />
            </label>
        </div>
    )
}