import React from 'react';
import { Link } from "react-router-dom";
import '../../WA/css/normalize.css'
import '../../WA/css/detheme.css'
import '../../WA/css/kergan.detheme.css'
export default function Header(props) {
    console.log(props);
    
    return (
        <div data-collapse="medium" data-animation="default" data-duration={400} className={`nav-bar w-nav ${props.headerStyle}`}>
            <div className="wrapper navbar-2 w-container">
                <div className="div-block-8"><Link to="/" className="nav-logo-2 w-inline-block"><img src="images/logo3.png" width={50} height={50} alt="" /></Link></div>
                <nav role="navigation" className="nav-menu-2 w-nav-menu">
                    <Link to="/platform" className="nav-link-2 w-nav-link">Platform</Link>
                    <div className="dropdown">
                        <button className="dropbtn">Partners
                            <i className="fa fa-caret-down" />
                        </button>
                        <div className="dropdown-content">
                            <Link to="/partners#banks" className="nav-link-2 w-nav-link">Banks</Link>
                            <Link to="/partners#insurance" className="nav-link-2 w-nav-link">Insurance</Link>
                            <Link to="/partners#logistivs" className="nav-link-2 w-nav-link">Logistics</Link>
                            <Link to="/partners#certificationagencies" className="nav-link-2 w-nav-link">Certification Agencies</Link>
                            <Link to="/partners#government" className="nav-link-2 w-nav-link">Government</Link>
                            <Link to="/partners#recyclers" className="nav-link-2 w-nav-link">Recyclers</Link>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Solutions
                            <i className="fa fa-caret-down" />
                        </button>
                        <div className="dropdown-content">
                            <Link to="/solutions#DApps" className="nav-link-2 w-nav-link">DApps</Link>
                            <Link to="/solutions#solutionsforBusiness" className="nav-link-2 w-nav-link">For Business</Link>
                            <Link to="/solutions#solutionsforConsumers" className="nav-link-2 w-nav-link">For Business</Link>
                        </div>
                    </div>
                    <Link to="/industry" className="nav-link-2 w-nav-link">Industry</Link>
                    <div className="dropdown">
                        <button className="dropbtn">About Us
                            <i className="fa fa-caret-down" />
                        </button>
                        <div className="dropdown-content">
                            <Link to="/aboutus" className="nav-link-2 w-nav-link">Company</Link>
                            <Link to="/ourteam" className="nav-link-2 w-nav-link">Our Team</Link>
                            <Link to="/aboutus#media" className="nav-link-2 w-nav-link">Media</Link>
                            <Link to="/aboutus#latest" className="nav-link-2 w-nav-link">News & Blogs</Link>
                        </div>
                    </div>
                    <div className="nav-cta-button-container">
                        <a href="/login" className="nav-link-2 border w-nav-link">Get Started</a>
                    </div>
                </nav>
                <div className="menu-button-2 w-nav-button">
                    <div className="burger-icon w-icon-nav-menu" />
                </div>
            </div>
        </div>
    );
}
