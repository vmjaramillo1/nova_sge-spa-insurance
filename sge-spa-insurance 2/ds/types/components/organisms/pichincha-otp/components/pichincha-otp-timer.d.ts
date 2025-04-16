import { ComponentInterface, EventEmitter } from '../../../../stencil-public-runtime';
export declare class PichinchaOtpTimer implements ComponentInterface {
  timer: number;
  status: 'normal' | 'error';
  errorCode: '1' | '2' | '';
  stateResend: 'loading' | 'success' | 'error' | '';
  timerText: string;
  textResendCode: string;
  textCodeSent: string;
  textResendingCode: string;
  clickResendCode: EventEmitter;
  componentOtp: any;
  showErrorMsg: boolean;
  showSuccessMsg: boolean;
  updateError(status: string): Promise<void>;
  updateStateResend(state: string): Promise<void>;
  transformCounter(counter: number): string;
  event(e: any): void;
  renderResendCode(): any;
  renderTimer(): any;
  render(): any;
}
