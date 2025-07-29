import Button from "@/components/button";
import HeaderProfessor from "@/components/header/headerProfessor";
import Info from "@/components/info";
import BuscaEspecifica from "@/components/pesquisa/buscaEspecifica";
import Image from "next/image";

export default function PaginaProfessor() {

  return (
    <>
      <HeaderProfessor />
      <div className="py-10 px-20 w-full">
        <div className="flex justify-between">
          <p className="text-[#02335E] text-3xl font-bold">MI-75 PSIN 2023/2 </p>
          <Image className="max-h-6"
            src="/engrenagem.png"
            alt="Configuração"
            width={24}
            height={24}
          />
        </div>
        <section className="flex items-center mt-10 gap-20 w-full">
          <div className="flex flex-col w-3xl">
            <p className="text-2xl font-medium mb-4">Alunos</p>
            <BuscaEspecifica conteudo="Procure alunos" />
            <Info totalInfo={8} nomeConteudo1="Artur Silva" nomeConteudo2="artur_silva@weg.net" paginaAluno={true} classEdit="cursor-pointer" />
          </div>

          <div className="flex flex-col w-3xl">
            <p className="text-2xl font-medium mb-4">Atividades</p>
            <BuscaEspecifica conteudo="Procure atividades" />
            <Info totalInfo={8} nomeConteudo1="Atividade 1" nomeConteudo2="Motor 6, Polos - Y" />
          </div>
        </section>
        <div className="flex justify-end mt-10 mr-36">
          <Button nome="Adicionar" />
        </div>

      </div>
    </>
  );
}
