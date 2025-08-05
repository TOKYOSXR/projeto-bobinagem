'use client';

import { useEffect } from "react";
import "@/app/globals.css";
import Header from "@/components/header/header";
import SidebarEsquerdo from "@/components/sidebarEsquerdo";

export default function PaginaEsquemas() {
    useEffect(() => {

        let pontoInicial = null;
        const alturasPorDistancia = new Map();
        const ranhurasUsadas = new Set();
        let corAtualTriangulo = 'black';

        // Código das ranhuras superiores
        let ultimoCliqueSuperior = 0;

        document.querySelectorAll('#ranhuras-superior .w-1').forEach(ranhura => {
            ranhura.classList.add('ranhura', 'superior');
            ranhura.addEventListener('mousedown', (event) => {
                const agora = Date.now();

                // Se o clique for muito rápido após o anterior, ignora como sendo um possível duplo clique
                if (agora - ultimoCliqueSuperior < 300) {
                    ultimoCliqueSuperior = agora;
                    return;
                }

                ultimoCliqueSuperior = agora;

                // Lógica de triângulo
                if (!pontoInicial) {
                    pontoInicial = ranhura;
                    ranhura.style.backgroundColor = 'red';
                } else {
                    desenharTriangulo(pontoInicial, ranhura);
                    pontoInicial.style.backgroundColor = 'black';
                    pontoInicial = null;
                }
            });
        });

        function desenharTriangulo(r1, r2) {
            const svg = document.getElementById('conexoes-svg');
            const pos1 = r1.getBoundingClientRect();
            const pos2 = r2.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();

            const xInicio = pos1.left + pos1.width / 2 - svgRect.left;
            const xFinal = pos2.left + pos2.width / 2 - svgRect.left;

            const y1 = pos1.top - svgRect.top;
            const y2 = pos2.top - svgRect.top;
            const yBase = Math.min(y1, y2);

            const distancia = Math.abs(xFinal - xInicio);
            const distanciaArredondada = Math.round(distancia / 10) * 10;

            const alturaBase = 60;
            const fatorAltura = 0.5;
            let altura = alturasPorDistancia.get(distanciaArredondada);
            if (!altura) {
                altura = alturaBase + distanciaArredondada * fatorAltura;
                alturasPorDistancia.set(distanciaArredondada, altura);
            }

            // vertice do triângulo no meio dos dois pontos, acima dels
            const midX = (xInicio + xFinal) / 2;
            const peakY = Math.max(yBase - altura, 20);
            const grupo = document.createElementNS("http://www.w3.org/2000/svg", "g");
            grupo.setAttribute("pointer-events", "visiblePainted");

            const linha1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const linha2 = document.createElementNS("http://www.w3.org/2000/svg", "line");

            linha1.setAttribute("stroke", corAtualTriangulo);
            linha1.setAttribute("stroke-width", "3");
            linha1.setAttribute("pointer-events", "stroke");

            linha2.setAttribute("stroke", corAtualTriangulo);
            linha2.setAttribute("stroke-width", "3");
            linha2.setAttribute("pointer-events", "stroke");

            linha1.setAttribute("x1", xInicio);
            linha1.setAttribute("y1", yBase);
            linha1.setAttribute("x2", midX);
            linha1.setAttribute("y2", peakY);

            linha2.setAttribute("x1", midX);
            linha2.setAttribute("y1", peakY);
            linha2.setAttribute("x2", xFinal);
            linha2.setAttribute("y2", yBase);

            grupo.appendChild(linha1);
            grupo.appendChild(linha2);

            grupo.addEventListener("click", (e) => {
                e.stopPropagation();
                mostrarPopup(e.clientX, e.clientY, grupo);
            });

            svg.appendChild(grupo);
        }

        function mostrarPopup(x, y, elementoSVG) {
            const popup = document.getElementById("popup-confirm");
            if (!popup) return;

            popup.style.left = `${x}px`;
            popup.style.top = `${y}px`;
            popup.style.display = "block";

            const btnSim = document.getElementById("btn-sim");
            const btnCancelar = document.getElementById("btn-cancelar");

            btnSim.onclick = () => {
                elementoSVG.remove();
                popup.style.display = "none";

                if (elementoSVG._ranhura) {
                    elementoSVG._ranhura.style.backgroundColor = 'black';
                    ranhurasUsadas.delete(elementoSVG._ranhura);
                }

                if (elementoSVG._ranhura1) {
                    elementoSVG._ranhura1.style.backgroundColor = 'black';
                    ranhurasUsadas.delete(elementoSVG._ranhura1);
                }

                if (elementoSVG._ranhura2) {
                    elementoSVG._ranhura2.style.backgroundColor = 'black';
                    ranhurasUsadas.delete(elementoSVG._ranhura2);
                }

                pontoU = null;
            };

            btnCancelar.onclick = () => {
                popup.style.display = "none";
            };
        }

    }, []);

    return (
        <div className="">
            <Header />
            <SidebarEsquerdo />

            {/* Popup de confirmação */}
            <div id="popup-confirm" className="absolute hidden bg-white border p-4 rounded shadow z-50">
                <p>Deseja remover esta ligação?</p>
                <div className="flex gap-2 mt-2">
                    <button id="btn-sim" className="bg-red-500 text-white px-3 py-1 rounded">Sim</button>
                    <button id="btn-cancelar" className="bg-gray-300 px-3 py-1 rounded">Cancelar</button>
                </div>
            </div>

            <section className="flex justify-center items-center min-h-screen overflow-x-auto">
                <div className="scale-[0.50] md:scale-[0.70] 2xl:scale-[0.90] origin-center">
                    <div className="relative flex flex-col items-center justify-center h-full w-full min-h-[350px]">
                        {/* SVG para conexões */}
                        <div className="scale-[0.50] md:scale-[0.70] 2xl:scale-[0.80] origin-center">
                            <div className="relative flex flex-col items-center justify-center h-full w-full">
                                <svg
                                    id="conexoes-svg"
                                    width="1000"
                                    height="350"
                                    className="absolute top-0 left-0 pointer-events-none"
                                ></svg>

                                {/* Ranhuras Superiores */}
                                <div className="flex flex-row justify-center items-end gap-[32px] md:gap-[54px] mb-4" id="ranhuras-superior">
                                    <div className="w-1 h-6 md:h-9 bg-black relative cursor-pointer"></div>
                                    {[...Array(23)].map((_, index) => (
                                        <div key={index} className="w-1 h-6 md:h-9 bg-black relative cursor-pointer"></div>
                                    ))}
                                </div>

                                {/* Numeração */}
                                <div className="flex justify-center gap-[34px] md:gap-[56px] mb-5">
                                    {[...Array(24)].map((_, index) => (
                                        <div key={index} className="w-[2px] text-center text-xs md:text-base -translate-x-[5px]">
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>

                                {/* Ranhuras Inferiores */}
                                <div className="flex flex-row justify-center items-end gap-[32px] md:gap-[54px]" id="ranhuras-inferior">
                                    <div className="w-1 h-6 md:h-9 bg-black relative cursor-pointer"></div>
                                    {[...Array(23)].map((_, index) => (
                                        <div key={index} className="w-1 h-6 md:h-9 bg-black relative cursor-pointer"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}