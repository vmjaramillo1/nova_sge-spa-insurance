import { EventEmitter } from '../../../stencil-public-runtime';
export declare class AlertMessage {
  private buttonSpacing;
  constructor();
  /**
   * Element id
   */
  idElement?: string;
  /**
   * Can be: 'success', 'error', 'warning' or 'info'
   * By default 'info' if not specified
   */
  status: 'success' | 'error' | 'warning' | 'info';
  /**
   * Close the alert-message after x milliseconds
   */
  closeTime?: number;
  /**
   * Show icon to close
   */
  allowClose?: boolean;
  /**
   * Position absolute
   */
  top?: number;
  /**
   * Adjust in container
   */
  adjustIn: boolean;
  /**
   * Closed by default, if it's true shows the component
   */
  open: boolean;
  /**
   * Alert will show a valid Icon
   */
  hasIcon: boolean;
  /**
   * Icon to show in message
   */
  icon?: string;
  /**
   * Alert message title string to show
   */
  alertTitle?: string;
  /**
   * Text for the Accept Button
   */
  acceptButtonText?: string;
  /**
   * Text for the Cancel Button
   */
  cancelButtonText?: string;
  closeMessage: EventEmitter;
  clickAccept: EventEmitter;
  clickCancel: EventEmitter;
  private autoCloseHandler;
  private closeMessageHandler;
  handleClick(e: any, emitter: EventEmitter): void;
  private icons;
  componentDidLoad(): void;
  render(): any;
}
