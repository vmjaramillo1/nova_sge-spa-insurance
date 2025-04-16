import { ComponentInterface } from "../../../stencil-public-runtime";
import { COLORS, ListItems, VARIANT, WEIGHTCOLOR } from "./list.type";
export declare class List implements ComponentInterface {
  idElement: string;
  variant: VARIANT;
  divided: boolean;
  iconColor?: COLORS;
  iconWeightColor?: WEIGHTCOLOR;
  color?: COLORS;
  weightColor?: WEIGHTCOLOR;
  data: ListItems[];
  renderFirstLevelList: (list: ListItems[]) => any[];
  renderSecondLevelList: (list: any) => any;
  renderNumberToList: (index: any) => any;
  renderNumberList: (index: any, text: any) => any;
  renderLabel: (text: any, secondLevel?: boolean) => any;
  render(): any;
}
