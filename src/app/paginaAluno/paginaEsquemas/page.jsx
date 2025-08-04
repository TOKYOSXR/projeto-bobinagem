'use client';

import { useEffect } from "react";
import "@/app/globals.css";
import Header from "@/components/header/header";
import SidebarEsquerdo from "@/components/sidebarEsquerdo";

export default function PaginaEsquemas() {
    useEffect(() => {

        let pontoInicial = null;
        let pontoBaseInferior = null;
        const triangulos = [];
        const ranhurasBloqueadas = new Set();
        const alturasPorDistancia = new Map();
        let pontoU = null;
        const ranhurasUsadas = new Set();
        const tempoClique = 250;
        let timeoutClick = null;
        let contadorU = 0;
        let corAtualTriangulo = 'black';

        // Código das ranhuras inferiores
        document.querySelectorAll('#ranhuras-inferior .w-1').forEach(ranhura => {
            ranhura.classList.add('ranhura', 'inferior');
            ranhura.addEventListener('click', (event) => {
                if (ranhurasUsadas.has(ranhura)) return;
                clearTimeout(timeoutClick);
                timeoutClick = setTimeout(() => {
                    const svg = document.getElementById('conexoes-svg');
                    const pos = ranhura.getBoundingClientRect();
                    const svgRect = svg.getBoundingClientRect();
                    const x = pos.left + pos.width / 2 - svgRect.left;
                    const y = pos.top - svgRect.top;

                    if (!pontoU) {
                        pontoU = { ran: ranhura, x, y };
                        ranhura.style.backgroundColor = 'red';
                    } else {
                        const x1 = pontoU.x;
                        const x2 = x;
                        const y1 = pontoU.y;
                        const y2 = y;
                        const baseInferior = Math.max(y1, y2);
                        contadorU++;
                        const incrementoAltura = 20;
                        const altura = 50 + contadorU * incrementoAltura;
                        const alturaMaximaPermitida = Math.min(y1, y2) + 320;
                        const yBase = Math.min(baseInferior + altura, alturaMaximaPermitida);

                        const grupoU = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                        grupoU.setAttribute("pointer-events", "visiblePainted");

                        const criarLinha = (x1, y1, x2, y2) => {
                            const linha = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                            linha.setAttribute('x1', x1);
                            linha.setAttribute('y1', y1);
                            linha.setAttribute('x2', x2);
                            linha.setAttribute('y2', y2);
                            linha.setAttribute('stroke', corAtualTriangulo);
                            linha.setAttribute('stroke-width', '3');
                            return linha;
                        };

                        grupoU.appendChild(criarLinha(x1, y1, x1, yBase));
                        grupoU.appendChild(criarLinha(x2, y2, x2, yBase));
                        grupoU.appendChild(criarLinha(Math.min(x1, x2), yBase, Math.max(x1, x2), yBase));

                        grupoU._ranhura1 = pontoU.ran;
                        grupoU._ranhura2 = ranhura;

                        grupoU.addEventListener("click", (e) => {
                            e.stopPropagation();
                            mostrarPopup(e.clientX, e.clientY, grupoU);
                        });

                        svg.appendChild(grupoU);

                        ranhurasUsadas.add(ranhura);
                        ranhurasUsadas.add(pontoU.ran);

                        ranhura.style.backgroundColor = 'gray';
                        pontoU.ran.style.backgroundColor = 'gray';
                        pontoU = null;
                    }
                }, tempoClique);
            });

            ranhura.addEventListener('dblclick', () => {
                clearTimeout(timeoutClick);
                if (ranhurasUsadas.has(ranhura)) return;
                const svg = document.getElementById('conexoes-svg');
                const pos = ranhura.getBoundingClientRect();
                const svgRect = svg.getBoundingClientRect();
                const x = pos.left + pos.width / 2 - svgRect.left;
                const y = pos.top - svgRect.top;
                const altura = 350;

                const linha = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                linha.setAttribute('x1', x);
                linha.setAttribute('y1', y);
                linha.setAttribute('x2', x);
                linha.setAttribute('y2', y + altura);
                linha.setAttribute('stroke', corAtualTriangulo);
                linha.setAttribute('stroke-width', '3');
                linha.setAttribute('pointer-events', 'visiblePainted');

                linha._ranhura = ranhura;
                linha.addEventListener("click", (e) => {
                    e.stopPropagation();
                    mostrarPopup(e.clientX, e.clientY, linha);
                });

                svg.appendChild(linha);
                ranhurasUsadas.add(ranhura);
                ranhura.style.backgroundColor = 'blue';
                if (pontoU && pontoU.ran === ranhura) {
                    pontoU = null;
                }
            });
        });

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
        <>
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

            <section className="flex justify-center items-center min-h-screen">
                <div className="relative flex flex-col items-center justify-center h-full w-full">

                    <svg
                        id="conexoes-svg"
                        width="100%"
                        height="100%"
                        className="absolute top-0 left-0 pointer-events-none"
                    ></svg>

                    {/* Ranhuras Superiores */}
                    <div className="flex flex-row justify-center items-end gap-[54px] mb-5" id="ranhuras-superior">
                        <div className="w-1 h-9 bg-black relative cursor-pointer"></div>
                        {[...Array(23)].map((_, index) => (
                            <div key={index} className="w-1 h-9 bg-black relative cursor-pointer"></div>
                        ))}
                    </div>

                    {/* Numeração */}
                    <div className="flex justify-center gap-[56px] mb-5">
                        {[...Array(24)].map((_, index) => (
                            <div key={index} className="w-[2px] text-center text-base -translate-x-[5px]">
                                {index + 1}
                            </div>
                        ))}
                    </div>

                    {/* Ranhuras Inferiores */}
                    <div className="flex flex-row justify-center items-end gap-[54px]" id="ranhuras-inferior">
                        <div className="w-1 h-9 bg-black relative cursor-pointer"></div>
                        {[...Array(23)].map((_, index) => (
                            <div key={index} className="w-1 h-9 bg-black relative cursor-pointer"></div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}