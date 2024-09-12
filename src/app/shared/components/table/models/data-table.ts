export interface ColumnInterface<T>{
  name: string,
  tableBodyType: 'text' | 'checkbox' | 'button' | 'menu',
  tableHeaderType: 'text' | 'checkbox',
  key: string,
  class?: string;
  item?: ButtonInterface[]
}

interface ButtonInterface{
  name: string;
  method: (...args: any[])=>void;
}

