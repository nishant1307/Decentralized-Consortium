import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import "../../WA/projects/ferrari/template/assets/css/font-awesome.min.css"
import "../../WA/projects/ferrari/template/assets/css/prettyPhoto.css"
import "../../WA/projects/ferrari/template/assets/css/swiper.min.css"
import "../../WA/projects/ferrari/template/assets/css/owl.carousel.min.css"
import "../../WA/projects/ferrari/template/assets/css/sliderDefault.css"
import "../../WA/projects/ferrari/template/assets/css/sliderCustom.css"
import "../../WA/projects/ferrari/template/assets/css/style.css"
import "../../WA/projects/ferrari/template/assets/css/responsive.css"


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
                            <img src={require("../../WA/projects/ferrari/template/assets/img/logo1.png")} alt="logo" />
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
                            <div className="sl-slide bg-1" data-orientation="horizontal" data-slice1-rotation={-25} data-slice2-rotation={-25} data-slice1-scale={2} data-slice2-scale={2}>
                                <div className="sl-slide-inner">
                                    <div className="deco" >
                                        <img src={require("../../WA/projects/ferrari/template/assets//img/headshot1.png")} alt="img" />
                                    </div>
                                    <h2>Lorem ipsum</h2>
                                    <blockquote>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ipsum facilisis, tristique nulla vel,.</p>
                                        <cite>Jhon Doe</cite>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        <div id="slider" className="sl-slider-wrapper">
                            <div className="sl-slide bg-3" data-orientation="horizontal" data-slice1-rotation={3} data-slice2-rotation={3} data-slice1-scale={2} data-slice2-scale={1}>
                                <div className="sl-slide-inner">
                                    <div className="deco">
                                        <img src={require("../../WA/projects/ferrari/template/assets//img/s.png")} alt="img" />
                                    </div>
                                    <h2>Lorem ipsum</h2>
                                    <blockquote>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ipsum facilisis, tristique nulla vel,.</p>
                                        <cite>Jhon Doe</cite>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        <div id="slider" className="sl-slider-wrapper">
                            <div className="sl-slide bg-4" data-orientation="vertical" data-slice1-rotation={-5} data-slice2-rotation={25} data-slice1-scale={2} data-slice2-scale={1}>
                                <div className="sl-slide-inner">
                                    <div className="deco">
                                        <img src={require("../../WA/projects/ferrari/template/assets//img/s1.png")} alt="img" />
                                    </div>
                                    <h2>Lorem ipsum</h2>
                                    <blockquote>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ipsum facilisis, tristique nulla vel,.</p>
                                        <cite>Jhon Doe</cite>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        <div id="slider" className="sl-slider-wrapper">
                            <div className="sl-slide bg-5" data-orientation="horizontal" data-slice1-rotation={-5} data-slice2-rotation={10} data-slice1-scale={2} data-slice2-scale={1}>
                                <div className="sl-slide-inner">
                                    <div className="deco">
                                        <img src={require("../../WA/projects/ferrari/template/assets//img/s3.png")} alt="img" />
                                    </div>
                                    <h2>Lorem ipsum</h2>
                                    <blockquote>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ipsum facilisis, tristique nulla vel,.</p>
                                        <cite>Jhon Doe</cite>
                                    </blockquote>
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
                                    <img src={require("../../WA/projects/ferrari/template/assets//img/slider/slider-dashboard.jpg")} alt="..." />
                                </div>
                                <div className="swiper-slide">
                                    <img src={require("../../WA/projects/ferrari/template/assets//img/slider/slider-admin.jpg")} alt="..." />
                                </div>
                                <div className="swiper-slide">
                                    <img src={require("../../WA/projects/ferrari/template/assets//img/slider/slider-items.jpg")} alt="..." />
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
                        <small>Services</small>
                        <h2>How does it work?</h2>
                        <hr />
                        {/* <p className="lead opacity-70">Choose any of the following plans to get start with. You can start with the FREE plan to see our web application at first. You can always change your plan from your account.</p> */}
                    </header>
                    <div className="row">
                        <div className="features-wrap">
                            <div className="col-md-4 col-sm-12 text-center">
                                <img src={require("../../WA/projects/ferrari/template/assets//img/ipad-img.png")} alt="" className="ipad-img" />
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="panel-group theme-accordian-rounded" id="accordion2">
                                            <div className="panel">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                        <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne2">
                                                            <i className="fa fa-minus" />
                                                            Buyers / Sellers
                            </a>
                                                    </h4>
                                                </div>
                                                <div id="collapseOne2" className="panel-collapse collapse in">
                                                    <div className="panel-body">
                                                        register your organization on the platform, create projects, connect with partners & experience decentralized trade.
                          </div>
                                                </div>
                                            </div>
                                            <div className="panel">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                        <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo2">
                                                            <i className="fa fa-plus" />
                                                            Partners
                            </a>
                                                    </h4>
                                                </div>
                                                <div id="collapseTwo2" className="panel-collapse collapse">
                                                    <div className="panel-body">
                                                        Organizations can search / add partners for their supply chain Come onboard If you are in Banking, Logistics, Insurance, Certification.
                          </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-md-5">
                                        <div className="skillbar-wrap">
                                            <div className="clearfix">
                                                Dreamweaver
                      </div>
                                            <div className="skillbar" data-percent="95%">
                                                <div className="skillbar-percent">95%</div>
                                                <div className="skillbar-bar" />
                                            </div>
                                        </div>
                                        <div className="skillbar-wrap">
                                            <div className="clearfix">
                                                Wordpress
                      </div>
                                            <div className="skillbar" data-percent="98%">
                                                <div className="skillbar-percent">98%</div>
                                                <div className="skillbar-bar" />
                                            </div>
                                        </div>
                                        <div className="skillbar-wrap">
                                            <div className="clearfix">
                                                HTML5/CSS
                      </div>
                                            <div className="skillbar" data-percent="70%">
                                                <div className="skillbar-percent">70%</div>
                                                <div className="skillbar-bar" />
                                            </div>
                                        </div>
                                        <div className="skillbar-wrap">
                                            <div className="clearfix">
                                                Jquery
                      </div>
                                            <div className="skillbar" data-percent="95%">
                                                <div className="skillbar-percent">95%</div>
                                                <div className="skillbar-bar" />
                                            </div>
                                        </div>
                                    </div> */}
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
                        <h2>Our Features</h2>
                        <hr />
                        <p className="lead opacity-70">Choose any of the following plans to get start with. You can start with the FREE plan to see our web application at first. You can always change your plan from your account.</p>
                    </header>
                    <div className="row text-center">
                        <div className="service-block-list">
                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <div className="service-block-item service-item-1 row">
                                    <div className="service-block-inner">
                                        <a className="service-icon" href="#">
                                            <i className="fa fa-google-wallet" />
                                        </a>
                                        <div className="service-block-inner-content">
                                            <h4 className="service-item-title"><a href="#">Web Design</a></h4>
                                            <div className="service-block-item-excerpt">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ipsum facilisis, tristique nulla vel....</p>
                                            </div>
                                            {/* .service-block-item-excerpt */}
                                        </div>
                                        {/* .service-block-inner-content */}
                                    </div>
                                    {/* .service-block-inner */}
                                </div>
                                {/* .service-block-item */}
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <div className="service-block-item service-item-2 row">
                                    <div className="service-block-inner">
                                        <a className="service-icon" href="#">
                                            <i className="fa fa-line-chart" />
                                        </a>
                                        <div className="service-block-inner-content">
                                            <h4 className="service-item-title"><a href="#">Web Development</a></h4>
                                            <div className="service-block-item-excerpt">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ipsum facilisis, tristique nulla vel....</p>
                                            </div>
                                            {/* .service-block-item-excerpt */}
                                        </div>
                                        {/* .service-block-inner-content */}
                                    </div>
                                    {/* .service-block-inner */}
                                </div>
                                {/* .service-block-item */}
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <div className="service-block-item service-item-3 row">
                                    <div className="service-block-inner">
                                        <a className="service-icon" href="#">
                                            <i className="fa fa-male" />
                                        </a>
                                        <div className="service-block-inner-content">
                                            <h4 className="service-item-title"><a href="#">Seo</a></h4>
                                            <div className="service-block-item-excerpt">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ipsum facilisis, tristique nulla vel....</p>
                                            </div>
                                            {/* .service-block-item-excerpt */}
                                        </div>
                                        {/* .service-block-inner-content */}
                                    </div>
                                    {/* .service-block-inner */}
                                </div>
                                {/* .service-block-item */}
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <div className="service-block-item service-item-4 row">
                                    <div className="service-block-inner">
                                        <a className="service-icon" href="#">
                                            <i className="fa fa-briefcase" />
                                        </a>
                                        <div className="service-block-inner-content">
                                            <h4 className="service-item-title"><a href="#">Graphics</a></h4>
                                            <div className="service-block-item-excerpt">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ipsum facilisis, tristique nulla vel....</p>
                                            </div>
                                            {/* .service-block-item-excerpt */}
                                        </div>
                                        {/* .service-block-inner-content */}
                                    </div>
                                    {/* .service-block-inner */}
                                </div>
                                {/* .service-block-item */}
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <div className="service-block-item service-item-5 row">
                                    <div className="service-block-inner">
                                        <a className="service-icon" href="#">
                                            <i className="fa fa-map-o" />
                                        </a>
                                        <div className="service-block-inner-content">
                                            <h4 className="service-item-title"><a href="#">Finance</a></h4>
                                            <div className="service-block-item-excerpt">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ipsum facilisis, tristique nulla vel....</p>
                                            </div>
                                            {/* .service-block-item-excerpt */}
                                        </div>
                                        {/* .service-block-inner-content */}
                                    </div>
                                    {/* .service-block-inner */}
                                </div>
                                {/* .service-block-item */}
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <div className="service-block-item service-item-6 row">
                                    <div className="service-block-inner">
                                        <a className="service-icon" href="#">
                                            <i className="fa fa-pencil-square-o" />
                                        </a>
                                        <div className="service-block-inner-content">
                                            <h4 className="service-item-title"><a href="#">Apps Development</a></h4>
                                            <div className="service-block-item-excerpt">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ipsum facilisis, tristique nulla vel....</p>
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

            <section id="Portfolio" className="section">
                <div className="container">
                    <header className="section-header">
                        <small>Portfolio</small>
                        <h2>Our Portfolio</h2>
                        <hr />
                        <p className="lead opacity-70">Choose any of the following plans to get start with. You can start with the FREE plan to see our web application at first. You can always change your plan from your account.</p>
                    </header>
                    <nav className="portfolio-filter">
                        <ul>
                            <li><a className="active" href="#" data-filter="*"><span /> All</a></li>
                            <li><a className href="#" data-filter=".web-design">Web Design</a></li>
                            <li><a className href="#" data-filter=".graphic-design">Graphic Design</a></li>
                            <li><a className href="#" data-filter=".photography">Photography</a></li>
                        </ul>
                    </nav>
                    <div id="portfolio" className="masonry-wrapper row-fluid wow fadeInUp">
                        <div className="portfolio-item  photography">
                            <div className="item-inner-wrapper">
                                <img src={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-1.jpg")} alt="" className="portfolio-thumb" />
                                <div className="overlay" />
                                <div className="portfolio-content">
                                    <a data-gal="prettyPhoto[product-gallery]" rel="bookmark" href={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-1.jpg")}><i className="fa fa-eye" aria-hidden="true" /></a>
                                    <h3><a href="#">Works Title</a></h3>
                                    <p>Web Design, Business, Photography</p>
                                </div>
                            </div>
                        </div>
                        {/* end item */}
                        <div className="portfolio-item  graphic-design">
                            <div className="item-inner-wrapper">
                                <img src={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-2.jpg")} alt="" className="portfolio-thumb" />
                                <div className="overlay" />
                                <div className="portfolio-content">
                                    <a data-gal="prettyPhoto[product-gallery]" rel="bookmark" href={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-2.jpg")}><i className="fa fa-eye" aria-hidden="true" /></a>
                                    <h3><a href="#">Works Title</a></h3>
                                    <p>Web Design, Business, Photography</p>
                                </div>
                            </div>
                        </div>
                        {/* end item */}
                        <div className="portfolio-item  photography">
                            <div className="item-inner-wrapper">
                                <img src={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-3.jpg")} alt="" className="portfolio-thumb" />
                                <div className="overlay" />
                                <div className="portfolio-content">
                                    <a data-gal="prettyPhoto[product-gallery]" rel="bookmark" href={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-3.jpg")}><i className="fa fa-eye" aria-hidden="true" /></a>
                                    <h3><a href="#">Works Title</a></h3>
                                    <p>Web Design, Business, Photography</p>
                                </div>
                            </div>
                        </div>
                        {/* end item */}
                        <div className="portfolio-item  web-design">
                            <div className="item-inner-wrapper">
                                <img src={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-4.jpg")} alt="" className="portfolio-thumb" />
                                <div className="overlay" />
                                <div className="portfolio-content">
                                    <a data-gal="prettyPhoto[product-gallery]" rel="bookmark" href={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-4.jpg")}><i className="fa fa-eye" aria-hidden="true" /></a>
                                    <h3><a href="#">Works Title</a></h3>
                                    <p>Web Design, Business, Photography</p>
                                </div>
                            </div>
                        </div>
                        {/* end item */}
                        <div className="portfolio-item  photography">
                            <div className="item-inner-wrapper">
                                <img src={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-5.jpg")} alt="" className="portfolio-thumb" />
                                <div className="overlay" />
                                <div className="portfolio-content">
                                    <a data-gal="prettyPhoto[product-gallery]" rel="bookmark" href={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-5.jpg")}><i className="fa fa-eye" aria-hidden="true" /></a>
                                    <h3><a href="#">Works Title</a></h3>
                                    <p>Web Design, Business, Photography</p>
                                </div>
                            </div>
                        </div>
                        {/* end item */}
                        <div className="portfolio-item  graphic-design">
                            <div className="item-inner-wrapper">
                                <img src={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-6.jpg")} alt="" className="portfolio-thumb" />
                                <div className="overlay" />
                                <div className="portfolio-content">
                                    <a data-gal="prettyPhoto[product-gallery]" rel="bookmark" href={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-6.jpg")}><i className="fa fa-eye" aria-hidden="true" /></a>
                                    <h3><a href="#">Works Title</a></h3>
                                    <p>Web Design, Business, Photography</p>
                                </div>
                            </div>
                        </div>
                        {/* end item */}
                        <div className="portfolio-item  photography">
                            <div className="item-inner-wrapper">
                                <img src={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-7.jpg")} alt="" className="portfolio-thumb" />
                                <div className="overlay" />
                                <div className="portfolio-content">
                                    <a data-gal="prettyPhoto[product-gallery]" rel="bookmark" href={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-7.jpg")}><i className="fa fa-eye" aria-hidden="true" /></a>
                                    <h3><a href="#">Works Title</a></h3>
                                    <p>Web Design, Business, Photography</p>
                                </div>
                            </div>
                        </div>
                        {/* end item */}
                        <div className="portfolio-item  web-design">
                            <div className="item-inner-wrapper">
                                <img src={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-8.jpg")} alt="" className="portfolio-thumb" />
                                <div className="overlay" />
                                <div className="portfolio-content">
                                    <a data-gal="prettyPhoto[product-gallery]" rel="bookmark" href={require("../../WA/projects/ferrari/template/assets//img/portfolio/portfolio-8.jpg")}><i className="fa fa-eye" aria-hidden="true" /></a>
                                    <h3><a href="#">Works Title</a></h3>
                                    <p>Web Design, Business, Photography</p>
                                </div>
                            </div>
                        </div>
                        {/* end item */}
                    </div>
                </div>
            </section>

            <section id="counter" className="section bg-grey">
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

            <section id="Team" className="section team-area">
                <div className="container">
                    <header className="section-header">
                        <small>Team</small>
                        <h2>Our Creative Team</h2>
                        <hr />
                        <p className="lead opacity-70">Choose any of the following plans to get start with. You can start with the FREE plan to see our web application at first. You can always change your plan from your account.</p>
                    </header>
                    <div className="team-img">
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <div className="single-team">
                                    <img src={require("../../WA/projects/ferrari/template/assets//img/team/1.png")} alt="Team" />
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
                                    <img src={require("../../WA/projects/ferrari/template/assets//img/team/2.png")} alt="Team" />
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
                                    <img src={require("../../WA/projects/ferrari/template/assets//img/team/3.png")} alt="Team" />
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
                                    <img src={require("../../WA/projects/ferrari/template/assets//img/team/4.png")} alt="Team" />
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

            <section id="testimonial" className="section reviews bg-grey">
                <div className="container">
                    <header className="section-header">
                        <small>Testimonial</small>
                        <h2>Our Client Says</h2>
                        <hr />
                        <p className="lead opacity-70">Choose any of the following plans to get start with. You can start with the FREE plan to see our web application at first. You can always change your plan from your account.</p>
                    </header>
                    <div className="row">
                        {/* end col-12 */}
                        <div className="col-xs-12">
                            <div className="owl-slider">
                                <div className="testimonial">
                                    <figure className="head"> <img src={require("../../WA/projects/ferrari/template/assets//img/headshot1.png")} alt="Image" /> </figure>
                                    <h4>ENVATO LT.</h4>
                                    <small>JESSICA CARTER - BUSINESS MANAGER</small> <span className="rates"> <i className="fa fa-star" aria-hidden="true" /> <i className="fa fa-star" aria-hidden="true" /> <i className="fa fa-star" aria-hidden="true" /> <i className="fa fa-star" aria-hidden="true" /> <i className="fa fa-star" aria-hidden="true" /> </span>
                                    <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipis civelit sed quia non qui dolorem ipsum quia dolor sit amet, consectetur, adipis civelit sed quia numquam eius modi. Neque porro quisquam est.</p>
                                </div>
                                {/* end testimonial */}
                                <div className="testimonial">
                                    <figure className="head"> <img src={require("../../WA/projects/ferrari/template/assets//img/headshot1.png")} alt="Image" /> </figure>
                                    <h4>ENVATO LT.</h4>
                                    <small>JESSICA CARTER - BUSINESS MANAGER</small> <span className="rates"> <i className="fa fa-star" aria-hidden="true" /> <i className="fa fa-star" aria-hidden="true" /> <i className="fa fa-star" aria-hidden="true" /> <i className="fa fa-star" aria-hidden="true" /> <i className="fa fa-star" aria-hidden="true" /> </span>
                                    <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipis civelit sed quia non qui dolorem ipsum quia dolor sit amet, consectetur, adipis civelit sed quia numquam eius modi. Neque porro quisquam est.</p>
                                </div>
                                {/* end testimonial */}
                                <div className="testimonial">
                                    <figure className="head"> <img src={require("../../WA/projects/ferrari/template/assets//img/headshot1.png")} alt="Image" /> </figure>
                                    <h4>ENVATO LT.</h4>
                                    <small>JESSICA CARTER - BUSINESS MANAGER</small> <span className="rates"> <i className="fa fa-star" aria-hidden="true" /> <i className="fa fa-star" aria-hidden="true" /> <i className="fa fa-star" aria-hidden="true" /> <i className="fa fa-star" aria-hidden="true" /> <i className="fa fa-star" aria-hidden="true" /> </span>
                                    <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipis civelit sed quia non qui dolorem ipsum quia dolor sit amet, consectetur, adipis civelit sed quia numquam eius modi. Neque porro quisquam est.</p>
                                </div>
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
                        <p className="lead opacity-70">Choose any of the following plans to get start with. You can start with the FREE plan to see our web application at first. You can always change your plan from your account.</p>
                    </header>
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="ssingle-pricing">
                                <h4>Personal</h4>
                                <div className="pricing-icon">
                                    <img src={require("../../WA/projects/ferrari/template/assets//img/1.png")} alt="images" />
                                </div>
                                <div className="pricing-content">
                                    <ul>
                                        <li>2 GB web space</li>
                                        <li>free domain register</li>
                                        <li className="off">special offer</li>
                                        <li>service uptime</li>
                                    </ul>
                                </div>
                                <div className="pricing-count">
                                    <h4>$15/Mo</h4>
                                    <a className="sorder-btn" href>Order Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="ssingle-pricing">
                                <h4>Professional</h4>
                                <div className="pricing-icon">
                                    <img src={require("../../WA/projects/ferrari/template/assets//img/1.png")} alt="images" />
                                </div>
                                <div className="pricing-content">
                                    <ul>
                                        <li>2 GB web space</li>
                                        <li>free domain register</li>
                                        <li className="off">special offer</li>
                                        <li>service uptime</li>
                                    </ul>
                                </div>
                                <div className="pricing-count">
                                    <h4>$15/Mo</h4>
                                    <a className="sorder-btn" href>Order Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="ssingle-pricing">
                                <h4>Business</h4>
                                <div className="pricing-icon">
                                    <img src={require("../../WA/projects/ferrari/template/assets//img/1.png")} alt="images" />
                                </div>
                                <div className="pricing-content">
                                    <ul>
                                        <li>2 GB web space</li>
                                        <li>free domain register</li>
                                        <li className="off">special offer</li>
                                        <li>service uptime</li>
                                    </ul>
                                </div>
                                <div className="pricing-count">
                                    <h4>$15/Mo</h4>
                                    <a className="sorder-btn" href>Order Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="ssingle-pricing">
                                <h4>Enterprise</h4>
                                <div className="pricing-icon">
                                    <img src={require("../../WA/projects/ferrari/template/assets//img/1.png")} alt="images" />
                                </div>
                                <div className="pricing-content">
                                    <ul>
                                        <li>2 GB web space</li>
                                        <li>free domain register</li>
                                        <li className="off">special offer</li>
                                        <li>service uptime</li>
                                    </ul>
                                </div>
                                <div className="pricing-count">
                                    <h4>$15/Mo</h4>
                                    <a className="sorder-btn" href>Order Now</a>
                                </div>
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
        </div>
    );
}
