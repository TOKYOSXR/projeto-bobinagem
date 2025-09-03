'use client';

import { useEffect, useRef } from "react";
import "@/app/globals.css";

export default function Ranhura({ corSelecionada }) {
    const corRef = useRef(corSelecionada);
    const alturasPorDistanciaRef = useRef(new Map());

    useEffect(() => {
        corRef.current = corSelecionada;
    }, [corSelecionada]);

    useEffect(() => {
        let pontoSuperior = null;
        let pontoInferior = null;
        let ultimoCliqueSuperior = 0;
        let ultimoCliqueInferior = 0;

        const svg = document.getElementById('conexoes-svg');

        const ranhurasSuperior = Array.from(
            document.querySelectorAll('#ranhuras-superior .w-1')
        );
        const ranhurasInferior = Array.from(
            document.querySelectorAll('#ranhuras-inferior .w-1')
        );

        const handlersSuperior = new Map();
        const handlersInferior = new Map();

        const toSvg = (x, y) => {
            if (!svg) return { x, y };
            const pt = svg.createSVGPoint();
            pt.x = x;
            pt.y = y;
            const ctm = svg.getScreenCTM();
            if (!ctm) return { x, y };
            return pt.matrixTransform(ctm.inverse());
        };

        // =================== SUPERIOR (triângulos) ===================
        const desenharTriangulo = (r1, r2) => {
            if (!svg) return;

            const rect1 = r1.getBoundingClientRect();
            const rect2 = r2.getBoundingClientRect();
            const Y_SHIFT = 0;

            const p1 = toSvg(rect1.left + rect1.width / 2, rect1.top + Y_SHIFT);
            const p2 = toSvg(rect2.left + rect2.width / 2, rect2.top + Y_SHIFT);

            const xInicio = p1.x;
            const xFinal = p2.x;
            const yBase = Math.min(p1.y, p2.y);

            const distancia = Math.abs(xFinal - xInicio);
            const distanciaArredondada = Math.round(distancia / 10) * 10;

            const alturaBase = 60;
            const fatorAltura = 0.5;

            const alturasPorDistancia = alturasPorDistanciaRef.current;
            let altura = alturasPorDistancia.get(distanciaArredondada);
            if (!altura) {
                altura = alturaBase + distanciaArredondada * fatorAltura;
                alturasPorDistancia.set(distanciaArredondada, altura);
            }

            const midX = (xInicio + xFinal) / 2;
            const peakY = Math.max(yBase - altura, 20);

            const grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            grupo.setAttribute('pointer-events', 'visiblePainted');

            const linha1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linha1.setAttribute('x1', xInicio);
            linha1.setAttribute('y1', yBase);
            linha1.setAttribute('x2', midX);
            linha1.setAttribute('y2', peakY);
            linha1.setAttribute('stroke', corRef.current);
            linha1.setAttribute('stroke-width', '3');

            const linha2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linha2.setAttribute('x1', midX);
            linha2.setAttribute('y1', peakY);
            linha2.setAttribute('x2', xFinal);
            linha2.setAttribute('y2', yBase);
            linha2.setAttribute('stroke', corRef.current);
            linha2.setAttribute('stroke-width', '3');

            grupo.appendChild(linha1);
            grupo.appendChild(linha2);

            grupo.addEventListener('click', (e) => {
                e.stopPropagation();
                mostrarPopup(e.clientX, e.clientY, grupo);
            });

            svg.appendChild(grupo);
        };

        const handleMouseDownSuperior = (ranhura) => (event) => {
            const agora = Date.now();
            if (agora - ultimoCliqueSuperior < 300) {
                ultimoCliqueSuperior = agora;
                return;
            }
            ultimoCliqueSuperior = agora;

            if (!pontoSuperior) {
                pontoSuperior = ranhura;
                ranhura.classList.add('selecionada');
            } else {
                desenharTriangulo(pontoSuperior, ranhura);
                pontoSuperior.classList.remove('selecionada');
                pontoSuperior = null;
            }
        };

        ranhurasSuperior.forEach((r) => {
            r.classList.add('ranhura', 'superior');
            const h = handleMouseDownSuperior(r);
            r.addEventListener('mousedown', h);
            handlersSuperior.set(r, h);
        });

        // =================== INFERIOR (U e linha reta) ===================
        const desenharLigacaoInferior = (r1, r2) => {
            if (!svg) return;

            const rect1 = r1.getBoundingClientRect();
            const rect2 = r2.getBoundingClientRect();

            const p1 = toSvg(rect1.left + rect1.width / 2, rect1.bottom);
            const p2 = toSvg(rect2.left + rect2.width / 2, rect2.bottom);

            const x1 = p1.x;
            const x2 = p2.x;
            const y1 = p1.y;
            const y2 = p2.y;

            const yBase = svg.clientHeight;

            const grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            grupo.setAttribute("pointer-events", "visiblePainted");

            const linha1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linha1.setAttribute('x1', x1);
            linha1.setAttribute('y1', y1);
            linha1.setAttribute('x2', x1);
            linha1.setAttribute('y2', yBase);
            linha1.setAttribute('stroke', corRef.current);
            linha1.setAttribute('stroke-width', '3');

            const linha2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linha2.setAttribute('x1', x2);
            linha2.setAttribute('y1', y2);
            linha2.setAttribute('x2', x2);
            linha2.setAttribute('y2', yBase);
            linha2.setAttribute('stroke', corRef.current);
            linha2.setAttribute('stroke-width', '3');

            const linha3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linha3.setAttribute('x1', Math.min(x1, x2));
            linha3.setAttribute('y1', yBase);
            linha3.setAttribute('x2', Math.max(x1, x2));
            linha3.setAttribute('y2', yBase);
            linha3.setAttribute('stroke', corRef.current);
            linha3.setAttribute('stroke-width', '3');

            grupo.appendChild(linha1);
            grupo.appendChild(linha2);
            grupo.appendChild(linha3);

            grupo.addEventListener("click", (e) => {
                e.stopPropagation();
                mostrarPopup(e.clientX, e.clientY, grupo);
            });

            svg.appendChild(grupo);
        };

        // ============== LINHA RETA =====================
        const desenharLinhaVerticalInferior = (r1) => {
            if (!svg) return;

            // const pos = ranhura.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();

            const rect1 = r1.getBoundingClientRect();

            const p1 = toSvg(rect1.left + rect1.width / 2, rect1.bottom);

            const x1 = p1.x;
            const y1 = p1.y;

            // Define o ponto final da linha como o fundo do SV
            const yBase = toSvg(0, svgRect.height).y;
            // Garante que o ponto final (y2) seja maior que o ponto inicial (y1)
            const y2 = Math.max(y1, yBase);

            const linha = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linha.setAttribute('x1', x1);
            linha.setAttribute('y1', y1);
            linha.setAttribute('x2', x1);
            linha.setAttribute('y2', y2); // vai até o fundo do SVG
            linha.setAttribute('stroke', corRef.current);
            linha.setAttribute('stroke-width', '3');
            linha.setAttribute('pointer-events', 'visiblePainted');

            linha.addEventListener("click", (e) => {
                e.stopPropagation();
                mostrarPopup(e.clientX, e.clientY, linha);
            });

            svg.appendChild(linha);
        };



        const handleMouseDownInferior = (ranhura) => (event) => {
            const agora = Date.now();

            if (!pontoInferior) {
                // Primeiro clique
                pontoInferior = ranhura;
                ranhura.classList.add('selecionada');
            } else if (pontoInferior === ranhura) {
                // Mesmo clique: cria linha vertical
                desenharLinhaVerticalInferior(ranhura);
                pontoInferior.classList.remove('selecionada');
                pontoInferior = null;
            } else {
                // Segundo clique em ranhura diferente: cria "U"
                desenharLigacaoInferior(pontoInferior, ranhura);
                pontoInferior.classList.remove('selecionada');
                pontoInferior = null;
            }
        };


        ranhurasInferior.forEach((r) => {
            r.classList.add('ranhura', 'inferior');
            const h = handleMouseDownInferior(r);
            r.addEventListener('mousedown', h);
            handlersInferior.set(r, h);
        });

        return () => {
            ranhurasSuperior.forEach((r) => {
                const h = handlersSuperior.get(r);
                if (h) r.removeEventListener('mousedown', h);
                r.classList.remove('selecionada');
            });
            ranhurasInferior.forEach((r) => {
                const h = handlersInferior.get(r);
                if (h) r.removeEventListener('mousedown', h);
                r.classList.remove('selecionada');
            });
        };
    }, []);

    // Popup de confirmação
    const mostrarPopup = (x, y, elementoSVG) => {
        const popup = document.getElementById('popup-confirm');
        if (!popup) return;

        const container = popup.parentElement;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const left = x - containerRect.left + 10;
        const top = y - containerRect.top + 10;

        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
        popup.style.position = 'absolute';
        popup.style.display = 'block';
        popup.style.zIndex = 1000;

        const btnSim = document.getElementById('btn-sim');
        const btnCancelar = document.getElementById('btn-cancelar');

        if (btnSim) {
            btnSim.onclick = () => {
                // Remove o grupo inteiro imediatamente
                elementoSVG.remove();
                popup.style.display = 'none';
            };
        }

        if (btnCancelar) {
            btnCancelar.onclick = () => {
                popup.style.display = 'none';
            };
        }
    };

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

            <section className="flex justify-center items-center h-full overflow-x-auto">
                <div className="scale-[0.50] md:scale-[0.70] 2xl:scale-[0.85] origin-center">
                    <div className="relative flex flex-col items-center justify-center h-full w-full min-h-[52rem]">
                        {/* SVG para conexões */}
                        <svg
                            id="conexoes-svg"
                            width="100%"
                            height="100%"
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
    );
}
