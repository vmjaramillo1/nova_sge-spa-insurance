import { ComponentInterface, EventEmitter } from '../../../stencil-public-runtime';
export declare class ErrorReloadWebview implements ComponentInterface {
  /**
   * Id of the element
   */
  idElement: string;
  /**
   * Text link in the component
   */
  reloadText: string;
  /**
   * Description in the component
   */
  description: string;
  /**
   * Event emitted when the icon or the text link are clicked
   */
  ireload: EventEmitter;
  ariaHidden: string | undefined;
  onPressHandler(event: any): void;
  render(): any;
}
