import { METHOD_TYPE, Event } from "../constants/types-enums";
import { getEventsFilterByCategories } from "./response-modifier";

const MAX_EVENT_SELECTION_ALLOWED = 3;

function debounce(cbFn: (k: string) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function (key: string) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cbFn(key);
    }, delay);
  };
}

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
  newSelectedEventList: Event[] | any
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

export {
  handleSelectedEventList,
  handleEventList,
  debounce,
  MAX_EVENT_SELECTION_ALLOWED,
};
