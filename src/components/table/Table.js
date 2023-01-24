
import { useState } from 'react';
import './Table.css';

const Table = ({data, deleteTable}) => {
    const {periods, days} = data;
    /** 
     * @var tableSubjects has the structure of an object with the key
     * beening the parentRow of the table and which is a collection of subject
     * the index of the subject is the same as the thisCol value.
     * parentRow = [subjects]
     * 
     * tableSubjects = {
     *    "0": [phys, maths],
     *    "2": [fre, sprt],
     * }
    */
   const [tableSubjects, setTableSubjects] = useState({});
    

    const insertSubject = (e) => {
      let parentRow = e.target.parentNode.dataset;
      let thisCol = e.target.dataset

      let cellData = [...tableSubjects[parentRow]];

      setTableSubjects(prevInfo => {
        return {
          ...prevInfo,
          parentRow: prevInfo[parentRow][+thisCol]
        }
      })
    }

    return (
      <table>
        <caption>
          <div>
            <button className='table__del' onClick={deleteTable}>Delete</button>
          </div>
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
              return (
                <tr key={i} data-row-id={i}>
                  <th>{time}</th>
                  {
                    days.map((day, i) => {
                      return <td key={i} onClick={insertSubject} data-col-id={i}>&nbsp;</td>
                    })
                  }
                </tr>
              ) 
            })
          }
        </tbody>
      </table> 
    )
}


export default Table;