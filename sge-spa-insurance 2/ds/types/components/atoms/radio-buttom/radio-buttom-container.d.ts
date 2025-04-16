import { EventEmitter } from '../../../stencil-public-runtime';
export declare class Tab {
  nameRadio: string;
  checked: string;
  selectRadio: EventEmitter;
  element: any;
  handleClick(e: any): void;
  render(): any;
  getHeadings: () => any;
}
