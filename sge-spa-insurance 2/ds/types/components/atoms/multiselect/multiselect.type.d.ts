export declare enum STATEPROP {
  NORMAL = "normal",
  DISABLED = "disabled",
  FOCUS = "focus",
  ERROR = "error"
}
export declare enum STATESIZE {
  EXTRA_SMALL = "extra-small",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large"
}
type STATE = STATEPROP;
type SIZE = STATESIZE;
type SelectItems = {
  value: any;
  label: string;
  selected?: boolean;
};
export { STATE, SIZE, SelectItems };
