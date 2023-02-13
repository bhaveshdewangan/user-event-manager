import { EventCard } from "./event-card";
import { Event } from "../constants/event";
interface Props {
  title: string;
  category: Event[];
  onEventSelect?: (arg: Event) => void;
  onEventRemove?: (arg: Event) => void;
}
export const EventCategory: React.FC<Props> = ({
  category,
  title,
  onEventSelect = () => {},
  onEventRemove = () => {},
}: Props) => {
  const selectEvent = (event: any) => {
    if (!event.is_selected) {
      onEventSelect(event);
    }
  };

  const removeEvent = (event: any) => {
    if (event.is_selected) {
      onEventRemove(event);
    }
  };
  return (
    <>
      <div className="category-card">
        <h3 className="category-header">{title}</h3>
        <div className="category-items">
          {category.map((ele: any) => {
            return (
              <EventCard
                key={`${title}_${ele.id}_${ele.event_name}`}
                event={ele}
                onSelect={selectEvent}
                onRemove={removeEvent}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
