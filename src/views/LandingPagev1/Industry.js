import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Header from './Header';
import Footer from './Footer';
export default function Industry(props) {
    return (
        <div className="body">
            <Header {...props} />
            <div className="section full-screen background-image-side" style={{ padding: 0 }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="columns column w-row" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <img src={require('../../WA/images/newimgs/Artboard 1.png')} height={400} />
                    </div>
                </div>
            </div>
            <div className="div-block-new-1">

                <div id="solutionsforBusiness" className="section less-v-margin">
                    <p style={{ padding: 5, fontWeight: 300, textAlign: "center"}}>Note - The platform & solutions are sector agnostic but certain industries can be greatly benefited from the use cases.</p>
                    <div className="wrapper">
                        <div className="row-2" style={{display: "flex", alignItems: "center"}}>


                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h4 className="heading-2 ondark" style={{ color: "#333", }}>Luxury / Apparel / Footwear</h4>
                                    <ul>
                                        <li className="tab-class-inner">$600 billion global counterfeit fashion market encompasses huge risks to both brands & consumers.</li>
                                        <li className="tab-class-inner">Arthanium Platform utilizes IoT chips / inlays to create a unique & unforgeable Digital identity.</li>
                                        <li className="tab-class-inner">Track & trace the product through supply chain & maintain a secured record of its journey (provenance).</li>
                                        <li className="tab-class-inner">  Consumers can verify authentication of products using.	</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/newimgs/1.png')} />
                            </div>
                            {/* 2 */}
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/newimgs/5.png')} />
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Smart Cities</h2>
                                    <ul>
                                        <li className="tab-class-inner">Smart cities integrate a digital city & IoT (embedded sensors) so that individuals & infrastructure can collaborate to efficiently manage resources.</li>
                                        <li className="tab-class-inner"> Blockchain integration will reduce risk of IoT devices being compromised & create greater transparency, immutability & security to all processes.</li>
                                        <li className="tab-class-inner">Applications include transport management, digital identity, smart energy, smart payments, waste management & process automation.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Consumer Electronics</h2>
                                    <ul>
                                        <li className="tab-class-inner">Asset identity & registration for Anti-Counterfeiting solutions.</li>
                                        <li className="tab-class-inner"> Provides Digital Identity for Ownership of Goods.</li>
                                        <li className="tab-class-inner"> Track & race & the transfer of ownership across the supply chain & maintain secure record on blockchain.</li>
                                        <li className="tab-class-inner">Automate process through smart contracts.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/newimgs/2.png')} />
                            </div>

                            {/* 2 */}

                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/newimgs/7.png')} />
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Pharmaceutical</h2>
                                    <ul>
                                        <li className="tab-class-inner">Asset identity registration, track & trace, anti-counterfeit, & privacy solutions for supply chains.</li>
                                        <li className="tab-class-inner"> Blockchain provides visibility across entire supply chains, from individual ingredients to the patient to which it was prescribed.</li>
                                    </ul>
                                </div>
                            </div>


                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Fine Art / Collectibles</h2>
                                    <ul>
                                        <li className="tab-class-inner">Authenticate unique identity of the artworks by registering them on the blockchain & create a digital identity for the asset.</li>
                                        <li className="tab-class-inner">   Manage assets & trace history of the artwork's ownership through secured record of provenance.</li>
                                        <li className="tab-class-inner"> Digital identity & tokenization will enhanceliquidity& create avenues for fund raise & royalty revenues.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/newimgs/3.png')} />
                            </div>

                            {/* 2 */}

                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/newimgs/8.png')} />
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>F&B / Dairy / Wines</h2>
                                    <ul>
                                        <li className="tab-class-inner">Increase efficiency, transparency and collaboration throughout the food system.</li>
                                        <li className="tab-class-inner">  Track & trace through the supply chain & manage a secured record of provenanceto mitigate adulteration & enhance traceability.</li>
                                        <li className="tab-class-inner">Consumers can verify authentication of products using a smart phone app.</li>
                                    </ul>
                                </div>
                            </div>


                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Jewelry / Precious Metals</h2>
                                    <ul>
                                        <li className="tab-class-inner">Identify & track jewelry / precious metals across the supply chain from origin to retail via digital certification & smart contracts.</li>
                                        <li className="tab-class-inner"> Provides an audit trail of an asset by bringing together various stakeholders including miners, refiners, manufacturers, insurance companies, financiers, traders, third party verifiers, law enforcement & claimants.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/newimgs/4.png')} />
                            </div>

                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/newimgs/6.png')} />
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Logistics</h2>
                                    <ul>
                                        <li className="tab-class-inner">Track & Trace - Product can be assigned a unique identifier at start of the supply chain& tied to a utility token that is time-stamped as it moves through the supply chain, with the movement of that item stored on the blockchain archive.</li>
                                        <li className="tab-class-inner"> Provenance - Smartphone users can check the unique ID to reveal its history & its origins to ensure it was responsibility sourced or produced.</li>
                                    </ul>
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
