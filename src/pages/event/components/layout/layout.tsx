import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../../config/config.json";
import "./layout.scss";
import { getEventsFilterByCategories } from "../../utils/response-modifier";
import {
  METHOD_TYPE,
  Event,
  ResponseGenerator,
  EventState,
  EVENTS_STATUS,
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
  const [eventStatus, setEventsStatus] = useState<EVENTS_STATUS>(
    EVENTS_STATUS.LOADING
  );

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
    setTimeout(() => {
      axios
        .get(url)
        .then((response: ResponseGenerator<Event[]>) => {
          setEventsStatus(EVENTS_STATUS.SUCCESS);

          setEvents({
            byCatagory: getEventsFilterByCategories([...response.data]),
            list: response.data,
          });
        })
        .catch((err) => {
          setEventsStatus(EVENTS_STATUS.FAILURE);
        });
    }, 2000);
  }, []);

  return (
    <>
      <div className="event-container">
        <div className="section left">
          <EventHeader
            enableSearch={true}
            enableInfo={false}
            headerText={"All Events"}
            onSearch={filterEventByName}
          />
          {eventStatus == EVENTS_STATUS.LOADING ||
          eventStatus == EVENTS_STATUS.FAILURE ? (
            <Info type={eventStatus} />
          ) : (
            <>
              {Object.keys(events.byCatagory).length &&
              eventStatus == EVENTS_STATUS.SUCCESS ? (
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
                <Info type={EVENTS_STATUS.NO_RESULT} />
              )}
            </>
          )}
        </div>
        <div className="section right">
          <EventHeader
            enableSearch={false}
            enableInfo={true}
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
