import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Header from './Header';
import Footer from './Footer';
import {
    OutlinedInput,
    Table,
    TableHead,
    TableCell,
    TableRow,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Hidden
} from '@material-ui/core';
import {
  CardActions,
  Typography,
  Container
} from '@material-ui/core';
import pro from "assets/images/pro.png";
import enterprise from "assets/images/enterprise.png";
import business from "assets/images/business.png";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.gray,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.white,
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  }
}));

const tiers = [
  {
    title: 'PRO',
    price: '49',
    description: ['400 Credits'],
    buttonText: 'GET STARTED',
    buttonVariant: 'contained',
    cardImage: pro
  },
  {
    title: 'BUSINESS',
    price: '149',
    description: [
      '1200 Credits'
    ],
    buttonText: 'GET STARTED',
    buttonVariant: 'contained',
    cardImage: business
  },
  {
    title: 'ENTERPRISE',
    price: '449',
    description: [
      '3600 Credits'
    ],
    buttonText: 'GET STARTED',
    buttonVariant: 'contained',
    cardImage: enterprise
  },
];
export default function Landing(props) {
  const classes = useStyles();
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
    const [projects, setProjects] = React.useState(0);
    const [partners, setPartners] = React.useState(0);
    const [products, setProducts] = React.useState(0);
    const [mediumData, setMediumData] = React.useState([]);

    React.useEffect(() => {
        fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/arthanium")
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setMediumData(result.items)
            })
    }, [])
    return (
        <div className="body">
            <Header />
            <div className="section full-screen background-image-side">
                <AutoPlaySwipeableViews>
                    <div className="wrapper">
                        <div className="columns column w-row">
                            <div className="column herocontent w-col w-col-5">
                                <h2>Decentralized Trade and Supply Chain on Blockchain</h2>
                                <p className="short-paragraph">Building solutions for transparency, automating processes, trade finance and protecting your brand from counterfeiting.</p>
                                <p className="short-paragraph">Leverage the power of digitized doccumentation, connected IoT devices, & smart contracts with our Dapps.</p>
                                <div className="value-proposition-container">
                                    <div className="value-proposition-buttons"><a href="/demo" className="button2 margin-left w-button">GET TOUR</a><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                </div>
                            </div>
                            <div className="w-col w-col-7"><img data-src="/images/r2.png" width={1000} height={380} srcSet="/images/r2.png 500w, /images/r2.png 800w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 83vw, 45vw" alt="" className="image" /></div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="columns column w-row">
                            <div className="w-col w-col-7"><img data-src="/images/two.png" width={1000} height={380} srcSet="/images/two.png 500w, /images/two.png 800w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 83vw, 45vw" alt="" className="image" /></div>
                            <div className="column herocontent w-col w-col-5">
                                <h2>Anti-Counterfeiting, Provenance and Chain of Custody</h2>
                                <p className="short-paragraph">Create digital identities for physical assets through unique identifiers like connected IoT Devices / Sensors and track them through their journey and make selective information available to all stakeholders.</p>
                                <div className="value-proposition-container">
                                    <div className="value-proposition-buttons"><a href="/demo" className="button2 margin-left w-button">GET TOUR</a><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AutoPlaySwipeableViews>
            </div>
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
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img data-src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img data-src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img data-src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">What is Arthanium ?</h2>
                                    <p className="ondark">A decentralized platform for organizations to create trade consortiums for their various projects & bring all stakeholders on one platform.</p>
                                </div>
                                <div className="row-2">
                                    <div className="col lg-6 sm-1">
                                        <div>
                                            <h3 className="ondark">More Dynamic</h3>
                                            <p className="ondark">Access to more credible information on time for quicker decision making.</p>
                                        </div>
                                    </div>
                                    <div className="col lg-6 sm-1">
                                        <div>
                                            <h3 className="ondark">More Efficient</h3>
                                            <p className="ondark">Eliminate low value task so that people can focus on higher value activities.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col lg-6 sm-1"> */}
                                <div>
                                    <h3 className="ondark">More Value</h3>
                                    <p className="ondark">Integrate diverse activities between stake holders more effectively to create additional value and eliminate gaps.</p>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="Solutions" className="section less-v-margin">
                    <div className="wrapper">
                        <div className="row-2 sm-reverse">
                            <div className="col lg-1 hidden-lg-down" />
                            <div className="col lg-5 sm-2 lg-vertical-align">
                                <div className="sm-align-centre">
                                    <h2 className="ondark">How does it work?</h2>
                                    {/* <p className="margin-bottom ondark">Our optimized configuration process saves your team time when running and scaling distributed applications, AI &amp; machine learning workloads, hosted services, client websites, or CI/CD environments.</p> */}
                                </div>
                                {/* <div className="row-2"> */}
                                <div className="col lg-12 sm-1">
                                    <div>
                                        <h3 className="ondark">Buyers / Sellers</h3>
                                        <p className="ondark">Register your organization on the platform, create projects, connect with partners & experience decentralized trade.</p>
                                    </div>
                                </div>
                                <div className="col lg-12 sm-1">
                                    <div>
                                        <h3 className="ondark">Partners</h3>
                                        <p className="ondark">Organizations can search / add partners for their supply chain Come onboard If you are in Banking, Logistics, Insurance, Certification.</p>
                                    </div>
                                </div>
                                {/* </div> */}
                                {/* <div className="flex-readmore">
                                    <div className="readmore ondark"><a href="#" className="link">Learn More</a></div>
                                    <div className="icon"><br />‍</div>
                                </div> */}
                            </div>
                            <div className="col lg-1 hidden-lg-down" />
                            <div className="col lg-5"><iframe width="450" height="350"
                                src="https://www.youtube.com/embed/SSo_EIwHSd4" frameborder="0" allowfullscreen>
                            </iframe></div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="features" className="section">
                <div className="wrapper" style={{ paddingLeft: 0 }}>

                    <h2 data-w-id="7b5c466a-962a-8742-1d10-203f426a0c19" style={{ opacity: 1 }} className="section-header withdesc">Why Arthanium?</h2>
                    <div style={{ marginLeft: 70, marginTop: 50 }}>
                        <div className="feature-container">

                            {/* <p className="short-paragraph sectionsub">Built with education agencies in mind, Kergan is packed with features that you will actually use in your day-to-day business operations</p> */}
                            <div className="row-2">
                                <div className="col lg-3">
                                    <div data-w-id="7b5c466a-962a-8742-1d10-203f426a0c1d" style={{ opacity: 1, textAlign: '-webkit-center', paddingTop: 10 }} className="margin-bottom"><img src="http://detheme.com/templates/kergan/images/commision.png" width={150} height={150} alt="" className="icon" />
                                        <h4>Blockchain</h4>
                                        <p className="paragraph"><strong>Secure</strong><br />
                                            Heterogenous multi chain blockchain architecture Scalable, Interoperable Secure & High TPS.</p>
                                    </div>
                                </div>
                                <div className="col lg-3">
                                    <div data-w-id="7b5c466a-962a-8742-1d10-203f426a0c24" style={{ opacity: 1, textAlign: '-webkit-center', paddingTop: 10 }} className="margin-bottom"><img src="http://detheme.com/templates/kergan/images/timeline.png" width={150} height={150} alt="" className="icon" />
                                        <h4>DApps</h4>
                                        <p className="paragraph"><strong>Automate </strong><br />
                                            Decentralized Apps ecosystem for digitized doccumentation, connected devices & trade finance.</p>
                                    </div>
                                </div>
                                <div className="col lg-3">
                                    <div data-w-id="7b5c466a-962a-8742-1d10-203f426a0c2b" style={{ opacity: 1, textAlign: '-webkit-center', paddingTop: 10 }} className="margin-bottom"><img src="http://detheme.com/templates/kergan/images/team.png" width={150} height={150} alt="" className="icon" />
                                        <h4>Partners</h4>
                                        <p className="paragraph"><strong>Collaborate</strong><br />
                                            Brings all diverse stakeholders on one platform Integrate diverse activities more efficiently.</p>
                                    </div>
                                </div>
                                <div className="col lg-3">
                                    <div data-w-id="7b5c466a-962a-8742-1d10-203f426a0c32" style={{ opacity: 1, textAlign: '-webkit-center', paddingTop: 10 }} className="margin-bottom"><img src="http://detheme.com/templates/kergan/images/report.png" width={150} height={150} alt="" className="icon" />
                                        <h4>Industry 4.0</h4>
                                        <p className="paragraph"><strong>Innovate</strong><br />
                                            Unlock new opportunities Eliminate low value activities.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="section bglite">
                <div className="wrapper">
                    <div className="row-2 align-centre">
                        <div className="col lg-6 md-3 xs-2">
                            <div className="centre-align">
                                <div className="margin-bottom">
                                    <h2 className="section-header withdesc ondark">A native app for every platform</h2>
                                    <p className="ondark">The platform is accessible on both web and mobile.</p>
                                    <div className="row-2 align-centre">
                                        <div className="col lg-6">
                                            <a href="#" className="link-block w-inline-block"><img data-src="images/nm11.png" width={1000} height={500} alt="" className="image-2" /></a>
                                        </div>
                                        <div className="col lg-6">
                                            <a href="#" className="w-inline-block"><img data-src="images/b.png" width={500} width={500} alt="" className="image-3" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="download" data-w-id="198c5aed-cf25-e317-0851-2c0c40bfb7e9" className="bgkluwer" />
            </div> */}
            <div id="testimonials" className="section bgtestimonial1">
                <div className="mask w-slider-mask">
                <Container maxWidth="md" component="main">
                  <GridContainer alignItems="flex-end">
                    {tiers.map(tier => (
                      // Enterprise card is full width at sm breakpoint
                      <GridItem key={tier.title} xs={12} sm={12} md={4}>
                        <Card>
                          <CardHeader plain style={{margin: 0}}>
                            <img src={tier.cardImage} height="100%" width="100%"/>
                          </CardHeader>
                          <CardBody >
                            <div className={classes.cardPricing}>
                              <Typography component="h2" variant="h3" color="textPrimary">
                                ${tier.price}
                              </Typography>
                              <Typography variant="h6" color="textSecondary">
                                /month
                              </Typography>
                            </div>
                            <ul>
                              {tier.description.map(line => (
                                <Typography component="li" variant="subtitle1" align="center" key={line}>
                                  {line}
                                </Typography>
                              ))}
                            </ul>
                          </CardBody>
                          <CardActions style={{justifyContent: "center"}}>
                            <Button variant={tier.buttonVariant} style={{marginBottom: "50px"}} round color="warning" onClick={() => props.history.push("/login")}>
                              {tier.buttonText}
                            </Button>
                          </CardActions>
                        </Card>
                      </GridItem>
                    ))}
                  </GridContainer>
                </Container>
                </div>
            </div>
            {/* <div className="section"> */}
            <Hidden smDown>
            <div className="wrapper">
                <div className="row">
                    <div className="columns-2 w-row">
                        <div className="column-2 w-col w-col-3">
                        </div>
                        <div className=" w-col w-col-7" style={{ textAlign: "-webkit-center", paddingTop: "50", paddingBottom: "50" }}>
                            <div>
                                <Table>
                                    <TableRow>
                                        <TableCell colspan="4" align="center">Credit Chart</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Action</TableCell>
                                        <TableCell>Cost per action</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell colspan="2">Credit Calculator</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Projects</TableCell>
                                        <TableCell>75</TableCell>
                                        <TableCell><OutlinedInput type="number" style={{ width: "50" }} value={projects} onChange={(e) => { setProjects(e.target.value) }} placeholder="Enter no. of project" /></TableCell>
                                        <TableCell><OutlinedInput type="number" style={{ width: "50" }} value={projects === NaN ? 0 : parseInt(projects) * 75} readOnly /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Partners</TableCell>
                                        <TableCell>15</TableCell>
                                        <TableCell><OutlinedInput type="number" style={{ width: "50" }} value={partners} onChange={(e) => { setPartners(e.target.value) }} placeholder="Enter no. of partners" /></TableCell>
                                        <TableCell><OutlinedInput type="number" style={{ width: "50" }} value={partners === NaN ? 0 : parseInt(partners) * 15} readOnly /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Products / Docs / Devices</TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell><OutlinedInput type="number" style={{ width: "50" }} value={products} onChange={(e) => { setProducts(e.target.value) }} placeholder="Enter no. of products / docs / devices" /></TableCell>
                                        <TableCell><OutlinedInput type="number" style={{ width: "50" }} value={products} readOnly /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colspan="1"></TableCell>
                                        <TableCell colspan="2">Total</TableCell>
                                        <TableCell><OutlinedInput type="number" style={{ width: "50" }} value={projects === NaN ? 0 : parseInt(projects * 75) + parseInt(partners * 15) + (products === NaN ? 0 : parseInt(products))} readOnly placeholder="Total" /></TableCell>
                                    </TableRow>
                                </Table>
                            </div>
                        </div>
                        <div className="column-2 w-col w-col-2">
                        </div>
                    </div>
                    <div className="columns-2 w-row">
                        <div className="column-2 w-col w-col-12">
                            <div className="margin-bottom">
                                <h2 className="heading-2">Note</h2>
                                <List component="nav" className={classes.root} aria-label="contacts">
                                  <ListItem>
                                    <ListItemIcon>
                                      <FiberManualRecordIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Setup and customization charges could be applicable for certain customers." />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemIcon>
                                      <FiberManualRecordIcon fontSize="small" />
                                    </ListItemIcon>
                                      <ListItemText primary="For larger customized plans contact us directly." />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemIcon>
                                      <FiberManualRecordIcon fontSize="small" />
                                    </ListItemIcon>
                                      <ListItemText primary="Additional monthly credits packs can be purchased at $ 49 for 400 Credits." />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemIcon>
                                      <FiberManualRecordIcon fontSize="small" />
                                    </ListItemIcon>
                                      <ListItemText primary="Validity of plan & credits is one month and it cannot be carried forward." />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemIcon>
                                      <FiberManualRecordIcon fontSize="small" />
                                    </ListItemIcon>
                                      <ListItemText primary="Currently we don’t charge any transaction based fee, but in future we might move to a transaction based fee model." />
                                  </ListItem>
                                </List>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
            </Hidden>
            <div id="testimonials" className="section bgtestimonial">
                <div>
                    <div data-delay={4000} data-animation="slide" className="slider-3 w-slider" data-autoplay={1} data-easing="ease-in-out-expo" data-hide-arrows={1} data-nav-spacing={10} data-duration={1200} data-infinite={1}>
                        <div className="mask w-slider-mask">
                            <AutoPlaySwipeableViews>
                                {
                                    mediumData.map(element => {
                                        var myString = element.categories.join(', ');

                                        return (
                                            <div className="slide w-slide">
                                                <div className="container-div">
                                                    <div className="testimonial-container">
                                                        <div className="testimonial-content" onClick={() => window.open(element.link, "_blank")}>
                                                            {/* <img src={element.thumbnail} width="350" height="300" alt="" className="image-5" /> */}
                                                            {/* <div className="quote-circle"> */}
                                                            {/* <p className="big-quote">{element.title}</p> */}
                                                            {/* </div> */}
                                                            <h4 className="testimonial-title" dangerouslySetInnerHTML={{ __html: element.title }} />
                                                            <p className="testimonial-text" dangerouslySetInnerHTML={{ __html: element.description }} />
                                                            <h5 className="heading-3">{element.author}</h5>
                                                            {/* <h7 className="heading-3">Tags - {myString.toString()}</h7> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </AutoPlaySwipeableViews>
                        </div>
                        <div className="hide w-slider-arrow-left">
                            <div className="w-icon-slider-left" />
                        </div>
                        <div className="hide w-slider-arrow-right">
                            <div className="w-icon-slider-right" />
                        </div>
                        <div className="slide-nav-2 w-slider-nav w-slider-nav-invert w-round" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
