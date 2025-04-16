import { ComponentInterface, EventEmitter } from '../../../stencil-public-runtime';
import { Colors, VariantText } from '../../../global/interfaces';
export declare class Link implements ComponentInterface {
  /**
   * The color
   */
  idElement: string;
  href: string;
  display: string;
  disabled: boolean;
  target: string;
  inline_styles?: object;
  variant: VariantText;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  weight?: 'normal' | 'bold';
  color?: Colors;
  clicklink: EventEmitter;
  touchStartLink: EventEmitter;
  event(e: any): void;
  private get linkElementClass();
  render(): any;
}
