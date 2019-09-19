import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Solutions(props) {

    return (
        <div className="body">
            <Header />
            <div className="section full-screen background-image-side" style={{ padding: 0 }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="columns column w-row" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <br />
                        <br />
                        <br />
                        <img src={require('../../WA/images/new/33.png')} height={400} />
                        <div className="columns column w-row">
                            <div className="w-col-1" />
                            <div className="column herocontent w-col w-col-10">
                                <h4 className="v1-paragraph">At Arthanium, we are creating an eco-system of Dapps around the platform to enable various use cases to make supply chains less complicated</h4>
                                <div className="value-proposition-container">
                                    <div className="value-proposition-buttons"><a href="/demo" className="button2 margin-left w-button">GET TOUR</a><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="div-block-new-1" id="dapps">
              <div className="section">
                  <h1 style={{ textAlign: 'center', color: "#333", }} className="heading-2 ondark">Decentralized Applications</h1>
              </div>
              <div className="w-col-12">
                      <div className="row-2">
                          <div className="col lg-3">
                              <div className="solution-slider-container">
                                  <div className="payment-testimonial-content"><img src={require('../../WA/images/doc.jpg')} height="150px" alt="" className="image-5" />
                                      <div style={{ paddingTop: 20 }}>
                                          <h4 className="testimonial-title">DocConekt</h4>
                                          <p className="testimonial-text"><strong>Paperless Trade & Certification</strong><br />
                                              Share Trade Doccuments securely with privacy
  Access based on combination of role & permission
  Permissioned Upload, download, Edit and Viewing
  Share Documents with Partners for viewing or action		</p>

                                      </div>
                                      {/* <div className="value-proposition-container">
                                          <div className="value-proposition-buttons"><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                          <br />
                                      </div> */}
                                  </div>
                              </div>
                          </div>
                          <div className="col lg-3">
                              <div className="solution-slider-container">
                                  <div className="payment-testimonial-content"><img src={require('../../WA/images/iot.png')} height="150px"  alt="" className="image-5" />
                                      <div style={{ paddingTop: 20 }}>
                                          <h4 className="testimonial-title">IOTConekt</h4>
                                          <p className="testimonial-text"><strong>Secure Supply chain</strong>
                                              <br />Securely links IoT identities to physical assets.
  Create digital identity and  provenance.<br />Solutions for tracking, certification, provenance & anti counterfeiting<br /><br />		</p>
                                          {/* <h5 className="heading-3">$149/Month</h5> */}
                                      </div>
                                      {/* <div className="value-proposition-container">
                                          <div className="value-proposition-buttons"><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                          <br />
                                      </div> */}
                                  </div>
                              </div>
                          </div>
                          <div className="col lg-3">
                              <div className="solution-slider-container">
                                  <div className="payment-testimonial-content"><img src={require('../../WA/images/tf.png')} height="150px" alt="" className="image-5" />
                                      <div style={{ paddingTop: 20 }}>
                                          <h4 className="testimonial-title">Trade Finance</h4>
                                          <p className="testimonial-text"><strong>Automate Payments & Financin</strong><br />Products and processes to automate payments<br />Secure transactions & sharing of information<br />proposed applications - Letter of Credits, Invoice Factoring <br /></p>
                                          {/* <h5 className="heading-3">$449/Month</h5> */}
                                      </div>
                                      {/* <div className="value-proposition-container">
                                          <div className="value-proposition-buttons"><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                          <br />
                                      </div> */}
                                  </div>
                              </div>
                          </div>
                      </div>
              </div>
            </div>
            <div className="div-block-new-1" id="solutionsforBusiness">
                <div className="section">
                    <h1 style={{ textAlign: 'center', color: "#333", }} className="heading-2 ondark">Solutions for Business</h1>
                    {/* <div className="wrapper-2 space-around">
                        <div className="partner-logo-container"><img data-src="https://via.placeholder.com/250" width={109} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img data-src="https://via.placeholder.com/250" width={109} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img data-src="https://via.placeholder.com/250" width={87} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img data-src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img data-src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img data-src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                    </div> */}
                </div>
                <div id="solutionsforBusiness" className="section less-v-margin">
                    <div className="wrapper">
                        <div className="row-2" style={{display: "flex", alignItems: "center"}}>
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/new/18.png')} style={{filter: "drop-shadow(16px 16px 10px gray)"}}/>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Supply Chain – Track & Trace</h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">Provide proof of any supply chain event or data point to a customer, vendor, regulator, or end consumer.</li>
                                        <li className="tab-class-inner">  Key events in a supply chain are securely logged to a blockchain.</li>
                                        <li className="tab-class-inner"> Access granted to supply chain partners on selective basis to "view" data on blockchain.</li>
                                        <li className="tab-class-inner"> Industry – Luxury, Fashion consumer electronics, Art / collectibles, Pharmaceuticals, F&B, precious metals, Industrials.</li>
                                    </ul>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Automation</h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">A ecosystem built around this can automate various cogs of global trade including trade finance, digitized doccumentation, provenance & supply chain.</li>
                                        <li className="tab-class-inner"> Time consuming work flows can besimplified using smart contracts.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/new/23.png')} style={{filter: "drop-shadow(16px 16px 10px gray)"}} />
                            </div>
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/new/19.png')} style={{filter: "drop-shadow(16px 16px 10px gray)"}} />
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Track & Trace</h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">Operations Visibility Track and Trace, Chain of Custody. Securely track journey of a product / asset from production to market place.</li>
                                        <li className="tab-class-inner">  Various stakeholders can be connected through blockchain and access immutable information about products / assets throughout the journey.</li>
                                        <li className="tab-class-inner"> Using sensors can enhance the level of information. eg. temperature controlled logistics. </li>
                                    </ul>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom" >
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Anti-Counterfeit</h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">Secure, unique & low cost asset identifiers with blockchain registrations.</li>
                                        <li className="tab-class-inner"> Keep a confidential & private record of chain of custody, validating that the chain has been maintained, without revealing proprietary data.</li>
                                        <li className="tab-class-inner">Track & synchronize chain of custody of physical object & digital record with IoT or audit-driven attestations.</li>
                                        <li className="tab-class-inner">Industry – Luxury, Fashion consumer electronics, Art / collectibles, Pharmaceuticals, F&B, precious metals.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/new/11.png')} style={{filter: "drop-shadow(16px 16px 10px gray)"}} />
                            </div>
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/new/9.png')} style={{filter: "drop-shadow(16px 16px 10px gray)"}} />
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Anti-Diversion</h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">Secure asset identities combined with blockchain registrations & chain-of-custody.	</li>
                                        <li className="tab-class-inner">Track product movements & identify where diversion occurred in the chain & intervene appropriately.		</li>
                                        <li className="tab-class-inner">Industries – Luxury, Pharmaceuticals, Consumer Electronics, Food & Beverages, Cosmetics.	</li>
                                    </ul>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Digital Identity & Provenance</h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">Tell the story of your brand and it's journey from production to market place.</li>
                                        <li className="tab-class-inner">Build trust and credibility with customers. Get a digital identity for physical products / assets on the.</li>
                                        <li className="tab-class-inner">Blockchain using a combination of connected tags which can be scanned using our app to reveal information.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/new/21.png')} style={{filter: "drop-shadow(16px 16px 10px gray)"}} />
                            </div>
                            {/* new */}
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/new/5.png')} style={{filter: "drop-shadow(16px 16px 10px gray)"}} />
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Trade Finance</h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">Products and processes to automate payments in supply chain.	</li>
                                        <li className="tab-class-inner">Secure transactions & sharing of information.		</li>
                                        <li className="tab-class-inner">Proposed applications - Letter of Credits, Bank Guarantees, Invoice Factoring .	</li>
                                    </ul>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Anti-Diversion</h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">Secure asset identities combined with blockchain registrations & chain-of-custody.</li>
                                        <li className="tab-class-inner">Track product movements & identify where diversion occurred in the chain & intervene appropriately.</li>
                                        <li className="tab-class-inner">Industries – Luxury, Pharmaceuticals, Consumer Electronics, Food & Beverages, Cosmetics.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/new/21.png')} style={{filter: "drop-shadow(16px 16px 10px gray)"}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="div-block-new-1" id="solutionsforConsumers">
                <div className="section">
                    <h1 style={{ textAlign: 'center', color: "#333", }} className="heading-2 ondark">Solutions for Consumers</h1>
                </div>
                <div id="solutionsforBusiness" className="section less-v-margin">
                    <div className="wrapper">
                        <div className="row-2">
                            <div className="col lg-5 extra-pad">
                                <img src={require('../../WA/images/new/32.png')} style={{filter: "drop-shadow(16px 16px 10px gray)"}} />
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <div className="margin-bottom">
                                    <h2 style={{ color: "#333", marginTop: 50 }}>For Consumer</h2>
                                    <h4>Look out for Arthanium compliant, products, assets & application</h4>

                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">Use our consumer mobile app to scan custom NFC tags & know the journey and story behind the things you buy to make more confident
& informed choices.</li>
                                        <li className="tab-class-inner">At Arthanium, we’re bringing provenance to the supply chain & empowering shopper’s with accurate information and powering the transparency movement through technology. 	</li>
                                        <li className="tab-class-inner"> We work with reliable businesses and products to open verified information about their producers, origins and ingredients – creating transparency and accountability so you can trust what you buy.	</li>
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
