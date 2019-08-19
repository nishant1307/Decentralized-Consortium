import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './Landing.css';
function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    link: {
        margin: theme.spacing(1),
    },
    main: {
        display: 'flex'
    },
    grow: {
        flexGrow: 1,
    },
    root: {
        flexGrow: 1,
    },
}));

export default function Landing(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar color="default">
                    <Toolbar className={classes.main}>
                        <img width="50" height="50" src={require('../../websiteAssets/logo/logo.png')} />
                        <div className={classes.grow} />
                        <div style={{ alignContent: "center", textAlign: 'center' }}>
                            <a href="google.com" >
                                Home
                            </a>
                            <a href="google.com"  >
                                Platform
                            </a>
                            <a href="google.com"  >
                                Partners
                            </a>
                            <a href="google.com"  >
                                Solutions
                            </a>
                            <a href="google.com" >
                                Industry
                            </a>
                            <a href="google.com" >
                                About Us
                            </a>
                            <a href="/login" >
                                Get Started
                            </a>
                        </div>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <main>
                <Paper style={{ height: window.innerHeight - 50 }}>
                    <div className="my-background">
                        <Grid container justify="center">
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={5}>
                                <h2 style={{ color: "white", textAlign: 'center', fontSize: 40, fontWeight: 400 }}>
                                    Decentralized trade and supply chain on blockchain
                               </h2>
                                <br />
                                <h4 style={{ color: "white", textAlign: 'center', fontSize: 23 }}>
                                    Building solutions for transparency, automating processes, trade financeand protecting your brand from counterfeiting
                               </h4>
                                <br />
                                <h4 style={{ color: "white", textAlign: 'center', fontSize: 23, }}>
                                    Leverage the power of digitized doccumentation, connected IoT devices, & smart contracts with our Dapps
                               </h4>
                                <br />
                                <button onClick={()=>{window.location.href='/login' }} style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10, borderRadius: 5, color: "#3d7d9a", fontWeight: 800, position: 'relative', left: "40%" }}>
                                    GET TOUR
                               </button>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={3}>
                                <img height="450" width="450" style={{ borderRadius: 10 }} src={require("../../assets/newImages/LandingPage3Screen_elShakehandsforhometradingbetw__CB3JJW_615978.jpg")} />
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
                <Paper style={{ height: window.innerHeight - 50, display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container justify="center">
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={5}>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />

                            <h4 style={{ textAlign: 'center', fontSize: 30, fontWeight: 500 }}>
                                What is Arthanium Platform for ?                               </h4>
                            <br />
                            <h4 style={{ textAlign: 'center', fontSize: 22, }}>
                                A decentralized platform for organizations to create consortiums for their various projects & bring all stakeholders on one platform                               </h4>

                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                            <img height="450" width="450" style={{ borderRadius: 10 }} src={require("../../assets/newImages/Screen8_elPn_775354.png")} />
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper style={{ height: window.innerHeight - 50, display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container justify="center" style={{ position: "relative" }}>
                        <Grid item xs={3}>
                            {/* <img height="450" width="450" style={{ borderRadius: 10 }} src={require("../../assets/newImages/Screen8_elPn_775354.png")} />
                            <img height="450" width="450" style={{ borderRadius: 10 }} src={require("../../assets/newImages/Screen8_elPn_775354.png")} /> */}
                            <div class="containerFrame">
                                <div class="innerImage">
                                </div>
                            </div>

                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: 100 }}>
                            <h4 style={{ textAlign: 'center', fontSize: 30, fontWeight: 500 }}>
                                What is Arthanium Platform for ?                               </h4>
                            <br />
                            <Grid container justify="center">
                                <Grid item xs={4}>
                                    <h4 style={{ fontSize: 23 }}>
                                        Buyers / Sellers -</h4>
                                </Grid>
                                <Grid item xs={8}>
                                    <h4 style={{ fontSize: 23 }}>
                                        Register your organization on the platform, create projects, connect with partners & experience decentralized trade.</h4>
                                </Grid>
                                <Grid item xs={4}>
                                    <h4 style={{ fontSize: 23 }}>
                                        Partners -</h4>
                                </Grid>
                                <Grid item xs={8}>
                                    <h4 style={{ fontSize: 23 }}>
                                        Organizations can search / add partners for their supply chain If you are in Banking, Logistics, Insurance, Certification. </h4>                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} style={{ position: 'absolute', top: -110, right: 50, display: 'flex', alignItems: 'center', verticalAlign: 'center', justifyContent: 'center' }}>
                            <Grid container justify="center">
                                <Grid item xs={12}>
                                    <div style={{ backgroundColor: '#297D9E', width: 10, height: 100, display: 'block' }}>&nbsp;</div>
                                </Grid>
                                <Grid item xs={12}>
                                    <h4 style={{ width: 10, height: 370 }}>h o w d o e s i t w o r k ?</h4>
                                </Grid>
                                <Grid item xs={12}>
                                    <div style={{ backgroundColor: '#297D9E', width: 10, height: 100, display: 'block' }}>&nbsp;</div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper style={{ height: window.innerHeight - 50, display: "flex", alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#E4E4E4', paddingLeft: 150, paddingRight: 150 }}>
                    <Grid container justify="center">

                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <h3 style={{ fontWeight: 500, fontSize: 40, paddingTop: 30, paddingBottom: 50 }}>Why Arthanium?</h3>
                            <br />
                        </Grid>
                        <Grid item xs={3} style={{
                            width: 410, height: 400, backgroundColor: '#FFFFFF', borderRight: "1px solid #E4E4E4"
                        }} className="shadow2">
                            <Grid container justify="center">
                                <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
                                    <img width="100" height="100" src={require("../../assets/newImages/102649.png")} />
                                </Grid>
                                <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
                                    <h4 style={{ fontSize: 19, textAlign: 'center' }}>
                                        Secure <br />Heterogenous multi chain  <br /> blockchain architecture  <br /> Scalable, Interoperable Secure  <br /> & High TPS                                        </h4>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} style={{
                            width: 410, height: 400, backgroundColor: '#297D9E', position: "relative", borderRight: "1px solid #E4E4E4"
                        }} className="shadow2">
                            <Grid container justify="center">
                                <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
                                    <img width="100" height="100" src={require("../../assets/newImages/images.png")} />
                                </Grid>
                                <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
                                    <h4 style={{ fontSize: 19, textAlign: 'center' }}>
                                        Automate <br /> Decentralized Apps ecosystem <br /> for digitized doccumentation,<br /> connected devices <br /> & trade finance
                                              </h4>
                                </Grid>
                            </Grid>
                            <img width="72.4" height="72.4" style={{ backgroundColor: "#FFFFFF", position: 'absolute', right: 0, bottom: 0, padding: 0, margin: 0 }} src={require("../../assets/newImages/Screen3_elGraphic2.png")} />
                        </Grid>
                        <Grid item xs={3} style={{
                            width: 410, height: 400, backgroundColor: '#FFFFFF', borderRight: "1px solid #E4E4E4"
                        }} className="shadow2">
                            <Grid container justify="center">
                                <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
                                    <img width="100" height="100" src={require("../../assets/newImages/Screen3_elN925249200_152181.png")} />
                                </Grid>
                                <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
                                    <h4 style={{ fontSize: 19, textAlign: 'center' }}>
                                        Collaborate Brings <br />  all diverse stakeholders <br />  on   one platform
                                           </h4>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={3} style={{ width: 410, height: 400, backgroundColor: '#FFFFFF' }} className="shadow2">
                            <Grid container justify="center">
                                <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
                                    <img width="100" height="100" src={require("../../assets/newImages/Screen3_elImg_546279_977173.png")} />
                                </Grid>
                                <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
                                    <h4 style={{ fontSize: 19, textAlign: 'center' }}>
                                        Innovate  Unlock <br />  new opportunities            </h4>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper style={{ height: window.innerHeight, display: "flex", alignItems: 'center', justifyContent: 'center', backgroundColor: '#E4E4E4', position: 'relative' }}>
                    <Grid container justify="center">
                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <img src={require('../../assets/newImages/businessman-analyzes-graph-data-and-use-the-P48X8YL@2x.png')} style={{ width: '100%', height: window.innerHeight * 65 / 100 }} />
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '100%', height: window.innerHeight * 35 / 100, backgroundColor: 'transaparent' }}>
                            </div>
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, top: 150, right: 0, bottom: 0 }}>
                            <Grid container justify="center" style={{ display: "flex", alignItems: 'center', justifyContent: 'center', }}>
                                <Grid item xs={3} spacing={1} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                    <Grid container justify="center" style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                            <div class="background">
                                                <div class="transbox">
                                                    <h3>PRO</h3>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ backgroundColor: 'white', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                                                <h4 className="planInnerDiv">
                                                    $ 49/month
                                                    <br />
                                                    <br />
                                                    400 Credits
                                        </h4>
                                                <button style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10, borderRadius: 5, backgroundColor: "#3d7d9a", color: 'white', fontWeight: 800, position: 'relative', left: "25%", margin: 20 }}>
                                                    Choose
                               </button>
                                            </div>

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3} spacing={1} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                    <Grid container justify="center" style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                            <div class="background">
                                                <div class="transbox">
                                                    <h3>BUSINESS</h3>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ backgroundColor: 'white', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                                                <h4 className="planInnerDiv">
                                                    $ 149/month
                                                    <br />
                                                    <br />
                                                    1200 Credits
                                        </h4>
                                                <button style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10, borderRadius: 5, backgroundColor: "#3d7d9a", color: 'white', fontWeight: 800, position: 'relative', left: "25%", margin: 20 }}>
                                                    Choose
                               </button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3} spacing={1} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                    <Grid container justify="center" style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                            <div class="background">
                                                <div class="transbox">
                                                    <h3>ENTERPRISE</h3>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ backgroundColor: 'white', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                                                <h4 className="planInnerDiv">
                                                    $ 499/month
                                                    <br />
                                                    <br />
                                                    3600 Credits
                                        </h4>
                                                <button style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10, borderRadius: 5, backgroundColor: "#3d7d9a", color: 'white', fontWeight: 800, position: 'relative', left: "25%", margin: 20 }}>
                                                    Choose
                               </button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper style={{ height: window.innerHeight - 50, backgroundColor: 'white', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container justify="center">
                        <Grid item xs={4} spacing={8}>
                            <div>
                                <Grid style={{ padding: 20, margin: 50, border: '1px solid #E4E4E4', display: "flex", alignItems: 'center', justifyContent: 'center' }} container justify="center">
                                    <Grid item xs={3}>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <div style={{ padding: 5, margin: 5, color: "white", backgroundColor: '#297D9E', textAlign: 'center' }}>
                                            Credit Chart
                                </div>
                                    </Grid>
                                    <Grid item xs={3}>

                                    </Grid>
                                    <Grid item xs={7} >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <div style={{ padding: 5, margin: 5, textAlign: 'center' }}>
                                            Credit Used
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: '1px solid black', display: "flex", alignItems: 'center', justifyContent: 'center', padding: 5, margin: 5 }} spacing={1}>
                                        <div>
                                            Projects
                                        </div>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid black', display: "flex", alignItems: 'center', justifyContent: 'center', padding: 5, margin: 5 }} spacing={1}>
                                        <div>
                                            75
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: '1px solid black', display: "flex", alignItems: 'center', justifyContent: 'center', padding: 5, margin: 5 }} spacing={1}>
                                        <div>
                                            Partners
                                        </div>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid black', display: "flex", alignItems: 'center', justifyContent: 'center', padding: 5, margin: 5 }} spacing={1}>
                                        <div>
                                            15
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: '1px solid black', display: "flex", alignItems: 'center', justifyContent: 'center', padding: 5, margin: 5 }} spacing={1}>
                                        <div>
                                            Products / Docs / Devices
                                        </div>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid black', display: "flex", alignItems: 'center', justifyContent: 'center', padding: 5, margin: 5 }} spacing={1}>
                                        <div>
                                            1
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} style={{ paddingLeft: window.innerWidth * 43 / 100 }}>
                            <h3>    <img height="25" width="25" src={require('../../assets/newImages/Screen7_elPh_505305.png')} />&nbsp;&nbsp;Contact us for free demo.</h3>
                        </Grid>
                        <Grid item xs={12}>
                            <pre style={{ fontSize: 15, fontWeight: 400, paddingLeft: window.innerWidth * 30 / 100 }}>
                                Note : <br /> Setup and customization charges could be applicable for certain customers <br />  For larger customized plans contact us directly <br />  Adittional monthly credits packs can be purchased at $ 49 for 400 Credits <br />  Validity of plan & credits is one month and it cannot be carried forward <br />  Currently we don’t charge any transaction based fee,<br />  but in future we might move to a transaction based fee model
                            </pre>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper style={{ height: window.innerHeight - 50, backgroundColor: 'white', display: "flex", alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                    <Grid container justify="center">
                        <Grid item xs={2} >
                        </Grid>
                        <Grid item xs={8} >
                            <h2 style={{ textAlign: 'center', margin: 30, fontSize: 45, fontWeight: 500 }}>A native app for every platform</h2>
                        </Grid>
                        <Grid item xs={2} >
                        </Grid>
                        <Grid item xs={2} >
                        </Grid>
                        <Grid item xs={8} >
                            <h3 style={{ textAlign: 'center', margin: 30, fontSize: 25, fontWeight: 300 }}>The platform is accessible on both web and mobile.</h3>
                        </Grid>
                        <Grid item xs={2} >
                        </Grid>
                        <Grid item xs={2} >
                        </Grid>
                        <Grid item xs={4} style={{ paddingBottom: 50 }} >
                            <img height="450" width="650" src={require('../../assets/newImages/Screen5_elMacbook_198171.png')} />
                            <button style={{
                                paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10, borderRadius: 5, color: "white", backgroundColor: '#297D9E', fontWeight: 800,
                                position: 'relative', left: "55%"
                            }}>
                                Get Started
                               </button>
                        </Grid>
                        <Grid item xs={4} style={{ paddingBottom: 50 }} >
                            <img height="450" width="650" src={require('../../assets/newImages/Screen5_elK_269332.png')} />
                            <button style={{
                                paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10, borderRadius: 5, color: "white", backgroundColor: '#297D9E', fontWeight: 800,
                                position: 'relative', left: "55%"
                            }}>
                                Get Started
                               </button>
                        </Grid>
                        <Grid item xs={2} >
                        </Grid>

                    </Grid>
                </Paper>
                <Paper style={{ height: window.innerHeight, display: "flex", alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', position: 'relative' }}>
                    <Grid container justify="center">
                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <img src={require('../../assets/newImages/Screen7_elLaptoponthedeskPTWSW25_51654.jpg')} style={{ width: '100%', height: window.innerHeight * 50 / 100 }} />
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '100%', height: window.innerHeight * 50 / 100, backgroundColor: 'transaparent' }}>

                            </div>
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, top: 500, right: 0, bottom: 0, zIndex: 10000 }}>
                            <input type="text" style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10, borderRadius: 5, color: "black", margin: 10 }} placeholder="Enter your email here" />
                            <button style={{
                                paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10, borderRadius: 5, color: "white", backgroundColor: '#297D9E', fontWeight: 800,
                            }}>
                                SEND
                               </button>
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                            <Grid container justify="center" style={{ display: "flex", alignItems: 'center', justifyContent: 'center', }}>
                                <Grid item xs={3} spacing={1} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                                    <div style={{ backgroundColor: 'white', height: 200, paddingTop: 30, paddingBottom: 30 }} className="shadow2">
                                        <h4 className="planInnerDiv1">
                                            <img height="30" width="30" src={require('../../assets/newImages/Screen7_elPh_505305.png')} /><br /> <br />  Mobile NO :  <br />  (+91) 9892935802
                                        </h4>
                                    </div>
                                </Grid>
                                <Grid item xs={3} spacing={1} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>

                                    <div style={{ backgroundColor: 'white', height: 200, paddingTop: 30, paddingBottom: 30 }} className="shadow2">
                                        <h4 className="planInnerDiv1">
                                            <img height="30" width="30" src={require('../../assets/newImages/Screen7_elEm_244434.png')} /><br /> <br />  Email Id :  <br /> sandesh@arthanium.com
                                        </h4>
                                    </div>
                                </Grid>
                                <Grid item xs={3} spacing={1} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ backgroundColor: 'white', height: 200, paddingTop: 30, paddingBottom: 30 }} className="shadow2">
                                        <h4 className="planInnerDiv1">
                                            <img height="30" width="30" src={require('../../assets/newImages/Screen7_elLo2_990516.png')} /><br /> <br /> Location :  <br />  Mumbai, India
                                        </h4>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper style={{ color: "white", fontWeight: 300, height: 300, display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <div className="footerLeft">
                        <Grid container justify="center" style={{ padding: 50, paddingLeft: 150 }}>
                            <Grid item xs={4} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Grid container justify="center">
                                    <Grid item xs={12} >
                                        <h3>
                                            COMPANY
                            </h3>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <h4>
                                            Company <br /> Features  <br /> Blog  <br /> Pricing
                            </h4>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} >
                                <Grid container justify="center">
                                    <Grid item xs={12}>
                                        <h3>
                                            DOWNLOAD
                            </h3>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <h4>
                                            IOS  <br /> Android  <br />
                                        </h4>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container justify="center">
                                    <Grid item xs={12} >
                                        <h3>
                                            SUPPORT
                            </h3>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <h4>
                                            Documentation   <br /> FAQ'S  <br /> Privacy
                            </h4>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="footerRight">
                        <h3>
                            FOLLOW US AT<br/>
                            <img height="30" width="30" src={require('../../assets/newImages/Screen7_elLo2_990516.png')} />&nbsp;&nbsp;&nbsp;  <img height="30" width="30" src={require('../../assets/newImages/Screen7_elLo2_990516.png')} />&nbsp;&nbsp;&nbsp;  <img height="30" width="30" src={require('../../assets/newImages/Screen7_elLo2_990516.png')} />
                            </h3>
                    </div>
                </Paper>
            </main>
            <div style={{ height: 30, backgroundColor: "#000406", color: "white", textAlign: 'center', fontWeight: 300, fontSize: 17 }}>Copyrights are reserved @arthanium.com</div>
        </React.Fragment>
    );
}
