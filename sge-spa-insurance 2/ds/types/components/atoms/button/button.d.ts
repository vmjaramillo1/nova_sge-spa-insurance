import { ComponentInterface, EventEmitter } from '../../../stencil-public-runtime';
export declare class Button implements ComponentInterface {
  /**
   * The color
   */
  color: 'primary' | 'secondary' | 'complementary' | 'tertiary' | 'destructive';
  disabled: boolean;
  href: string;
  type: string;
  idelement: string;
  loading: boolean;
  size: 'medium' | 'small' | 'large' | 'extra-large';
  tabIndexInner: number;
  value: string;
  iconName?: string;
  iconNameRight?: string;
  iconType?: '--outlined' | '--round' | '--sharp' | '--two-tone';
  onlyIcon: boolean;
  ariaLabel: any;
  clickbutton: EventEmitter;
  event(e: any): void;
  private getColor;
  private getLabelButton;
  private getIcon;
  private getIconSize;
  render(): any;
}
