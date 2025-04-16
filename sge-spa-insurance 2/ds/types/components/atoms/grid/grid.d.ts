import { AlignContent, AlignItems, Direction, Justify, Wrap } from '../../../global/interfaces';
import { Size } from '../../../global/utils';
export declare class Grid {
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
  spacing: Size;
  getClassContent(): string;
  getClassItem(): string;
  render(): any;
}
