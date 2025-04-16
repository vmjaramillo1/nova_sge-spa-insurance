import { EventEmitter, ComponentInterface } from '../../../stencil-public-runtime';
import { STATE, SIZE, SelectItem } from './select.type';
export declare class Select implements ComponentInterface {
  private valueItemSelected;
  /**
   * unique element
   */
  idElement: string;
  /**
   * Sets the state
   * 'normal' by default
   */
  state: STATE;
  /**
   * Sets the size
   * 'medium' by default
   */
  size: SIZE;
  /**
   * Set placeholder
   * 'Seleccione una opción' by default
   */
  placeholder: string;
  /**
   * An array of items to be displayed
   */
  items: SelectItem[];
  open: boolean;
  clickedItem: EventEmitter;
  el: HTMLElement;
  /**
   * Change the behavior of the item list display
   */
  dropUp: boolean;
  /**
   *
   */
  label: string;
  /**
   *
   */
  normalHelper: string;
  /**
   *
   */
  errorHelper: string;
  /**
   * Called once when the component is rendered and first render occurs
   */
  componentDidLoad(): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  updateVisualItems(): void;
  /**
   * Emits selected object
   * @param selectedItem
   */
  private handleClick;
  /**
   * Set state to 'focus'
   */
  private onFocusIn;
  /**
   * Set state to 'normal'
   */
  private onFocusOut;
  /**
   * Sets a value by default if 'selected'
   */
  private selectedByDefault;
  /**
   * Updates the selected value when items are refreshed
   */
  private updateSelected;
  private handleClickHost;
  render(): any;
}
