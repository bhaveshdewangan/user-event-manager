import { Event } from "../constants/event";
interface Props {
  event: Event;
  onSelect: (arg: Event) => void;
  onRemove: (arg: Event) => void;
}
export const EventCard: React.FC<Props> = ({
  event,
  onSelect,
  onRemove,
}: Props) => {
  console.log("E-CARD", event);
  return (
    <div>
      <div
        className={`card ${
          event.is_available ? "card-active" : "card-inactive"
        }`}
      >
        <div className="card-left-section">
          <h1>{event.event_category.slice(0, 1)}</h1>
        </div>
        <div
          className={`${
            event.is_available ? "divider-active" : "divider-inactive"
          }`}
        ></div>
        <div className="card-right-section">
          <div className="card-header">{event.event_name}</div>
          <div className="card-content">{event.time}</div>
          <button
            className={`${
              event.is_selected
                ? "remove"
                : event.is_available
                ? "select"
                : "inactive"
            } btn`}
            onClick={() => {
              if (event.is_available && !event.is_selected) {
                onSelect(event);
              } else {
                onRemove(event);
              }
            }}
          >
            {event.is_selected ? "Remove" : "Select"}
          </button>
        </div>
      </div>
    </div>
  );
};
