import React from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
 import coverImg from '../../websiteAssets/images/solutionBanner.jpg'
import '../../websiteAssets/css/dark.css';

const WebsiteHeader = React.lazy(() => import('./WebsiteHeader'));
const WebsiteFooter = React.lazy(() => import('./WebsiteFooter'));

const Solutions = () => {
    return(
      <div>
    <meta charSet="utf-8" />
    {/* Stylesheets */}
    {/*Favicon*/}
    {/* Responsive */}
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    {/*[if lt IE 9]><![endif]*/}
    {/*[if lt IE 9]><![endif]*/}
    <div className="page-wrapper">
      <WebsiteHeader/>
      {/*End Main Header */}
      {/*Form Back Drop*/}
      <div className="form-back-drop" />
      {/*Appointment Box*/}
      {/*End Consulting Form*/}
      <section className="page">
  {/* ***** Page Top Start ***** */}
  <div className="cover" data-image={coverImg}>
    <div className="page-top">
      <div className="container">
        <div className="row">
            <br/>
              <br/>
          <div className="col-lg-12">
            <h1 style={{color:'black'}}>Solutions</h1>
          </div>
          <br/>
            <br/>
          <div className="col-lg-12">
            <ol className="breadcrumb">
              <li><a href="index.html"  style={{color:'black'}}>Home</a></li>
              <li className="active"  style={{color:'black'}}>Solutions</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* ***** Page Top End ***** */}
  {/* ***** Page Content Start ***** */}
  <div className="page-bottom padding-top-0 padding-bottom-30">
    <div className="container">
      <div className="row">
        <div className="col-lg-12" id="DigitalIdentity&Provenance">
          <div className="about">
            <div className="about-image">
              <img src={require("../../websiteAssets/images/solutions/digital-identity.jpg")} alt />
            </div>
            <div className="about-text">
              <div className="icon">
                <img src={require("../../websiteAssets/images/solutions/digital-identity-icon.png")} className="img-fluid" />
              </div>
              <h2>Digital Identity &amp; Provenance</h2>
              <ul>
                <li>Create digital identity for physical goods through IoT integration on blockchain</li>
                <li>Powered by blockchain, web &amp; mobile our platform enables clients to access product data, track their journey &amp;enable customers with access to knowledge</li>
                <li>Industry – Luxury, Fashion consumer electronics, Art / collectibles, Pharmaceuticals, F&amp;B, precious metals</li>
              </ul>
              <div><a href="#" className="btn-primary-line center-btn">See Presentation</a></div>
            </div>
          </div>
        </div>
        <div className="col-lg-12" id="SupplyChain">
          <div className="about left">
            <div className="about-image">
              <img src={require("../../websiteAssets/images/solutions/supply-chain.jpg")} alt />
            </div>
            <div className="about-text">
              <div className="icon">
                <img src={require("../../websiteAssets/images/solutions/supply-chain-icon.png")} className="img-fluid" />
              </div>
              <h2>Supply Chain – Track &amp; Trace</h2>
              <ul>
                <li>Provide proof of any supply chain event or data point to a customer, vendor, regulator, or end consumer</li>
                <li>Key events in a supply chain are securely logged to a blockchain</li>
                <li>Access granted to supply chain partners on selective basis to "view" data on blockchain</li>
                <li>Industry – Luxury, Fashion consumer electronics, Art / collectibles, Pharmaceuticals, F&amp;B, precious metals, Industrials</li>
              </ul>
              <div><a href="#" className="btn-primary-line center-btn">See Presentation</a></div>
            </div>
          </div>
        </div>
        <div className="col-lg-12" id="AntiCounterfeit">
          <div className="about">
            <div className="about-image">
              <img src={require("../../websiteAssets/images/solutions/anti-countefeit.jpg")} alt />
            </div>
            <div className="about-text">
              <div className="icon">
                <img src={require("../../websiteAssets/images/solutions/anti-countefeit-icon.png")} className="img-fluid" />
              </div>
              <h2>Anti-Counterfeit</h2>
              <ul>
                <li>Secure, unique &amp; low cost asset identifiers with blockchain registrations</li>
                <li>Keep a confidential &amp; private record of chain of custody, validating that the chain has been maintained, without revealing proprietary data</li>
                <li>Track &amp; synchronize chain of custody of physical object &amp; digital record with IoT or audit-driven attestations</li>
                <li>Industry – Luxury, Fashion consumer electronics, Art / collectibles, Pharmaceuticals, F&amp;B, precious metals</li>
              </ul>
              <div><a href="#" className="btn-primary-line center-btn">See Presentation</a></div>
            </div>
          </div>
        </div>
        <div className="col-lg-12" id="AntiDiversion">
          <div className="about left">
            <div className="about-image">
              <img src={require("../../websiteAssets/images/solutions/anti-diversion.jpg")} alt />
            </div>
            <div className="about-text">
              <div className="icon">
                <img src={require("../../websiteAssets/images/solutions/anti-diversion-icon.png")} className="img-fluid" />
              </div>
              <h2>Anti-Diversion</h2>
              <ul>
                <li>Secure asset identities combined with blockchain registrations &amp; chain-of-custody</li>
                <li>Track product movements &amp; identify where diversion occurred in the chain &amp; intervene appropriately</li>
                <li>Industries – Luxury, Pharmaceuticals, Consumer Electronics, Food &amp; Beverages, Cosmetics</li>
              </ul>
              <div><a href="#" className="btn-primary-line center-btn">See Presentation</a></div>
            </div>
          </div>
        </div>
        <div className="col-lg-12" id="Automation">
          <div className="about">
            <div className="about-image">
              <img src={require("../../websiteAssets/images/solutions/automation.jpg")} alt />
            </div>
            <div className="about-text">
              <div className="icon">
                <img src={require("../../websiteAssets/images/solutions/automation-icon.png")} className="img-fluid" />
              </div>
              <h2>Automation</h2>
              <ul>
                <li>IoT integration on blockchain can enable several https://www.Arthanium.com to have a digital identity</li>
                <li>Smart contracts cane be used to automate several processes including contracts, payments &amp; transactions</li>
                <li>Industry – Luxury, Fashion consumer electronics, Art / collectibles, Pharmaceuticals, F&amp;B, precious metals</li>
              </ul>
              <div><a href="#" className="btn-primary-line center-btn">See Presentation</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* ***** Page Content End ***** */}
</section>

      <WebsiteFooter/>
    </div>
    {/*End pagewrapper*/}
    {/*Scroll to top*/}

  </div>


    )
}
export default Solutions;