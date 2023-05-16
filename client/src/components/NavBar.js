import React from 'react';
import { HiAcademicCap } from "react-icons/hi";
import { Link } from 'react-router-dom';


function NavBar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-secondary bg-light">
                <Link className="navbar-brand" to="/" style={{"fontSize": "34px"}}><HiAcademicCap/><span>AIMS</span></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto " style={{"fontSize": "26px"}}>
                        <li className="nav-item active nav-link pl-5">
                            <Link  to="/"> Home</Link>
                        </li>
                        <li className="nav-item  pl-5 nav-link">
                            <Link  to="/about"> Info</Link>
                        </li>
                        <li className="nav-item active nav-link pl-5">
                            <Link  to="/login"> Login</Link>
                        </li>
                        <li className="nav-item active nav-link pl-5">
                            <Link  to="/register"> Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavBar;