
import Image from 'next/image'
import tecnologias from '@/app/data/tecnologias.json'

interface Tecnologia {
  title: string
  image: string
  description: string
  rating: number
}

export default function page() {
  const listaTecnologias: Tecnologia[] = JSON.parse(JSON.stringify(tecnologias))

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-center">Tecnologias Exploradas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {listaTecnologias.map((tec, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow flex flex-col items-center text-center gap-3"
          >
            <Image
             src="/tecnologias/tech.svg"
              alt={`Logotipo de ${tec.title}`}
              width={64}
              height={64}
              className="object-contain"
            />
            <h3 className="text-lg font-semibold">{tec.title}</h3>
            <p className="text-sm text-gray-600">{tec.description}</p>
            <p className="text-sm font-medium text-amber-500">
              {'★'.repeat(tec.rating)}{'☆'.repeat(5 - tec.rating)} ({tec.rating}/5)
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}