
import './Table.scss';

import SubjectDetails from '../modals/SubjectDetails';
import { loadStorage, setStorage } from './../../utils/storage';
import { useEffect, useState } from 'react';
import Menu from '../contextMenu/ContextMenu.tsx';

const SUBJECTS_KEY = 'lr_subs';


const Table = ({data, deleteTable}) => {
    /** 
     * @var subjectDatajects has the structure of an aray with the index
     * beening the parentRow of the table and which is a collection of subject
     * the index of the subject is the same as the thisCol value.
     * 
     * parentRow is the time?
     * cellCol is the index of the day of the week
     * 
     * subjectData = [
     *    [phys, maths],
     *    [fre, sprt],
     * ]
     * }
    */
    const [subjectData, setsubjectData] = useState([]);
    const [isInsert, setIsInsert] = useState(false);

    const [parentRow, setParentRow] = useState(null);
    const [thisDay, setThisDay] = useState(null);

    /**
     * **getSubject(objt)** is passed as props to the SubjectDetails to collect the 
     * subject and days for the subject. 
     * @param {Object} objt an objt of days selected and subject entered
     * days - is an array of indexed in wrt the map index 
     */
    const getSubject = objt => {

      if (objt.status === 'ok') {
        const { days, subject, } = objt.details;
        // directly mutating a useState value is not recom
        let cellData = [...subjectData[parentRow]] || [];


        /**
         * Read the value from the data.days assign this value to the day
         * This value is either a num or a an empty str
         */
        for (let day of days) {
          // accessing be index requires a num as index not an empty str
          // Thus only the cell with a value in the data.days in updated
          cellData[day] = subject;
        }

        setsubjectData(pv => {
          // frm the prev, located the taken parentRow, replace it with the updated version
          pv[parentRow] = cellData;

          setStorage(SUBJECTS_KEY, pv);
          return pv;
        })

        // console.log(cellData, 'afters');
      }

      setIsInsert(false); // this closes the subject collection form
    }

    /**
     * **clickHandler** handle what happens when a cell is clicked, the function
     * with set the `parentRow` to that click rowId and the thisDay as the colId
     * @param {event} e browser event
     */
    const clickHandler = (e) => {
      setIsInsert(true);
      setParentRow(e.target.parentNode.dataset.rowId);
      setThisDay(e.target.dataset.colId);
    }


    // Setup the table struct using periods and day into 
    // once when page load
    useEffect(() => {
      let temp_period_sub = [];
      let storedSub = loadStorage(SUBJECTS_KEY);
      
      let newData = storedSub ? storedSub : data?.periods;
      
      if (newData) {
        setsubjectData(prev => {
            for (let p in newData) { 
              temp_period_sub[p] = storedSub?.[p] ? [...newData[p]] : new Array(data.days.length).fill('');
              
            }

          return temp_period_sub;
        })
      }

    }, [data?.days.length, data?.periods]);

    /*********** Context Menu Related  **********/
    const [ showContextM, setShowContextM] = useState(false);
    const [ position, setPosition ] = useState({});
    // const [render, setRender] = useState(false);


    const closeContextHandler = e => {
        setShowContextM(false)
    }
    const contextMenuHandler = e => {
        e.preventDefault()
        const { clientX: frmLeft, clientY: frmTop } = e;

        // console.log(e)
        setPosition(prev => {
            return {
                frmTop,
                frmLeft,
            }
        })

        setShowContextM(true);
    }

    /**
     * TableAvaibility get using the data props verify which Jsx to return
     * @returns Jsx
     */
    const TableAvaibility = () => {
      if (data) {
        return (
          <>
            {isInsert && <SubjectDetails days={data.days} getSubject={getSubject} thisDay={thisDay}/>}
            {showContextM && <Menu options={{option1: {
                              label: 'Delete', 
                              behavior: () => { console.log('Option1 from table')}
                              }
                          }}  position={position}/> }
            <table onContextMenu={contextMenuHandler} onClick={closeContextHandler} className='timetable'>
              <caption className='t__caption'>
                <h2>
                  This Table's Title
                </h2>
              </caption>
              <thead>
                <tr>
                  <th>Time/day</th>
                  {
                    data.days.map((day, i) => {
                      return <th key={i}>{day}</th>
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {
                  subjectData.map((subs, periodPos) => {
                    return (
                      <tr key={periodPos} data-row-id={periodPos}>
                        <th>{data.periods[periodPos]}</th>
                        {
                          subs.map((sjt, i) => {
                            return <td key={i} onClick={clickHandler} data-col-id={i}>{sjt}</td>
                          })
                        }
                      </tr>
                    ) 
                  })
                }
              </tbody>
            </table> 
          </>
        )

      } else {
        return (
          <div className="no-table">
              <h2>There is no table yet</h2>
              <p>Click the <code>+</code> to create an table</p>
          </div>
        )
      }
    }




    return <TableAvaibility />;

}


export default Table;