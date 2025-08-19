
'use client';

import "@/app/globals.css";
import SidebarEsquerdo from "@/components/sidebar/sidebarEsquerdo";
import SidebarDireito from "@/components/sidebar/sidebarDireito";
import HeaderAluno from "@/components/header/headerAluno";
import Ranhura from "@/components/esquema/ranhura";

export default function PaginaEsquemas() {

    return (
        <div className="">
            <HeaderAluno />
            <SidebarEsquerdo />
            <SidebarDireito />
            <Ranhura />
        </div>
    );
}