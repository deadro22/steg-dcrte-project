import React, { useState } from "react";
import {
  FiberManualRecord,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";

const InfoContainer = ({
  color,
  info,
  value,
  index,
  setChartStats,
  setChartView,
  chartView,
}) => {
  const [toggleBtn, setToggleBtn] = useState(false);
  const [eyeToggle, setEyeToggle] = useState(true);

  const handleChartStatsToggle = (state) => {
    if (chartView) {
      setToggleBtn(state);
    }
    const prevCharStats = state ? [false, false, false] : [true, true, true];
    prevCharStats[index] = true;

    setChartStats(prevCharStats);
  };

  const handleBtnToggle = () => {
    if (chartView) {
      const prevView = [...chartView];
      prevView[index] = !prevView[index];
      setChartView(prevView);
      setEyeToggle(prevView[index]);
    }
  };

  return (
    <div
      className="chartStatInfoC"
      onMouseEnter={() => handleChartStatsToggle(true)}
      onMouseLeave={() => handleChartStatsToggle(false)}
      onClick={handleBtnToggle}
      style={{ position: "relative" }}
    >
      {toggleBtn && (
        <button
          className="st-btn-none btn-toggle-view"
          style={{ position: "absolute" }}
        >
          {eyeToggle ? <VisibilityOff /> : <Visibility />}
        </button>
      )}
      <p>
        <FiberManualRecord style={{ color: color }} />
        {info}
      </p>
      <h2>
        {value}
        <span>MW</span>
      </h2>
    </div>
  );
};

export default InfoContainer;
