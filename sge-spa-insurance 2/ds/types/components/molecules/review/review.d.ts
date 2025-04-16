import { HTMLStencilElement } from '../../../stencil-public-runtime';
export declare class Review {
  mainTitle?: string;
  mainComment: string;
  score?: number;
  maxScore?: number;
  reviewTitle?: string;
  reviewComment: string;
  authorName: string;
  authorLastName: string;
  authorDescription: string;
  authorSrc?: string;
  hostElement: HTMLStencilElement;
  round(value: number, step?: number, toRound?: 'ceil' | 'floor' | 'round'): number;
  convertArray(value: number): number[];
  getStars(): {
    icon: string;
    color: string;
  }[];
  getDataAvatar(): {
    type: "image" | "name";
    name: string;
    src: string;
  };
  render(): any;
}
