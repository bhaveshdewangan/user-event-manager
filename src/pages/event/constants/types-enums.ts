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

export const enum EVENTS_STATUS {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  NO_RESULT = "NO_RESULT",
}

export const INFO_MESSAGE = {
  LOADING: {
    text: "Hang On!!",
    subText: "data is loading...",
  },
  FAILURE: {
    text: "There seems to be technical issue",
    subText: "please try again.",
  },
  NO_RESULT: {
    text: "No Records Found!!",
    subText: "please try with some other keywords.",
  },
};

export type Message = {
  text: string;
  subText: string;
};
