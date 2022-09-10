import { useState } from "react";

import TimetableSetup from './components/modals/TimetableSetup';
import Button from "./components/button/Button";

function App() {
  const [showTableSetup, setShowTableSetup] = useState(false)


  const showForm =() => setShowTableSetup(true)
  return (
    <div className="App">
      {showTableSetup && <TimetableSetup />}
      <table></table>


      <Button className='btn__float' onClick={showForm}>+</Button>
    </div>
  );
}

export default App;
