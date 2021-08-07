import {useState} from "react"
import {IoClose} from 'react-icons'


function Main(){
    const [toggle, setToggle] = useState(false)
    function close() {
        setToggle(prev => !prev)
    }
    return (
        <div onClick={close}>
            <IoClose />
        </div>
    )
}
export default Main