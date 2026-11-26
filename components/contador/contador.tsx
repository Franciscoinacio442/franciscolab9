'use client'

import React, { useState, useEffect } from 'react'

export default function Contador() {
  const [contador, setContador] = useState<number>(0)
  const [historico, setHistorico] = useState<number[]>([0])
  const [carregado, setCarregado] = useState<boolean>(false)

  useEffect(() => {
    const valorGuardado = localStorage.getItem('contador')
    const historicoGuardado = localStorage.getItem('historicoContador')

    if (valorGuardado !== null) {
      setContador(Number(valorGuardado))
    }
    if (historicoGuardado !== null) {
      setHistorico(JSON.parse(historicoGuardado))
    }
    setCarregado(true)
  }, [])

  useEffect(() => {
    if (carregado) {
      localStorage.setItem('contador', String(contador))
      localStorage.setItem('historicoContador', JSON.stringify(historico))
    }
  }, [contador, historico, carregado])

  function atualizarValor(novoValor: number) {
    if (novoValor >= 0 && novoValor <= 10) {
      setContador(novoValor)
      setHistorico((prev) => [...prev, novoValor])
    }
  }

  function resetar() {
    setContador(0)
    setHistorico([0])
  }

  let corTexto = 'text-green-600'
  if (contador >= 0 && contador <= 3) {
    corTexto = 'text-red-600'
  } else if (contador >= 4 && contador <= 7) {
    corTexto = 'text-yellow-500'
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Contador</h2>

      <p className={`text-5xl font-extrabold ${corTexto}`}>
        {contador}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => atualizarValor(contador - 1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Decrementar
        </button>

        <button
          onClick={resetar}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Reset
        </button>

        <button
          onClick={() => atualizarValor(contador + 1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Incrementar
        </button>
      </div>

      <div className="w-full max-w-xs bg-white p-4 rounded-xl shadow mt-2">
        <h3 className="font-semibold mb-2">Histórico de valores:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {historico.map((val, i) => (
            <li key={i}>{val}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}