import { ComponentInterface } from '../../../stencil-public-runtime';
export declare class FeedbackWebview implements ComponentInterface {
  /**
   * Id of the element
   */
  idElement: string;
  /**
   * Title of the component
   */
  subtitle: string;
  /**
   * Description of the component
   */
  description: string;
  /**
   * State of the feedback. It changes the icon that is displayed
   */
  state: 'error' | 'warning' | 'success' | 'info';
  /**
   * Type of feedback. Can be Title or Subtitle
   */
  variant: 'subtitle' | 'title';
  /**
   * Screen reader label
   */
  ariaLabel: string;
  getIconSize(): "32px" | "36px";
  renderIcon(): any;
  renderTitle(): any;
  renderDescription(): any;
  render(): any;
}
