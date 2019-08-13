import React from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import '../../websiteAssets/css/style.css';
import '../../websiteAssets/css/responsive.css';
import '../../websiteAssets/css/bootstrap.css';
import '../../websiteAssets/css/style.css';
import '../../websiteAssets/css/responsive.css';
const WebsiteHeader = () => {

    return(
      <div>
      <header className="main-header header-style-one">
        {/*Header-Upper*/}
        <div className="header-upper">
          <div className="auto-container">
            <div className="clearfix">
              <div className="pull-left logo-outer">
                <div className="logo"><a href="/"><img src={require("../../websiteAssets/logo/logo.png")} height="70px" weight="70px" /></a></div>
              </div>
              <div className="pull-right upper-right clearfix">
                <div className="nav-outer clearfix">
                  {/* Main Menu */}
                  <nav className="main-menu navbar-expand-md">
                    <div className="navbar-header">
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                      </button>
                    </div>
                    <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                      <ul className="navigation clearfix">
                        <li><a href="/">Home</a></li>
                        <li ><a href="/architecture">Architecture</a></li>
                        <li className="dropdown"><a href="/solutions">Solutions</a>
                          <ul>
                            <li><a href="/iot-registry-platform">Iot Registry Platform</a></li>
                            <li><a href="/solutions#DigitalIdentity&Provenance">Digital Identity & Provenance</a></li>
                            <li><a href="/solutions#SupplyChain">Supply Chain</a></li>
                            <li><a href="/solutions#AntiCounterfeit">Anti-Counterfeit</a></li>
                            <li><a href="/solutions#AntiDiversion">Anti-Diversion</a></li>
                            <li><a href="/solutions#Automation">Automation</a></li>
                          </ul>
                        </li>

                        <li className="dropdown"><a href="/">Industry</a>
                          <ul>
                            <li><a href="/industry#LuxuryApparelFootwear"><span>Luxury / Apparel / Footwear</span></a></li>
                            <li><a href="/industry#SmartCities"><span>Smart Cities</span></a></li>
                            <li><a href="/industry#ConsumerElectronics"><span>Consumer Electronics</span></a></li>
                            <li><a href="/industry#Pharmaceutical"><span>Pharmaceutical</span></a></li>
                            <li><a href="/industry#FineArtCollectibles"><span>Fine Art / Collectibles</span></a></li>
                            <li><a href="/industry#FoodBeverages"><span>Food & Beverages</span></a></li>
                            <li><a href="/industry#JewelryPreciousMetals"><span>Jewelry / Precious Metals</span></a></li>
                            <li><a href="/industry#Logistics"><span>Logistics</span></a></li>
                          </ul>
                        </li>
                        <li ><a href="/consumer">Consumer</a></li>
                        <li className="dropdown"><a href="/">Company</a>
                          <ul>
                            <li><a href="/about"><span>About</span></a></li>
                            <li><a href="/team"><span>Our Team</span></a></li>
                            <li><a href="https://medium.com/iot-conekt" target="_blank"><span>Media</span></a></li>
                            <li><a href="https://medium.com/iot-conekt" target="_blank"><span>News & Blogs</span></a></li>
                            <li><a href="/contact"><span>Contact</span></a></li>
                          </ul>
                        </li>
                        <li ><a href="/login">Get Started</a></li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*End Header Upper*/}
      </header>
      </div>

    )
}
export default WebsiteHeader;