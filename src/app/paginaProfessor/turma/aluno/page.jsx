import CardAluno from "@/components/card/aluno";
import HeaderProfessor from "@/components/header/headerProfessor";

export default function PaginaProfessor() {

  return (
    <>
      <HeaderProfessor />
      <div className="py-10 px-20">
        <div>
          <p className="text-[#02335E] text-3xl">Artur Silva</p>
        </div>
        <section>
          <div>
            <CardAluno couteudo1="Atividade 01" totalCard={8} />
          </div>
        </section>
      </div>
    </>
  );
}
