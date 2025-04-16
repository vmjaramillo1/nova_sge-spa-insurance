import { ComponentInterface } from "../../../stencil-public-runtime";
export declare class Brand implements ComponentInterface {
  type: "logo" | "emblem";
  color: "primary" | "white" | "black" | "yellow" | "blue";
  width: number;
  height: number;
  render(): any;
}
