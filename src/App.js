import "./App.scss";

import { useState } from "react";
import { loadStorage, setStorage, removeStorage } from "./utils/storage";



import TimetableSetup from './components/modals/TimetableSetup';
import Button from "./components/button/Button";
import Table from "./components/table/Table"
import { useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Todoes from "./pages/todoes/Todoes";
import Pomodora from "./pages/pomodora/Pomodora";


const HEADERS_KEY = 'lr_headers';
const timeRanges = {
  '4hours': ['7:30 - 8:30', '8:35 - 10:35', '10:40 - 11:45', '11:50 - 13:00'],
  '8hours': ['7:30 - 8:30', '8:35 - 10:35', '10:40 - 11:45', '11:50 - 13:00', '7:30 - 8:30', '8:35 - 10:35', '10:40 - 11:45', '11:50 - 13:00'],
}

function App() {
  const [showTableSetup, setShowTableSetup] = useState(false);
  const [tableSetup, setTableSetup] = useState(false);
  const [tableData, setTableData] = useState(null);


  const tableDataHandler = tableHeadObj => {
    setShowTableSetup(false);
    if (tableHeadObj.status !== 'ok') return;
    
    if (tableHeadObj.details?.days.length > 1) {
      let headers = {
        ...tableHeadObj.details,
        periods: timeRanges[tableHeadObj.details.periods]
      }
      
      setTableData(headers);
      setStorage(HEADERS_KEY, headers);
      
      setTableSetup(true);
    }
  }

  const showForm = () => setShowTableSetup(true)



  const deleteTable = () => {
    removeStorage(HEADERS_KEY);
    setTableData(null);
    setTableSetup(false);
    setShowTableSetup(false);
  }


  useEffect(() => {
    let tableHeadData = loadStorage(HEADERS_KEY);
    if (tableHeadData) {
      setTableData(tableHeadData);
      setTableSetup(true);
    }

    else {
      console.log("header key is not found")
    }
  }, []);


  return (
    <div className="App">
      <aside>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Todoes">Todoes</Link>
            </li>
            <li>
              <Link to="/pomodora">Pomodora</Link>
            </li>
            <li>
              <Link to="/omo">Others</Link>
            </li>
          </ul>
        </nav>

      </aside>


      <main>

          {showTableSetup && <TimetableSetup passDetails={tableDataHandler} />}
        <Routes>

          <Route
            path="/"
            element={<Table data={tableData} deleteTable={deleteTable}/>}
          />

          <Route 
            path="todoes"
            element={<Todoes />}
          />

          <Route 
            path="pomodora"
            element={<Pomodora />}
          />

          <Route
            path="*"
            element={<>
              <div className="no-table">
                <h3>Page not found</h3>
              </div>
            </>}
          />
        </Routes>
      </main>

      {/* hide the button when there is table data is gotten */}
      {!tableData && <Button className='btn__float' onClick={showForm} disabled={tableSetup ? true : false} >+</Button>}
    </div>
  );
}

export default App;
