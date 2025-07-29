'use client'

import Image from 'next/image';

export default function Info({ totalInfo, nomeConteudo1, nomeConteudo2 }) {

    const infoArray = Array.from({ length: totalInfo }, (_, i) => i);

    return (
        <>
            <div className=' max-h-[35rem] overflow-auto'>
                {infoArray.map((info) => (
                    <div className="flex items-center w-full mt-2">

                        <div key={info}
                            className="flex justify-between items-center bg-[#4E4E4E]/18 w-full rounded-lg px-3 py-2">
                            <div className='flex flex-col'>
                                <div className="text-lg text-[#626262] font-bold">
                                    <p>{nomeConteudo1}</p>
                                </div>
                                <div className="text-sm text-[#626262]">
                                    <p>{nomeConteudo2}</p>
                                </div>
                            </div>
                            <Image
                                className='max-h-8 cursor-pointer'
                                src="/copiar.png"
                                alt="Lupa"
                                width={32}
                                height={32}
                            />
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}
