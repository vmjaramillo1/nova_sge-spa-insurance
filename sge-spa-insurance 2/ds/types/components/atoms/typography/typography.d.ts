import { ComponentInterface } from '../../../stencil-public-runtime';
import { AllColorType } from '../../../global/constants/colors-constants';
import { Colors, VariantText } from '../../../global/interfaces';
export declare class Typography implements ComponentInterface {
  /**
   * Deprecated
   */
  variant: VariantText;
  color?: AllColorType | Colors;
  /**
   * Deprecated
   */
  inline_styles?: object;
  /**
   * Deprecated
   */
  weight?: 'normal' | 'bold';
  /**
   * Deprecated
   */
  weight_color?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  category?: 'heading' | 'paragraphs' | 'amounts' | 'actions';
  subCategory?: 'hero' | 'h1' | 'h2' | 'h3' | 'title' | 'subtitle' | 'body' | 'caption' | 'legal' | 'primary' | 'seconday' | 'buttons';
  weightCategory?: 'book' | 'book-slab' | 'semi-bold' | 'bold' | 'semi-bold-slab' | 'underline' | 'medium' | 'small' | 'default';
  varsColor: string[];
  private renderTag;
  getColorOfList(color: string): string;
  private getTextElement;
  getText(): any;
  render(): JSX.Element;
}
