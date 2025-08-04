'use client';

import { useEffect } from "react";
import "@/app/globals.css";
import Header from "@/components/header/header";
import SidebarEsquerdo from "@/components/sidebarEsquerdo";

export default function PaginaEsquemas() {
    useEffect(() => {

        let pontoInicial = null;
        const triangulos = [];
        const ranhurasBloqueadas = new Set();
        const alturasPorDistancia = new Map();
        let pontoU = null;
        const ranhurasUsadas = new Set();
        const tempoClique = 250;
        let timeoutClick = null;
        let contadorU = 0;
        let corAtualTriangulo = 'black';

        // Código das ranhuras superiores
        let ultimoCliqueSuperior = 0;
        document.querySelectorAll('#ranhuras-superior .w-1').forEach(ranhura => {
            ranhura.classList.add('ranhura', 'superior');
            ranhura.addEventListener('mousedown', (event) => {
                const agora = Date.now();
                if (agora - ultimoCliqueSuperior < 300) {
                    ultimoCliqueSuperior = agora;
                    return;
                }
                ultimoCliqueSuperior = agora;

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
            const altura = alturasPorDistancia.get(distancia) ?? (60 + distancia * 0.4);
            alturasPorDistancia.set(distancia, altura);
            const peakY = Math.max(yBase - altura, 20);
            const midX = (xInicio + xFinal) / 2;

            const grupo = document.createElementNS("http://www.w3.org/2000/svg", "g");
            grupo.setAttribute("pointer-events", "visiblePainted");

            const l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            l1.setAttribute("x1", xInicio);
            l1.setAttribute("y1", yBase);
            l1.setAttribute("x2", midX);
            l1.setAttribute("y2", peakY);
            l1.setAttribute("stroke", corAtualTriangulo);
            l1.setAttribute("stroke-width", "3");

            const l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            l2.setAttribute("x1", midX);
            l2.setAttribute("y1", peakY);
            l2.setAttribute("x2", xFinal);
            l2.setAttribute("y2", yBase);
            l2.setAttribute("stroke", corAtualTriangulo);
            l2.setAttribute("stroke-width", "3");

            grupo.appendChild(l1);
            grupo.appendChild(l2);

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
                    <div className="relative flex flex-col items-center justify-center h-full w-full">
                        <svg
                            id="conexoes-svg"
                            width="100%"
                            height="100%"
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
            </section>
        </div>
    );
}