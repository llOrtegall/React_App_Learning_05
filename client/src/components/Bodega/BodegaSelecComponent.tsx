import { FilterComponentBodegas } from '../../components/ui'
import { type Bodegas } from '../../types/Bodega'

interface BodegaSelectionComponentProps {
  bodegas: Bodegas
  searchBodega: string
  setSearchBodega: React.Dispatch<React.SetStateAction<string>>
  sendBodega: string
  setSendBodega: React.Dispatch<React.SetStateAction<string>>
}

const BodegaSelectionComponent: React.FC<BodegaSelectionComponentProps> =
  ({ bodegas, searchBodega, setSearchBodega, sendBodega, setSendBodega }: BodegaSelectionComponentProps): JSX.Element => {
    return (
      <section>
        <h3 className="text-center font-semibold border-b-2 border-black pb-1">Selección De Bodega</h3>
        <div className='flex w-full justify-center py-2'>
          <FilterComponentBodegas searchBodega={searchBodega} setSearchBodega={setSearchBodega} />
        </div>
        <header className="w-full">
          <p className='flex justify-center px-4 py-2 border rounded-md font-semibold my-2 bg-green-300'>
            <span>Sucursal - Bodega</span>
          </p>
        </header>

        <select className="bg-slate-200 rounded-md shadow-lg p-2 w-full flex flex-col gap-2 mb-4"
          name="sucursal" id="sucursal" value={sendBodega} onChange={ev => { setSendBodega(ev.target.value) }}>
          <option value="">Seleccione una bodega</option>
          {
            bodegas.map(bodega => (
              <option key={bodega._id} value={bodega.sucursal} className='justify-normal'>
                {bodega.sucursal} | {bodega.nombre}
              </option>
            ))
          }
        </select>
      </section>
    )
  }

export default BodegaSelectionComponent
