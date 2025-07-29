'use client'

import { useState } from 'react';
import Image from 'next/image';

export default function BuscaEspecifica({ conteudo }) {
    const [conteudos, setConteudo] = useState('');

    return (
        <div className="flex items-center w-full mb-8">
            <div className="flex items-center gap-4 bg-[#4E4E4E]/18 rounded-lg w-full">
                <div className="p-3 rounded-tl-lg rounded-bl-lg">
                    <Image
                        src="/pesquisa/search.png"
                        alt="Lupa"
                        width={20}
                        height={20}
                    />
                </div>
                <input
                    type="text"
                    className="text-xl w-full focus:outline-none focus:ring-0"
                    placeholder={conteudo}
                    value={conteudos}
                    onChange={(e) => setConteudo(e.target.value)}
                />
            </div>
        </div>
    );
}
