import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const NavBar = ()=>{
    return(
        <>
        <div class="col-2 sticky-top">
            <i class="bi bi-twitter fs-3"></i> Twitter<br /><br />
            <i className="bi bi-house fs-3"></i> Home <br /><br />
            <i className="bi bi-bell fs-3"></i> Notification <br /><br />
            <i className="bi bi-person fs-3"></i> Profile <br /><br />
            <i className="bi bi-search fs-3"></i> Search <br /><br />
        </div>
        </>
    )
}

export default NavBar;