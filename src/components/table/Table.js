
import { useState } from 'react';
import './Table.scss';

import SubjectDetails from '../modals/SubjectDetails';
import { useEffect } from 'react';






const Table = ({data, deleteTable}) => {
    const {periods, days} = data;
    /** 
     * @var tableSubjects has the structure of an aray with the index
     * beening the parentRow of the table and which is a collection of subject
     * the index of the subject is the same as the thisCol value.
     * 
     * parentRow is the time?
     * cellCol is the index of the day of the week
     * 
     * tableSub = [
     *    [phys, maths],
     *    [fre, sprt],
     * ]
     * }
    */
    const [tableSub, setTableSub] = useState([]);
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
      let cellData = tableSub[parentRow] || [];

      console.log(objt)
      for (let day of objt.days) {
        cellData[day] = objt.subject;
        // if (cellData[day] === undefined) {
        //   // cellData[day] = '&nbsp;';
        // }
      }

      // setPeriodSub([...cellData])
      // setTableSub(prevInfo => {
      //   return {
      //     ...prevInfo,
      //     [parentRow]: cellData,
      //   }
      // })

      setIsInsert(false);
    }

    /**
     * **clickHandler** handle what happens when a cell is clicked
     * @param {event} e browser event
     */
    const clickHandler = (e) => {
      setIsInsert(true);
      setParentRow(e.target.parentNode.dataset.rowId);
      setThisDay(e.target.dataset.colId);
      // console.log(e.target.parentNode.dataset.rowId)
    }


    // Setup the table struct using periods and day into tableSub
    // once when page load
    useEffect(() => {
      let temp_period_sub = [];
      
      
      setTableSub(prev => {
        for (let p in periods) { 
          temp_period_sub[p] = prev?.[p] ? [...prev[p]] : new Array(days.length).fill('');

        }
        return temp_period_sub;
      })
    }, [periods, days.length]);

    return (
      <>
        {isInsert && <SubjectDetails days={days} getSubject={getSubject} thisDay={thisDay}/>}
        <table onContextMenu={e => {e.preventDefault(); console.log(e) }} className='timetable'>
          <caption className='t__caption'>
            <h2>
              This Table's Title
            </h2>
          </caption>
          <thead>
            <tr>
               <th>Time/day</th>
              {
                days.map((day, i) => {
                  return <th key={i}>{day}</th>
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              tableSub.map((subs, periodPos) => {
                  return (
                    <tr key={periodPos} data-row-id={periodPos}>
                      <th>{periods[periodPos]}</th>
                      {
                        subs.map((sjt, i) => {
                          return <td key={i} onClick={clickHandler} data-col-id={i}>{sjt}</td>
                        })
                      }
                    </tr>
                  ) 
                }
              )
            }
          </tbody>
        </table> 
      </>
    )
}


export default Table;