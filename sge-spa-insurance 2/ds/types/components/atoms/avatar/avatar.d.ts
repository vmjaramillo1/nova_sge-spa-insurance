export declare class Avatar {
  type: 'image' | 'icon' | 'name';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  src: string;
  name: string;
  private iconSizes;
  private renderContent;
  private getInitials;
  render(): any;
}
