import { ComponentInterface, EventEmitter } from '../../../stencil-public-runtime';
export declare class HeaderWebview implements ComponentInterface {
  /**
   * Title in the header
   */
  textTitle: string;
  /**
   * Hide from screen reader the header
   */
  accesibilityHidden: string;
  /**
   * Title read by screen reader
   */
  ariaTitle: string | undefined;
  showBreadcrumb: boolean;
  /**
   * Event emitted when header button is pressed
   */
  backButtonPress: EventEmitter;
  onPress(event: Event): void;
  private getScreenReaderTitle;
  renderTitle(): any;
  getBreadcrumbClasses(): string;
  render(): any;
}
