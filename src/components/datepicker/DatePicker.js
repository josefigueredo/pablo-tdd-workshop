import React from "react";

const DatePicker = props => {
  const { weeks, onDateClicked, selectedDate, onApply } = props;
  return (
    <div className="date-picker">
      <table>
        <tbody>
          {weeks.map(week => (
            <tr className="date-picker__week">
              {week.map(date => {
                const { day, month, year } = date;
                let classNameDate = "date";
                if (
                  selectedDate &&
                  selectedDate.day === day &&
                  selectedDate.month === month &&
                  selectedDate.year === year
                ) {
                  classNameDate = "date--selected";
                }
                return (
                  <td
                    id={`date-${day}-${month}-${year}`}
                    onClick={() => onDateClicked(date)}
                    className={classNameDate}
                  >
                    {day}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onApply} className="apply-button">
        Aplicar
      </button>
    </div>
  );
};

export default DatePicker;
