import './Todoes.scss';

import { useState } from 'react';
import ContextMenu from '../../components/contextMenu/ContextMenu.tsx';



const Todoes = props => {
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
    return (
        <section className='todo-list'>
            <div className='full' onContextMenu={contextMenuHandler} onClick={closeContextHandler}>

                {showContextM && <ContextMenu position={position} /> } 
           </div>
        </section>
    )
}

export default Todoes;