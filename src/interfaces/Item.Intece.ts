interface Bodega {
  nombre: string;
  sucursal: number;
  _id: string;
}

export interface createItem {
  _id: string;
  nombre: string;
  descripcion: string;
  placa: string;
  serial: string;
  estado: 'Nuevo' | 'Bueno' | 'Malo' | 'DeBaja';
  company: string;
}

export interface Item {
  _id: string;
  nombre: string;
  descripcion: string;
  placa: string;
  serial: string;
  estado: string;
  createdAt: string;
  updatedAt: string;
  bodega?: Bodega | "No Asignado";
}

export type ItemWithBodega = Item[];