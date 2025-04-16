import TestimonialItem from './testimonial.type';
export declare class Testimonial {
  items: string;
  itemsCoverted: TestimonialItem[];
  verifyObjectStructure(objectToVerify: Object): boolean;
  verifyArrayStructure(arrayToVerify: Array<Object>): boolean;
  convertItemsToArray(newValue: string): void;
  componentWillLoad(): void;
  render(): any;
}
