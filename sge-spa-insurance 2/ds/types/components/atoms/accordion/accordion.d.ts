import { EventEmitter } from '../../../stencil-public-runtime';
export declare class Accordion {
  protected calculatedHeight: number;
  protected mutationObserver: MutationObserver;
  element: HTMLElement;
  /**
   * index of accordion item from top to bottom
   */
  index: number;
  /**
   * accordion item is open or opening (css transition)
   */
  openAccordion: boolean;
  /**
   * The mutation observer config to listen for content changes in the accordion item
   */
  mutationObserverConfig: {
    childList: boolean;
    subtree: boolean;
  };
  name: string;
  description: string;
  /**
   * triggered when the accordion item is opened
   */
  openEvent: EventEmitter;
  openEventHandler(event: CustomEvent): void;
  getOthersAccordions(): NodeListOf<HTMLPichinchaAccordionElement>;
  /**
   * triggered when the content of the accordion item changes
   */
  contentChanged: EventEmitter;
  componentWillLoad(): void;
  /**
   * close the accordion item
   */
  closeItem(): void;
  /**
   * open the accordion item
   */
  openItem(): Promise<void>;
  toggle(): void;
  handleKeyUp(e: KeyboardEvent): void;
  render(): any;
}
