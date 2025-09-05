'use client';

import { useEffect, useRef, useMemo, useState } from "react";
import "@/app/globals.css";

export default function Ranhura({ corSelecionada, quantidadeRanhuras = 24 }) {
    const corRef = useRef(corSelecionada);
    const alturasPorDistanciaRef = useRef(new Map());
    const containerRef = useRef(null);
    const [gapCalculado, setGapCalculado] = useState(0);
    const [tamanhoRanhura, setTamanhoRanhura] = useState({ width: 2, height: 24 });

    useEffect(() => {
        corRef.current = corSelecionada;
    }, [corSelecionada]);

    const ranhurasArray = useMemo(() => [...Array(quantidadeRanhuras)], [quantidadeRanhuras]);

    // Calcula o gap e tamanho das ranhuras dinamicamente
    useEffect(() => {
        const calcularGapETamanho = () => {
            if (!containerRef.current) return;
            const larguraTotal = containerRef.current.offsetWidth;
            const gap = Math.max(4, Math.min(54, larguraTotal / quantidadeRanhuras - 15));
            setGapCalculado(gap);

            const larguraRanhura = Math.min(4, larguraTotal / quantidadeRanhuras / 4);
            const alturaRanhura = Math.max(12, Math.min(36, larguraTotal / quantidadeRanhuras));
            setTamanhoRanhura({ width: larguraRanhura, height: alturaRanhura });
        };
        calcularGapETamanho();
        window.addEventListener("resize", calcularGapETamanho);
        return () => window.removeEventListener("resize", calcularGapETamanho);
    }, [quantidadeRanhuras]);

    useEffect(() => {
        let pontoSuperior = null;
        let pontoInferior = null;
        let ultimoCliqueSuperior = 0;
        let ultimoCliqueInferior = 0;

        const svg = document.getElementById('conexoes-svg');
        if (!svg) return;

        const ranhurasSuperior = Array.from(document.querySelectorAll('#ranhuras-superior .ranhura'));
        const ranhurasInferior = Array.from(document.querySelectorAll('#ranhuras-inferior .ranhura'));

        const handlersSuperior = new Map();
        const handlersInferior = new Map();

        const toSvg = (x, y) => {
            const pt = svg.createSVGPoint();
            pt.x = x;
            pt.y = y;
            const ctm = svg.getScreenCTM();
            return ctm ? pt.matrixTransform(ctm.inverse()) : { x, y };
        };

        // =================== SUPERIOR (triângulos) ===================
        const desenharTriangulo = (r1, r2) => {
            const rect1 = r1.getBoundingClientRect();
            const rect2 = r2.getBoundingClientRect();

            const p1 = toSvg(rect1.left + rect1.width / 2, rect1.top);
            const p2 = toSvg(rect2.left + rect2.width / 2, rect2.top);

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
            linha1.setAttribute('stroke-width', '4');

            const linha2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linha2.setAttribute('x1', midX);
            linha2.setAttribute('y1', peakY);
            linha2.setAttribute('x2', xFinal);
            linha2.setAttribute('y2', yBase);
            linha2.setAttribute('stroke', corRef.current);
            linha2.setAttribute('stroke-width', '4');

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
            const rect1 = r1.getBoundingClientRect();
            const rect2 = r2.getBoundingClientRect();

            const p1 = toSvg(rect1.left + rect1.width / 2, rect1.bottom);
            const p2 = toSvg(rect2.left + rect2.width / 2, rect2.bottom);

            const x1 = p1.x;
            const x2 = p2.x;
            const y1 = p1.y;
            const y2 = p2.y;

            const altura = Math.abs(y2 - y1);
            const yBase = Math.max(y1, y2) + altura;

            const grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            grupo.setAttribute("pointer-events", "visiblePainted");

            const linha1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linha1.setAttribute('x1', x1);
            linha1.setAttribute('y1', y1);
            linha1.setAttribute('x2', x1);
            linha1.setAttribute('y2', yBase);
            linha1.setAttribute('stroke', corRef.current);
            linha1.setAttribute('stroke-width', '4');

            const linha2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linha2.setAttribute('x1', x2);
            linha2.setAttribute('y1', y2);
            linha2.setAttribute('x2', x2);
            linha2.setAttribute('y2', yBase);
            linha2.setAttribute('stroke', corRef.current);
            linha2.setAttribute('stroke-width', '4');

            const linha3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linha3.setAttribute('x1', Math.min(x1, x2));
            linha3.setAttribute('y1', yBase);
            linha3.setAttribute('x2', Math.max(x1, x2));
            linha3.setAttribute('y2', yBase);
            linha3.setAttribute('stroke', corRef.current);
            linha3.setAttribute('stroke-width', '4');

            grupo.appendChild(linha1);
            grupo.appendChild(linha2);
            grupo.appendChild(linha3);

            grupo.addEventListener("click", (e) => {
                e.stopPropagation();
                mostrarPopup(e.clientX, e.clientY, grupo);
            });

            svg.appendChild(grupo);
        };

        const desenharLinhaVerticalInferior = (r1) => {
            const svgRect = svg.getBoundingClientRect();
            const rect1 = r1.getBoundingClientRect();
            const p1 = toSvg(rect1.left + rect1.width / 2, rect1.bottom);

            const x1 = p1.x;
            const y1 = p1.y;
            const y2 = svgRect.height;

            const linha = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linha.setAttribute('x1', x1);
            linha.setAttribute('y1', y1);
            linha.setAttribute('x2', x1);
            linha.setAttribute('y2', y2);
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
            if (!pontoInferior) {
                pontoInferior = ranhura;
                ranhura.classList.add('selecionada');
            } else if (pontoInferior === ranhura) {
                desenharLinhaVerticalInferior(ranhura);
                pontoInferior.classList.remove('selecionada');
                pontoInferior = null;
            } else {
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
    }, [quantidadeRanhuras]);

    const mostrarPopup = (x, y, elementoSVG) => {
        const popup = document.getElementById('popup-confirm');
        if (!popup) return;
        const container = popup.parentElement;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();

        popup.style.left = `${x - containerRect.left + 10}px`;
        popup.style.top = `${y - containerRect.top + 10}px`;
        popup.style.position = 'absolute';
        popup.style.display = 'block';
        popup.style.zIndex = 1000;

        const btnSim = document.getElementById('btn-sim');
        const btnCancelar = document.getElementById('btn-cancelar');

        if (btnSim) btnSim.onclick = () => { elementoSVG.remove(); popup.style.display = 'none'; };
        if (btnCancelar) btnCancelar.onclick = () => { popup.style.display = 'none'; };
    };

    return (
        <>
            <div id="popup-confirm" className="absolute hidden bg-white border p-4 rounded shadow z-50">
                <p>Deseja remover esta ligação?</p>
                <div className="flex gap-2 mt-2">
                    <button id="btn-sim" className="bg-red-500 text-white px-3 py-1 rounded">Sim</button>
                    <button id="btn-cancelar" className="bg-gray-300 px-3 py-1 rounded">Cancelar</button>
                </div>
            </div>

            <section className="flex justify-center items-center h-full overflow-x-auto" ref={containerRef}>
                <div className="scale-[0.50] md:scale-[0.70] 2xl:scale-[0.85] origin-center">
                    <div className="relative flex flex-col items-center justify-center h-full w-full min-h-[52rem] ml-[4rem] mt-8">
                        <svg
                            id="conexoes-svg"
                            width="100%"
                            height="100%"
                            className="absolute top-0 left-0"
                        ></svg>

                        <div
                            className="flex flex-row justify-center items-end mb-4"
                            id="ranhuras-superior"
                            style={{ gap: `${gapCalculado}px` }}
                        >
                            {ranhurasArray.map((_, index) => (
                                <div
                                    key={index}
                                    className="ranhura relative cursor-pointer bg-black"
                                    style={{ width: `${tamanhoRanhura.width}px`, height: `${tamanhoRanhura.height}px` }}
                                ></div>
                            ))}
                        </div>

                        <div className="flex justify-center" style={{ gap: `${gapCalculado}px` }}>
                            {ranhurasArray.map((_, index) => (
                                <div key={index} className="w-[4px] text-center text-xs md:text-base -translate-x-[5px]">
                                    {index + 1}
                                </div>
                            ))}
                        </div>

                        <div
                            className="flex flex-row justify-center items-end mt-4"
                            id="ranhuras-inferior"
                            style={{ gap: `${gapCalculado}px` }}
                        >
                            {ranhurasArray.map((_, index) => (
                                <div
                                    key={index}
                                    className="ranhura relative cursor-pointer bg-black"
                                    style={{ width: `${tamanhoRanhura.width}px`, height: `${tamanhoRanhura.height}px` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
