
import './Table.css';

const Table = ({data}) => {
    const {periods, days} = data;
    
    return (
      <table>
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
                <tr key={i}>
                  <th>{time}</th>
                  {
                    days.map((day, i) => {
                      return <td key={i}>&nbsp;</td>
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