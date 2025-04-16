import { EventEmitter } from '../../../stencil-public-runtime';
export declare class Feedback {
  clickButton: EventEmitter;
  img: string;
  title: string;
  showButton: boolean;
  private handleClickOnButton;
  render(): any;
}
