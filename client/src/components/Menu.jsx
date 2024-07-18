import '../css/menu.css'
import { Link } from 'react-router-dom'

function Menu(){

    return(
        <nav className="nav-menu">
            <Link to="./">
                <img src="/wolf.png" alt="" id="logo" width="100px" height="100px"/>
            </Link>
            <Link to="" className="itim-regular">INICIO</Link>
            <Link to="/tasks" className="itim-regular">TASKS</Link>
            <Link to="" className="itim-regular">FINANCE</Link>
            <Link to="" className="itim-regular">COMPANYS</Link>
            <Link to="" className="itim-regular" >PROJECTS</Link>
        </nav>
        )
    }

export default Menu