import { ComponentInterface, EventEmitter } from '../../../stencil-public-runtime';
export declare class AccountSelectWebview implements ComponentInterface {
  /**
   * Id of the element
   */
  idElement: string;
  /**
   * Account name. E.g. "Cta. Ahorros". Position top-left
   */
  accountName: string;
  /**
   * Account number. Position bottom-left
   */
  accountNumber: string;
  /**
   * Amount Label. E.g. "Saldo disponible". Position top-right
   */
  amountLabel: string;
  /**
   * Account number. Position bottom-right
   */
  amount: string;
  /**
   * Screen reader label
   */
  ariaLabel: string;
  /**
   * Event emmited when component is pressed
   */
  ipress: EventEmitter;
  onPressHandler(event: any): void;
  getAccountAccesibleLabel(): string;
  render(): any;
}
