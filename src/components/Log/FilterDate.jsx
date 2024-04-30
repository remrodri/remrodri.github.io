import { useState } from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: () => ({
    // display: "flex",
    width:'20rem'
  }),
  inputContainer: {},
  inputDateField: () => ({
    // display: "flex",
    // flexDirection: "column",
  }),
});

// eslint-disable-next-line react/prop-types
function FilterDate({ handleFilterChange }) {
  const [startDate, setStartDate] = useState( new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  const handleStartDateChange = (event) => {
    setStartDate(event);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event);
  };

  const handleFilterClick = () => {
    handleFilterChange(startDate, endDate);
  };
  //fecha actual
  const today = new Date().toISOString().split("T")[0];
  return (
    <div {...stylex.props(styles.base())}>
      filtro por fechas
      <div>
        <div {...stylex.props(styles.inputDateField())}>
          <label htmlFor="startDate">Fecha de inicio</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            max={today}
          />
        </div>
        <div {...stylex.props(styles.inputDateField())}>
          <label htmlFor="endDate">Fecha final</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleEndDateChange(e.target.value)}
            max={today}
          />
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            handleFilterClick();
          }}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}
export default FilterDate;
