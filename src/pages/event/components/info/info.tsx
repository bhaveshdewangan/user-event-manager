import {
  EVENTS_STATUS,
  INFO_MESSAGE,
  Message,
} from "../../constants/types-enums";
import "./info.scss";

interface Props {
  type: EVENTS_STATUS;
}
export const Info: React.FC<Props> = ({ type }: Props) => {
  let classNames, infoMessage: any;
  switch (type) {
    case EVENTS_STATUS.FAILURE:
      classNames = "error-theme";
      infoMessage = INFO_MESSAGE[EVENTS_STATUS.FAILURE];
      break;
    case EVENTS_STATUS.NO_RESULT:
      classNames = "info-theme";
      infoMessage = INFO_MESSAGE[EVENTS_STATUS.NO_RESULT];
      break;
    case EVENTS_STATUS.LOADING:
      classNames = "info-theme";
      infoMessage = INFO_MESSAGE[EVENTS_STATUS.LOADING];
      break;
    default:
  }

  return (
    <div className={`info-card not-found ${classNames}`}>
      <div
        style={{ fontSize: "18px", margin: "8px 5px 4px 5px" }}
        className="err-header"
      >
        {infoMessage.text}
      </div>
      <div style={{ fontSize: "12px", marginBottom: "10px" }}>
        {infoMessage.subText}
      </div>
    </div>
  );
};
