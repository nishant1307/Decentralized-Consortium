import React from "react";
import '../../websiteAssets/css/style.css';
import '../../websiteAssets/css/responsive.css';
import '../../websiteAssets/css/bootstrap.css';
const WebsiteHeader = React.lazy(() => import('./WebsiteHeader'));
const WebsiteFooter = React.lazy(() => import('./WebsiteFooter'));
import aboutus from '../../websiteAssets/images/aboutus-min.jpg'

function AboutUsPage() {
    return(
      <div>
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  {/*[if lt IE 9]><![endif]*/}
  {/*[if lt IE 9]><![endif]*/}
  <div className="page-wrapper">
    <WebsiteHeader/>
    {/*Form Back Drop*/}
    <div className="form-back-drop" />
    {/*Appointment Box*/}
    {/*End Consulting Form*/}
    {/* Banner Section Three */}
    <section className="banner-section-three">
      <div className="auto-container">
        <div className="row clearfix">
          {/*Content Column*/}
          <div className="content-column col-lg-6 col-md-12 col-sm-12">
            <div className="inner-column wow slideInLeft">
              <h2>About Us</h2>
              <div className="text">Arthanium is an open blockchain based application  ("The Platform") converging latest in blockchain, IoT, and analytics technologies. It securely links IoT identities to physical assets through blockchain, smart contracts & firmware for creating digital identity, provenance, authentication, e-commerce, supply chain & finance. Industry applications for the platform include smart cities, pharma, packaging, logistics, Fashion / Luxury, Food & beverages, precious metals & Jewelry.</div>
            </div>
          </div>
          {/*Image Column*/}
          <div className="image-column col-lg-6 col-md-12 col-sm-12">
            <div className="image paroller" data-paroller-factor="0.15" data-paroller-factor-lg="0.15" data-paroller-factor-md="0.10" data-paroller-factor-sm="0.10" data-paroller-type="foreground" data-paroller-direction="horizontal">
              <img src={aboutus} alt height="500px"/>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*End Banner Section Three */}
    {/* Services Section */}
    <section className="services-section">
      <div className="auto-container">
        {/* Sec Title */}
        <div className="sec-title centered">
          <h2>The only app you will need</h2>
        </div>
        <div className="row clearfix">
          {/* Services Block */}
          <div className="services-block col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
              <div className="icon-box">
                <span className="icon flaticon-locked" />
              </div>
              <h3>Scalable</h3>
              <div className="text">Scalable Blockchain architecture.</div>
            </div>
          </div>
          {/* Services Block */}
          <div className="services-block col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInLeft" data-wow-delay="300ms" data-wow-duration="1500ms">
              <div className="icon-box">
                <span className="icon flaticon-speed-meter" />
              </div>
              <h3>Secure</h3>
              <div className="text">Secure IOT devices on Blockchain.</div>
            </div>
          </div>
          {/* Services Block */}
          <div className="services-block col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInLeft" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="icon-box">
                <span className="icon flaticon-heart" />
              </div>
              <h3>Automation</h3>
              <div className="text">Automate your processes with smart contract.</div>
            </div>
          </div>
          {/* Services Block */}
          <div className="services-block col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInLeft" data-wow-delay="900ms" data-wow-duration="1500ms">
              <div className="icon-box">
                <span className="icon flaticon-like-1" />
              </div>
              <h3>24h Support</h3>
              <div className="text">Efficiently unleash cross-media information without.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End Services Section */}
    <WebsiteFooter/>
  </div>
  {/*End pagewrapper*/}
  {/*Scroll to top*/}

</div>

    )
}
export default AboutUsPage;