import { ComponentInterface } from '../../../stencil-public-runtime';
import { Colors, VariantWebviewsText } from '../../../global/interfaces';
export declare class TypographyWebview implements ComponentInterface {
  variant: VariantWebviewsText;
  color?: Colors;
  inline_styles?: object;
  weight?: 'book' | 'semiBold' | 'medium';
  weight_color?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  varsColor: string[];
  ariaLabel: any;
  ariaHidden: any;
  private renderTag;
  render(): JSX.Element;
}
