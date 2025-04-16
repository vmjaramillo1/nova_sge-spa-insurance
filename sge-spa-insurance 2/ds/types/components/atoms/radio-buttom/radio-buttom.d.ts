import { ComponentInterface, EventEmitter } from '../../../stencil-public-runtime';
export declare class RadioButtom implements ComponentInterface {
  /**
   * The color
   */
  idElement: string;
  nameElement: string;
  disabled: boolean;
  value: string;
  checked: boolean;
  error: boolean;
  offLabelClick: boolean;
  clickRadio: EventEmitter;
  event(e: any): void;
  private onClick;
  private onNone;
  render(): any;
}
