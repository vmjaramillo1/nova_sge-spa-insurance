import { Row } from '../../intefaces';
export declare class Badge {
  status: string;
  row: Row;
  statusMap: {
    error: string;
    info: string;
    warning: string;
    success: string;
    neutral: string;
  };
  render(): any;
}
