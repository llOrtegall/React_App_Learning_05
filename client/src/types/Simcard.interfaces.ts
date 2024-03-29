interface Bodega {
  nombre: string
  sucursal: number
  _id: string
}

export interface SimcardNoBodega {
  _id: string
  numero: string
  operador: string
  estado: string
  serial: string
  apn: string
  user: string
  pass: string
  createdAt: string
  updatedAt: string
}

export interface SimcardWithBodega {
  _id: string
  numero: string
  operador: string
  estado: string
  serial: string
  apn: string
  user: string
  pass: string
  createdAt: string
  updatedAt: string
  bodega?: Bodega | 'No Asignado'
}

export type SimcardsArray = SimcardWithBodega[]

export interface BodegaWithSims {
  _id: string
  nombre: string
  direccion: string
  sucursal: number
  items: string[]
  simcards: SimcardNoBodega[]
  updatedAt: string
}
