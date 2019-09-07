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
            <div className="div-block-new-1" style={{ padding: 50, marginTop: 100 }}>
                <div id="solutionsforBusiness" className="section less-v-margin">
                    <div className="wrapper">
                        <div className="row-2">
                            <div className="col lg-6">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", textAlign: 'center', padding: 20 }}>Company</h2>
                                    <p className="ondark" style={{ color: "#333", }}>
                                        Arthanium is an open blockchain based "Platform" converging latest in Blockchain, IoT and Anylatics technologies.<br />
                                        It securely links identity to physical assets throughs blockchain, smart contract & firmware.<br />
                                        Application include decentralized supply chain, trade finance / insurance, digital identity, provenance, authentication and e-commerce.<br />
                                        Industry benefiting for the platform include smart citis, pharma, packaging, logistics, fashion / luxary, food & beverages, precious metals & jewelry.
                                    </p>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-4 extra-pad">
                                <img src={require('../../WA/images/new/22.png')} style={{ WebkitBoxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)", MozBoxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)", boxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="div-block-new-1" style={{ padding: 50, }}>
                <div className="section">
                    <h1 style={{ textAlign: 'center', color: "#333", }} className="heading-2 ondark">Our Team</h1>
                </div>
                <div id="solutionsforBusiness" className="section less-v-margin">
                    <div className="wrapper">
                        <div className="row-2">
                            <div className="col lg-2">
                                <div style={{ width: 200, height: 200, borderRadius: "50%", overflow: 'hidden' }}>
                                    <img src={require('../../WA/images/new/s1.png')} style={{ WebkitBoxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)", MozBoxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)", boxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)" }} />
                                </div>
                                <h3>Sandesh Hegde </h3>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-2">
                                <div style={{ width: 200, height: 200, borderRadius: "50%", overflow: 'hidden' }}>
                                    <img src={require('../../WA/images/new/nishant.png')} style={{ WebkitBoxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)", MozBoxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)", boxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)" }} />
                                </div>
                                <h3>Kumar Nishant </h3>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-2">
                                <div style={{ width: 200, height: 200, borderRadius: "50%", overflow: 'hidden' }}>
                                    <img src={require('../../WA/images/new/akshay.jpeg')} style={{ WebkitBoxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)", MozBoxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)", boxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)" }} />
                                </div>
                                <h3>Akshay Pilankar </h3>
                            </div>
                            <div className="col lg-1" />
                            {/**<div className="col lg-2">
                                <div style={{ width: 200, height: 200, borderRadius: "50%", overflow: 'hidden' }}>
                                    <img src={require('../../WA/images/new/s1.png')} style={{ WebkitBoxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)", MozBoxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)", boxShadow: "8px 15px 22px -4px rgba(0,0,0,0.22)" }} />
                                </div>
                            </div>*/}
                            <div className="col lg-1" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
