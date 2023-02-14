export interface ResponseGenerator<T> {
  config?: any;
  data: T;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
  error?: any;
}

export interface Event {
  id: number;
  event_name: string;
  event_category: string;
  start_time?: any;
  end_time?: any;
  is_selected?: boolean;
  is_available?: boolean;
  closed?: boolean;
  time?: string;
}

export interface EventState {
  byCatagory: any;
  list: Event[];
}

export const enum METHOD_TYPE {
  ADD = "ADD",
  REMOVE = "REMOVE",
}
