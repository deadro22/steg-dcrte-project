import React, { useState } from "react";
import ChartView from "../ChartView";

const ConsommationPage = () => {
  const [compare, toggleCompare] = useState(false);
  const [key, setKey] = useState([1, 2]);

  const togCompare = (state) => {
    setKey([key[1], key[0]]);
    toggleCompare(state);
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ display: "flex", width: "100%" }}>
        <ChartView key={key[0]} showHeader={true} />
        {compare && <ChartView toggleCompare={togCompare} />}
      </div>
      <div style={{ margin: "50px", marginTop: "20px" }}>
        <button
          className="st-btn-none btn-toggle-cc"
          onClick={() => togCompare(true)}
          disabled={compare}
        >
          Comparer deux périodes
        </button>
      </div>
    </div>
  );
};

export default ConsommationPage;
