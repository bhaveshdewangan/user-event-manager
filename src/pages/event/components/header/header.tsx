import "./header.scss";
import SearchIcon from "../../../../assets/images/search-icon.png";
interface Props {
  enableSearch: boolean;
  headerText: string;
  onSearch: (arg: string) => void;
}

export const EventHeader: React.FC<Props> = ({
  enableSearch,
  headerText,
  onSearch,
}: Props) => {
  const clearInput = () => {
    const inputEle: any = document.querySelector("#search");
    if (inputEle && inputEle.value.length) {
      inputEle.value = "";
      onSearch("");
    }
  };
  return (
    <div className="event-header">
      <div className="text">{headerText}</div>
      {enableSearch && (
        <div className="search-container">
          <img className="icon" src={SearchIcon} alt="" />
          <input
            className="text-area"
            placeholder="Search event here"
            type="text"
            id="search"
            onKeyUp={(e: any) => onSearch(e.target.value)}
          ></input>
          <span className="cross" onClick={() => clearInput()}>
            X
          </span>
        </div>
      )}
    </div>
  );
};
