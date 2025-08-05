import { useState } from 'react';

export default function PassoPrincipal({ label = "Passo principal:", onChange }) {
  const [valores, setValores] = useState(['1', '', '', '', '', '']);

  const handleInputChange = (index, valor) => {
    const novosValores = [...valores];
    novosValores[index] = valor;
    setValores(novosValores);
    
    if (onChange) {
      onChange(novosValores);
    }
  };

  const handleKeyDown = (index, e) => {
    // Permitir apenas números
    if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
      e.preventDefault();
      return;
    }

    if (e.key === 'Backspace' && valores[index] === '' && index > 0) {
      // Mover para o campo anterior se estiver vazio e pressionar backspace
      e.preventDefault();
      const inputAnterior = document.getElementById(`passo-input-${index - 1}`);
      if (inputAnterior) {
        inputAnterior.focus();
      }
    } else if (e.key !== 'Backspace' && /^\d$/.test(e.key) && valores[index].length === 1 && index < 5) {
      // Se já tem 1 dígito e digitar outro, mover para o próximo campo
      setTimeout(() => {
        const proximoInput = document.getElementById(`passo-input-${index + 1}`);
        if (proximoInput) {
          proximoInput.focus();
        }
      }, 10);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-white text-sm mb-2">{label}</label>
      <div className="flex items-center bg-white rounded-lg  py-2">
        {valores.map((valor, index) => (
          <div key={index} className="flex items-center">
            <input
              id={`passo-input-${index}`}
              type="text"
              value={valor}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-6 h-6 text-center border border-gray-300 rounded mx-1 text-gray-600 text-[] focus:outline-none "
               maxLength={2}
            />
            {index < valores.length - 1 && (
              <div className="flex flex-col mx-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 