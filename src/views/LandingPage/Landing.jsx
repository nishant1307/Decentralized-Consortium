import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import '../assets/css/style.css';
// import '../assets/css/responsive.css';
const WebsiteHeader = React.lazy(() => import('./WebsiteHeader'));
const WebsiteFooter = React.lazy(() => import('./WebsiteFooter'));
// const WebsiteAppointmentBox = React.lazy(() => import('../containers/WebsiteAppointmentBox'));
// import { SimpleImg } from 'react-simple-img';

const LandingPage = () => {

    return (
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
          <WebsiteHeader />
          {/*End Main Header */}
          {/*Form Back Drop*/}
          <div className="form-back-drop" />
          {/*Appointment Box*/}
          {/* <WebsiteAppointmentBox /> */}
          {/*End Consulting Form*/}
          {/* Banner Section Two */}
          <section className="banner-section-two">
            <div className="my-background"></div>
            <div className="auto-container">

              {/* Content Column */}
              <div className="content-column">
                <div className="inner-column wow fadeInDown">
                  <h3> Anti-Counterfeiting, Provenance and Chain of Custody solutions using Blockchain and IoT</h3>
                  <div className="text1">Create digital identities for physical assets through unique identifiers to track them through their journey and make selective information available to all stakeholders.</div>
                  <a href="/login" className="theme-btn btn-style-two">Explore Now <span className="icon flaticon-next-3" /></a>
                </div>
              </div>
              {/* Image Box */}
              <div className="image-box">
                <div className="image wow fadeInUp">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                </div>
              </div>
            </div>
          </section>
          <section className="services-section-two">
            <div className="auto-container">
              {/* Sec Title */}
              <div className="sec-title centered">
                <h2>What is Arthanium ?</h2>
              </div>
              {/* Services Block Two */}
              <div className="services-block-two style-two">
                <div className="inner-box">
                  <div className="row clearfix">
                    {/* Content Column */}
                    {/* Image Column */}
                    <div className="image-column col-lg-6 col-md-12 col-sm-12">
                      <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                        <div className="image">
                          <img src={require("../../websiteAssets/images/solutions/digital-identity.jpg")} height="300" width="600" alt="Smiley face"  />
                        </div>
                      </div>
                    </div>

                    <div className="content-column col-lg-6 col-md-12 col-sm-12">
                      <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms" style={{marginLeft:"50px"}}>
                        <div className="icon-box">
                          <span className="icon flaticon-light-bulb" />
                        </div>
                        <h3>Digital Identity & Provenance</h3>
                        <div className="text">Tell the story of your brand and it's journey from production to market place. Build trust and credibility with customers. Get a digital identity for  physical products / assets on the block chain using a variety of iot tags which can be scanned using our app to reveal information.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="services-block-two style-two">
                <div className="inner-box">
                  <div className="row clearfix">
                    {/* Content Column */}
                    <div className="content-column col-lg-6 col-md-12 col-sm-12">
                      <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                        <div className="icon-box">
                          <span className="icon flaticon-multiple-users-silhouette" />
                        </div>
                        <h3>Anti-Counterfeit</h3>
                        <div className="text">Using a combination of  web /mobile apps , block chain and iot we provide  secure anti counterfeiting solutions for various business in pharma, F&B ,Retail, art & collectibles.</div>
                      </div>
                    </div>
                    {/* Image Column */}
                    <div className="image-column col-lg-6 col-md-12 col-sm-12">
                      <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                        <div className="image">
                          <img src={require("../../websiteAssets/images/solutions/anti-countefeit.jpg")} height="300" width="600" alt="Smiley face"  />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Services Block Three */}
              <div className="services-block-three style-two">
                <div className="inner-box">
                  <div className="row clearfix">
                    {/* Image Column */}
                    <div className="image-column col-lg-6 col-md-12 col-sm-12">
                      <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                        <div className="image">
                          <img src={require("../../websiteAssets/images/solutions/supply-chain.jpg")} height="300" width="600" alt="Smiley face"  />
                      </div>
                      </div>
                    </div>
                    {/* Content Column */}
                    <div className="content-column col-lg-6 col-md-12 col-sm-12">
                      <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                        <div className="icon-box">
                          <span className="icon flaticon-big-anchor" />
                        </div>
                        <h3>Supply Chain – Track & Trace</h3>
                        <div className="text">Securely track journey of a product / asset from production to market place. Various stakeholders can be connected through blockchain and access immutable information about products / assets throughout the journey. Using sensors can enhance the level of information eg. temperature controlled logistics. </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Services Block Two */}
              {/* Services Block 4 */}
              <div className="services-block-two style-two">
                <div className="inner-box">
                  <div className="row clearfix">
                  <div className="content-column col-lg-6 col-md-12 col-sm-12">
                    <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                      <div className="icon-box">
                        <span className="icon flaticon-multiple-users-silhouette" />
                      </div>
                      <h3>Automation</h3>
                      <div className="text">A ecosystem built around this can automate various cogs of global trade including trade finance , digitized doccumentation, provenance & supply chain. Time consuming work flows can be simplified using smart contracts.</div>
                    </div>
                  </div>
                    <div className="image-column col-lg-6 col-md-12 col-sm-12">
                      <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                        <div className="image">
                            <img  src={require("../../assets/images/solutions/automation.jpg")} height="300" width="600" alt="Smiley face"  />
                        </div>
                      </div>
                    </div>
                    {/* Image Column */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* End Services Section Two */}
          {/* Pricing Section */}
          <section className="pricing-section style-two">
            <div className="auto-container">
              {/* Sec Title */}
              <div className="sec-title centered">
                <h2>Easy Pricing Plans</h2>
              </div>
              <div className="pricing-inner-container">
                {/* Monthly Package */}
                <div className="monthly-package">
                  <div className="row clearfix">
                    {/* Price Block */}
                    <div className="price-block col-lg-4 col-md-6 col-sm-12">
                      <div className="inner-box">
                        <div className="title-box">
                          <h2>Pro</h2>
                        </div>
                        <div className="content-box">
                          <div className="price"><sub>$</sub> 50<span>/month</span></div>
                          <div className="title">$500 USD billed annually</div>
                          {/* Price List */}
                          <ul className="price-list">
                            <li className="check"><span className="check fa fa-check" />x% Transaction fee</li>
                            <li className="check"><span className="check fa fa-check" />Upto 50 Devices</li>
                            <li className="check"><span className="check fa fa-check" />Data – 500 MB</li>
                            <li className="check"><span className="check fa fa-check" />Support – Included</li>
                          </ul>
                          {/* Button Box */}
                          <div className="btn-box">
                            <a href="/login" className="theme-btn btn-style-four">Get Started</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Price Block */}
                    <div className="price-block col-lg-4 col-md-6 col-sm-12">
                      <div className="inner-box">
                        <div className="title-box">
                          <h2>Business</h2>
                        </div>
                        <div className="content-box">
                          <div className="price"><sub>$</sub> 500<span>/month</span></div>
                          <div className="title">$5000 USD billed annually</div>
                          {/* Price List */}
                          <ul className="price-list">
                          <li className="check"><span className="check fa fa-check" />x% Transaction fee</li>
                          <li className="check"><span className="check fa fa-check" />Upto 500 Devices</li>
                          <li className="check"><span className="check fa fa-check" />Data – 1 GB</li>
                          <li className="check"><span className="check fa fa-check" />Support – Included</li>
                          </ul>
                          {/* Button Box */}
                          <div className="btn-box">
                            <a href="/login" className="theme-btn btn-style-four">Get Started</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Price Block */}
                    <div className="price-block col-lg-4 col-md-6 col-sm-12">
                      <div className="inner-box">
                        <div className="title-box">
                          <h2>Enterprise</h2>
                        </div>
                        <div className="content-box">
                          <div className="price"><sub>$</sub> 1500<span>/month</span></div>
                          <div className="title">$15000 USD billed annually</div>
                          {/* Price List */}
                          <ul className="price-list">
                          <li className="check"><span className="check fa fa-check" />x% Transaction fee</li>
                          <li className="check"><span className="check fa fa-check" />Unlimited Devices</li>
                          <li className="check"><span className="check fa fa-check" />Data – 5 GB</li>
                          <li className="check"><span className="check fa fa-check" />Support – Included</li>
                          </ul>
                          {/* Button Box */}
                          <div className="btn-box">
                            <a href="login" className="theme-btn btn-style-four">Get Started</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* End Pricing Section */}
          {/* Platform Section */}
          <section className="platform-section">
            <div className="auto-container">
              {/* Title Box */}
              <div className="title-box">
                <h2>A native app for every platform</h2>
                <div className="text">The platform is accessible on both web and mobile.</div>
              </div>
              {/* Inner Container */}
              <div className="inner-container">
                <div className="row clearfix">
                  {/* Image Column */}
                  <div className="image-column col-lg-4 col-md-4 col-sm-12">
                    <div className="image paroller" data-paroller-factor="-0.15" data-paroller-factor-lg="-0.15" data-paroller-factor-md="-0.15" data-paroller-factor-sm="-0.15" data-paroller-type="foreground" data-paroller-direction="horizontal">
                      <img  src={require("../../assets/images/resource/platform.png")} alt="Image" />
                    </div>
                  </div>
                  {/* Image Column */}
                  <div className="image-column col-lg-4 col-md-4 col-sm-12">
                    <div className="image paroller" data-paroller-factor="0.10" data-paroller-factor-lg="0.10" data-paroller-factor-md="0.10" data-paroller-factor-sm="0.10" data-paroller-type="foreground" data-paroller-direction="vertical">
                    <img src={require("../../websiteAssets/images/resource/platform-1.png")} alt="Image" />
                    </div>
                  </div>
                  {/* Image Column */}
                  <div className="image-column col-lg-4 col-md-4 col-sm-12">
                    <div className="image paroller" data-paroller-factor="0.15" data-paroller-factor-lg="0.15" data-paroller-factor-md="0.15" data-paroller-factor-sm="0.15" data-paroller-type="foreground" data-paroller-direction="horizontal">
                      <img  src={require("../../assets/images/resource/platform-2.png")} alt="Image" />
                    </div>
                  </div>
                </div>
                {/* Button Box */}
                <div className="button-box text-center">
                  <a href="#" className="theme-btn btn-style-two">Get to Access <span className="icon flaticon-next-3" /></a>
                </div>
              </div>
            </div>
          </section>
          {/* End Platform Section */}
          {/* Download Section Two */}
          { /*<section className="download-section-two" style={{ backgroundImage: 'url(https://www.Arthanium.com/images/background/1.jpg)' }}>
            <div className="auto-container">
              <div className="row clearfix">
                <div className="title-column col-lg-5 col-md-12 col-sm-12">
                  <div className="inner-column">
                    <h2>Download Arthanium today</h2>
                    <div className="text">Efficiently unleash cross-media information without cross-media value. Quickly maximizePodcasting operational change ment inside of workflows to establish a framework. </div>
                    <div className="buttons-box">
                      <a href="#" className="theme-btn"><SimpleImg animationDuration={2} src="../../assets/logo/images/icons/playstore-btn.png" alt="Image" /></a>
                      <a href="#" className="theme-btn"><SimpleImg animationDuration={2} src="../../assets/logo/images/icons/google-play.png" alt="Image" /></a>
                    </div>
                  </div>
                </div>
                <div className="clients-column col-lg-7 col-md-12 col-sm-12">
                  <div className="inner-column">
                    <ul className="clients clearfix">
                      <li><a href="#"><SimpleImg animationDuration={2} src="../../assets/logo/images/clients/6.png" alt="Image" /></a></li>
                      <li><a href="#"><SimpleImg animationDuration={2} src="../../assets/logo/images/clients/7.png" alt="Image" /></a></li>
                      <li><a href="#"><SimpleImg animationDuration={2} src="../../assets/logo/images/clients/8.png" alt="Image" /></a></li>
                      <li><a href="#"><SimpleImg animationDuration={2} src="../../assets/logo/images/clients/9.png" alt="Image" /></a></li>
                      <li><a href="#"><SimpleImg animationDuration={2} src="../../assets/logo/images/clients/10.png" alt="Image" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          {/* End Download Section Two */}
          {/* New Section */}
          <section className="news-section">
            <div className="auto-container">
              <div className="sec-title centered">
                <h2>Latest Blog</h2>
              </div>
              <div className="row clearfix">
                <div className="news-block col-lg-4 col-md-6 col-sm-12">
                  <div className="inner-box wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                    <div className="image">
                      <a target="_blank" href="https://link.medium.com/FXVcOO62PW"><img  src="https://cdn-images-1.medium.com/max/1600/1*3_ydatU3fWZAVRUMbiE2gA.jpeg" height="300px" alt="Image" /></a>
                    </div>
                    <div className="lower-content">
                      <div className="time">May 20 2019 , 4 min Read</div>
                      <h3><a target="_blank" href="https://link.medium.com/FXVcOO62PW">Internet of Things (IoT)</a><br/><br/></h3>
                      <div className="clearfix">
                        <div className="pull-left">
                          <div className="author-box">
                            <div className="author-inner">
                              <div className="image">
                                <img  src="https://cdn-images-1.medium.com/fit/c/120/120/2*aJ-cFcNNhlN8xvhl4_s7_w.jpeg" alt="Image" />
                              </div>
                              <div className="admin">Author:</div>
                              <div className="author-name">Sandesh Hegde</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="news-block col-lg-4 col-md-6 col-sm-12">
                  <div className="inner-box wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                    <div className="image">
                      <a target="_blank" href="https://link.medium.com/L2xg1182PW"><img src="https://cdn-images-1.medium.com/max/1600/1*CeeG3tZspNbZ-RaQ9Y7z4Q.png" height="300px" alt="Image" /></a>
                    </div>
                    <div className="lower-content">
                      <div className="time">May 20 2019 , 3 min Read</div>
                      <h3><a target="_blank" href="https://link.medium.com/L2xg1182PW">Provenance in a Blockchain world</a></h3>
                      <div className="clearfix">
                        <div className="pull-left">
                          <div className="author-box">
                            <div className="author-inner">
                              <div className="image">
                                <img  src="https://cdn-images-1.medium.com/fit/c/120/120/2*aJ-cFcNNhlN8xvhl4_s7_w.jpeg" alt="Image" />
                              </div>
                              <div className="admin">Author:</div>
                              <div className="author-name">Sandesh Hegde</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="news-block col-lg-4 col-md-6 col-sm-12">
                  <div className="inner-box wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                    <div className="image">
                      <a target="_blank" href="https://link.medium.com/HW3V0Ya3PW"><img src={require("../../assets/images/newBg.jpg")} height="300px" alt="Image" /></a>
                    </div>
                    <div className="lower-content">
                      <div className="time">May 20 2019 , 2 min Read</div>
                      <h3><a target="_blank" href="https://link.medium.com/HW3V0Ya3PW">IoT Conekt is the first inhouse Dapp to be built on the...</a></h3>
                      <div className="clearfix">
                        <div className="pull-left">
                          <div className="author-box">
                            <div className="author-inner">
                              <div className="image">
                                <img src="https://cdn-images-1.medium.com/fit/c/120/120/2*aJ-cFcNNhlN8xvhl4_s7_w.jpeg" alt="Image" />
                              </div>
                              <div className="admin">Author:</div>
                              <div className="author-name">Sandesh Hegde</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* End New Section */}
          <WebsiteFooter />
        </div>
      </div>

  )
}
export default LandingPage;
