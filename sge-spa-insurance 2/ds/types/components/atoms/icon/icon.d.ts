import { Colors } from '../../../global/interfaces';
import { IconTypes } from './icon.types';
export declare class Icon {
  iconElement: HTMLElement;
  /**
   * The color of the icon
   */
  color?: Colors;
  /**
   * The weight of the icon
   */
  weight_color?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  /**
   * Inline styles for the icons container
   */
  inline_styles?: {
    [key: string]: string;
  };
  /**
   * The weight of the icon
   */
  type?: IconTypes;
  /**
   * The size of the icon
   */
  size: string;
  private varsColor;
  /**
   * @slot slotName - here goes the name of the icon
   */
  render(): any;
}
