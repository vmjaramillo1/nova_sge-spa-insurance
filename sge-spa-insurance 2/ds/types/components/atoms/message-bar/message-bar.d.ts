import { EventEmitter } from '../../../stencil-public-runtime';
export declare class MessageBar {
  constructor();
  private timeout;
  componentDidLoad(): void;
  disconnectedCallback(): void;
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
   * Autoclose the message-bar after x milliseconds
   */
  autoClose?: number;
  /**
   * Show icon to close
   */
  allowClose?: boolean;
  /**
   * Variant color
   */
  variant?: 'light' | 'normal';
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
  icon: string;
  private autoCloseHandler;
  closeMessage: EventEmitter;
  private closeMessageHandler;
  private icons;
  render(): any;
}
