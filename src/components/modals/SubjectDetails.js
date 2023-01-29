import './SubjectDetails.scss';

import { useState } from 'react';
import { useEffect } from 'react';

const SubjectDetails = (props) => {
    const {days, thisDay, getSubject} = (props)
    const [subject, setSubject] = useState('');

    // instead of literal day e.g mon or so, will use the index give by the map function
    // This is pusible becuz, parentRow is alway an index of the same order of day
    const [selectedDays, setSelectedDays] = useState(null);

    const passUpSubject = (e) => {
        getSubject({
            'subject': subject,
            'days': selectedDays,
        })
    }

    const handleCheckbox = e => {

        if (e.target.checked) {
            // add the day of the week if the checkbox is checked
            setSelectedDays(prev => {
                return [
                    ...prev,
                    e.target.value,
                ]
            })
        } else {
            // remove the day when the checkbox is unchecked
            setSelectedDays(prev => {
                return prev.filter(prevItem => prevItem !== e.target.value)
            })
        }
    }


    // record the checked day i.e. the day that is clicked
    useEffect(() => {
      let ds = days.map((day, i) => {
        if (+thisDay === i) {
          return i;
        }
        return '';
      })

      console.log(ds)


      setSelectedDays(ds);
    }, [days, thisDay])

    return (
      <div className='modal'>
        <div className="modal__backdrop"></div>
        <div className="modal__content">
          <form>
            <input type="text" name="subject" id="subject" placeholder='Phys3103' onChange={e => setSubject(e.target.value)}/>
            <div className='row'>
              {
                days.map((day, i) => {
                  return (
                    <div key={i}>
                      <input type="checkbox" name={day} id={day} value={i} defaultChecked={i === Number(thisDay) && true} onChange={handleCheckbox}/>
                      <label htmlFor={day}> {day}</label>
                    </div>
                  )
                })
              }

            </div>
            
            <button type="submit" onClick={passUpSubject}>Add</button>
          </form>
        </div>
      </div>
    )
  }


  export default SubjectDetails;