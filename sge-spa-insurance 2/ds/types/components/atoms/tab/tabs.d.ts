import { TabActivateEvent } from './tab';
export declare class Tabs {
  activetab: string;
  bkg?: 'white' | 'gray';
  tabsStyle: 'default' | 'primary' | 'secondary' | 'default-gray';
  handleActiveTabChange(newValue: string): void;
  element: any;
  handleTabActivate(e: CustomEvent<TabActivateEvent>): void;
  componentWillLoad(): void;
  private get headerContainerClass();
  private get contentContainerClass();
  private get tabInlineStyle();
  componentDidLoad(): void;
  render(): any[];
  getHeadings: () => any;
  getContents: () => any;
}
