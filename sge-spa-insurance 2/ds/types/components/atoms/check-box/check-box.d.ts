import { ComponentInterface, EventEmitter } from '../../../stencil-public-runtime';
export declare class CheckBox implements ComponentInterface {
  /**
   * The color
   */
  idElement: string;
  nameElement: string;
  disabled: boolean;
  value: string;
  checked: boolean;
  clickCheck: EventEmitter;
  error: boolean;
  offLabelClick: boolean;
  typeCheck: string;
  event(e: any): void;
  private onClick;
  private onNone;
  render(): any;
}
