import Menu from "../components/Menu"
import '../css/alfaPage.css'

function AlfaPage(){
    return(
        <>
            <Menu/>
            <div className="container-main">	
                <main>
                    <h1 className="itim-regular title">ALFA SYSTEM</h1>
                </main>
                <video src="/mountains.mp4" className="video-font" autoPlay muted loop/>
            </div>
        </>
    )
}

export default AlfaPage