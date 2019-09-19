import React from 'react';
import { Link } from "react-router-dom";
import '../../WA/css/normalize.css'
import '../../WA/css/detheme.css'
import '../../WA/css/kergan.detheme.css'
var classNames = require('classnames');
export default function Header(props) {
    console.log(props);
    const [isOn, setIsOn] = React.useState(false);

    function toggleMenu() {
        // console.log("inside");
        setIsOn(!isOn)

    }

    const isActive = (location) => {
      return window.location.pathname==location;
    }

    return (
        <div data-collapse="medium" data-animation="default" data-duration={400} className={`nav-bar w-nav ${props.headerStyle}`}>
            <div className="wrapper navbar-2 w-container">
                <div className="div-block-8"><Link to="/" className="nav-logo-2 w-inline-block"><img src="images/logo3.png" width={50} height={50} alt="" /></Link></div>
                <nav role="navigation" className="nav-menu-2 w-nav-menu">
                    <Link to="/" className={classNames("nav-link-2 border w-nav-link",{"active": isActive("/")})}>Home</Link>
                    <Link to="/platform" className={classNames("nav-link-2 border w-nav-link",{"active": isActive("/platform")})}>Platform</Link>
                    <div className="dropdown">
                        <Link to="/partners"><button className={classNames("nav-link-2 border w-nav-link",{"active": isActive("/partners")})}>Partners
                            <i className="fa fa-caret-down" />
                        </button>
                        </Link>
                        <div className="dropdown-content">
                            <Link to="/partners#banks" className="nav-link-2 w-nav-link">Banks</Link>
                            {/* <Link to="/partners#insurance" className="nav-link-2 w-nav-link">Insurance</Link> */}
                            <Link to="/partners#logistics" className="nav-link-2 w-nav-link">Logistics</Link>
                            <Link to="/partners#government" className="nav-link-2 w-nav-link">Government</Link>
                            <Link to="/partners#certificationagencies" className="nav-link-2 w-nav-link">Certification Agencies</Link>
                            <Link to="/partners#hardwaresoftwareintegrators" className="nav-link-2 w-nav-link">Hardware / Software Integrators</Link>
                            <Link to="/partners#portsandterminals" className="nav-link-2 w-nav-link">Ports & Terminals</Link>
                            <Link to="/partners#recyclers" className="nav-link-2 w-nav-link">Recyclers</Link>
                        </div>
                    </div>
                    <div className="dropdown">
                        <Link to="/solutions"><button className={classNames("nav-link-2 border w-nav-link",{"active": isActive("/solutions")})}>Solutions
                            <i className="fa fa-caret-down" />
                        </button></Link>
                        <div className="dropdown-content">
                            <Link to="/solutions#DApps" className="nav-link-2 w-nav-link">DApps</Link>
                            <Link to="/solutions#solutionsforBusiness" className="nav-link-2 w-nav-link">For Business</Link>
                            <Link to="/solutions#solutionsforConsumers" className="nav-link-2 w-nav-link">For Consumers</Link>
                        </div>
                    </div>
                    <Link to="/industry" className={classNames("nav-link-2 border w-nav-link",{"active": isActive("/industry")})}>Industry</Link>
                    <div className="dropdown">
                        <Link to="/aboutus"><button className={classNames("nav-link-2 border w-nav-link",{"active": isActive("/aboutus")})}>About Us
                            <i className="fa fa-caret-down" />
                        </button></Link>
                        <div className="dropdown-content">
                            <Link to="/aboutus" className="nav-link-2 w-nav-link">Company</Link>
                            <Link to="/aboutus#ourteam" className="nav-link-2 w-nav-link">Our Team</Link>
                            <Link to="/aboutus#careersandculture" className="nav-link-2 w-nav-link">Careers & Culture</Link>
                            <Link to="/aboutus#media" className="nav-link-2 w-nav-link">Media</Link>
                            <Link to="/aboutus#latest" className="nav-link-2 w-nav-link">News & Blogs</Link>
                            <Link to="/aboutus#contact" className="nav-link-2 w-nav-link">Contact </Link>
                        </div>
                    </div>
                    <div className="nav-cta-button-container">
                        <a href="/login" className="nav-link-2 border w-nav-link">Get Started</a>
                    </div>
                </nav>
                <div className="menu-button-2 w-nav-button w--open" onClick={toggleMenu}>
                    <div className="burger-icon w-icon-nav-menu" />
                </div>
                {isOn && <div className="w-nav-overlay" data-wf-ignore style={{ height: '9580.6px', display: 'block' }}>
                    <nav role="navigation" className="nav-menu-2 w-nav-menu w--nav-menu-open" style={{ transform: 'translateY(0px) translateX(0px)', transition: 'transform 400ms ease 0s' }}>
                        <Link to="/platform" className="nav-link-2 w-nav-link w--nav-link-open" style={{ maxWidth: '1230px' }}>Platform</Link>
                        <Link to="/partners" className="nav-link-2 w-nav-link w--nav-link-open" style={{ maxWidth: '1230px' }}>Partners</Link>
                        <Link to="/solutions" className="nav-link-2 w-nav-link w--nav-link-open" style={{ maxWidth: '1230px' }}>Solutions</Link>
                        <Link to="/industry" className="nav-link-2 w-nav-link w--nav-link-open" style={{ maxWidth: '1230px' }}>Industry</Link>
                        <Link to="/aboutus" className="nav-link-2 w-nav-link w--nav-link-open" style={{ maxWidth: '1230px' }}>About Us</Link>
                        <div className="nav-cta-button-container">
                            <a href="/login" className="nav-link-2 border w-nav-link w--nav-link-open" style={{ maxWidth: '1230px' }}>Get Started</a></div>
                    </nav></div>}

            </div>
        </div>
    );
}
