import React from "react";

function Layer({ data }) {
  return (
    <div className="layer">
      <p>Layer Data: {data ? JSON.stringify(data) : "No data"}</p>
    </div>
  );
}

export default Layer;