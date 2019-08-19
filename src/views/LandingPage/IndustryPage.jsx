import React from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";

import '../../websiteAssets/css/dark.css';
import '../../websiteAssets/css/style.css';
const WebsiteHeader = React.lazy(() => import('./WebsiteHeader'));
const WebsiteFooter = React.lazy(() => import('./WebsiteFooter'));

const IndustryPage = () => {

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
    <div className="cover" data-image={require("../../websiteAssets/images/industry/iot-banner.jpg")}>
      <div className="page-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Industry</h1>
            </div>
            <div className="col-lg-12">
              <ol className="breadcrumb">
                <li><a href="index.html">Home</a></li>
                <li className="active">Industry</li>
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
          <div className="col-lg-12" id="LuxuryApparelFootwear">
            <div className="about">
              <div className="about-image">
                <img src={require("../../websiteAssets/images/industry/accessories.jpg")} alt />
              </div>
              <div className="about-text">
                <div className="icon">
                  <img src={require("../../websiteAssets/images/industry/luxury-icon.png")} className="img-fluid" />
                </div>
                <h2>Luxury / Apparel / Footwear</h2>
                <ul>
                  <li>$600 billion global counterfeit fashion market encompasses huge risks to both brands &amp; consumers</li>
                  <li>Arthanium Platform utilizes IoT chips / inlays to create a unique &amp; unforgeable Digital identity</li>
                  <li>Track &amp; trace the product through supply chain &amp; maintain a secured record of its journey (provenance)</li>
                  <li>Consumers can verify authenticationof products using</li>
                </ul>
                <div><a href="../../websiteAssets/pdf/industry/Blockchain-for-Luxury-Industry.pdf" target="_blank" className="btn-primary-line center-btn">See Presentation</a></div>
              </div>
            </div>
          </div>
          <div className="col-lg-12" id="SmartCities">
            <div className="about left">
              <div className="about-image">
                <img src={require("../../websiteAssets/images/industry/smart-cities.jpg")} alt />
              </div>
              <div className="about-text">
                <div className="icon">
                  <img src={require("../../websiteAssets/images/industry/smart-cities-icon.png")} className="img-fluid" />
                </div>
                <h2>Smart Cities</h2>
                <ul>
                  <li>Smart cities integrate a digital city &amp; IoT (embedded sensors) so that individuals &amp; infrastructure can collaborate to efficiently manage resources</li>
                  <li>Blockchain integration will reduce risk of IoT devices being compromised &amp; create greater transparency, immutability &amp; security to all processes</li>
                  <li>Applications include transport management, digital identity, smart energy, smart payments, waste management &amp; process automation</li>
                </ul>
                <div><a href="../../websiteAssets/pdf/industry/Blockchain-for-Smart-Cities.pdf" target="_blank" className="btn-primary-line center-btn">See Presentation</a></div>
              </div>
            </div>
          </div>
          <div className="col-lg-12" id="ConsumerElectronics">
            <div className="about">
              <div className="about-image">
                <img src={require("../../websiteAssets/images/industry/consumer-electronics.jpg")} alt />
              </div>
              <div className="about-text">
                <div className="icon">
                  <img src={require("../../websiteAssets/images/industry/consumer-electronics-icon.png")} className="img-fluid" />
                </div>
                <h2>Consumer Electronics</h2>
                <ul>
                  <li>Asset identity &amp; registration for Anti-Counterfeiting solutions</li>
                  <li>Provides Digital Identity for Ownership of Goods</li>
                  <li>Track &amp; race &amp; the transfer of ownership across the supply chain &amp; maintain secure record on blockchain</li>
                  <li>Automate process through smart contracts</li>
                </ul>
                <div><a href="../../websiteAssets/pdf/industry/Blockchain-for-Consumer-Electronics.pdf" target="_blank" className="btn-primary-line center-btn">See Presentation</a></div>
              </div>
            </div>
          </div>
          <div className="col-lg-12" id="Pharmaceutical">
            <div className="about left">
              <div className="about-image">
                <img src={require("../../websiteAssets/images/industry/pharmaceutical.jpg")} alt />
              </div>
              <div className="about-text">
                <div className="icon">
                  <img src={require("../../websiteAssets/images/industry/pharmaceutical-icon.png")} className="img-fluid" />
                </div>
                <h2>Pharmaceutical</h2>
                <ul>
                  <li>Asset identity registration, track &amp; trace, anti-counterfeit, &amp; privacy solutions for supply chains</li>
                  <li>Blockchain provides visibility across entire supply chains, from individual ingredients to the patient to which it was prescribed</li>
                </ul>
                <div><a href="../../websiteAssets/pdf/industry/Blockchain-for-Pharma-Industry.pdf" target="_blank" className="btn-primary-line center-btn">See Presentation</a></div>
              </div>
            </div>
          </div>
          <div className="col-lg-12" id="FineArtCollectibles">
            <div className="about">
              <div className="about-image">
                <img src={require("../../websiteAssets/images/industry/fine-art.jpg")} alt />
              </div>
              <div className="about-text">
                <div className="icon">
                  <img src={require("../../websiteAssets/images/industry/fine-art-icon.png")} className="img-fluid" />
                </div>
                <h2>Fine Art / Collectibles</h2>
                <ul>
                  <li>Authenticate unique identity of the artworks by registering them on the blockchain &amp; create a digital identity for the asset</li>
                  <li>Manage assets &amp; trace history of the artwork's ownership through secured record of provenance</li>
                  <li>Digital identity &amp; tokenization will enhanceliquidity&amp; create avenues for fund raise &amp; royalty revenues</li>
                </ul>
                <div><a href="../../websiteAssets/pdf/industry/Blockchain-for-Art-Industry.pdf" target="_blank" className="btn-primary-line center-btn">See Presentation</a></div>
              </div>
            </div>
          </div>
          <div className="col-lg-12" id="FoodBeverages">
            <div className="about left">
              <div className="about-image">
                <img src={require("../../websiteAssets/images/industry/f&b.jpg")} alt />
              </div>
              <div className="about-text">
                <div className="icon">
                  <img src={require("../../websiteAssets/images/industry/f&b-icon.png")} className="img-fluid" />
                </div>
                <h2>F&amp;B / Dairy / Wines</h2>
                <ul>
                  <li>Increase efficiency, transparency and collaboration throughout the food system</li>
                  <li>Track &amp; trace through the supply chain &amp; manage a secured record of provenanceto mitigate adulteration &amp; enhance traceability</li>
                  <li>Consumers can verify authentication of products using a smart phone app</li>
                </ul>
                <div><a href="../../websiteAssets/pdf/industry/Blockchain-for-F&B-Industry.pdf" target="_blank" className="btn-primary-line center-btn">See Presentation</a></div>
              </div>
            </div>
          </div>
          <div className="col-lg-12" id="JewelryPreciousMetals">
            <div className="about">
              <div className="about-image">
                <img src={require("../../websiteAssets/images/industry/jewelry.jpg")} alt />
              </div>
              <div className="about-text">
                <div className="icon">
                  <img src={require("../../websiteAssets/images/industry/jewelry-icon.png")} className="img-fluid" />
                </div>
                <h2>Jewelry / Precious Metals</h2>
                <ul>
                  <li>Identify &amp; track jewelry / precious metals across the supply chain from origin to retail via digital certification &amp; smart contracts</li>
                  <li>Provides an audit trail of an asset by bringing together various stakeholders including miners, refiners, manufacturers, insurance companies, financiers, traders, third party verifiers, law enforcement &amp; claimants</li>
                </ul>
                <div><a href="../../websiteAssets/pdf/industry/Blockchain-for-Jewelry-Industry.pdf" target="_blank" className="btn-primary-line center-btn">See Presentation</a></div>
              </div>
            </div>
          </div>
          <div className="col-lg-12" id="Logistics">
            <div className="about left margin-bottom-60">
              <div className="about-image">
                <img src={require("../../websiteAssets/images/industry/logistics.jpg")} alt />
              </div>
              <div className="about-text">
                <div className="icon">
                  <img src={require("../../websiteAssets/images/industry/logistics-icon.png")} className="img-fluid" />
                </div>
                <h2>Logistics</h2>
                <ul>
                  <li>Track &amp; Trace - Product can be assigned a unique identifier at start of the supply chain&amp; tied to a utility token that is time-stamped as it moves through the supply chain, with the movement of that item stored on the blockchain archive</li>
                  <li>Provenance - Smartphone users can check the unique ID to reveal its history &amp; its origins to ensure it was responsibility sourced or produced</li>
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
export default IndustryPage;