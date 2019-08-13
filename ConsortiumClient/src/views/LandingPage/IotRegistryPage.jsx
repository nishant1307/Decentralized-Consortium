import React from "react";
import '../../websiteAssets/css/dark.css';

const WebsiteHeader = React.lazy(() => import('./WebsiteHeader'));
const WebsiteFooter = React.lazy(() => import('./WebsiteFooter'));

const IotRegistryPage = () => {
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
      <div>
        <section className="page">
          {/* ***** Page Top Start ***** */}
          <div className="cover" data-image={require("../../websiteAssets/images/iot-banner.jpg")}>
            <div className="page-top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <h1>IoT Registry Platform</h1>
                  </div>
                  <div className="col-lg-12">
                    <ol className="breadcrumb">
                      <li><a href="index.html">Home</a></li>
                      <li className="active">Solutions - IoT Registry Platform</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ***** Page Top End ***** */}
          {/* ***** Page Content Start ***** */}
          <div className="page-bottom padding-bottom-30">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row flex-row">
                    {/* ***** Features Small Item Start ***** */}
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-5" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                      <a href="https://www.arthanium.org" target="_blank" className="features-small-item">
                        <div className="icon">
                          <img src={require("../../websiteAssets/images/solutions/iot-registry-platform/blockchain.png")} className="img-fluid" />
                        </div>
                        <h5 className="features-title">Blockchain</h5>
                        <p>The blockchain layer is based on Arthanium Multichain Architecture.</p>
                        <p className="mt-2 font-weight-bold"><u>Get Started</u></p>
                      </a>
                    </div>
                    {/* ***** Features Small Item End ***** */}
                    {/* ***** Features Small Item Start ***** */}
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-5" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s">
                      <a href="#" className="features-small-item">
                        <div className="icon">
                          <img src={require("../../websiteAssets/images/solutions/iot-registry-platform/firmware.png")} className="img-fluid" />
                        </div>
                        <h5 className="features-title">Firmware</h5>
                        <p>We connect IoT devices to blockchain by provisioning the devices with cryptographic identities, secure elements, and firmware as well as cryptographic data-signing capabilities</p>
                      </a>
                    </div>
                    {/* ***** Features Small Item End ***** */}
                    {/* ***** Features Small Item Start ***** */}
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-5" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s">
                      <a href="#" className="features-small-item">
                        <div className="icon">
                          <img src={require("../../websiteAssets/images/solutions/iot-registry-platform/clients.png")} className="img-fluid" />
                        </div>
                        <h5 className="features-title">Clients</h5>
                        <p>We offer web based application and mobile apps which can be custom built based on client requirements </p>
                      </a>
                    </div>
                    {/* ***** Features Small Item End ***** */}
                    {/* ***** Features Small Item Start ***** */}
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-5" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.8s">
                      <a href="#" className="features-small-item">
                        <div className="icon">
                          <img src={require("../../websiteAssets/images/solutions/iot-registry-platform/smart-contracts.png")} className="img-fluid" />
                        </div>
                        <h5 className="features-title">Smart Contracts</h5>
                        <p>Smart Contracts serve as the backbone of our registry and can also automate several processes</p>
                      </a>
                    </div>
                    {/* ***** Features Small Item End ***** */}
                    {/* ***** Features Small Item Start ***** */}
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-5" data-scroll-reveal="enter bottom move 50px over 0.6s after 1s">
                      <a href="#" className="features-small-item">
                        <div className="icon">
                          <img src={require("../../websiteAssets/images/solutions/iot-registry-platform/iot-devices.png")} className="img-fluid" />
                        </div>
                        <h5 className="features-title">Iot Devices</h5>
                        <p>We offer several IoT connected identity and data logging products, e.g. TempLogger, CryptoSeal, Identity Inlays, where our blockchain backend offers advantages over conventional methods</p>
                      </a>
                    </div>
                    {/* ***** Features Small Item End ***** */}
                    {/* ***** Features Small Item Start ***** */}
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-5" data-scroll-reveal="enter bottom move 50px over 0.6s after 1.2s">
                      <a href="#" className="features-small-item">
                        <div className="icon">
                          <img src={require("../../websiteAssets/images/solutions/iot-registry-platform/api.png")} className="img-fluid" />
                        </div>
                        <h5 className="features-title">API</h5>
                        <p>API enables enterprises to leverage blockchain synchronization capabilities for their own IoT platforms, and supports ERP integration and flexible data modeling</p>
                      </a>
                    </div>
                    {/* ***** Features Small Item End ***** */}
                  </div>
                  {/*anchor link*/}
                  <div id="IoTPlatform" />
                  {/*anchor link*/}
                </div>
              </div>
            </div>
          </div>
          {/* ***** Page Content End ***** */}
        </section>
        <section className="section colored">
          <div className="container">
            <div className="row margin-bottom-10">
              <div className="col-lg-12">
                <div className="center-heading">
                  <h2 className="section-title">IoT Platform</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 align-self-center mobile-bottom-fix">
                {/* <img src={require("../../websiteAssets/images/solutions/iot-registry-platform/iot-platform.png")} className="img-fluid d-block mx-auto" alt /> */}
              </div>
              <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 align-self-center">
                <ul className="features">
                  <li data-scroll-reveal="enter bottom move 30px over 0.6s after 0.2s" data-scroll-reveal-id={5} data-scroll-reveal-initialized="true" data-scroll-reveal-complete="true">
                    <div className="count">
                      <span>
                        <i className="fa fa-flash" />
                      </span>
                    </div>
                    <div className="text">
                      <p>Blockchain Layer – Hybrid
                        <br />(Permissioned + Private)</p>
                    </div>
                  </li>
                  <li data-scroll-reveal="enter move 30px over 0.6s after 0.3s" data-scroll-reveal-id={6} data-scroll-reveal-initialized="true" data-scroll-reveal-complete="true">
                    <div className="count">
                      <span>
                        <i className="fa fa-code-fork" />
                      </span>
                    </div>
                    <div className="text">
                      <p>Smart Contract + Application</p>
                    </div>
                  </li>
                  <li data-scroll-reveal="enter move 30px over 0.6s after 0.4s" data-scroll-reveal-id={7} data-scroll-reveal-initialized="true" data-scroll-reveal-complete="true">
                    <div className="count">
                      <span>
                        <i className="fa fa-link" />
                      </span>
                    </div>
                    <div className="text">
                      <p>Open API's to incorporate your existing platform or new customized application </p>
                    </div>
                  </li>
                  <li data-scroll-reveal="enter move 30px over 0.6s after 0.5s" data-scroll-reveal-id={8} data-scroll-reveal-initialized="true" data-scroll-reveal-complete="true">
                    <div className="count">
                      <span>
                        <i className="fa fa-desktop" />
                      </span>
                    </div>
                    <div className="text">
                      <p>Desktop, Android, &amp; iOS Clients to commission, verify, send &amp; receive IoT devices &amp; products.</p>
                    </div>
                  </li>
                  <li data-scroll-reveal="enter move 30px over 0.6s after 0.6s" data-scroll-reveal-id={8} data-scroll-reveal-initialized="true" data-scroll-reveal-complete="true">
                    <div className="count">
                      <span>
                        <i className="fa fa-wifi" />
                      </span>
                    </div>
                    <div className="text">
                      <p>Physical Layer - IoT devices / Sensors &amp; Actuators (Light / pressure / motion / temperature / humidity etc.)</p>
                    </div>
                  </li>
                  <li data-scroll-reveal="enter move 30px over 0.6s after 0.7s" data-scroll-reveal-id={8} data-scroll-reveal-initialized="true" data-scroll-reveal-complete="true">
                    <div className="count">
                      <span>
                        <i className="fa fa-diamond" />
                      </span>
                    </div>
                    <div className="text">
                      <p>Application Layer – Pharma, Jewelry, F&amp;B, Luxury, Art</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="section padding-bottom-20">
          {/* ***** Page Content Start ***** */}
          <div className="page-bottom">
            <div className="container">
              <div className="row margin-bottom-20">
                <div className="col-lg-12">
                  <div className="center-heading">
                    <h2 className="section-title">Platform Features &amp; Benefits</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="row flex-row">
                    {/* ***** Features Small Item Start ***** */}
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-5" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s" data-scroll-reveal-id={1} data-scroll-reveal-initialized="true" data-scroll-reveal-complete="true">
                      <div className="features-small-item-noHover">
                        <h5 className="features-title">FEATURES</h5>
                        <ul>
                          <li>Register unique strong cryptographic identity and record transaction on the blockchain</li>
                          <li>Transfer of custody as immutable transactions on a ledger</li>
                          <li>Unique ownership of a trading item across the supply chain</li>
                          <li>Privacy and no loss of business intelligence</li>
                          <li>Complies with GS-1 standards</li>
                          <li>Compliance with track and trace regulations</li>
                          <li>Easier reconciliation of exceptions</li>
                          <li>Extensible platform for supply business transformation</li>
                          <li>Open specifications</li>
                          <li>Built on a blockchain</li>
                        </ul>
                      </div>
                    </div>
                    {/* ***** Features Small Item End ***** */}
                    {/* ***** Features Small Item Start ***** */}
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-5" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s" data-scroll-reveal-id={2} data-scroll-reveal-initialized="true" data-scroll-reveal-complete="true">
                      <div className="features-small-item-noHover">
                        <h5 className="features-title">BENEFITS</h5>
                        <ul>
                          <li>Improved security of information</li>
                          <li>Greater transparency and consumer trust</li>
                          <li>Faster settlement of payments</li>
                          <li>Increased efficiency in trading of goods</li>
                          <li>Reduced reconciliation costs in inventory and vendor management</li>
                          <li>Reduced cost of compliance</li>
                          <li>Authenticated chains of custody</li>
                          <li>Ensured high quality parts and goods</li>
                          <li>Seamless location verification</li>
                        </ul>
                      </div>
                    </div>
                    {/* ***** Features Small Item End ***** */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ***** Page Content End ***** */}
        </section>
      </div>
      <WebsiteFooter/>
    </div>
    {/*End pagewrapper*/}
    {/*Scroll to top*/}
  </div>
    )
}
export default IotRegistryPage;