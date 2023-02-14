import "./info.css";
export const Info = () => {
  return (
    <div className="info-card not-found">
      <div
        style={{ fontSize: "18px", margin: "8px 5px 4px 5px" }}
        className="err-header"
      >
        No Records Found!!
      </div>
      <div style={{ fontSize: "12px", marginBottom: "10px" }}>
        please try with some other keywords
      </div>
    </div>
  );
};
