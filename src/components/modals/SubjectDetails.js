import './SubjectDetails.css';

import { useState } from 'react';

const SubjectDetails = (props) => {
    const [subject, setSubject] = useState('');

    // instead of literal day e.g mon or so, will use the index give by the map function
    // This is pusible becuz, parentRow is alway an index of the same order of day
    const [days, setDays] = useState([]);

    const passUpSubject = (e) => {
        props.getSubject({
            'subject': subject,
            'days': days,
        })
    }

    const handleCheckbox = e => {
        if (e.target.checked) {
            // add the day of the week if the checkbox is checked
            setDays(prev => {
                return [
                    ...prev,
                    e.target.value,
                ]
            })
        } else {
            // remove the day when the checkbox is unchecked
            setDays(prev => {
                return prev.filter(prevItem => prevItem !== e.target.value)
            })
        }
    }

    return (
      <div className='modal__full'>
        <form>
          <input type="text" name="subject" id="subject" placeholder='Phys3103' onChange={e => setSubject(e.target.value)}/>
          <div className='row'>
            {
              props.days.map((day, i) => {
                return (
                  <>
                    <input type="checkbox" name={day} key={i} value={i} onChange={handleCheckbox}/>
                    <label htmlFor={day}>{day}</label>
                  </>
                )
              })
            }
  
          </div>
  
          <button type="submit" onClick={passUpSubject}>Add</button>
        </form>
      </div>
    )
  }


  export default SubjectDetails;