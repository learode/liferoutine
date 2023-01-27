import "./App.scss";

import { useState } from "react";
import { loadStorage, setStorage, removeStorage } from "./utils/storage";



import TimetableSetup from './components/modals/TimetableSetup';
import Button from "./components/button/Button";
import Table from "./components/table/Table"
import { useEffect } from "react";



const timeRanges = {
  '4hours': ['7:30 - 8:30', '8:35 - 10:35', '10:40 - 11:45', '11:50 - 13:00'],
  '8hours': ['7:30 - 8:30', '8:35 - 10:35', '10:40 - 11:45', '11:50 - 13:00', '7:30 - 8:30', '8:35 - 10:35', '10:40 - 11:45', '11:50 - 13:00'],
}

function App() {
  const [showTableSetup, setShowTableSetup] = useState(false);
  const [tableSetup, setTableSetup] = useState(false);
  const [tableData, setTableData] = useState(null);


  const tableDataHandler = tableHeadObj => {
    console.log(tableHeadObj)

    setShowTableSetup(false);
    if (tableHeadObj?.days.length > 1) {
      let headers = {
        ...tableHeadObj,
        periods: timeRanges[tableHeadObj.periods]
      }
      
      setTableData(headers);
      setStorage(headers);
      
      setTableSetup(true);
    }
  }
  const showForm = () => setShowTableSetup(true)



  const deleteTable = () => {
    removeStorage();
    setTableData(null);
    setTableSetup(false);
    setShowTableSetup(false);
  }


  useEffect(() => {
    let tableHeadData = loadStorage();
    if (tableHeadData) {
      setTableData(tableHeadData);
      setTableSetup(true);
    }

    else {
      console.log("What nigga?")
    }
  }, []);


  return (
    <div className="App">
      <aside>

      </aside>


      <main>
        {showTableSetup && <TimetableSetup passDetails={tableDataHandler} />}

        {tableData && <Table data={tableData} deleteTable={deleteTable}/>}
      </main>


      <Button className='btn__float' onClick={showForm} disabled={tableSetup ? true : false} >+</Button>
    </div>
  );
}

export default App;
