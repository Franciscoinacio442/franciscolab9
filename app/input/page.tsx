'use client'

import React, { useState } from 'react'

interface Tarefa {
  id: number
  texto: string
  categoria: string
}

export default function InputPage() {
  const [texto, setTexto] = useState<string>('')
  const [categoria, setCategoria] = useState<string>('React.js')
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [idEdicao, setIdEdicao] = useState<number | null>(null)
  const [textoEdicao, setTextoEdicao] = useState<string>('')

  const categorias = [
    'HTML',
    'CSS',
    'Tailwind CSS',
    'JavaScript',
    'TypeScript',
    'React.js',
    'Next.js'
  ]

  function adicionarTarefa() {
    if (texto.trim() === '') return

    const novaTarefa: Tarefa = {
      id: Date.now(),
      texto: texto,
      categoria: categoria
    }

    setTarefas([...tarefas, novaTarefa])
    setTexto('')
  }

  function apagarTarefa(id: number) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id))
  }

  function iniciarEdicao(tarefa: Tarefa) {
    setIdEdicao(tarefa.id)
    setTextoEdicao(tarefa.texto)
  }

  function guardarEdicao(id: number) {
    if (textoEdicao.trim() === '') return

    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, texto: textoEdicao } : tarefa
      )
    )
    setIdEdicao(null)
    setTextoEdicao('')
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-center">Input & Lista de Tarefas</h2>

      <div className="flex flex-col gap-3 bg-white p-4 rounded-xl shadow">
        <label className="font-semibold text-sm">Texto / Nova Tarefa:</label>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escreve algo aqui..."
          className="border border-gray-300 rounded-lg px-3 py-2"
        />

        <p className="text-sm text-gray-600">
          Texto digitado: <span className="font-medium text-black">{texto}</span>
        </p>

        <label className="font-semibold text-sm mt-2">Categoria / Tecnologia:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
        >
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={adicionarTarefa}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Inserir Tarefa
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-3">Lista de Tarefas:</h3>

        {tarefas.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhuma tarefa inserida.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {tarefas.map((tarefa) => (
              <li
                key={tarefa.id}
                className="flex items-center justify-between gap-2 border border-gray-200 p-2 rounded-lg"
              >
                {idEdicao === tarefa.id ? (
                  <div className="flex flex-1 gap-2">
                    <input
                      type="text"
                      value={textoEdicao}
                      onChange={(e) => setTextoEdicao(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => guardarEdicao(tarefa.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-sm">
                      <span className="font-medium">{tarefa.texto}</span>{' '}
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        {tarefa.categoria}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => iniciarEdicao(tarefa)}
                        className="px-3 py-1 bg-white border border-gray-300 text-sm rounded hover:bg-gray-100"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => apagarTarefa(tarefa.id)}
                        className="px-3 py-1 bg-white border border-gray-300 text-sm rounded hover:bg-gray-100"
                      >
                        Apagar
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}