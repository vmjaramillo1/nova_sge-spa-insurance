import { EventEmitter } from '../../../stencil-public-runtime';
export interface TabActivateEvent {
  name: string;
}
export declare class Tab {
  name: string;
  iconName?: string;
  active: boolean;
  tabsStyle: 'default' | 'primary' | 'secondary' | 'default-gray';
  tabActivate: EventEmitter<TabActivateEvent>;
  handleClick(): void;
  private get cssClass();
  private get cssClassContent();
  private get cssClassTitle();
  private getIcon;
  render(): any;
}
