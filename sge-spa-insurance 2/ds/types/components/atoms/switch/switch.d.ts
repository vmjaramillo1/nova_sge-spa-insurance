import { ComponentInterface, EventEmitter } from '../../../stencil-public-runtime';
export declare class Switch implements ComponentInterface {
  private checkboxToSwitch?;
  idElement: string;
  disabled: boolean;
  value: string;
  checked: boolean;
  labelBefore: boolean;
  clickSwitch: EventEmitter;
  error: boolean;
  offLabelClick: boolean;
  constructor();
  private focusInput;
  event(e: any): void;
  private onClick;
  private onNone;
  render(): any;
}
