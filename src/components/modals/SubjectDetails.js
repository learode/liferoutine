import './SubjectDetails.scss';
import './Modal.scss';

import { useState, useEffect } from 'react';

import Button from './../button/Button'


const SubjectDetails = (props) => {
    const {days, thisDay, getSubject} = (props)
    const [subject, setSubject] = useState('');
    const [ difficulty, setDifficulty ] = useState('');
    const [isSubEmpty, setIsSubEmpty] = useState(true);

    // instead of literal day e.g mon or so, will use the index give by the map function
    // This is pusible becuz, parentRow is alway an index of the same order of day
    const [selectedDays, setSelectedDays] = useState(null);

    const passUpSubject = (status) => {
        getSubject({
              status,
              details: {
                subject,
                difficulty,
                days: selectedDays,
              }
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

    const handleInput = e => {
      if (e.target.value.length > 0 ) {
        setIsSubEmpty(false);
        setSubject(e.target.value);
      } else {
        setIsSubEmpty(true);
      }
    }
    const selectDifficultyHandler = e => {
      setDifficulty(e.target.value);
    }


    // record the checked day i.e. the day that is clicked
    useEffect(() => {
      let ds = days.map((day, i) => {
        if (+thisDay === i) {
          return i;
        }
        return '';
      })
      setSelectedDays(ds);
    }, [days, thisDay])

    return (
      <div className='modal'>
        <div className="modal__backdrop" onClick={(e) => passUpSubject('cancel')}></div>
        <div className="modal__content">
          <form>
            <div className='row row_select_sub'>
              <input type="text" name="subject" id="subject" placeholder='Phys3103' onChange={handleInput}/>
              <select name="dificult" id="dificulty" onChange={selectDifficultyHandler}>
                <option value="easy" defaultValue="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="extreme">Extreme</option>
              </select>
            </div>
            {isSubEmpty && <div className='warning'>Subject title is required</div>}
            <div className='row row__checkbox'>
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

            <div className="content__footer row">
              <Button type="submit" disabled={isSubEmpty} onClick={e => {e.preventDefault(); passUpSubject('ok')}}>Add</Button>
              <Button className="btn--cancel" onClick={e => {e.preventDefault(); passUpSubject('cancel')}}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }


  export default SubjectDetails;