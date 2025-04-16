export interface headers {
  value: string;
  align: 'left' | 'right' | 'center';
  name: string;
  visible: boolean;
}
export type AlignContent = 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
export type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
export type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type VariantText = 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'title' | 'subtitle' | 'bodyText' | 'captionText' | 'legalText' | 'amountPrimary' | 'amountSecondary' | 'actionLinkBody' | 'actionLinkCaption' | 'actionLinkLegal' | 'actionDefault' | 'actionSmall' | 'smallText' | 'tinyText' | 'actionText' | 'alertButtonText';
export type VariantWebviewsText = 'headline' | 'headline2' | 'headline3' | 'title' | 'subtitle' | 'body' | 'caption' | 'legal';
export type Colors = 'blue' | 'grey' | 'yellow' | 'black' | 'white' | 'darkGrey' | 'danger' | 'info' | 'success' | 'warning' | 'strongBlue' | 'grayishRed' | 'moderateCyan' | 'yellowGold' | 'darkCyan' | 'pureOrange' | 'darkGrayishBlue' | 'error' | 'blue100' | 'blue200' | 'danger100' | 'darkGrey400' | 'blue500';
