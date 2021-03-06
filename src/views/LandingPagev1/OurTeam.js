import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Header from './Header';
import Footer from './Footer';

export default function Partners(props) {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    return (
        <div className="body">
            <Header headerStyle="bg-wrap" />
            <div className="div-block-new-1" style={{ marginTop: 100 }}>
                <div id="solutionsforBusiness" className="section less-v-margin">
                    <div className="wrapper">
                        <div className="row-2">
                            <div className="col lg-5">
                                <div className="cn">
                                    <div class="inner">
                                        <h2 className="heading-2 ondark" style={{ color: "#333", textAlign: 'center', padding: 30 }}>Company</h2>
                                        <p className="ondark" style={{ color: "#333", textAlign: "justify", wordSpacing: 3 }}>
                                            Arthanium is an open blockchain based "Platform" converging latest in Blockchain, IoT and Analytics technologies.
                                        It securely links identity to physical assets through blockchain, smart contract & firmware.<br />
                                            Applications include decentralized supply chain, trade finance / insurance, digital identity, provenance, authentication and e-commerce.
                                            Industries benefiting from the platform include smart cities, pharma, packaging, logistics, fashion / luxury, food & beverages, precious metals & jewelry.
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col lg-1 " />
                            <div className="col lg-5">
                                <img width="1200" height="600" src={require('../../WA/images/company 4.png')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="div-block-new-1" id="ourteam">
                {/* <div className="section"> */}
                <h1 style={{ textAlign: 'center', color: "#333", paddingBottom: 50 }} className="heading-2 ondark">Our Team</h1>
                {/* </div> */}
                <div className="container">
                    <div className="row-2">
                        {/* <div className="heading-title text-center">
                            <h3 className="text-uppercase">Our professionals </h3>
                            <p className="p-top-30 half-txt">Nam pulvinar vitae neque et porttitor. Praesent sed nisi eleifend. Nam pulvinar vitae neque et porttitor. Praesent sed nisi eleifend. </p>
                        </div> */}
                        <div className="col-md-3 col-sm-3">
                            <div className="team-member">
                                <div className="team-img" style={{ width: 250, height: 250, borderRadius: "50%", overflow: 'hidden' }}>
                                    <img src={require('../../WA/images/new/s1.png')} width="250" height="250" alt="team member" className="img-responsive" />
                                </div>
                                <div className="team-hover">
                                    <div className="desk">
                                        <h4>Hi There </h4>
                                        <p>I steer the ship.</p>
                                    </div>
                                    <div className="s-link">
                                        <a href="#"><i className="fa fa-facebook" /></a>
                                        <a href="#"><i className="fa fa-twitter" /></a>
                                        <a href="#"><i className="fa fa-google-plus" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="team-title">
                                <h5>Sandesh Hegde</h5>
                                <span>Co Founder & CEO</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="team-member">
                                <div className="team-img" style={{ width: 250, height: 250, borderRadius: "50%", overflow: 'hidden' }}>
                                    <img src={require('../../WA/images/new/nishant.png')} style={{marginLeft: "25px"}} width="auto" height="250" alt="team member" className="img-responsive" />
                                </div>
                                <div className="team-hover">
                                    <div className="desk">
                                        <h4>I eat Blockchain for breakfast!</h4>
                                        {/* <p>I love to introduce myself as a hardcore Web Designer.</p> */}
                                    </div>
                                    <div className="s-link">
                                        <a href="#"><i className="fa fa-facebook" /></a>
                                        <a href="#"><i className="fa fa-twitter" /></a>
                                        <a href="#"><i className="fa fa-google-plus" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="team-title">
                                <h5>Kumar Nishant </h5>
                                <span>Co Founder & CTO</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="team-member">
                                <div className="team-img" style={{ width: 250, height: 250, borderRadius: "50%", overflow: 'hidden' }}>
                                    <img src={require('../../WA/images/new/akshay.png')} style={{ paddingLeft: 20 }} width="230" height="250" alt="team member" className="img-responsive" />
                                </div>
                                <div className="team-hover">
                                    <div className="desk">
                                        <h4>Hi There</h4>
                                        <p>I code the blocks.</p>
                                    </div>
                                    <div className="s-link">
                                        <a href="#"><i className="fa fa-facebook" /></a>
                                        <a href="#"><i className="fa fa-twitter" /></a>
                                        <a href="#"><i className="fa fa-google-plus" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="team-title">
                                <h5>Akshay Pilankar</h5>
                                <span>Developer</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="team-member">
                                <div className="team-img" style={{ width: 250, height: 250, borderRadius: "50%", overflow: 'hidden' }}>
                                    <img src={require('../../WA/images/new/lk.png')} width="250" height="260" alt="team member" className="img-responsive" />
                                </div>
                                <div className="team-hover">
                                    <div className="desk">
                                        <h4>Hi There</h4>
                                        <p>I turn dreams into designs.</p>
                                    </div>
                                    <div className="s-link">
                                        <a href="#"><i className="fa fa-facebook" /></a>
                                        <a href="#"><i className="fa fa-twitter" /></a>
                                        <a href="#"><i className="fa fa-google-plus" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="team-title">
                                <h5>Ragini Samal</h5>
                                <span>UX Designer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
