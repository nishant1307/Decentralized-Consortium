import React from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import '../../websiteAssets/css/style.css';
import '../../websiteAssets/css/responsive.css';
import '../../websiteAssets/css/bootstrap.css';
const WebsiteHeader = React.lazy(() => import('./WebsiteHeader'));
const WebsiteFooter = React.lazy(() => import('./WebsiteFooter'));
function ArchitecturePage() {

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
    <section className="appointment-box ">
      <div className="inner-box">
        <div className="cross-icon"><span className="flaticon-cancel-1" /></div>
        <div className="title">
          <h2>Get Appointment</h2>
          <div className="separator" />
        </div>
        {/*Appointment Form*/}
        <div className="appointment-form">
          <form method="post" action="contact.html">
            <div className="form-group">
              <input type="text" name="text" defaultValue placeholder="Name" required />
            </div>
            <div className="form-group">
              <input type="email" name="email" defaultValue placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <input type="text" name="phone" defaultValue placeholder="Phone no." required />
            </div>
            <div className="form-group">
              <textarea placeholder="Message" defaultValue={""} />
            </div>
            <div className="form-group">
              <button type="submit" className="theme-btn btn-style-one">Submit now</button>
            </div>
          </form>
        </div>
        {/*Contact Info Box*/}
        <div className="contact-info-box">
          <ul className="info-list">
            <li>alfena@yousite.com</li>
            <li>+(000) 000 0000</li>
          </ul>
          <ul className="social-list clearfix">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Linkedin</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Google +</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
    </section>
    {/*End Consulting Form*/}
    {/* App Section */}
    <section className="app-section style-two">
      <div className="auto-container">
        <div className="row clearfix">
          {/* Image Column */}
          <div className="image-column col-lg-6 col-md-12 col-md-12">
            <div className="inner-column">
              {/* Message Box */}
              {/* Play Box */}
              <div className="play-box  paroller" data-paroller-factor="-0.15" data-paroller-factor-lg="-0.15" data-paroller-factor-md="-0.15" data-paroller-factor-sm="-0.15" data-paroller-type="foreground" data-paroller-direction="horizontal">
                <div className="box-inner">
                  <a href="https://s3.amazonaws.com/iotconekt/videoblocks-connected-devices-internet-of-things-iot-cloud-computing-data-network_rxhsgjlow__D.mp4" className="lightbox-image play-btn">
                    <span className="icon flaticon-play-button-1" />
                  </a>
                  video <br /> 30.min
                </div>
              </div>
              {/* Chat Icon */}
              <div style={{padding:100}} className="chat-icon  paroller" data-paroller-factor="-0.15" data-paroller-factor-lg="-0.15" data-paroller-factor-md="-0.15" data-paroller-factor-sm="-0.15" data-paroller-type="foreground" data-paroller-direction="vertical"><img src={require("../../websiteAssets/images/icons/chat-icon.png")} alt /></div>
              <div style={{padding:100}}  className="image">
                <img src={require("../../websiteAssets/images/secure-min.jpg")} height="500px" width="700px" alt />
              </div>
            </div>
          </div>
          {/* Content Column */}
          <div className="content-column col-lg-6 col-md-12 col-md-12">
            <div className="inner-column">
              <h2>Protocol</h2>
              <div className="text">Arthanium has been built on Arthanium's proven hybrid blockchain architecture. Arthanium is working towards a decentralized web using blockchain to secure enterprise data & ensure privacy. It connects multiple private networks with public & permission less networks, where blockchains create the trust to exchange information & execute transactions via the relay chain bringing scalability, governance & interoperability. Arthanium's ecosystem facilitates for development of blockchain Dapps democratizing technology for the good.</div>
              <a href="https://www.arthanium.org" target="_blank" className="theme-btn btn-style-three">Get to Access <span className="icon flaticon-next-3" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End App Section */}
    <WebsiteFooter/>
  </div>
  {/*End pagewrapper*/}
  {/*Scroll to top*/}

</div>
    )
}
export default ArchitecturePage;