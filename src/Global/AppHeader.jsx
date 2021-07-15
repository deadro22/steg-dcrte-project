import React, { useState } from "react";
import { frCA, arDZ } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { format } from "date-fns/esm";

const AppHeader = ({
  findMinValue,
  findMaxValue,
  changeDataFromDateSelection,
  showHeaderTitle,
  toggleCompare,
}) => {
  const [date, setDate] = useState();
  const changeDateChart = (date) => {
    setDate(date);
    changeDataFromDateSelection();
  };
  return (
    <div>
      <div className="viewSelectorHeader">
        <div className="viewSelectCp">
          <p>période</p>
          <DatePicker date={date} onDateChange={changeDateChart} locale={frCA}>
            {({ inputProps, focused }) => (
              <div id="viewSelectBtn">
                <input
                  className={
                    "calendarDateC input" + (focused ? " -focused" : "")
                  }
                  {...inputProps}
                  value={
                    date
                      ? format(date, "dd MMMM yyyy", { locale: frCA })
                      : format(new Date(), "dd MMMM yyyy", { locale: frCA })
                  }
                />
              </div>
            )}
          </DatePicker>
        </div>
        <div>
          <button
            className="st-btn-none btn-toggle-compare"
            style={{
              width: "100%",
              visibility: !showHeaderTitle ? "visible" : "hidden",
            }}
            disabled={showHeaderTitle}
            onClick={() => toggleCompare(false)}
          >
            Fermer
          </button>
          <div>
            <button
              onClick={findMinValue}
              className="st-btn-none min-maxSelector"
            >
              min
            </button>
            <button
              onClick={findMaxValue}
              className="st-btn-none min-maxSelector"
            >
              max
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
