import { AlignContent, AlignItems, Direction, Justify, Wrap } from '../../../global/interfaces';
import { Size } from '../../../global/utils';
export declare class GridV2 {
  align_content: AlignContent;
  align_items: AlignItems;
  container: boolean;
  direction: Direction;
  item: boolean;
  justify: Justify;
  lg: Size;
  md: Size;
  sm: Size;
  wrap: Wrap;
  xl: Size;
  xs: Size;
  isDefaultMargin: boolean;
  getClassContent(): string;
  getClassItem(): string;
  render(): any;
}
