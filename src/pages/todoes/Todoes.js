import './Todoes.scss';

import { useState } from 'react';
import ContextMenu from '../../components/contextMenu/ContextMenu.tsx';


const initialTodoes = [
    {
        title: 'Sleep by 12pm',
        complete: false,
        id: 1,
    },
    {
        title: 'Wake up by 5:30pm',
        complete: true,
        id: 2,
    }
]


const Todoes = props => {
    const [ showContextM, setShowContextM] = useState(false);
    const [ position, setPosition ] = useState({});

    const closeContextHandler = e => {
        setShowContextM(false)
    }
    const contextMenuHandler = e => {
        e.preventDefault()
        const { clientX: frmLeft, clientY: frmTop } = e;

        console.log(e)
        setPosition(prev => {
            return {
                frmTop,
                frmLeft,
            }
        })
        // constextMenu.style.top = `${mouseX}px`;
        setShowContextM(true);
    }
    return (
        <section className='todo-list'>
            <div className='full' onContextMenu={contextMenuHandler} onClick={closeContextHandler}>

                {showContextM && <ContextMenu position={position} /> } 
           </div>
        </section>
    )
}

export default Todoes;