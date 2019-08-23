import React from 'react';
//
import 'WA/css/normalize.css'
import 'WA/css/detheme.css'
import 'WA/css/kergan.detheme.css'

export default function PricingPage() {

  return (
    <div id="testimonials" className="section">
        <div className="mask w-slider-mask">
            <div className="wrapper">
                <h2 style={{ paddingBottom: 30 }} className="section-header withdesc">Pricing Plan</h2>
                <div className="row-2">
                    <div className="col lg-4" style={{paddingBottom:10}}>
                        <div className="slide w-slide">
                            <div className="container-div">
                                <div className="payment-plan-container">
                                    <div className="payment-testimonial-content"><img src="/images/kp3.png" alt="" className="image-5" />
                                        <div style={{ paddingTop: 20 }}>
                                            <h4 className="testimonial-title">PRO</h4>
                                            <p className="testimonial-text">400 Credits</p>
                                            <h5 className="heading-3">$49/Month</h5>
                                        </div>
                                        <div className="value-proposition-container">
                                            <div className="value-proposition-buttons"><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col lg-4" style={{paddingBottom:10}}>
                        <div className="slide w-slide">
                            <div className="container-div">
                                <div className="payment-plan-container">
                                    <div className="payment-testimonial-content"><img src="/images/kp1.png" alt="" className="image-5" />
                                        <div style={{ paddingTop: 20 }}>
                                            <h4 className="testimonial-title">BUSINESS</h4>
                                            <p className="testimonial-text">1200 Credits</p>
                                            <h5 className="heading-3">$149/Month</h5>
                                        </div>
                                        <div className="value-proposition-container">
                                            <div className="value-proposition-buttons"><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col lg-4" style={{paddingBottom:10}}>
                        <div className="slide w-slide">
                            <div className="container-div">
                                <div className="payment-plan-container">
                                    <div className="payment-testimonial-content"><img src="/images/kp.png" alt="" className="image-5" />
                                        <div style={{ paddingTop: 20 }}>
                                            <h4 className="testimonial-title">ENTERPRISE</h4>
                                            <p className="testimonial-text">3600 Credits</p>
                                            <h5 className="heading-3">$449/Month</h5>
                                        </div>
                                        <div className="value-proposition-container">
                                            <div className="value-proposition-buttons"><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
