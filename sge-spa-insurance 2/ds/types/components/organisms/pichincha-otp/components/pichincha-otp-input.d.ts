import { ComponentInterface, EventEmitter } from '../../../../stencil-public-runtime';
export declare class PichinchaOtpInput implements ComponentInterface {
  inputsOtpState: any;
  inputsRefs: any[];
  pasteElement: any[];
  componentOtp: any;
  textInput: string;
  disabled: boolean;
  boxs: number;
  clearOtp: boolean;
  status: 'normal' | 'error';
  type: string;
  fullWidth: boolean;
  private changeInput$;
  eventChangeInputOtp: EventEmitter;
  pasteInput({ detail }: {
    detail: any;
  }): void;
  onChangeClearOtp(): void;
  handleChangeInputOtp(otp: string): void;
  componentDidLoad(): void;
  private get otpInputContainerClass();
  render(): any;
}
