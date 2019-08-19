import React, {useEffect} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import '../../websiteAssets/css/style.css';
import '../../websiteAssets/css/responsive.css';
const WebsiteHeader = React.lazy(() => import('./WebsiteHeader'));
const WebsiteFooter = React.lazy(() => import('./WebsiteFooter'));
// import mainImg from '../assets/images/contactUS.jpg'
// import img2 from '../assets/images/contactUs2.jpg'


function Contact() {
  useEffect(() => {
    var widget_id = 'vQ4Fb8Pong';
    var d=document;
    var w=window;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//code.jivosite.com/script/widget/'+widget_id;
      var ss = document.getElementsByTagName('script')[0];
      ss.parentNode.insertBefore(s, ss);
  }, []);
    return(
      <div>
  <div className="page-wrapper">
    {/* Preloader */}
    {/* Main Header*/}
    <WebsiteHeader />
    {/*End Main Header */}
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
            <div className="inner-column wow fadeInLeft">
              <h2>Contact Us</h2>
              <div className="text">Get in touch with us to know more.</div>
            </div>
          </div>
          {/*Image Column*/}
          <div className="image-column col-lg-6 col-md-12 col-sm-12">
            <div className="image  wow slideInRight" data-wow-delay="0ms" data-wow-duration="2500ms">
            <img src={require("../../websiteAssets/images/contactBanner.jpg")} alt height="700px" width="700px"/>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*End Banner Section Three */}
    {/* Contact Page Section */}
    <section className="contact-page-section">
      <div className="auto-container">
        <div className="row clearfix">
          {/* Map Column */}
          <div className="map-column col-lg-6 col-md-12 col-sm-12">
            <div className="inner-column">
              {/*Map Outer*/}
              <div className="map-outer">
                {/*Map Canvas*/}
                {/* <div className="map-canvas" data-zoom={12} data-lat="-37.817085" data-lng="144.955631" data-type="roadmap" data-hue="#ffc400" data-title="Envato" data-icon-path={img2} data-content="Melbourne VIC 3000, Australia<br><a href='mailto:info@youremail.com'>info@youremail.com</a>"> */}
                <img src={require("../../websiteAssets/images/contactUs2.jpg")} alt="main image" />
                {/* </div> */}
              </div>
            </div>
          </div>
          {/* Form Column */}
          <div className="form-column col-lg-6 col-md-12 col-sm-12">
            <div className="inner-column">
              {/* Contact Form */}
              <div className="contact-form">
                {/* Title Box */}
                <div className="title-box">
                  <h2>Leave a Reply</h2>
                  <div className="title">Your email address will not be published. Required fields are marked *</div>
                </div>
                {/*Contact Form*/}
                <form method="post" action="" id="contact-form">
                  <div className="row clearfix">
                    <div className="form-group col-lg-6 col-md-6 col-sm-12">
                      <input type="text" name="username" placeholder="Name*" required />
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12">
                      <input type="email" name="email" placeholder="Email*" required />
                    </div>
                    <div className="form-group col-lg-12 col-md-12 col-sm-12">
                      <input type="text" name="subject" placeholder="Subject*" required />
                    </div>
                    <div className="form-group col-lg-12 col-md-12 col-sm-12">
                      <textarea className="darma" name="message" placeholder="Type Your Message *" defaultValue={""} />
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12">
                      <button className="theme-btn btn-style-two" type="submit" name="submit-form">Send Now <span className="icon flaticon-next-3" /></button>
                    </div>
                  </div>
                </form>
              </div>
              {/*End Contact Form */}
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Main Footer */}
    <WebsiteFooter />
    {/* End Main Footer */}
  </div>
  {/*End pagewrapper*/}
  {/*Scroll to top*/}
</div>

    )
}
export default Contact;