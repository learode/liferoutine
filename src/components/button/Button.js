import './Button.css'

export default function Button (props) {
    return (
        <button type={props.type || 'button'}
                onClick={props.onClick}
                className={`btn ${props.className}`}
                disabled={props.disabled}
                >{props.children}</button>
    )
}