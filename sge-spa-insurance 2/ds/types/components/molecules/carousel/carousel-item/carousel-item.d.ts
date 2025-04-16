import { HTMLStencilElement } from '../../../../stencil-public-runtime';
export declare class CarouselItem {
  isActive: boolean;
  notContent: boolean;
  hostElement: HTMLStencilElement;
  private getClassItem;
  getChildrenLength(hostElement: HTMLStencilElement): number;
  componentWillLoad(): void;
  render(): any;
}
