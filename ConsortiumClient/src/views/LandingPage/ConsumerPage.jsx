import React from 'react';
import { Link } from "react-router-dom";
const WebsiteHeader = React.lazy(() => import('./WebsiteHeader'));
const WebsiteFooter = React.lazy(() => import('./WebsiteFooter'));

const ConsumerPage = () => {
  return(
    <div>
      <WebsiteHeader/>
      <section className="banner-section-two">
      <div class="consumer-background"></div>
          <div className="content-column">
            <div className="inner-column wow fadeInDown">
              <h3> Look out for Arthanium compliant, products, assets & application</h3>
              <div className="text1">
            Use our consumer mobile app to scan custom NFC tags & know the journey and story behind the things you buy to make more confident & informed choices. At IoT Conekt, we’re bringing provenance to the supply chain & empowering shopper’s with accurate information and powering the transparency movement through tech. We work with reliable businesses and products to open verified information about their producers, origins and ingredients – creating transparency and accountability so you can trust what you buy.</div>
              <Link to="/login" className="theme-btn btn-style-two">Get your business listed on Arthanium today<span className="icon flaticon-next-3" /></Link>
            </div>
          </div>
          <br /><br /><br /><br /><br /><br /><br /><br />
      </section>
      <WebsiteFooter/>
    </div>
  );
}

export default ConsumerPage;