import React from "react";
import DatePicker from "./components/datepicker/DatePicker";
function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "2em" }}>
      Hola ! Bienvenido al workshop de TDD
      <DatePicker
        weeks={[
          [{ day: 20, month: 2, year: 2018 }],
          [{ day: 28, month: 2, year: 2018 }]
        ]}
      />
    </div>
  );
}

export default App;
