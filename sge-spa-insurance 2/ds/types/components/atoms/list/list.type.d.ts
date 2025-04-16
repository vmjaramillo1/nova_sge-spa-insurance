/** props */
export declare enum WEIGHT_COLOR_PROP {
  ONE_H = "100",
  TWO_H = "200",
  THREE_H = "300",
  FOUR_H = "400",
  FIVE_H = "500",
  SIX_H = "600",
  SEVEN_H = "700",
  EIGHT_H = "800",
  NINE_H = "900"
}
export declare enum COLORS_PROP {
  BLACK = "black",
  BLUE = "blue",
  DANGER = "danger",
  DARK_CYAN = "darkCyan",
  DARK_GRAYISH_BLUE = "darkGrayishBlue",
  DARK_GREY = "darkGrey",
  ERROR = "error",
  GRAYISH_RED = "grayishRed",
  GREY = "grey",
  INFO = "info",
  MODERATE_CYAN = "moderateCyan",
  PURE_ORANGE = "pureOrange",
  STRONG_BLUE = "strongBlue",
  SUCCESS = "success",
  WARNING = "warning",
  WHITE = "white",
  YELLOW = "yellow",
  YELLOW_GOLD = "yellowGold"
}
export declare enum VARIANT_PROP {
  BULLET = "bullet",
  CHECK = "check",
  NO_BULLTET = "no-bullet",
  NUMBER = "number"
}
export declare enum VARIANT_ICON {
  OUTLINE = "--outlined"
}
/** sets types */
type VARIANT = VARIANT_PROP.BULLET | VARIANT_PROP.NUMBER | VARIANT_PROP.NO_BULLTET | VARIANT_PROP.CHECK;
type WEIGHTCOLOR = WEIGHT_COLOR_PROP.ONE_H | WEIGHT_COLOR_PROP.TWO_H | WEIGHT_COLOR_PROP.THREE_H | WEIGHT_COLOR_PROP.FOUR_H | WEIGHT_COLOR_PROP.FIVE_H | WEIGHT_COLOR_PROP.SIX_H | WEIGHT_COLOR_PROP.SEVEN_H | WEIGHT_COLOR_PROP.EIGHT_H | WEIGHT_COLOR_PROP.NINE_H;
type COLORS = COLORS_PROP.BLACK | COLORS_PROP.BLUE | COLORS_PROP.DANGER | COLORS_PROP.DARK_CYAN | COLORS_PROP.DARK_GRAYISH_BLUE | COLORS_PROP.DARK_GREY | COLORS_PROP.ERROR | COLORS_PROP.GRAYISH_RED | COLORS_PROP.GREY | COLORS_PROP.INFO | COLORS_PROP.MODERATE_CYAN | COLORS_PROP.PURE_ORANGE | COLORS_PROP.STRONG_BLUE | COLORS_PROP.SUCCESS | COLORS_PROP.WARNING | COLORS_PROP.WHITE | COLORS_PROP.YELLOW | COLORS_PROP.YELLOW_GOLD;
interface ListItems {
  label: string;
  list?: Item[];
}
interface Item {
  label: string;
}
/** to storybook */
export declare const VARIANT_STORIE: VARIANT_PROP[];
export declare const COLORS_STORIE: COLORS_PROP[];
export declare const COLORS_ICON: COLORS_PROP[];
export declare const WEIGHT_STORIE: WEIGHT_COLOR_PROP[];
/** to component */
export { WEIGHTCOLOR, VARIANT, COLORS, ListItems };
