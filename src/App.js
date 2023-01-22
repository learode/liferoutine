import "./App.css";

import { useState } from "react";



import TimetableSetup from './components/modals/TimetableSetup';
import Button from "./components/button/Button";
import Table from "./components/table/Table"



const timeRanges = {
  '4hours': ['7:30 - 8:30', '8:35 - 10:35', '10:40 - 11:45', '11:50 - 13:00'],
  '8hours': ['7:30 - 8:30', '8:35 - 10:35', '10:40 - 11:45', '11:50 - 13:00', '7:30 - 8:30', '8:35 - 10:35', '10:40 - 11:45', '11:50 - 13:00'],
}

function App() {
  const [showTableSetup, setShowTableSetup] = useState(false);
  const [tableSetup, setTableSetup] = useState(false);
  const [tableHeaderData, setTableHeaderData] = useState(null);


  const tableDataHandler = tableHeadObj => {
    console.log(tableHeadObj)

    setShowTableSetup(false);
    if (tableHeadObj?.days.length > 1) {

      console.log(tableHeadObj.days)
      setTableHeaderData({
        ...tableHeadObj,
        periods: timeRanges[tableHeadObj.periods]
      });
      setTableSetup(true);
    }
  }
  const showForm = () => setShowTableSetup(true)


  

  return (
    <div className="App">
      {showTableSetup && <TimetableSetup passDetails={tableDataHandler} />}

      {tableHeaderData && <Table data={tableHeaderData} />}


      <Button className='btn__float' onClick={showForm} disabled={tableSetup ? true : false} >+</Button>
    </div>
  );
}

export default App;
