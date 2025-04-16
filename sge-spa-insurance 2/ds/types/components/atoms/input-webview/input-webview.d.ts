import { ComponentInterface, EventEmitter } from '../../../stencil-public-runtime';
import { HTMLStencilElement } from '../../../stencil-public-runtime';
import { Colors } from '../../../global/interfaces';
import { InputMask } from 'imask';
export declare class InputWebview implements ComponentInterface {
  idElement: string;
  nameElement: string;
  type: string;
  hidePasswordText: string;
  showPasswordText: string;
  showPasswordToggle: boolean;
  label: string;
  placeholder: string;
  normalHelper: string;
  errorHelper: string;
  value: string;
  state: 'normal' | 'disabled' | 'success' | 'error';
  fullWidth: boolean;
  maxLength: number;
  filterRegex: string;
  tabIndexElement: number;
  showMaxLength: boolean;
  controlEvent: boolean;
  autofocus: boolean;
  floatingLabel: boolean;
  private isFilled;
  tooltip: string;
  showTooltipOnChange: boolean;
  hideNumberHandles: boolean;
  autoComplete: boolean;
  class: string;
  inputmode: string;
  pattern: string;
  inlineStyles: {
    [key: string]: string;
  };
  ifocus: EventEmitter;
  ikeydown: EventEmitter;
  ikeypress: EventEmitter;
  ichange: EventEmitter;
  ikeyup: EventEmitter;
  iblur: EventEmitter;
  iPaste: EventEmitter;
  passwordToggleMouseDown: EventEmitter;
  passwordToggleMouseUp: EventEmitter;
  passwordToggleMouseLeave: EventEmitter;
  passwordToggleTouchEnd: EventEmitter;
  passwordToggleTouchCancel: EventEmitter;
  eventValue: EventEmitter;
  /**
   * Event emmitted with unmasked value and input mask config
   */
  imaskedValueChange: EventEmitter;
  showInputAsText: boolean;
  showTooltipManually: boolean;
  isActive: boolean;
  valueTemp: any;
  caretTemp: any;
  hostElement: HTMLStencilElement;
  /**
   * Input mask configuration example
   * {
   *  mask: "00/00",
   *  min: 0,
   *  max: 0,
   * }
   *
   * The definitions that be used are:
   * 0 - any digit
   * a - any letter
   * * - any char
   * [] - make input optional
   * {} - include fixed part in unmasked value
   * ` - prevent symbols shif back
   *
   * Patterns example:
   * mask: +{7}(000)000-00-00 => value: +7(333)333-33-33
   * mask: 00/00 => value: 10/22
   */
  maskOptions: any;
  textInput: HTMLInputElement;
  inputMasked: InputMask<any>;
  /**
   * Screen reader label
   */
  ariaLabel: any;
  /**
   * Screen reader role description
   */
  ariaRoleDescription: any;
  /**
   * Lost focus to hide soft keyboard in mobile browsers
   */
  blurOnEnter: boolean;
  autoCloseHandler(newValue: any): void;
  handleEvent(e: any, emitter: EventEmitter): void;
  private onHidePasswordBtn;
  private onUncontrolledChangeEvent;
  private isEmpty;
  private onControlledChangeEvent;
  private onBlurEvent;
  private onKeyPressEvent;
  private onKeyUpEvent;
  private handleFilterRegex;
  private shouldRenderHidePasswordBtn;
  get inputType(): string;
  get labelColor(): Colors;
  private onIsFLoatingLabel;
  private shouldRenderWrapperHelper;
  componentWillRender(): void | Promise<void>;
  render(): any;
}
