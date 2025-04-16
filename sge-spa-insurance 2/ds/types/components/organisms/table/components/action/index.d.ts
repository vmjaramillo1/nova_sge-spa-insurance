import { Actions, Row } from '../../intefaces';
export declare class Action {
  actionContainers: HTMLDivElement;
  showActions: boolean;
  status: string;
  actions: Actions[];
  row: Row;
  indexRow: number;
  lastRow: number;
  checkForClickOutside(ev: any): void;
  showMoraActions: () => void;
  render(): any;
}
