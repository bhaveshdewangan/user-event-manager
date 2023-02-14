import { Event } from "../constants/types-enums";
import { getTimestamp, getEventTime } from "./timestamp-handler";

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

export { getEventsFilterByCategories };
