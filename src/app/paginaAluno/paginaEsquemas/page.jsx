'use client';

import "@/app/globals.css";
import { useState } from "react";
import SidebarEsquerdo from "@/components/sidebar/sidebarEsquerdo";
import SidebarDireito from "@/components/sidebar/sidebarDireito";
import HeaderAluno from "@/components/header/headerAluno";
import Ranhura from "@/components/esquema/ranhura";

export default function PaginaEsquemas() {
    // Estado para armazenar a cor selecionada no sidebar
    const [corSelecionada, setCorSelecionada] = useState("black");

    // Estado para armazenar a quantidade de ranhuras (pode ser null)
    const [quantidadeRanhuras, setQuantidadeRanhuras] = useState(null);

    return (
        <div className="relative min-h-screen">
            <HeaderAluno />

            {/* Sidebar esquerdo */}
            <SidebarEsquerdo setQuantidadeRanhuras={setQuantidadeRanhuras} />

            {/* Sidebar direito - passa cor e função para alterar */}
            <SidebarDireito 
                corSelecionada={corSelecionada} 
                setCorSelecionada={setCorSelecionada} 
            />

            {/* Componente de esquema (Ranhura) recebe a cor e a quantidade de ranhuras */}
            {quantidadeRanhuras && (
                <Ranhura 
                    corSelecionada={corSelecionada} 
                    quantidadeRanhuras={quantidadeRanhuras} 
                />
            )}
        </div>
    );
}
