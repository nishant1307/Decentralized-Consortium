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
            <Header headerStyle="bg-wrap" />
            <div className="section full-screen">
                <div className="wrapper">
                    <div className="columns column w-row">
                        <div className="w-col w-col-6">
                            <img src={require("../../WA/images/new/25.png")} style={{ maxWidth: "none", maxHeight: "none", height: 1000, width: 600, paddingLeft: 0, paddingTop: 60 }} />
                        </div>
                        <div className="column herocontent w-col w-col-6">
                            <div className="margin-bottom">
                                <h2 className="heading-2 ondark" style={{ color: 'lightblue' }}>Blockchain Architecture</h2>
                                <p className="ondark" style={{ color: 'black' }}>The platform has been built on our own heterogenous multi chain blockchain architecture (www.arthanium.org).</p>
                                <p className="ondark" style={{ color: 'black' }}>Arthanium.org is working towards a decentralized web using blockchain to secure enterprise data & ensure privacy. </p>
                                <p className="ondark" style={{ color: 'black' }}>It connects multiple private networks with public & permission less networks, where blockchains create the trust </p>
                                <p className="ondark" style={{ color: 'black' }}>to exchange information & execute transactions via the relay chain bringing scalability, governance & interoperability. </p>
                                <p className="ondark" style={{ color: 'black' }}>Arthanium's ecosystem facilitates for development of blockchain Dapps democratizing technology for the good.</p>
                            </div>
                            <Link to="/" style={{ textDecoration: 'none', margin: 0, padding: 0 }}>
                                <div class="flex-readmore">
                                    <div className="readmore ondark" style={{ backgroundColor: 'transparent', color: 'black' }}>Learn More Here</div>
                                    <div className="icon"><br />‍</div>
                                </div>
                            </Link>
                            <div className="row-2">
                                <div className="col lg-12 sm-1" >
                                    <div>
                                        {/* <h3 className="ondark"></h3> */}
                                        <p className="ondark" style={{ color: 'black' }}>Smart Contracts</p>
                                    </div>
                                </div>
                                <div className="col lg-12 sm-1">
                                    <div>
                                        {/* <h3 className="ondark"></h3> */}
                                        <p className="ondark" style={{ color: 'black' }}>Web3 Tools & API's connect the platform to blockchain architecture</p>
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                </div>
                                <div className="col lg-12 sm-1">
                                    <div>
                                        {/* <h3 className="ondark">More Value</h3> */}
                                        <p className="ondark" style={{ color: 'black' }}>Frontend - Desktop, Android, & iOS Clients to commission, verify, send & receive connected, digitized docs & products</p>
                                        <br />
                                        <br />
                                        <br />
                                       
                                    </div>
                                </div>
                                <div className="col lg-12 sm-1">
                                    <div>
                                        {/* <h3 className="ondark">More Value</h3> */}
                                        <p className="ondark" style={{ color: 'black' }}>Connected Devices, Digitized Doccuments</p>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                </div>
                                <div className="col lg-12 sm-1">
                                    <div>
                                        {/* <h3 className="ondark">More Value</h3> */}
                                        <p className="ondark" style={{ color: 'black' }}>Applications Layer – Logistics, Pharma, F&B, Luxury, Art</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}
