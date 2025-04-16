/// <reference types="node" />
import { HTMLStencilElement } from '../../../stencil-public-runtime';
export declare class Carousel {
  timeAutoPlay?: number;
  currentComponent: number;
  lenghtComponent: number;
  hostElement: HTMLStencilElement;
  initPosition: number;
  diffX: number;
  timer: NodeJS.Timeout;
  modifyContentStyles(activeContent: number): void;
  handleClickOnButton: (move: 'left' | 'right' | 'current', stepsToMove?: number) => void;
  touchstartListener: (ev: TouchEvent) => void;
  touchendListener: () => void;
  touchmoveListener: (ev: TouchEvent) => void;
  openListeners(hostElement: HTMLStencilElement): void;
  closeListeners(hostElement: HTMLStencilElement): void;
  detectAutoPlayStep: () => void;
  activateTimerItems(time: number): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  private getClassItemNav;
  getArgOfClickNav(index: number): {
    direction: "left" | "right" | "current";
    steps: number;
  };
  render(): any;
}
