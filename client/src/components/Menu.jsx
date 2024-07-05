import '../css/menu.css'

function Menu(){

    return(
        <nav className="nav-menu">
            <a href="./">
                <img src="/wolf.png" alt="" id="logo" width="100px" height="100px"/>
            </a>
            <a href="" className="itim-regular">INICIO</a>
            <a href="./tasks" className="itim-regular">TASKS</a>
            <a href="" className="itim-regular">FINANCE</a>
            <a href="" className="itim-regular">COMPANYS</a>
            <a href="" className="itim-regular">PROJECTS</a>
        </nav>
        )
    }

export default Menu