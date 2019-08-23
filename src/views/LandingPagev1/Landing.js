import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import "WA/projects/ferrari/template/assets/css/font-awesome.min.css"
import "WA/projects/ferrari/template/assets/css/prettyPhoto.css"
import "WA/projects/ferrari/template/assets/css/swiper.min.css"
import "WA/projects/ferrari/template/assets/css/owl.carousel.min.css"
import "WA/projects/ferrari/template/assets/css/sliderDefault.css"
import "WA/projects/ferrari/template/assets/css/sliderCustom.css"
import "WA/projects/ferrari/template/assets/css/style.css"
import "WA/projects/ferrari/template/assets/css/responsive.css"
import "WA/projects/ferrari/template/assets/css/bootstrap.min.css"

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function Landing(props) {
    const classes = useStyles();
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
    return (
        <div>
            <div id="preloader">
                <div className="preloader-center">
                    <div className="preloader-center-absolute">
                        <div className="object" />
                    </div>
                </div>
            </div>
            <section id="menu_area" className="navbar-fixed-top">
                <div className="container">
                    <nav className="navbar navbar-default">
                        <a className="logo" href="#">
                            <img src={require("WA/projects/ferrari/template/assets/img/logo1.png")} alt="logo" />
                            {/* CreativeLogo */}
                        </a>
                        <div className="open">
                            <div className="cls" />
                            <div>
                                <ul className="sub-menu">
                                    <li>
                                        <a data-scroll href="#menu_area" title="home">Home</a>
                                    </li>
                                    <li>
                                        <a data-scroll href="#about" title="about">About us</a>
                                    </li>
                                    <li>
                                        <a data-scroll href="#service" title="service">Our Services</a>
                                    </li>
                                    <li>
                                        <a data-scroll href="#Features" title="coFeaturesntact">Features</a>
                                    </li>
                                    <li>
                                        <a data-scroll href="#Portfolio" title="Portfolio">Our Portfolio</a>
                                    </li>
                                    <li>
                                        <a data-scroll href="#Team" title="team">Team</a>
                                    </li>
                                    <li>
                                        <a data-scroll href="#Pricing" title="Pricing">Pricing</a>
                                    </li>
                                    <li>
                                        <a data-scroll href="#contact" title="contact">Contact</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="cls" />
                        </div>
                    </nav>
                </div>
            </section>
            <section id="sliderArea">
                <div className="demo-1">
                    <AutoPlaySwipeableViews>
                        <div id="slider" className="sl-slider-wrapper">
                            <div className="sl-slide bg-4" data-orientation="vertical" data-slice1-rotation={-5} data-slice2-rotation={25} data-slice1-scale={2} data-slice2-scale={1}>
                                <div className="main-div-1">
                                </div>
                                <div class="outer">
                                    <div class="middle">
                                        <div class="inner">
                                            <h1>Decentralized Trade and Supply Chain on Blockchain</h1>
                                            <p>Building solutions for transparency, automating processes, trade finance and protecting your brand from counterfeiting.</p>
                                            <p>Leverage the power of digitized doccumentation, connected IoT devices, &  smart contracts with our Dapps.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="slider" className="sl-slider-wrapper">
                            <div className="sl-slide bg-4" data-orientation="vertical" data-slice1-rotation={-5} data-slice2-rotation={25} data-slice1-scale={2} data-slice2-scale={1}>
                                <div className="main-div-2">
                                </div>
                                <div class="outer">
                                    <div class="middle">
                                        <div class="inner">
                                            <h1>Decentralized Trade and Supply Chain on Blockchain</h1>
                                            <p>Building solutions for transparency, automating processes, trade finance and protecting your brand from counterfeiting.</p>
                                            <p>Leverage the power of digitized doccumentation, connected IoT devices, &  smart contracts with our Dapps.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AutoPlaySwipeableViews>
                </div>
            </section>

            <section id="about" className="section bg-grey">
                <div className="container">
                    <header className="section-header">
                        <small>About</small>
                        <h2>What is Arthanium ?</h2>
                        <hr />
                        <p className="lead opacity-70">A decentralized platform for organizations to create trade consortiums for their various projects & bring all stakeholders on one platform.</p>
                    </header>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <br />
                            <h4>More Dynamic </h4>
                            <p>Access to more credible information on time for quicker decision making</p>
                            <br />
                            <h4>More Efficient </h4>
                            <p>Eliminate low value task so that people can focus on higher value activities</p>
                            <br />
                            <h4>More Value </h4>
                            <p>Integrate diverse activities between stake holders more effectively to create additional value and eliminate gaps</p>
                            <br />
                            {/* <p>
                                <i className="ti-check text-success mr-8" />
                                <span className="fs-14">More Dynamic</span>
                            </p>
                            <p>
                                <i className="ti-check text-success mr-8" />
                                <span className="fs-14">Your items will import automatically</span>
                            </p>
                            <p>
                                <i className="ti-check text-success mr-8" />
                                <span className="fs-14">Your customers doesn't need to provide purchase code</span>
                            </p>
                            <p>
                                <i className="ti-check text-success mr-8" />
                                <span className="fs-14">Identify if a customer has a valid support</span>
                            </p>
                            <p>
                                <i className="ti-check text-success mr-8" />
                                <span className="fs-14">Identify if a customer has a valid support</span>
                            </p>
                            <p>
                                <i className="ti-check text-success mr-8" />
                                <span className="fs-14">Identify if a customer has a valid support</span>
                            </p> */}
                        </div>
                        <div className="col-md-6 col-lg-6 hidden-xs">
                            {/* <div className="swiper-container swiper-pagination-outside shadow-3" data-autoplay={2000} data-loop="true" data-space-between={20}> */}
                            {/* <div className="swiper-wrapper"> */}
                            <AutoPlaySwipeableViews>
                                <div className="swiper-slide">
                                    <img src={require("WA/projects/ferrari/template/assets//img/slider/slider-dashboard.jpg")} alt="..." />
                                </div>
                                <div className="swiper-slide">
                                    <img src={require("WA/projects/ferrari/template/assets//img/slider/slider-admin.jpg")} alt="..." />
                                </div>
                                <div className="swiper-slide">
                                    <img src={require("WA/projects/ferrari/template/assets//img/slider/slider-items.jpg")} alt="..." />
                                </div>
                            </AutoPlaySwipeableViews>
                            {/* </div> */}
                            {/* <div className="swiper-pagination" /> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </section>

            <section id="service" className="section">
                <div className="container">
                    <header className="section-header">
                        <small>About</small>
                        <h2>How does it work?</h2>
                        <hr />
                        {/* <p className="lead opacity-70">Choose any of the following plans to get start with. You can start with the FREE plan to see our web application at first. You can always change your plan from your account.</p> */}
                    </header>
                    <div className="row">
                        <div className="features-wrap">
                            <div className="col-md-4 col-sm-12 text-center">
                                <img src={require("WA/projects/ferrari/template/assets//img/ipad-img.png")} alt="" className="ipad-img" />
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <div className="row">
                                    <div className="col-md-7">

                                        <br />
                                        <h4>Buyers / Sellers </h4>
                                        <p>Register your organization on the platform, create projects, connect with partners & experience decentralized trade.</p>
                                        <br />
                                        <h4>Partners </h4>
                                        <p>Organizations can search / add partners for their supply chain Come onboard If you are in Banking, Logistics, Insurance, Certification.</p>
                                        <br />
                                    </div>
                                </div>
                                <div className="small-top-pad smart-mar">
                                    <blockquote className="blockquote-2">
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="Features" className="section bg-grey">
                <div className="container">
                    <header className="section-header">
                        <small>Features</small>
                        <h2>Why Arthanium?</h2>
                        <hr />
                        <p className="lead opacity-70">Choose any of the following plans to get start with. You can start with the FREE plan to see our web application at first. You can always change your plan from your account.</p>
                    </header>
                    <div className="row text-center">
                        <div className="service-block-list">
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="service-block-item service-item-1 row">
                                    <div className="service-block-inner">
                                        <a className="service-icon" href="#">
                                            <i className="fa fa-google-wallet" />
                                        </a>
                                        <div className="service-block-inner-content">
                                            <h4 className="service-item-title"><a href="#">Blockchain</a></h4>
                                            <div className="service-block-item-excerpt">
                                                <strong>Secure</strong>
                                                <p>Heterogenous multi chain blockchain architecture Scalable, Interoperable Secure & High TPS</p>
                                            </div>
                                            {/* .service-block-item-excerpt */}
                                        </div>
                                        {/* .service-block-inner-content */}
                                    </div>
                                    {/* .service-block-inner */}
                                </div>
                                {/* .service-block-item */}
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="service-block-item service-item-2 row">
                                    <div className="service-block-inner">
                                        <a className="service-icon" href="#">
                                            <i className="fa fa-line-chart" />
                                        </a>
                                        <div className="service-block-inner-content">
                                            <h4 className="service-item-title"><a href="#">DApps</a></h4>
                                            <div className="service-block-item-excerpt">
                                                <strong>Automate</strong>
                                                <p>Decentralized Apps ecosystem for digitized doccumentation, connected devices & trade finance	</p>
                                            </div>
                                            {/* .service-block-item-excerpt */}
                                        </div>
                                        {/* .service-block-inner-content */}
                                    </div>
                                    {/* .service-block-inner */}
                                </div>
                                {/* .service-block-item */}
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="service-block-item service-item-3 row">
                                    <div className="service-block-inner">
                                        <a className="service-icon" href="#">
                                            <i className="fa fa-male" />
                                        </a>
                                        <div className="service-block-inner-content">
                                            <h4 className="service-item-title"><a href="#">Partners</a></h4>
                                            <div className="service-block-item-excerpt">
                                                <strong>Collaborate</strong>
                                                <p>Brings all diverse stakeholders on one platform Integrate diverse activities more efficiently	</p>
                                            </div>
                                            {/* .service-block-item-excerpt */}
                                        </div>
                                        {/* .service-block-inner-content */}
                                    </div>
                                    {/* .service-block-inner */}
                                </div>
                                {/* .service-block-item */}
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="service-block-item service-item-4 row">
                                    <div className="service-block-inner">
                                        <a className="service-icon" href="#">
                                            <i className="fa fa-briefcase" />
                                        </a>
                                        <div className="service-block-inner-content">
                                            <h4 className="service-item-title"><a href="#">Industry 4.0</a></h4>
                                            <div className="service-block-item-excerpt">
                                                <strong>Innovate</strong>
                                                <p>Unlock new opportunities Eliminate low value activities</p>
                                            </div>
                                            {/* .service-block-item-excerpt */}
                                        </div>
                                        {/* .service-block-inner-content */}
                                    </div>
                                    {/* .service-block-inner */}
                                </div>
                                {/* .service-block-item */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="Pricing" className="section spricing">
                <div className="container">
                    <header className="section-header">
                        <small>Pricing</small>
                        <h2>Pricing Plan</h2>
                        <hr />
                        {/* <p className="lead opacity-70">Choose any of the following plans to get start with. You can start with the FREE plan to see our web application at first. You can always change your plan from your account.</p> */}
                    </header>
                    <div className="row" style={{ justifyContent: 'center' }}>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="ssingle-pricing">
                                <h4>PRO</h4>
                                <div className="pricing-icon">
                                    <img src={require("WA/projects/ferrari/template/assets//img/1.png")} alt="images" />
                                </div>
                                <div className="pricing-content">
                                    <ul>
                                        {/* <li>$ 49 / month</li> */}
                                        <li>400 Credits</li>
                                        {/* <li className="off">special offer</li> */}
                                        {/* <li>service uptime</li> */}
                                    </ul>
                                </div>
                                <div className="pricing-count">
                                    <h4>$49/Mo</h4>
                                    <a className="sorder-btn" href>Order Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="ssingle-pricing">
                                <h4>BUSINESS</h4>
                                <div className="pricing-icon">
                                    <img src={require("WA/projects/ferrari/template/assets//img/1.png")} alt="images" />
                                </div>
                                <div className="pricing-content">
                                    <ul>
                                        {/* <li>$ 149 / month</li> */}
                                        <li>1200 Credits</li>
                                        {/* <li className="off">special offer</li>
                                        <li>service uptime</li> */}
                                    </ul>
                                </div>
                                <div className="pricing-count">
                                    <h4>$149/Mo</h4>
                                    <a className="sorder-btn" href>Order Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="ssingle-pricing">
                                <h4>ENTERPRISE</h4>
                                <div className="pricing-icon">
                                    <img src={require("WA/projects/ferrari/template/assets//img/1.png")} alt="images" />
                                </div>
                                <div className="pricing-content">
                                    <ul>
                                        {/* <li>$ 449 / month</li> */}
                                        <li>3600 Credits</li>
                                        {/* <li className="off">special offer</li>
                                        <li>service uptime</li> */}
                                    </ul>
                                </div>
                                <div className="pricing-count">
                                    <h4>$449/Mo</h4>
                                    <a className="sorder-btn" href>Order Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="small-top-pad smart-mar">
                            <blockquote>
                                <p style={{ textAlign: 'center' }}>Contact us for a free demo &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
                            </blockquote>
                        </div>
                        {/* </blockquote> */}
                        {/* </div> */}
                    </div>

                    {/* <div className="small-top-pad smart-mar"> */}
                    {/* <blockquote> */}
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <p>
                                Note - <br />
                                Setup and customization charges could be applicable for certain customers.<br />
                                For larger customized plans contact us directly.<br />
                                Adittional monthly credits packs can be purchased at $ 49 for 400 Credits.<br />
                                Validity of plan & credits is one month and it cannot be carried forward.<br />
                                Currently we don’t charge any transaction based fee, but in future we might move to a transaction based fee model.</p>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12" style={{ textAlign: "-webkit-center" }}>
                            <table className="tg">
                                <tr>
                                    <th className="tg-rnhl" colspan="2">Credit Chart</th>
                                </tr>
                                <tr>
                                    <td className="tg-rnhl"></td>
                                    <td className="tg-rnhl">Credits Used</td>
                                </tr>
                                <tr>
                                    <td className="tg-rnhl">Projects</td>
                                    <td className="tg-rnhl">75</td>
                                </tr>
                                <tr>
                                    <td className="tg-rnhl">Partners</td>
                                    <td className="tg-rnhl">15</td>
                                </tr>
                                <tr>
                                    <td className="tg-rnhl">Products / Docs / Devices</td>
                                    <td className="tg-g2pk">1</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </section>


            <section id="counter" className="section bg-grey">
                <header className="section-header">
                    <small>Portfolio</small>
                    <h2>A native app for every platform</h2>
                    <hr />
                    <p className="lead opacity-70">The platform is accessible on both web and mobile.</p>
                </header>
                <div className="container">
                    <div className="service-block-list text-center">
                        <div className="col-md-4 col-sm-12">
                            <div className="row">
                                <div className="service-block-inner counter">
                                    <a className="service-icon" href="#">
                                        <i className="fa fa-grav" />
                                    </a>
                                    <div className="service-block-inner-content">
                                        <h3 className="service-item-title"><a href="#" className="counternum">1200</a></h3>
                                        <h4>Complete Project</h4>
                                        <div className="service-block-item-excerpt">
                                            <p>Proin gravida nibh vel velit auctor Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin,...</p>
                                        </div>
                                        {/* .service-block-item-excerpt */}
                                    </div>
                                    {/* .service-block-inner-content */}
                                </div>
                                {/* .service-block-inner */}
                            </div>
                            {/* .service-block-item */}
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className="row">
                                <div className="service-block-inner counter counterMiddle">
                                    <a className="service-icon" href="#">
                                        <i className="fa fa-user-circle-o" />
                                    </a>
                                    <div className="service-block-inner-content">
                                        <h3 className="service-item-title"><a href="#" className="counternum">1500</a></h3>
                                        <h4>Running Project</h4>
                                        <div className="service-block-item-excerpt">
                                            <p>Proin gravida nibh vel velit auctor Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin,...</p>
                                        </div>
                                        {/* .service-block-item-excerpt */}
                                    </div>
                                    {/* .service-block-inner-content */}
                                </div>
                                {/* .service-block-inner */}
                            </div>
                            {/* .service-block-item */}
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className="row">
                                <div className="service-block-inner counter">
                                    <a className="service-icon" href="#">
                                        <i className="fa fa-check-circle" />
                                    </a>
                                    <div className="service-block-inner-content">
                                        <h3 className="service-item-title"><a href="#" className="counternum">3000</a></h3>
                                        <h4>Happy Clients</h4>
                                        <div className="service-block-item-excerpt">
                                            <p>Proin gravida nibh vel velit auctor Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin,...</p>
                                        </div>
                                        {/* .service-block-item-excerpt */}
                                    </div>
                                    {/* .service-block-inner-content */}
                                </div>
                                {/* .service-block-inner */}
                            </div>
                            {/* .service-block-item */}
                        </div>
                    </div>
                </div>
            </section>
            <section id="Portfolio" className="section">
                <div className="container">
                    <header className="section-header">
                        <small>Media</small>
                        <h2>Latest Blog</h2>
                        <hr />
                        <p className="lead opacity-70">Choose any of the following plans to get start with. You can start with the FREE plan to see our web application at first. You can always change your plan from your account.</p>
                    </header>
                    <div className="col-md-4 col-sm-12">
                        <div className="item-inner-wrapper">
                            <img width="300px" height="300" src={require("WA/projects/ferrari/template/assets//img/portfolio/portfolio-1.jpg")} alt="" className="portfolio-thumb" />
                            <div className="overlay" />
                            <div className="portfolio-content">
                                <a data-gal="prettyPhoto[product-gallery]" rel="bookmark" href="https://medium.com/@sandesh.hegde/internet-of-things-iot-b13cc2d9637a"><i className="fa fa-eye" aria-hidden="true" /></a>
                                <h3><a href="https://medium.com/iot-conekt/iot-conekt-is-the-first-inhouse-dapp-to-be-built-on-the-arthanium-multichain-blockchain-c5007eac9535?source=---------5------------------" target="_blank">Works Title</a></h3>
                                <p>Web Design, Business, Photography</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="item-inner-wrapper">
                            <img width="300px" height="300" src="https://miro.medium.com/max/1600/1*L-KyK6YuaZX_41czG-RbcA.jpeg" alt="" className="portfolio-thumb" />
                            <div className="overlay" />
                            <div className="portfolio-content">
                                <a data-gal="prettyPhoto[product-gallery]" rel="bookmark" href="https://medium.com/@sandesh.hegde/internet-of-things-iot-b13cc2d9637a"><i className="fa fa-eye" aria-hidden="true" /></a>
                                <h3><a href="https://medium.com/@sandesh.hegde/internet-of-things-iot-b13cc2d9637a" target="_blank">Internet of Things (IoT)</a></h3>
                                <p>Web Design, Business, Photography</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="item-inner-wrapper">
                            <img width="300px" height="300" src="https://miro.medium.com/max/4800/1*8SL8giRT_7t9tnxKzMKAuw.jpeg" alt="" className="portfolio-thumb" />
                            <div className="overlay" />
                            <div className="portfolio-content">
                                <a data-gal="prettyPhoto[product-gallery]" rel="bookmark" href="https://medium.com/iot-conekt/provenance-in-a-blockchain-world-supply-chain-beyond-7ee89ea0a18c"><i className="fa fa-eye" aria-hidden="true" /></a>
                                <h3><a href="https://medium.com/iot-conekt/provenance-in-a-blockchain-world-supply-chain-beyond-7ee89ea0a18c" target="_blank">Works Title</a></h3>
                                <p>Web Design, Business, Photography</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section id="Team" className="section reviews bg-grey">
                <div className="container">
                    <header className="section-header">
                        <small>Team</small>
                        <h2>Our Team</h2>
                        {/* <hr /> */}
                        {/* <p className="lead opacity-70">Choose any of the following plans to get start with. You can start with the FREE plan to see our web application at first. You can always change your plan from your account.</p> */}
                    </header>
                    <div className="team-img">
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <div className="single-team">
                                    <img src={require("WA/projects/ferrari/template/assets//img/team/1.png")} alt="Team" />
                                    <div className="team-overlay" />
                                    <div className="team-content">
                                        <div className="team-text">
                                            <h3>Andrew Gaskarth</h3>
                                            <h5>web development</h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo</p>
                                        </div>
                                        {/* end team-text */}
                                        <div className="team-icon">
                                            <a className="facebook" href><i className="fa fa-facebook" /></a>
                                            <a className="linkedin" href><i className="fa fa-linkedin" /></a>
                                            <a className="twitter" href><i className="fa fa-twitter" /></a>
                                        </div>
                                        {/* end team-content*/}
                                    </div>
                                    {/* end team-content*/}
                                </div>
                                {/* end single-team */}
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="single-team">
                                    <img src={require("WA/projects/ferrari/template/assets//img/team/2.png")} alt="Team" />
                                    <div className="team-overlay" />
                                    <div className="team-content">
                                        <div className="team-text">
                                            <h3>Andrew Gaskarth</h3>
                                            <h5>web development</h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo</p>
                                        </div>
                                        {/* end team-text */}
                                        <div className="team-icon">
                                            <a className="facebook" href><i className="fa fa-facebook" /></a>
                                            <a className="linkedin" href><i className="fa fa-linkedin" /></a>
                                            <a className="twitter" href><i className="fa fa-twitter" /></a>
                                        </div>
                                        {/* end team-content*/}
                                    </div>
                                    {/* end team-content*/}
                                </div>
                                {/* end single-team */}
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="single-team">
                                    <img src={require("WA/projects/ferrari/template/assets//img/team/3.png")} alt="Team" />
                                    <div className="team-overlay" />
                                    <div className="team-content">
                                        <div className="team-text">
                                            <h3>Andrew Gaskarth</h3>
                                            <h5>web development</h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo</p>
                                        </div>
                                        {/* end team-text */}
                                        <div className="team-icon">
                                            <a className="facebook" href><i className="fa fa-facebook" /></a>
                                            <a className="linkedin" href><i className="fa fa-linkedin" /></a>
                                            <a className="twitter" href><i className="fa fa-twitter" /></a>
                                        </div>
                                        {/* end team-content*/}
                                    </div>
                                    {/* end team-content*/}
                                </div>
                                {/* end single-team */}
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="single-team">
                                    <img src={require("WA/projects/ferrari/template/assets//img/team/4.png")} alt="Team" />
                                    <div className="team-overlay" />
                                    <div className="team-content">
                                        <div className="team-text">
                                            <h3>Andrew Gaskarth</h3>
                                            <h5>web development</h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo</p>
                                        </div>
                                        {/* end team-text */}
                                        <div className="team-icon">
                                            <a className="facebook" href><i className="fa fa-facebook" /></a>
                                            <a className="linkedin" href><i className="fa fa-linkedin" /></a>
                                            <a className="twitter" href><i className="fa fa-twitter" /></a>
                                        </div>
                                        {/* end team-content*/}
                                    </div>
                                    {/* end team-content*/}
                                </div>
                                {/* end single-team */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contact" className="contact-section">
                <div id="map" />
                <div className="contact-box-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="contact-box">
                                    <h3>Send us a Message</h3>
                                    <form id="contact-form" className="form-group" method="POST" name="contact" netlify-honeypot="bot-field" data-netlify="true">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="name" id="name" placeholder="First Name" required />
                                            </div>
                                            <div className="col-md-6">
                                                <input name="lastname" type="text" placeholder="Last Name" required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="email" name="email" id="email" placeholder="Email" required />
                                            </div>
                                            <div className="col-md-6">
                                                <input name="subject" id="subject" type="text" placeholder="Subject" required />
                                            </div>
                                        </div>
                                        <textarea name="message" id="message" cols={30} rows={10} placeholder="Write Your Message" required defaultValue={""} />
                                        <button name="submit" className="submit" type="submit">Send Massage</button>
                                    </form>
                                    <p className="form-messege" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="getIn-tuchBox">
                                    <h3>Get In Touch</h3>
                                    <p><i className="fa fa-home" /> 2793 Cunningham Court,Clarkston,
                    <br />MI48346
                  </p>
                                    <p><i className="fa fa-phone" /> <a href="tel:005858595">+880123456789</a>
                                        <br />+880123456789
                  </p>
                                    <p><i className="fa fa-envelope" /> <a href="mailto:codeshaperbd@gmail.com">codeshaperbd@gmail.com</a>
                                        <br /><a href="mailto:codeshaperbd@gmail.com">codeshaperbd@gmail.com</a>
                                    </p>
                                    <div className="socials-icons">
                                        <a href="#"><i className="fa fa-facebook" /></a>
                                        <a href="#"><i className="fa fa-twitter" /></a>
                                        <a href="#"><i className="fa fa-linkedin-square" /></a>
                                        <a href="#"><i className="fa fa-skype" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="footer-text">
                                <p>Copyright @ 2017 <a href="index.html" target="_blank">Codeshaper</a> all right reserved.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="footer-menu">
                                <nav>
                                    <ul>
                                        <li><a href="index.html">Home </a></li>
                                        <li><a href="index.html">About</a></li>
                                        <li><a href="index.html">Terms</a></li>
                                        <li><a href="index.html">Privacy Policy</a></li>
                                        <li><a href="index.html">Licenses</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
