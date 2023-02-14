import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../../config/config.json";
import "./layout.css";
import { getEventsFilterByCategories } from "../../utils/response-modifier";
import {
  METHOD_TYPE,
  Event,
  ResponseGenerator,
  EventState,
} from "../../constants/types-enums";
import {
  debounce,
  handleEventList,
  handleSelectedEventList,
} from "../../utils/state-handler";

import { EventCategory } from "../../../../shared-components/event-category/event-category";
import { Info } from "../info/info";
import { EventHeader } from "../header/header";

const EventLayout = () => {
  const [events, setEvents] = useState<EventState>({
    byCatagory: {},
    list: [],
  });
  const [selectedEvents, setSelectedEvents] = useState<EventState>({
    byCatagory: {},
    list: [],
  });

  const getSearchedEvents = (searchKey: string) => {
    const filterList = events.list.filter(
      (item: Event) =>
        item.event_name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1
    );
    if (filterList.length) {
      setEvents({
        list: events.list,
        byCatagory: getEventsFilterByCategories(filterList),
      });
    } else {
      setEvents({
        list: events.list,
        byCatagory: getEventsFilterByCategories([]),
      });
    }
  };

  const addIntoSelectedEvents = (EVENT: Event) => {
    let updatedSelectedEventList = handleSelectedEventList(
      EVENT,
      selectedEvents.list,
      setSelectedEvents,
      METHOD_TYPE.ADD
    );

    handleEventList(
      EVENT,
      events.list,
      setEvents,
      METHOD_TYPE.REMOVE,
      updatedSelectedEventList
    );
  };

  const removeFromSelectedEvents = (EVENT: Event) => {
    let updatedSelectedEventList = handleSelectedEventList(
      EVENT,
      selectedEvents.list,
      setSelectedEvents,
      METHOD_TYPE.REMOVE
    );

    handleEventList(
      EVENT,
      events.list,
      setEvents,
      METHOD_TYPE.ADD,
      updatedSelectedEventList
    );
  };

  const filterEventByName = debounce(getSearchedEvents, 400);

  useEffect(() => {
    const url = config.server.eventMockServiceEndPoint;
    axios
      .get(url)
      .then((response: ResponseGenerator<Event[]>) => {
        console.log(getEventsFilterByCategories([...response.data]));
        setEvents({
          byCatagory: getEventsFilterByCategories([...response.data]),
          list: response.data,
        });
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div className="event-container">
        <div className="section left">
          <EventHeader
            enableSearch={true}
            headerText={"All Events"}
            onSearch={filterEventByName}
          />
          {Object.keys(events.byCatagory).length ? (
            Object.keys(events.byCatagory).map((item) => {
              return (
                <EventCategory
                  key={item}
                  category={events.byCatagory[item]}
                  title={item}
                  onEventSelect={addIntoSelectedEvents}
                />
              );
            })
          ) : (
            <Info />
          )}
        </div>
        <div className="section right">
          <EventHeader
            enableSearch={false}
            headerText={"Selected Events"}
            onSearch={() => {}}
          />
          {Object.keys(selectedEvents.byCatagory).length
            ? Object.keys(selectedEvents.byCatagory).map((item) => {
                return (
                  <EventCategory
                    key={item}
                    category={selectedEvents.byCatagory[item]}
                    title={item}
                    onEventRemove={removeFromSelectedEvents}
                  />
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export { EventLayout };
