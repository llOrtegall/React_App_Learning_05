import { getItem, sendUpdateItem } from '../../services/Item.services'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, MessageDisplay } from '../../components/ui'
import { type updateItem } from '../../types/Item'
import { useAuth } from '../../Auth/AuthContext'
import { useEffect, useState } from 'react'

const options = [
  { value: 'Impresora TMU USB/LPT', label: 'Impresora TMU | USB' },
  { value: 'Impresora Termica', label: 'Impresora Termica USB' },
  { value: 'Monitor / Pantalla', label: 'Monitor' },
  { value: 'Torre', label: 'Torre' },
  { value: 'Teclado', label: 'Teclado' },
  { value: 'Mouse / Raton', label: 'Mouse' },
  { value: 'Cámara', label: 'Cámara' },
  { value: 'Proyector', label: 'Proyector' },
  { value: 'PDA V1', label: 'PDA V1' },
  { value: 'PDA V2', label: 'PDA V2' },
  { value: 'CS10', label: 'CS10' },
  { value: 'NVR', label: 'NVR' },
  { value: 'Portátil', label: 'Portátil' },
  { value: 'Lector De Barras', label: 'Lector De Barras' },
  { value: 'Lector De Biometríco', label: 'Lector De Biometríco' },
  { value: 'Modem', label: 'Modem' },
  { value: 'UPS', label: 'UPS' },
  { value: 'Switch', label: 'Switch' },
  { value: 'Router', label: 'Router' },
  { value: 'Batería', label: 'Batería' },
  { value: 'Inversor', label: 'Inversor' },
  { value: 'Televisor', label: 'Televisor' },
  { value: 'Proyector', label: 'Proyector' },
  { value: 'Telefono Fijo', label: 'Telefono Fijo' },
  { value: 'Telefono Celular', label: 'Telefono Celular' },
  { value: 'Silla', label: 'Silla' }
]

export function DetalleItem (): JSX.Element {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { id } = useLocation().state as { id: string }
  const navigate = useNavigate()
  const { user } = useAuth()
  const company = user.empresa

  const initialItem: updateItem = {
    _id: '',
    nombre: '',
    descripcion: '',
    placa: '',
    serial: '',
    estado: 'Bueno',
    company
  }

  const [item, setItem] = useState<updateItem>(initialItem)

  useEffect(() => {
    getItem(company, id)
      .then(res => { setItem(res) })
      .catch(err => {
        console.log(err)
      })
  }, [company, id])

  const handleChange = (event: { target: { name: string, value: string } }): void => {
    const { name, value } = event.target
    setItem(prevItem => ({ ...prevItem, [name]: value }))
  }

  const handleSubmit = (event: { preventDefault: () => void }): void => {
    event.preventDefault()
    const sendItem = { ...item, id: item._id, company }
    void sendUpdateItem(sendItem)
      .then(res => {
        setMessage(res.message)
        setItem(initialItem)
        setTimeout(() => { navigate('/items/verItems') }, 3000)
      })
      .catch(err => {
        setError(err.response.data.error as string)
      })
  }

  return (
    <section className='  flex flex-col p-4 w-full items-center'>
      <h1 className='text-center text-2xl font-semibold pb-8'>Detalle De Item </h1>

      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 pb-10 border p-8 rounded-md bg-blue-300 border-black mb-4'>
        <div className='flex flex-col w-96 gap-2'>
          <label className='font-semibold'>Nombre:</label>
          <select name="nombre" value={item.nombre} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Seleccionar Un Item</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label className='font-semibold'>Descripción / Marca :</label>
          <input className='p-2 rounded-md border border-gray-300'
            type="text" name="descripcion" value={item.descripcion} onChange={handleChange} />
          <label className='font-semibold'>Placa:</label>
          <input className='p-2 rounded-md border border-gray-300'
            type="text" name="placa" value={item.placa} onChange={handleChange} />
        </div>

        <div className='flex flex-col w-96 gap-2'>
          <label className='font-semibold'>Serial / N° Referencia:</label>
          <input className='p-2 rounded-md border border-gray-300'
            type="text" name="serial" value={item.serial} onChange={handleChange} />
          <label className='font-semibold'>Estado:</label>
          <select name="estado" value={item.estado} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Selecciona un estado</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Bueno">Bueno</option>
            <option value="Malo">Malo</option>
            <option value="Baja">Baja</option>
          </select>
          <label className='font-semibold'> Acciones </label>

          <Button>Actualizar</Button>

        </div>
      </form>

      <MessageDisplay message={message} error={error} />
    </section>
  )
}
