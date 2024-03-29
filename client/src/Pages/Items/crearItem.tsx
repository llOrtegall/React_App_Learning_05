import { MessageDisplay } from '../../components/ui/MessagesDisplay'
import { Button, Input, Label, Loading } from '../../components/ui'
import { createItem } from '../../services/Item.services'
import { type newItem } from '../../types/Item'
import { useAuth } from '../../Auth/AuthContext'
import { useState } from 'react'

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

export function CrearItems (): JSX.Element {
  const { user } = useAuth()
  const company = user.empresa
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const initialItem: newItem = {
    nombre: '',
    descripcion: '',
    placa: '',
    serial: '',
    estado: 'Bueno',
    company
  }

  const [item, setItem] = useState<newItem>(initialItem)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    setLoading(true)
    void createItem(item)
      .then(res => {
        setLoading(false)
        setMessage(res.message)
        setItem(initialItem)
        setTimeout(() => { setMessage('') }, 5000)
      })
      .catch(err => {
        setError(err.response.data.error as string)
        setTimeout(() => { setError('') }, 5000)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <main className="flex flex-col items-center text-2xl">
      <h2 className='bg-blue-800 border dark:border-dark-tremor-brand-subtle text-white text-3xl py-4 w-full text-center font-semibold mb-20'>Creación Activos / Insumos </h2>

      <form className="grid grid-cols-3 gap-2 rounded-lg place-items-center mb-20 bg-slate-200 dark:bg-dark-tremor-brand-muted dark:text-white px-20 py-12"
        onSubmit={handleSubmit}>

        <div className="w-full flex flex-col py-2 gap-2">
          <Label>Nombre: </Label>
          <select name="nombre" id="item"
            onChange={handleChange} value={item.nombre}
            className='text-black border rounded-md p-2 border-gray-300'>
            <option value="">Selecciona un item</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="w-full flex flex-col py-2 gap-2">
          <Label>Descripción | Marca</Label>
          <Input type="text" name="descripcion"
            value={item.descripcion} onChange={handleChange} placeholder="Genius - Teclado Gamer ..." />
        </div>

        <div className="w-full flex flex-col py-2 gap-2">
          <Label>Placa</Label>
          <Input type="text" name="placa"
            value={item.placa} onChange={handleChange}
            placeholder="MI-0001 / MA-0002 ..."
            required />
        </div>

        <div className="w-full flex flex-col py-2 gap-2">
          <Label>Serial</Label>
          <Input type="text" name="serial"
            value={item.serial} onChange={handleChange}
            placeholder="XFGRTWE675 / SN:JSURY6373 ..."
            required />
        </div>

        <div className="w-full flex flex-col py-2 gap-2">
          <Label>Estado</Label>
          <select name="estado" value={item.estado} onChange={handleChange} className="text-black px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Selecciona un estado</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Bueno">Bueno</option>
            <option value="Malo">Malo</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <Button>Crear Item</Button>
      </form>

      {loading && (<section>
        <Loading>Creando Item ...</Loading>
      </section>)}
      <MessageDisplay message={message} error={error} />
    </main>
  )
}
