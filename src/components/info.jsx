"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Info({ classEdit, totalInfo, nomeConteudo1, nomeConteudo2, paginaAluno, imagemCopiar }) {
    const router = useRouter();
    let handleClickAluno
    if (paginaAluno) {
        handleClickAluno = () => {
            router.push("/paginaProfessor/turma/aluno")
        };
    }

    const infoArray = Array.from({ length: totalInfo }, (_, i) => i);

    return (
        <>
            <div className=' max-h-[35rem] overflow-auto'>
                {infoArray.map((info) => (
                    <div
                        key={info}
                        className="flex items-center w-full mt-2">
                        <div className="flex justify-between items-center bg-[#4E4E4E]/18 w-full rounded-lg px-3 py-2">
                            <div className='flex flex-col'>
                                <div>
                                    <button
                                        onClick={handleClickAluno}
                                        className={`${classEdit} text-lg text-[#626262] font-bold`}>{nomeConteudo1}
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={handleClickAluno}
                                        className={`${classEdit} text-sm text-[#626262]`}>{nomeConteudo2}
                                    </button>
                                </div>
                            </div>
                            {imagemCopiar && (
                                <Image
                                    className='max-h-8 cursor-pointer'
                                    src="/copiar.png"
                                    alt="Lupa"
                                    width={32}
                                    height={32}
                                />
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}
