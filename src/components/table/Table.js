
import { useState } from 'react';
import './Table.scss';

import SubjectDetails from '../modals/SubjectDetails';






const Table = ({data, deleteTable}) => {
    const {periods, days} = data;
    /** 
     * @var tableSubjects has the structure of an object with the key
     * beening the parentRow of the table and which is a collection of subject
     * the index of the subject is the same as the thisCol value.
     * parentRow = [subjects]
     * parentRow is the time?
     * cellCol is the index of the day of the week
     * 
     * tableSubjects = {
     *    "0": [phys, maths],
     *    "2": [fre, sprt],
     * }
    */
    const [tableSubjects, setTableSubjects] = useState({});
    const [isInsert, setIsInsert] = useState(false);
    const [weeksub, setWeeksub] = useState(new Array(days.length).fill(""));

    const [parentRow, setParentRow] = useState('');

    /**
     * **getSubject(objt)** is passed as props to the SubjectDetails to collect the 
     * subject and days for the subject. 
     * @param {objt} objt an objt of days selected and subject entered
     * days - is an array of indexed in wrt the map index 
     */
    const getSubject = objt => {
      let cellData = tableSubjects[parentRow] || [];
      // cellData[0] =  `time${parentRow}`;
      for (let day of objt.days) {
        cellData[day] = objt.subject;
        // if (cellData[day] === undefined) {
        //   // cellData[day] = '&nbsp;';
        // }
      }

      setWeeksub([...cellData])
      setTableSubjects(prevInfo => {
        return {
          ...prevInfo,
          [parentRow]: cellData,
        }
      })

      setIsInsert(false);
    }

    /**
     * **clickHandler** handle what happens when a cell is clicked
     * @param {e} e browser event
     */
    const clickHandler = (e) => {
      setIsInsert(true);
      setParentRow(e.target.parentNode.dataset.rowId);
      // console.log(e.target.parentNode.dataset.rowId)
    }

    return (
      <>
        {isInsert && <SubjectDetails days={days} getSubject={getSubject}/>}
        {console.log(weeksub)}
        <table onAuxClick={e => {console.log(e); e.preventDefault()}} className='timetable'>
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
              periods.map((time, i) => {
                
                if (Number(parentRow) === i) {
                  // console.log(i, +parentRow, i === Number(parentRow));
                  return (
                    <tr key={i} data-row-id={i}>
                      <th>{time}</th>
                      {
                        weeksub.map((sjt, i) => {
                          return <td key={i} onClick={clickHandler} data-col-id={i}>{sjt}</td>
                        })
                      }
                    </tr>
                  ) 
                } else {
                  return (
                    <tr key={i} data-row-id={i}>
                      <th>{time}</th>
                      {
                        weeksub.map((sjt, i) => {
                          return <td key={i} onClick={clickHandler} data-col-id={i}>&nbsp;</td>
                        })
                      }
                    </tr>
                  ) 
                }
              })
            }
          </tbody>
        </table> 
      </>
    )
}


export default Table;