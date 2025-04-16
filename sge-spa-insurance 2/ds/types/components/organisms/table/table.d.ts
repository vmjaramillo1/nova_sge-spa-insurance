import { Actions, Header, Row } from './intefaces';
export declare class Table {
  paginationSizes: number[];
  headers: Header[];
  rows: Row[];
  showRowStatus: boolean;
  sizeStart: number;
  private currentPage;
  private size;
  private pages;
  private activeRow;
  private rowsState;
  actions: Actions[];
  private showList;
  componentWillLoad(): void;
  onPaginationSizeChange: (size: number) => void;
  setActiveRow: (id: any) => void;
  onSort: (header: Header) => void;
  showSizeList: () => void;
  watchHeader(): void;
  watchRowsHandler(): void;
  private drawHeaders;
  private drawRows;
  private drawColum;
  render(): any;
}
