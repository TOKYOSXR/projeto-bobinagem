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

    return (
        <div className="relative">
            <HeaderAluno />

            {/* Sidebar esquerdo */}
            <SidebarEsquerdo />

            {/* Sidebar direito - passa cor e função para alterar */}
            <SidebarDireito 
                corSelecionada={corSelecionada} 
                setCorSelecionada={setCorSelecionada} 
            />

            {/* Componente de esquema (ranhura) recebe a cor para pintar bobinas */}
            <Ranhura corSelecionada={corSelecionada} />
        </div>
    );
}
