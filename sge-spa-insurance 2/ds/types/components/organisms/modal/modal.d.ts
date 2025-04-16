import { EventEmitter } from '../../../stencil-public-runtime';
export declare class Modal {
  constructor();
  componentWillLoad(): void;
  idElement: string;
  size: 'sm' | 'md' | 'lg';
  borderHeader: boolean;
  primaryButtonLabel: string;
  disabledPrimaryButton: boolean;
  secondaryButtonLabel: string;
  showCloseButton: boolean;
  clickPrimaryButton: EventEmitter;
  clickSecondaryButton: EventEmitter;
  open: boolean;
  show: boolean;
  openHandler(): void;
  private autoCloseHandler;
  handleClick(e: any, emitter: EventEmitter): void;
  handleOpen(): void;
  handleClose(e: any): void;
  handleEscape: (e: KeyboardEvent) => void;
  render(): any;
}
