import React from 'react';
// import 'assets/css/style.css';
// import 'assets/css/responsive.css';


const PricingPage = () => {

    return (
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
                      <div className="price">$50<span>/month</span></div>
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
                      <div className="price">$500<span>/month</span></div>
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
                      <div className="price">$1500<span>/month</span></div>
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
            {/* Yearly Package */}
          </div>
        </div>
      </section>
    );
}

export default PricingPage;
