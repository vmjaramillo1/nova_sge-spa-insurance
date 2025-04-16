export interface Header {
  id: string;
  label?: string;
  sort?: boolean;
  order?: number;
  info?: boolean;
}
export interface Column {
  headerId: string;
  primaryText: string | number;
  secundaryText?: string | number;
  avatar?: string;
}
export interface Row {
  id: string;
  columns: Column[];
  status: 'info' | 'error' | 'success' | 'warning' | 'neutral';
}
export interface Actions {
  id: string;
  label: string;
  action(row: any): void;
}
