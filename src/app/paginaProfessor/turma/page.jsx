import CardTurma from "@/components/card/turma";
import HeaderProfessor from "@/components/header/headerProfessor";
import Image from "next/image";

export default function PaginaProfessor() {

  return (
    <>
      <HeaderProfessor />
      <div className="py-10 px-20">
        <div className="flex justify-between">
          <p className="text-[#02335E] text-3xl font-bold">MI-75 PSIN 2023/2 </p>
          <Image className="max-h-6"
            src="/engrenagem.png"
            alt="Configuração"
            width={24}
            height={24}
          />
        </div>
        <section className="flex mt-10">
          <div className="flex justify-between">
            <p className="text-2xl font-medium">Alunos</p>

          </div>

          <div className="flex justify-between">
            <p className="text-2xl font-medium">Alunos</p>

          </div>
        </section>
      </div>
    </>
  );
}
