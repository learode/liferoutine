/**
 * Collect the users time details and the days
 * Pass this data to the App
 */
import './TimetableSetup.css'

import { useState } from "react"

import Button from './../button/Button'

export default function TimetableSetup (props) {
    const [details, setDetails] = useState({
        periods: '4hours', // defaultValue of the select
        days: [],
    })

    const [allSelected, setAllSelected] = useState(false);

    const passDetailsUp = () => {
        console.log(details);

        props.passdetails(details);
    }

    const handleSelected = (event) => {
        const selected = event.target.textContent;

        if (selected === 'All') {
            if (details.days.length === 7) {
                 setDetails({...details, days: []})
            } else {
                setDetails({
                    ...details,
                     days: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
                });
            }
            setAllSelected(!allSelected);
            return;
        } 
        if (details.days.includes(selected)) {
            setDetails((prevDetails) => {
                let days = prevDetails.days.filter(day => day !== selected)
                return {...prevDetails, days}
            })
        } else {
            // console.log(details.days)
            let days = [...details.days, selected]
            setDetails({...details, days});
        }
        event.target.classList.toggle('all')
    }

    const selectTimeHandler = e => {
        setDetails((prevDetails) => { 
            return {
                ...prevDetails,
                periods: e.target.value,
            }       
        })
    }


    return (
        <div className="modal__full">
            {/* { console.log('w', ...details.days) } */}
            <form>
                <div className="form-control">
                    <label className='labels' htmlFor="hours-count">
                        Hour many hours do you intend to study
                    </label>
                    <select name="hours-count" id="hours-count" onChange={selectTimeHandler}>
                        <option value='4hours' defaultValue='4hours'> 4 hours (frm 7:00 to 11:00)</option>
                        <option value='8hours'> 8 hours (from 7:00 to 14:00)</option>
                        <option value='12hours'> 12 hours</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className='labels' htmlFor="check">
                        Which weekdays are you workdays 
                    </label>
                    <div className="form-checkbox">
                        <Button id="check" className={`checkbox-btn ${allSelected && 'all'}`} onClick={handleSelected}>All</Button>
                        <Button className={`checkbox-btn ${allSelected && 'all'}`} onClick={handleSelected}>Mon</Button>
                        <Button className={`checkbox-btn ${allSelected && 'all'}`} onClick={handleSelected}>Tue</Button>
                        <Button className={`checkbox-btn ${allSelected && 'all'}`} onClick={handleSelected}>Wed</Button>
                        <Button className={`checkbox-btn ${allSelected && 'all'}`} onClick={handleSelected}>Thur</Button>
                        <Button className={`checkbox-btn ${allSelected && 'all'}`} onClick={handleSelected}>Fri</Button>
                        <Button className={`checkbox-btn ${allSelected && 'all'}`} onClick={handleSelected}>Sat</Button>
                        <Button className={`checkbox-btn ${allSelected && 'all'}`} onClick={handleSelected}>Sun</Button>
                    </div>
                </div>

                {/* <div className="form-control"> */}
                    <Button className='generate-form-btn' onClick={passDetailsUp} >Generate Table</Button>
                {/* </div> */}
            </form>
        </div>     
    )
}