import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Header from './Header';
import Footer from './Footer';
export default function Industry(props) {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    return (
        <div className="body">
            <Header />
            <div className="div-block-9">
                <div className="section">
                    {/* <div className="wrapper-2 space-around">
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" width={109} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" width={109} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" width={87} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                    </div> */}
                </div>
                <div id="product" className="section less-v-margin">
                    <div className="wrapper">
                        <div className="row-2">
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Luxury / Apparel / Footwear</h2>
                                    <p className="ondark">$600 billion global counterfeit fashion marketencompasses huge risks to both brands & consumers.<br />
                                        Arthanium Platform utilizes IoT chips / inlays to create a unique & unforgeable Digital identity.<br />
                                        Track & trace the product through supply chain & maintain a secured record of its journey (provenance).<br />
                                        Consumers can verify authentication of products using.			</p>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Smart Cities</h2>
                                    <p className="ondark">Smart cities integrate a digital city & IoT (embedded sensors) so that individuals & infrastructure can collaborate to efficiently manage resources.<br />
                                        Blockchain integration will reduce risk of IoT devices being compromised & create greater transparency, immutability & security to all processes.<br />
                                        Applications include transport management, digital identity, smart energy, smart payments, waste management & process automation									.</p>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>

                            </div>
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Consumer Electronics</h2>
                                    <p className="ondark">Asset identity & registration for Anti-Counterfeiting solutions.<br />
                                        Provides Digital Identity for Ownership of Goods		.<br />
                                        Track & race & the transfer of ownership across the supply chain & maintain secure record on blockchain		.<br />
                                        Automate process through smart contracts			.</p>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Pharmaceutical</h2>
                                    <p className="ondark">Asset identity registration, track & trace, anti-counterfeit, & privacy solutions for supply chains.<br />
                                        Blockchain provides visibility across entire supply chains, from individual ingredients to the patient to which it was prescribed.								</p>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>

                            </div>
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Fine Art / Collectibles</h2>
                                    <p className="ondark">Authenticate unique identity of the artworks by registering them on the blockchain & create a digital identity for the asset.<br />
                                        Manage assets & trace history of the artwork's ownership through secured record of provenance.	<br />
                                        Digital identity & tokenization will enhanceliquidity& create avenues for fund raise & royalty revenues	.					</p>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">F&B / Dairy / Wines</h2>
                                    <p className="ondark">	Increase efficiency, transparency and collaboration throughout the food system.<br />
                                        Track & trace through the supply chain & manage a secured record of provenanceto mitigate adulteration & enhance traceability.<br />
                                        Consumers can verify authentication of products using a smart phone app.										</p>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>

                            </div>
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Jewelry / Precious Metals</h2>
                                    <p className="ondark">Identify & track jewelry / precious metals across the supply chain from origin to retail via digital certification & smart contracts.<br />
                                        Provides an audit trail of an asset by bringing together various stakeholders including miners, refiners, manufacturers, insurance companies, financiers, traders, third party verifiers, law enforcement & claimants.	</p>
                                </div>
                            </div>
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Logistics</h2>
                                    <p className="ondark">Track & Trace - Product can be assigned a unique identifier at start of the supply chain& tied to a utility token that is time-stamped as it moves through the supply chain, with the movement of that item stored on the blockchain archive.<br />
                                        Provenance - Smartphone users can check the unique ID to reveal its history & its origins to ensure it was responsibility sourced or produced.</p>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
