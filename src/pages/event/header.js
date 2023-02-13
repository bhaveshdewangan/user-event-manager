import "../../assets/css/event-header.css";
import SearchIcon from "../../assets/images/search-icon.png";
export const EventHeader = ({ enableSearch, headerText, onSearch }) => {
  const clearInput = () => {
    const inputEle = document.querySelector("#search");
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
            onKeyUp={(e) => onSearch(e.target.value)}
          ></input>
          <span class="cross" onClick={() => clearInput()}>
            X
          </span>
        </div>
      )}
    </div>
  );
};
