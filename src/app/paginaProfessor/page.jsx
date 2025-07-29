import CardTurma from "@/components/card/turma";
import HeaderProfessor from "@/components/header/headerProfessor";

export default function PaginaProfessor() {

  return (
    <>
      <HeaderProfessor />
      <div className="py-10 px-20">
        <div>
          <p className="text-[#02335E] text-3xl">Seja bem-vindo Professor X!</p>
        </div>
        <section>
          <div>
            <CardTurma totalCard={8} />
          </div>
        </section>
      </div>
    </>
  );
}
