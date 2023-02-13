import { Event } from "../../constants/event";
const MAX_EVENT_SELECTION_ALLOWED = 3;
const enum METHOD_TYPE {
  ADD = "ADD",
  REMOVE = "REMOVE",
}
const getEventsFilterByCategories = (events: Event[]) => {
  let results: any = {};
  events.map((item: Event) => {
    let key = item.event_category.split(" ").join("_");
    if (results[key] !== undefined) {
      results[key] = [...results[key], modifyEventInfo(item)];
    } else {
      results[key] = [modifyEventInfo(item)];
    }
  });
  return results;
};

function debounce(cbFn: (k: string) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function (key: string) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cbFn(key);
    }, delay);
  };
}

const modifyEventInfo = (event: Event) => {
  event.start_time = getTimestamp(event.start_time);
  event.end_time = getTimestamp(event.end_time);
  event.is_selected =
    event.is_selected == undefined ? false : event.is_selected;
  event.is_available =
    event.is_available == undefined ? true : event.is_available;
  event.closed = event.closed == undefined ? false : event.closed;
  event.time = getEventTime(event.start_time, event.end_time);
  return event;
};

const getEventTime = (start: string, end: string) => {
  const startDate = {
    date: new Date(Number(start)),
    dayOfMonth() {
      return this.date.getDate();
    },
    month() {
      return this.date.getMonth();
    },
    year() {
      return this.date.getFullYear();
    },
    time() {
      return this.date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    },
  };
  const endDate = {
    date: new Date(Number(end)),
    dayOfMonth() {
      return this.date.getDate();
    },
    month() {
      return this.date.getMonth();
    },
    year() {
      return this.date.getFullYear();
    },
    time() {
      return this.date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    },
  };

  return `${startDate.dayOfMonth()} ${
    MONTHS[startDate.month()]
  } ${startDate.time()} - ${endDate.time()}`;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const areOverlapping = (event: Event, selectedEvent: Event) => {
  if (event.start_time < selectedEvent.start_time) {
    return event.end_time > selectedEvent.start_time;
  } else {
    return event.start_time < selectedEvent.end_time;
  }
};

const beforeEventsStateUpdate = (
  eventList: Event[],
  selectedEventList: Event[]
) => {
  if (selectedEventList.length === MAX_EVENT_SELECTION_ALLOWED) {
    eventList.forEach((event) => {
      event.is_available = false;
    });
  } else {
    eventList.forEach((event) => {
      event.is_available = true;
    });
    selectedEventList.forEach((selectedEvent) => {
      eventList.forEach((event) => {
        if (event.is_available && areOverlapping(event, selectedEvent)) {
          event.is_available = false;
        }
      });
    });
  }
};

const handleEventList = (
  item: Event,
  currentEventList: Event[],
  stateSetterFn: any,
  type: METHOD_TYPE,
  newSelectedEventList: Event[]
) => {
  switch (type) {
    case METHOD_TYPE.ADD:
      item.is_selected = false;
      let isEventExist = currentEventList.find((event) => event.id === item.id);
      if (!isEventExist) {
        let newList = [...currentEventList, item];
        beforeEventsStateUpdate(newList, newSelectedEventList);
        stateSetterFn({
          list: newList,
          byCatagory: getEventsFilterByCategories(newList),
        });
      }
      break;
    case METHOD_TYPE.REMOVE:
      let newEventList = [...currentEventList];
      const index = newEventList.findIndex((event) => item.id === event.id);
      newEventList.splice(index, 1);
      beforeEventsStateUpdate(newEventList, newSelectedEventList);
      stateSetterFn({
        list: newEventList,
        byCatagory: getEventsFilterByCategories(newEventList),
      });
      return;
    default:
      break;
  }
};

const handleSelectedEventList = (
  item: Event,
  currentSelectedEventList: Event[],
  stateSetterFn: any,
  type: METHOD_TYPE
): Event[] | void => {
  switch (type) {
    case METHOD_TYPE.ADD:
      let newSelectedEventList: Event[] = [];
      item.is_selected = true;
      let isEventExist = currentSelectedEventList.find(
        (event) => event.id === item.id
      );
      if (!isEventExist) {
        newSelectedEventList = [...currentSelectedEventList, item];
        stateSetterFn({
          list: newSelectedEventList,
          byCatagory: getEventsFilterByCategories(newSelectedEventList),
        });
      }
      return newSelectedEventList;
    case METHOD_TYPE.REMOVE:
      let selectedEventList = [...currentSelectedEventList];
      const index = selectedEventList.findIndex(
        (event) => item.id === event.id
      );
      const [removedEvent] = selectedEventList.splice(index, 1);
      removedEvent.is_selected = false;
      stateSetterFn({
        list: selectedEventList,
        byCatagory: getEventsFilterByCategories(selectedEventList),
      });
      return selectedEventList;
    default:
      break;
  }
};

const getTimestamp = (date: string) => new Date(date).getTime();

export {
  getEventsFilterByCategories,
  debounce,
  MAX_EVENT_SELECTION_ALLOWED,
  METHOD_TYPE,
  handleEventList,
  handleSelectedEventList,
};
