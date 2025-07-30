"use client"

import Button from "@/components/button";
import HeaderProfessor from "@/components/header/headerProfessor";
import Info from "@/components/info";
import BuscaEspecifica from "@/components/pesquisa/buscaEspecifica";
import Image from "next/image";
import { useState } from "react";


export default function PaginaProfessor() {

  const [engregam, setEngrenagem] = useState(true)

  const handleClick = () => {
    setEngrenagem(false)
  }

  const handleClickSair = () => {
    setEngrenagem(true)
  }

  return (
    <>
      <HeaderProfessor />
      <div className="py-10 px-20 w-full">
        <div className="flex justify-between">
          {engregam ? (
            <>
              <p className="text-[#02335E] text-3xl font-bold">MI-75 PSIN 2023/2 </p>
            </>
          ) :
            <>
              <div className="flex flex-col">
                <div className="mb-10">
                  <span className="font-semibold">Turma</span>
                  <Info totalInfo={1} nomeConteudo1="MI-75 PSIN 2023/2" classEdit="flex font-normal w-96" />
                </div>
                <div>
                  <span className="font-semibold">Curso</span>
                  <Info totalInfo={1} nomeConteudo1="MI-75 PSIN 2023/2" classEdit="flex font-normal w-96" />
                </div>
              </div>
            </>
          }
          {engregam && (
            <>
              <button
                onClick={handleClick}
              >
                <Image className="max-h-6 cursor-pointer"
                  src="/engrenagem.png"
                  alt="Configuração"
                  width={24}
                  height={24}
                />
              </button>
            </>
          )}
        </div>
        <section className="flex items-center mt-10 gap-20 w-full">
          <div className="flex flex-col w-3xl">
            <p className="text-2xl font-medium mb-4">Alunos</p>
            <BuscaEspecifica conteudo="Procure alunos" />
            <Info totalInfo={8} nomeConteudo1="Artur Silva" nomeConteudo2="artur_silva@weg.net" paginaAluno imagemCopiar classEdit="cursor-pointer" />
          </div>

          <div className="flex flex-col w-3xl">
            <p className="text-2xl font-medium mb-4">Atividades</p>
            <BuscaEspecifica conteudo="Procure atividades" />
            <Info totalInfo={8} nomeConteudo1="Atividade 1" nomeConteudo2="Motor 6, Polos - Y" />
          </div>
        </section>
        {engregam ? (
          <div className="flex justify-end mt-10">
            <Button nome="Adicionar" />
          </div>
        ) :
          <div className="flex items-center justify-between w-full mt-10">
            <div className="w-full whitespace-nowrap">
              <Button classEditar="w-60 !bg-red-800" nome="Excluir Turma" />
            </div>
            <div className="flex items-center justify-end gap-10 w-full whitespace-nowrap ">
              <Button
                onClick={handleClickSair}
                classEditar="w-60 bg-white !text-[#02335E] border !border-[#02335E]" nome="Sair sem Salvar" />
              <Button
                onClick={handleClickSair}
                classEditar="w-60" nome="Salvar Alterações" />
            </div>
          </div>
        }
      </div>
    </>
  );
}
