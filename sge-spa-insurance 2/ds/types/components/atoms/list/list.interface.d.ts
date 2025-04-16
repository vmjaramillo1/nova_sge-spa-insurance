export default interface List {
  text: string;
  childs?: Array<Child>;
}
export interface Child {
  text: string;
}
