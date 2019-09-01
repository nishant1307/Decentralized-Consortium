import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

export default function Landing(props) {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    return (
        <div className="body">
            <Header />
            <div className="div-block-9">
                <div className="section">
                    {/* <div className="wrapper-2 space-around">
                        <div className="partner-logo-container"><img data-src="https://via.placeholder.com/250" width={109} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img data-src="https://via.placeholder.com/250" width={109} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img data-src="https://via.placeholder.com/250" width={87} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img data-src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img data-src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img data-src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                    </div> */}
                </div>
                <div id="product" className="section less-v-margin">
                    <div className="wrapper">
                        <div className="row-2">
                            <div className="col lg-4">
                                <AutoPlaySwipeableViews>
                                    <img data-src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img data-src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img data-src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-6">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Blockchain Architecture</h2>
                                    <p className="ondark">The platform has been built on our own heterogenous multi chain blockchain architecture (www.arthanium.org).</p>
                                    <p className="ondark">Arthanium.org is working towards a decentralized web using blockchain to secure enterprise data & ensure privacy. </p>
                                    <p className="ondark">It connects multiple private networks with public & permission less networks, where blockchains create the trust </p>
                                    <p className="ondark">to exchange information & execute transactions via the relay chain bringing scalability, governance & interoperability. </p>
                                    <p className="ondark">Arthanium's ecosystem facilitates for development of blockchain Dapps democratizing technology for the good.</p>
                                </div>
                                <Link to="/" style={{ textDecoration: 'none', margin: 0, padding: 0 }}>
                                    <div class="flex-readmore">
                                        <div className="readmore ondark" style={{backgroundColor:'transparent'}}>Learn More Here</div>
                                        <div className="icon"><br />‍</div>
                                    </div>
                                </Link>
                                <div className="row-2">
                                    <div className="col lg-12 sm-1">
                                        <div>
                                            {/* <h3 className="ondark"></h3> */}
                                            <p className="ondark">Smart Contracts</p>
                                        </div>
                                    </div>
                                    <div className="col lg-12 sm-1">
                                        <div>
                                            {/* <h3 className="ondark"></h3> */}
                                            <p className="ondark">Web3 Tools & API's connect the platform to blockchain architecture</p>
                                        </div>
                                    </div>
                                    <div className="col lg-12 sm-1">
                                        <div>
                                            {/* <h3 className="ondark">More Value</h3> */}
                                            <p className="ondark">Frontend - Desktop, Android, & iOS Clients to commission, verify, send & receive connected, digitized docs & products</p>
                                        </div>
                                    </div>
                                    <div className="col lg-12 sm-1">
                                        <div>
                                            {/* <h3 className="ondark">More Value</h3> */}
                                            <p className="ondark">Connected Devices, Digitized Doccuments</p>
                                        </div>
                                    </div>
                                    <div className="col lg-12 sm-1">
                                        <div>
                                            {/* <h3 className="ondark">More Value</h3> */}
                                            <p className="ondark">Applications Layer – Logistics, Pharma, F&B, Luxury, Art</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
