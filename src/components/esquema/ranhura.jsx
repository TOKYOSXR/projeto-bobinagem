'use client';

import { useEffect } from "react";
import "@/app/globals.css";

export default function Ranhura() {
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

        // Função responsável por desenhar um triângulo entre duas "ranhuras"
        function desenharTriangulo(r1, r2) {
            // Obtém a referência ao SVG onde será desenhado
            const svg = document.getElementById('conexoes-svg');
            if (!svg) return;

            const toSvg = (x, y) => {
                const pt = svg.createSVGPoint();
                pt.x = x;
                pt.y = y;
                return pt.matrixTransform(svg.getScreenCTM().inverse());
            };

            const rect1 = r1.getBoundingClientRect();
            const rect2 = r2.getBoundingClientRect();

            // ajuste vertical fino (ex.: 0, -2, +2 até ficar no lugar perfeito)
            const Y_SHIFT = 0;

            // usar topo da barra em vez do bottom
            const p1 = toSvg(rect1.left + rect1.width / 2, rect1.top + Y_SHIFT);
            const p2 = toSvg(rect2.left + rect2.width / 2, rect2.top + Y_SHIFT);

            const xInicio = p1.x;
            const xFinal = p2.x;
            const yBase = Math.min(p1.y, p2.y);

            // Distância horizontal entre os dois pontos
            const distancia = Math.abs(xFinal - xInicio);

            // Arredonda a distância para "quebras" de 10px (opcional, pode ajudar na simetria)
            const distanciaArredondada = Math.round(distancia / 10) * 10;

            // Valores base para cálculo da altura do triângulo
            const alturaBase = 60;  // altura mínima
            const fatorAltura = 0.5; // fator de crescimento da altura baseado na distância

            // Cache de alturas já calculadas
            let altura = alturasPorDistancia.get(distanciaArredondada);
            if (!altura) {
                altura = alturaBase + distanciaArredondada * fatorAltura;
                alturasPorDistancia.set(distanciaArredondada, altura);
            }

            // Calcula o ponto do vértice superior (meio entre os dois X e acima da base Y)
            const midX = (xInicio + xFinal) / 2;
            const peakY = Math.max(yBase - altura, 20);

            const grupo = document.createElementNS("http://www.w3.org/2000/svg", "g");

            const linha1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            linha1.setAttribute("stroke", corAtualTriangulo);
            linha1.setAttribute("stroke-width", "3");
            linha1.setAttribute("x1", xInicio);
            linha1.setAttribute("y1", yBase);
            linha1.setAttribute("x2", midX);
            linha1.setAttribute("y2", peakY);

            const linha2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            linha2.setAttribute("stroke", corAtualTriangulo);
            linha2.setAttribute("stroke-width", "3");
            linha2.setAttribute("x1", midX);
            linha2.setAttribute("y1", peakY);
            linha2.setAttribute("x2", xFinal);
            linha2.setAttribute("y2", yBase);

            grupo.appendChild(linha1);
            grupo.appendChild(linha2);

            grupo.addEventListener("click", (e) => {
                e.stopPropagation(); // evita que clique "vaze"
                // usa clientX/clientY para posição relativa à tela
                mostrarPopup(e.clientX, e.clientY, grupo);
            });

            svg.appendChild(grupo);
        }

        // Código do popup de confirmação
        function mostrarPopup(x, y, elementoSVG) {
            const popup = document.getElementById("popup-confirm");
            if (!popup) return;

            // Referência ao container relativo
            const container = popup.parentElement;
            const containerRect = container.getBoundingClientRect();

            // Calcula posição relativa ao container
            const left = x - containerRect.left + 10; // deslocamento de 10px
            const top = y - containerRect.top + 10;

            popup.style.left = `${left}px`;
            popup.style.top = `${top}px`;
            popup.style.position = "absolute"; // garante posição relativa ao container
            popup.style.display = "block";
            popup.style.zIndex = 1000; // acima de tudo

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
            };

            btnCancelar.onclick = () => {
                popup.style.display = "none";
            };
        }

    }, []);

    return (
        <>
            {/* Popup de confirmação */}
            <div id="popup-confirm" className="absolute hidden bg-white border p-4 rounded shadow z-50">
                <p>Deseja remover esta ligação?</p>
                <div className="flex gap-2 mt-2">
                    <button id="btn-sim" className="bg-red-500 text-white px-3 py-1 rounded">Sim</button>
                    <button id="btn-cancelar" className="bg-gray-300 px-3 py-1 rounded">Cancelar</button>
                </div>
            </div>

            <section className="flex justify-center items-center min-h-screen  overflow-x-auto">
                <div className="scale-[0.50] md:scale-[0.70] 2xl:scale-[0.85] origin-center">
                    <div className="relative flex flex-col items-center justify-center h-full w-full min-h-[50rem]">
                        {/* SVG para conexões */}
                        <svg
                            id="conexoes-svg"
                            width="100%"
                            height="500"
                            className="absolute top-0 left-0"
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
        </>
    )
}