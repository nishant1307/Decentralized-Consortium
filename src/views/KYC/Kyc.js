import React, { useState, useEffect, useRef } from 'react';
import ipfs from "ipfs";
import { connect } from 'react-redux';
import web3 from '../../web3';
const bip39 = require('bip39')
const etherHDkey = require('ethereumjs-wallet/hdkey')
const jsPDF = require('jspdf');
var passworder = require('browser-passworder')
const Ipfs = require('ipfs-http-client')
import { registryContract, registryAddress } from '../../registryContract';
import uuidv1 from 'uuid/v1';
import { geocodeByAddress } from 'react-places-autocomplete';
import CompnayInfo from './CompnayInfo'
import DocUpload from './DocUpload'
import Eula from './Eula'
import KeyCreation from './KeyCreation'
import ExistingAccount from './ExisitingAccount';
import { makeStyles } from '@material-ui/core/styles';
import loginImage from "assets/images/login.png";
import Snackbar from '../../components/Snackbar/Snackbar.jsx'
import moment from "moment";
import { useForm } from '../validator';

import {
  Typography,
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Checkbox,
  FormControlLabel,
  CircularProgress
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing(2)
  },
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 750,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  image: {
    backgroundImage: 'url(' + loginImage + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const steps = ['Key Creation', 'Company & Personal Details', 'KYC Documents', 'Terms of Service'];

function KYCComponent(props) {
  const address = localStorage.getItem('address');
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [companyDoc, setCompanyDoc] = useState([]);
  const [ownerDoc, setOwnerDoc] = useState([]);
  const [ipfsCompanyHash, setIPFSCompanyHash] = useState([]);
  const [ipfsOwnerHash, setIPFSOwnerHash] = useState([]);
  const [error, setError] = useState(false);
  const [modal1, setModal1] = useState(false)
  const [isExist, setIsExist] = useState(false)
  const [keystore, setKeystore] = useState('');
  const [loader, setLoader] = useState(true);
  const [snackbar, setSnackbar] = useState({ color: 'danger', open: false, message: '' })
  let docRef = useRef(null);

  // const [address, setAddress] = useState('');
  const [toggleState, setToggleState] = React.useState({ checkedA: false, checkedB: false, checkedC: false });
  const [state, setState] = useState({
    companyName: '',
    fullName: '',
    email: '',
    address: '',
    city: '',
    stateName: '',
    zipcode: '',
    country: '',
    password: '',
    confirmPassword: '',
    date: new Date().getDate()
  })
  const { values, useInput, isValid } = useForm(state);
  useEffect(() => {
    console.log(address, "address");
    if (localStorage.getItem("address") !== null) {
      registryContract.methods.getUserKYCStatus().call({ from: address }).then(res => {
        console.log(res, "res");
        if (res === "0") {
          fetchKey();
          setIsExist(true);
          setLoader(false);
        } else if (res === "1") {
          window.alert("account already exists!")
          props.history.push('/login');
        }
      }).catch((e) => {
        console.log(e);
        fetchKey();
        setIsExist(true);
        setLoader(false);
      })
    } else {
      setIsExist(false);
      setLoader(false);
    }
  }, []);

  const handleToggleChange = name => event => {
    setToggleState({
      ...toggleState,
      [name]: event.target.checked
    });
  };

  const OnmodalAccept = () => {
    setModal1(false);
    if (toggleState.checkedA && toggleState.checkedB && toggleState.checkedC && true) {
      const mnemonic = bip39.generateMnemonic()
      let HDwallet = etherHDkey.fromMasterSeed(mnemonic)
      let zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
      fetch("https://api.arthanium.org/api/v1/faucet/" + zeroWallet.getAddressString()).then(res => res.json()).then((result) => {
        console.log(result);
      }, (error) => {
        console.log(error);
      })
      var doc = new jsPDF()
      doc.text(mnemonic, 20, 20)
      doc.save('recovery key.pdf')
      passworder.encrypt(state.password, JSON.stringify({ mnemonic: mnemonic, privateKey: zeroWallet.getPrivateKeyString() })).then(function (blob) {
        sessionStorage.setItem("privateKey", zeroWallet.getPrivateKeyString())
        localStorage.setItem("data", JSON.stringify(blob));
        localStorage.setItem("address", zeroWallet.getAddressString());
        // props.history.push('/register')
        setActiveStep(activeStep + 1);
      })
    } else { }
  }

  const handleNext = () => {
    console.log(activeStep, "activeStep");
    if (activeStep === 0) {
      if (isExist) {
        fetch("https://api.arthanium.org/api/v1/faucet/" + localStorage.getItem("address")).then(res => res.json()).then((result) => {
          console.log(result);
        }, (error) => {
          console.log(error);
        })
        passworder.decrypt(state.password, keystore).then(function (result) {
          sessionStorage.setItem("privateKey", JSON.parse(result).privateKey)
          sessionStorage.setItem('timestamp', Date.now())
          setActiveStep(activeStep + 1);
        }).catch((reason) => {
          console.error(reason)
        })
      } else {
        if (state.password === "" || state.confirmPassword === "" || state.password !== state.confirmPassword) {
          setError(true);
        } else {
          setError(false);
          setModal1(true);
          // setActiveStep(activeStep + 1);
        }
      }
    } else if (activeStep === 2) {
      docRef.current.getDocs();
      setActiveStep(activeStep + 1);
    }
    else {
      setActiveStep(activeStep + 1);
    }

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const submitForm = async () => {
    const date = moment(new Date()).format("Do MMMM YYYY")
    let eulaToSave = `<!DOCTYPE html><html><head><title>Arthanium</title></head><body><img style=" display: block; margin-left: auto; margin-right: auto; " src="https://arthanium.com/images/logo3.png" alt="Flowers in Chania"> <br/><div style="text-align:justify;height:450px;font-size:14px;font-weight:300;padding:10px;width:100%;height:100%;border:1px solid #DDD">This Arthanium Platform Users Agreement ( “Agreement”) is made and entered into on ${date} (the “Effective Date”), between Arthanium Networks Private Limited (“Arthanium”) a privately incorporated entity under the laws of India with registered office at D / 303, Silver Gardens, Near Kanti Nagar Ganesh Mandir, J.B. Nagar Andheri East, Mumbai – 400059, India and ${values.companyName} (‘the user”) with registered office at  ${state.address} represented by its authorized representative  ${values.fullName} .  ${values.fullName}  with email id as ${values.email} affirms that he is authorized to represent the user &amp; all know your customer (“KYC”) documents submitted and / or to be submitted by him / her are authentic &amp; in his / her lawful possession at the time of submission.<br/><br/>Arthanium has developed a technology platform (“Arthanium Platform”) which includes both web &amp; mobile phone interface’s and building an ecosystem of applications around it for identity management, connected IoT devices, digitized documentation, trade finance, vendor validation and blockchain explorer. Some of these applications have been already developed whereas some are work in progress.<br/><br/>Please read the following End User License Agreement (the “EULA”) carefully before using the Arthanium platform or our websites located at www.arthanium.com or our mobile applications, or participating in any blockchain related architecture / applications, online features, services and /or programs offered by us (collectively, the “Digital Properties”). These EULA are in effect for all of our Digital Properties.<br/><br/>These EULA are not applicable to any other web page operated and / or owned by any entity other than Arthanium, including, but not limited to, any website, mobile application, blog, forum, or other material operated by any third party identified on the Digital Properties. When visiting these third-party websites, you should refer to the EULA and conditions in effect for the applicable owner.<br/><br/><strong>Please read these EULA carefully, which include important information about your legal rights, remedies, and obligations. By accessing or using the digital properties, you are entering into a legal contract with arthanium regarding your use of the digital properties. By accessing or using the digital properties, you agree to be bound by the EULA and all additional EULA incorporated by reference. If you do not agree to any portion of these EULA, you should not access or otherwise use the digital properties.</strong><br/><br/>We will make an effort to update this web page with any changes to these EULA and you are encouraged to review these EULA frequently (the date of the most recent revision to these EULA appears at the end of these EULA).<br/><br/><strong>CONVENIENCE AND INFORMATION ONLY.</strong> The Digital Properties are provided to you as a convenience and for your information only. By merely providing access to the Digital Properties, we do not warrant or represent that: (a) any materials, documents, images, graphics, logos, design, audio, video and any other information provided from or on the Digital Properties (collectively, the “Content”) is accurate or complete; (b) the Content is up-to-date or current; (c) we have any obligation to update any Content; (d) the Content is free from technical inaccuracies or programming or typographical errors; (e) the Content is free from changes caused by a third party; (f) your access to the Digital Properties will be free from interruptions, errors, computer viruses or other harmful components; and/or (g) any information obtained in response to questions asked through the Digital Properties is accurate or complete.<br/><br/>By accessing or using our Website or mobile application, you acknowledge that you have read, understood, and agree to be bound by these terms and to comply with all applicable laws and regulations, including export and re-export control laws and regulations. If you do not agree to these terms, please do not use or access our Website or mobile application.<br/><br/>Arthanium may, without notice to you, at any time, revise these Terms of Use and any other information contained in this Website / Mobile application. The Arthanium Platform may also make improvements or changes in the products, services, or programs described on our website at any time without notice.<br/><br/><strong>DIGITAL PROPERTIES USE AND CONTENT.</strong> The subscription of Arthanium platform or its products or services are provided by Arthanium pursuant to a separate subscription agreement. Those additional terms become part of your agreement with the Arthanium Platform. Unless and until you are a subscriber and have purchased the applicable services offered by us through the Digital Properties, you only may view, download, copy or print a single copy of any page from the Digital Properties for personal, non-commercial purposes if you do not remove, modify, or alter any copyright and proprietary rights notices that may be present. You may not otherwise use, modify, copy, print, display, distribute, publish, or sell any information from the Digital Properties without our express, prior, written consent.<strong>YOU MAY NOT USE ANY DIGITAL PROPERTY FOR ANY COMMERCIAL USE.</strong> Any special rules for the software, files, downloads, and other items accessible through the Digital Properties may be included elsewhere in the Digital Properties and are incorporated into these EULA by reference.<br/><br/>If you are a subscriber and have purchased a service offered by us through the Digital Properties, such use is subject to the EULA and conditions of such service to which you agreed to be bound by when purchasing.<br/><br/>We may make changes to the Digital Properties, the Content, and / or the User Content described in these EULA at any time and without further notice to you. We will make an effort to update this web page with any changes to the EULA.<br/><br/>We know that privacy is very important to you, and it is very important to us as well. You consent to receive electronic communications from us. We will communicate with you by email or by posting notices on our Digital Properties. You agree that all agreements, notices, disclosures and other communications that we provide to you electronically satisfy any legal requirement that such communication be in writing. Personal data that you provide regarding yourself will be handled in accordance with our Privacy Policy and Business Associate Agreement located at https://Arthanium.com/privacy-policy/.<br/><br/><strong>USER ACCOUNT, PASSWORD AND SECURITY.</strong> To the extent that a user account is created by you to access and use the Digital Properties (“User Account”), the following shall apply:<br/><br/><strong>(a) USER ACCOUNT.</strong> To access certain types of features, the Content and the User Content available through the Digital Properties, we require the use of a password / private key after setting up a User Account. The private key can be generated by use of seed phrase which will be provided to you at time of creating the user account. We do not store any user information as the login access password / private key is stored directly on the user device. We also do not store the seed phrase and it’s your responsibility to store it securely. You, are ultimately responsible for protecting your password / private key, seed phrase and User Account information from disclosure to third parties, and you are not permitted to circumvent the use of required encryption technologies, if any. You agree to (i) immediately notify us of any unauthorized use of your password / private key, or User Account, or any other breach of security, and (ii) ensure that you exit from your User Account at the end of each session. While we provide certain encryption technologies and use other reasonable precautions to protect your confidential information and provide suitable security, we do not and cannot guarantee or warrant that information transmitted through the Internet is secure, or that such transmissions are free from delay, interruption, interception or error.<br/><br/><strong>(b) ACCURATE INFORMATION. </strong>In creating and using your User Account for use on the Digital Properties, you agree to: (i) provide true, accurate, current, and complete information about yourself on any registration form required for the Digital Properties (such information being the “Registration Data”); (ii) maintain and promptly update the Registration Data to keep it true, accurate, current, and complete; and (iii) maintain and promptly update payment information to keep it true, accurate, current, and complete. If you provide any information that is untrue, inaccurate, not current, or incomplete, or if we have reasonable grounds to suspect that such information is untrue, inaccurate, not current, or incomplete, then we have the right to suspend or terminate your User Account and refuse any and all current or future use of your User Account. You will also be required to submit Know your Customer (“KYC”) data to confirm your registration data. You will not be allowed to access the platform till you have updated registration data, completed KYC and accepted this EULA / agreement.<br/><br/><strong>(c) NON-TRANSFERABILITY OF USER ACCOUNT. </strong>User Accounts are non-transferable, and all users are obligated to take preventative measures to prohibit unauthorized users from accessing the Digital Properties with his or her password. / private key.<br/><br/><strong>(d) ACCOUNT DEACTIVATION.</strong> We reserve the right to deactivate or cancel a User Account in our sole discretion, including for the following reasons: (i) you request such deactivation; (ii) you are deceased; (iii) you do not respond to repeated communication attempts regarding the status of your User Account; (iv) you reside in or relocate to a country where use of a User Account is prohibited under applicable law; or (v) you act in a fraudulent or an inappropriate manner while using the User Account.<br/><br/><strong>ARTHANIUM BLOCKCHAIN ARCHITECTURE. </strong>We store most of the data on the Arthanium blockchain architecture. In connection with your use of the Digital Properties and the services provided to you by Arthanium, you represent and warrant that you have the authority to provide the data to us and such provision of data is in made in accordance with applicable law, and you hereby agree that Arthanium has the right to submit such data to the Arthanium Blockchain architecture on your behalf.<br/><br/><strong>OBJECTIONABLE MATERIAL.</strong> You acknowledge that in using the Digital Properties and accessing the Content and / or the User Content, you may encounter material that you deem to be disturbing, offensive or objectionable. You agree to use the Digital Properties at your sole risk and that we shall have no liability to you for material that may be disturbing, objectionable or offensive to you.<br/><br/><strong>NOT INTENDED FOR MINORS. </strong>We do not collect Information from any person that we know to be under the age of 18. Specifically, the Digital Properties are not intended or designed to attract minors under the age of 18. You affirm that you are more than 18 years of age, or an emancipated minor, or possess legal parental or guardian consent, and are fully able and competent to enter into the EULA, conditions, obligations, affirmations, representations, and warranties set forth in these EULA, and to abide by and comply with these EULA. In any case, you affirm that you are over the age of 18, as the digital properties are not intended for minors under 18 that are unaccompanied by their parent or legal guardian.<br/><br/><strong> PAYMENT AND REFUNDS</strong><br/><br/><strong> (a) PAYMENT.</strong> Payment for access to the system is required at the time of purchasing our subscription plans, access with not be granted until payment is complete. Any other Invoices issued by Arthanium shall be paid within fifteen (15) days of the date of the invoice, unless otherwise agreed in writing by Arthanium.<br/><br/><strong> (b) REFUNDS. </strong>Arthanium will refund your access / registration fee, minus a $25 per provider processing fee. Refunds must be requested within fourteen (14) days of purchase, and will be reviewed by management for approval. All requests must be submitted in writing to support@arthanium.com .<br/><br/>Requests submitted after the fourteen (14) day refund period will not be honored. Arthanium reserves the right to deny any refund request at its discretion.<br/><br/><strong>DISCLAIMERS</strong><br/><br/><strong> (a) NO WARRANTIES FOR CONTENT.</strong> The Digital Properties are provided to you for your information only. We do not warrant or represent that: (i) the Content and/or the User Content is fair, accurate, or complete; (ii) the Content and/or the User Content is up-to-date or current; (iii) we have any obligation to update any Content; (iv) the Content and/or the User Content is free from technical inaccuracies or programming or typographical errors; (v) the Content and/or the User Content is free from changes caused by a third party; (vi) any information obtained in response to questions asked through the Digital Properties is accurate or complete; and/or (vii) the Content and/or the User Content are non-infringing of any third party’s intellectual rights.<br/><br/><strong> (b) NO WARRANTIES FOR DIGITAL PROPERTIES.</strong> When using the Digital Properties, information will be transmitted in such a way that may be beyond our control. As such, we make no warranty concerning the delay, failure, interruption, or corruption of any data, the Content, the User Content, or other information transmitted in connection with the use of the Digital Properties. You expressly agree that your use of the digital properties is at your sole risk. The digital properties, the content and the user content are provided “as is” and “as available” for your use, without warranties of any kind, either express or implied, unless such warranties are legally incapable of exclusion. We make no representations or warranties that the digital properties, the content, and the user content, or any services offered in connection with the digital properties, are or will remain uninterrupted or error-free, that defects will be corrected, or that the web pages on or through the digital properties, or the servers used in connection with the digital properties, are or will remain free from any viruses, worms, time bombs, drop dead devices, trojan horses, or other harmful components. We do not guarantee that you will be able to access or use the digital properties at times or locations of your choosing, or that we will have adequate capacity for the digital properties as a whole or in any specific geographic area. We make no representation or warranty regarding government compliance of any software used in running the digital properties. Our entire liability and your exclusive remedy with respect to the use of any service or product provided on or through the digital properties will be the refund of the purchase price for any content, user content, products, or services found to be inadequate.<br/><br/><strong>(c) INDEMNIFICATION.</strong> You agree to defend, indemnify, and hold harmless Arthanium and our directors, officers, employees, and agents from and against any and all claims, demands, suits, proceedings, liabilities, judgments, losses, damages, expenses, and costs (including without limitation reasonable attorneys’ fees) assessed or incurred by us, directly or indirectly, with respect to or arising out of: (i) your failure to comply with these EULA; (ii) your breach of your obligations under these EULA; (iii) your use of the rights granted hereunder, including without limitation any claims made by any third parties; and/or (iv) any claim that your User Content caused damage to a third party.<br/><br/><strong>(d) YOUR RESPONSIBILITIES. </strong>You are responsible for establishing such procedures as you deem appropriate to verify the accuracy of data transmitted hereunder (and we will have no obligation to verify the accuracy of such data).<br/><br/><strong>LIMITATION OF LIABILITY.</strong> In no event will we be liable for any direct, indirect, incidental, special, exemplary, punitive, or consequential damages arising from your use of or inability to use the digital properties and/or any content and/or user content provided in connection with the digital properties or for any other claim related in any way to your use of the digital properties and/or any content and/or user content additionally, we shall not be liable for negative repercussions to any party based on the use of or inability to use the digital properties, including but not limited to lost goodwill or lost profits. We shall be liable only to the extent of actual damages incurred by you, not to exceed the amount you actually paid to us for goods or services in the prior six (6) months, if anything. We are not liable for any personal injury, including death, or property damage caused by your use or misuse of the digital properties, the content and/or the user content. Remedies under these EULA are exclusive and are limited to those expressly provided for in these EULA. Because some states or jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, in such states or jurisdictions our liability will be limited to the greatest extent permitted by applicable law.<br/><br/><strong>THIRD PARTY CONTENT AND THIRD PARTY APPLICATIONS.</strong> Although we do not presently do so, in the future we may provide hyperlinks to other websites maintained by third parties, or may provide third party content on the Digital Properties by framing or other methods (collectively, “Third Party Content”). In addition, the Digital Properties may include certain applications, features, programs and services provided by third parties (collectively, the “Third Party Applications”). We do not monitor Third Party Content or Third Party Applications and can make no guarantee as to the accuracy or completeness of such Third Party Content or Third Party Applications. The links to third party websites, any third party content, and any third party applications may be provided for your convenience and information only. The content on any linked website or in any third party application is not under our control and, just as with the digital properties, we are not responsible for the content of linked websites and/or third party applications, including any further links contained in a third party website.<br/><br/>We make no representations or warranties in connection with any third party content or third party applications, which at all times and in each instance is provided “as is.” Third party applications may be subject to additional EULA and conditions or agreements between you and the provider of such third party applications as may be provided to you in connection therewith, and you agree to fully comply with all such additional EULA, conditions and agreements. If you decide to access any of the third party websites linked to the digital properties, any third party content, and/or any third party application, you do so entirely at your own risk.<br/><br/>If a third party links or refers to the Digital Properties, it is not necessarily an indication of an endorsement, authorization, sponsorship, affiliation, joint venture, or partnership by or with us. In most cases, we are not even aware that a third party has linked or refers to the Digital Properties. A third party website that links to the Digital Properties: (a) may link or refer to, but not replicate, the Content and/or the User Content; (b) may not create a browser, border environment, or frame the Content and/or the User Content; (c) may not imply that we are endorsing it or its products or services; (d) may not misrepresent its relationship with us; (e) may not present false or misleading information about our products or services; and (f) should not include content that could be construed as distasteful, offensive, or controversial.<br/><br/><strong>INTELLECTUAL PROPERTY.</strong> The Content of the Digital Properties is intellectual property owned, controlled and/or licensed by All applicable intellectual property laws, including copyright laws, protect our rights in and to the Content. No portion of the Content and/or the User Content may be reproduced in any form or by any means, except as provided in Section 2 (Digital Properties Use and Content) and elsewhere in these EULA.<br/><br/>We are the copyright owner or authorized licensee, or are otherwise permitted to use, of all trademarks, service marks, and logos used and displayed on the Digital Properties. All trademarks and service marks of Arthanium, or our subsidiaries or affiliates, that may be referred to on the Digital Properties are the property of Arthanium, or one of our subsidiaries or affiliates. Other parties’ trademarks and service marks that may be referred to on the Digital Properties are the property of their respective owners. Nothing on the Digital Properties should be construed as granting, by implication, estoppel, or otherwise, any license or right to use any of Arthanium’s, or our subsidiaries’ or affiliates’, trademarks, service marks, or copyrights without our prior written permission. We aggressively enforce our intellectual property rights. Neither the name of Arthanium, our subsidiaries or affiliates, nor any of our other trademarks, service marks, or copyrighted materials may be used in any way, including in any advertising, hyperlink, publicity, or promotional materials of any kind, whether relating to the Digital Properties or otherwise, without our prior, written permission, except that a third party website that desires to link to the Digital Properties and that complies with the requirements of Section 10 (Third Party Content and Third Party Applications) above may use the names “Arthanium” or the title of any Content in or as part of that link.<br/><br/><strong> USER CONTENT. </strong>The Digital Properties does, or may in the future, permit the submission of various forms of content submitted by you and other users, such as materials, statements, reviews, ratings, opinions, personal accounts, documents, images, graphics, logos, designs, videos, text files, audio files, and comments (collectively, “User Content”) and the hosting, sharing, downloading, publishing and/or republishing of such User Content. We do not guarantee any confidentiality with respect to any user content. To protect your privacy and the privacy of others, you agree that you will not provide any user content that contains personally identifiable information (such as name, phone number, email or mailing address, social national identification number, etc.) Belonging to you or anyone else. Uploading images or video of other people without their permission is strictly prohibited.<br/><br/>You shall be solely responsible for your User Content, and the consequences of posting or publishing it. You represent and warrant that: (a) you own or have the necessary licenses, rights, consents, and permissions to use, and to authorize us and those other users of the Digital Properties to publish, such User Content, all patent, trademark, trade secret, copyright, or other proprietary rights in and to any and all User Content, and to enable inclusion and publication of the User Content on the Digital Properties as we deem appropriate; and (b) to the extent applicable, you have the written consent, release, and/or permission of each identifiable individual person in the User Content to use the name or likeness of each such person to enable inclusion and publication of the User Content in the manner contemplated by the Digital Properties and these EULA. By providing User Content to the Digital Properties you hereby grant us a worldwide, non-exclusive, royalty-free, irrevocable, sub licenseable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, publish, republish, and perform the User Content in connection with the Digital Properties and Arthanium’s (and our respective agents, affiliates’ and successors’) business including, but not limited to, publication of any portion or all of the User Content in an advertisement, a book, a magazine, a spoken word work, any other literary work, and/or any other audio-visual work, in any medium or format, anywhere in the world. You also hereby grant each authorized user of the Digital Properties a worldwide, non-exclusive, royalty-free, irrevocable, and sub licenseable license to copy, modify, use, reproduce, distribute, publish, republish, and prepare derivative works of, display and perform your User Content as permitted under these EULA.<br/><br/>You acknowledge that we reserve the right to pre-screen User Content and that we shall have the right (but not the obligation) in our sole discretion to refuse, move, and/or remove any User Content that is available on or through the Digital Properties. You also consent that all User Content that you post to the Digital Properties will at all times be available to us. Without limiting the foregoing, we shall have the right to remove any User Content that violates these EULA or is otherwise objectionable, including reviews and ratings that portrays us or any third party in a negative light. You acknowledge and agree that you may not rely on any Content or User Content created by us or submitted to or appearing on the Digital Properties.<br/><br/>You agree to not use the Digital Properties to: (i) upload, post, email, transmit or otherwise make available any User Content that is unlawful, harmful, threatening, abusive, harassing, bullying, tortious, false, defamatory, vulgar, obscene, pornographic, sexually explicit, libelous, invasive of another’s privacy, hateful, or racially, ethnically or otherwise objectionable; (ii) harm minors in any way; (iii) impersonate any person or entity, including, but not limited to, an official or an employee of Arthanium; (iv) falsely state or otherwise misrepresent your affiliation with any person or entity; (v) forge headers or otherwise manipulate identifiers in order to disguise the origin of any User Content transmitted through the Digital Properties; (vi) upload, post, email, transmit, or otherwise make available any User Content that you do not have a right to make available under any law or under contractual or fiduciary relationships (such as inside information, proprietary, and confidential information learned or disclosed as part of an employment relationship or under a nondisclosure or confidentiality agreement); (vii) upload, post, email, transmit, or otherwise make available any User Content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights of any party, including privacy and publicity rights, unless you are the owner of such rights or have permission from the rightful owner to post the material and to grant us and other users of the Digital Properties all of the license rights granted herein; (viii) upload, post, email, transmit, or otherwise make available any unsolicited or unauthorized advertising, promotional materials, spam, phishing schemes, pyramid schemes, or any other form of solicitation; (ix) upload, post, email, transmit, or otherwise make available any material that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment; (x) interfere with or disrupt the Digital Properties or any of the servers or networks connected to the Digital Properties, or disobey any requirements, procedures, policies, or regulations of networks connected to the Digital Properties; (xi) intentionally or unintentionally violate any applicable local, state, national, or international law; (xii) stalk or otherwise harass another; or (xiii) collect or store personal data about other users.<br/><br/>You acknowledge and agree that, in addition to the other uses set forth in these EULA, we may preserve User Content and may also disclose User Content if required to do so by law or in the good faith belief that such preservation or disclosure is reasonably necessary to: (a) comply with legal process; (b) enforce these EULA; (c) respond to claims that any User Content violates the rights of any third parties; or (d) protect the rights, property, or personal safety of Arthanium, our users, and/or the public. You further acknowledge and agree that each person that has access to your User Content may have less restrictions on his or her use of your User Content, and that you submit your User Content with the understanding that any claim you have with respect to such use by others shall be between you and such other person, and shall not include us.<br/><br/>We do not endorse any User Content or any opinion, recommendation, or advice expressed therein, and we expressly disclaims any and all liability in connection with User Content. We do not knowingly permit copyright infringing activities and infringement of intellectual property rights on the Digital Properties, and we will remove all Content and User Content if properly notified that such Content or User Content infringes or may infringe on another’s intellectual property rights. We reserve the right to remove Content and User Content without prior notice. Without limiting our right to cause the termination of a User Account for any or no reason, we will also cause the termination of a User Account if a user is determined to be a repeat infringer. A repeat infringer is a user of the Digital Properties who has been notified of infringing activity more than twice and/or has had User Content removed from the Digital Properties more than twice. We also reserve the right to decide whether User Content is appropriate and complies with these EULA for violations other than violations of intellectual property law, such as, but not limited to, obscene or defamatory material. We may remove such User Content and/or cause the termination of a User Account for uploading such material in violation of these EULA at any time, without prior notice and at our sole discretion. You acknowledge and agree that we may disclose your identity in connection with any claim of an intellectual property violation.<br/><br/><strong>COPYRIGHT COMPLAINTS.</strong> We own, protect and enforce copyright and other rights in our own intellectual property, and respect the intellectual property rights of others. We will respond to alleged copyright infringement in accordance with the Information Technology Act, 2000 (the “IT Act 2010”). Under the IT ACT 2010, a copyright owner may give notification to an online service provider of an alleged copyright infringement. During this process, the service provider responds by taking down the alleged infringing content, and takes reasonable steps to contact the owner of the removed content so that a counter-notification may be filed. If a valid counter-notification is filed, we typically will restore the content in question, unless we receive notice from the notification provider that a legal action has been filed seeking a court order to restrain the alleged infringer from engaging in the infringing activity. We may provide copies of such notices to the affected parties or to any other third parties, at our discretion and as required by law. Our Privacy Policy does not protect information provided in these notices. When notifying us of potential infringement, you must include the following:<br/><br/><ul><li>identification of the copyrighted work(s) claimed to have been infringed. If multiple copyrighted works, then a representative list of such works on the Digital Properties;<li>identification of the supposedly infringing material that is to be removed;</li></li><li>information reasonably sufficient to permit us to locate the material on the Digital Properties;</li><li>contact information reasonably sufficient to permit us to contact the complaining party, such as an address, telephone number, or email address;</li><li>a statement that the complaining party has a good faith belief that use of the material is in fact infringing and/or not authorized by the copyright owner, its agent, or the law;</li><li>a statement that, under penalty of perjury, the information in the notification is accurate and where relevant that the complaining party is authorized to act on behalf of the copyright owner; and</li><li>the signature, physical or electronic, of the copyright owner or a person authorized to act on his or her behalf.</li><li>A provider of content subject to a claim of infringement may make a counter notification. To file a counter notification with us, please provide the IT ACT 2010 Agent a written communication containing the following:</li><li>identification of the supposedly infringing material that is to be removed;</li><li>a statement that, under penalty of perjury, you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material to be removed or disabled;</li><li>your name, address, and telephone number, and a statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your postal address is located, and that you will accept service of process from the party who submitted the infringement notification or his, her, or its principal or agent; and</li><li>the signature, physical or electronic, of you or a person authorized to act on your behalf.</li></ul><br/><br/>We will promptly provide the party that provided the notice of claimed infringement with a copy of the counter notification, and inform the complaining party that we restore the removed or disabled content in ten (10) business days. If we do not receive notice that a lawsuit has been filed within ten (10) business days after we provide notice of the counter-notification, we will restore the removed or disabled materials. Until that time, your materials will remain removed or disabled.<br/><br/>Notice of alleged infringement must be sent by electronic mail to the Arthanium Copyright Agent at support@Arthanium.com or by certified mail and marked “Copyright Infringement” to Arthanium, D / 303, Silver Gardens, Near Kanti Nagar Ganesh Mandir, J.B. Nagar, Andheri East, Mumbai – 400059, India Attn: IT ACT 2010 AGENT<br/><br/>Before filing such a notification, make a careful determination as to whether or not the use of the material at issue is or may be protected by the “fair use” doctrine. You could potentially be held liable for costs and attorneys’ fees should you file a takedown notice where there is no infringing use. If you are unsure whether there is infringement, it may be advisable to seek legal counsel.<br/><br/><strong>TERMINATION OF SERVICE.</strong> We may terminate your right to access secured portions of the Digital Properties at any time, without notice, for conduct that we believe violates these EULA and/or is harmful to other users of the Digital Properties, to us, to our partners, to the contributors, to the business of our Internet service provider, or to other information providers.<br/><br/><strong>ADDITIONAL REMEDIES.</strong> You acknowledge that your conduct that is inconsistent with the provisions of these EULA may cause us irreparable damage for which remedies other than monetary relief may be inadequate. In such instances, you agree that we may seek injunctive or other equitable relief seeking to restrain such conduct without the necessity of proving actual harm or posting a bond.<br/><br/><strong>GOVERNING LAW AND JURISDICTION.</strong> You agree that all matters relating to your access to, or use of, this website shall be governed by the laws of the courts of Mumbai, India. You agree and hereby submit to the exclusive personal jurisdiction and venue of the courts of Mumbai, India, with respect to such matters.<br/><br/><strong>LOCAL LAWS.</strong> We make no representation that Content or materials on the Digital Properties are appropriate or available for use in jurisdictions outside India. Access to the Digital Properties from jurisdictions where such access is illegal is prohibited. If you choose to access the Digital Properties from other jurisdictions, you do so at your own initiative and are responsible for compliance with applicable local laws. We are not responsible for any violation of law. You may not use or export the Content or materials on the Digital Properties in violation of Indian export laws and regulations. You agree to comply with all applicable laws regarding the transmission of technical data exported from the India and the country in which you reside (if different from India).<br/><br/><strong>CUSTOMER COMMENTS.</strong> By submitting comments, information or feedback to us through email and/or the Digital Properties, you agree that the information submitted will be subject to our Privacy Policy located at http://Arthanium.com/privacy-policy/.<br/><br/><strong> Your Consent To This Agreement</strong><br/><br/>By accessing and using the Digital Properties, you consent to and agree to be bound by the foregoing EULA. If we decide to change these EULA or some part of them, we will make an effort to post those changes on this web page so that you will always be able to understand and agree to the EULA and conditions governing your use of the Digital Properties. Your use of the Digital Properties following your acceptance of any amendment of these EULA will signify your assent to and acceptance of its revised EULA for all previously collected information and information collected from you in the future. If you have additional questions or comments of any kind, or if you see anything on the Digital Properties that you think is inappropriate, please let us know by sending your comments or requests to:<br/><br/>Arthanium<br/>D / 303, Silver Gardens,<br/>Near Kanti Nagar Ganesh Mandir,<br/>J.B. Nagar<br/>Andheri East,<br/>Mumbai – 400059<br/>India<br/><br/><br/>Attn: Customer Care – Digital Properties<br/>info@Arthanium.com<br/><br/>Copyright © 2019. Arthanium. All Rights Reserved.<br/><br/>Effective as of: August 9, 2019<br/>Last updated : August 9, 2019<br/><br/></div></body></html>`
    console.log(ipfsCompanyHash, ipfsOwnerHash);
    setActiveStep(activeStep + 1);
    const eulaBuffer = Ipfs.Buffer.from(eulaToSave)
    const eulaHash = await ipfs.add(eulaBuffer);
    console.log(eulaHash);
    const privateKey = await sessionStorage.getItem('privateKey')
    const orgBuffer = Ipfs.Buffer.from(JSON.stringify({ Docs: ipfsCompanyHash, eula: eulaHash[0].hash, info: { ...state, password: "", confirmPassword: "", email: values.email, companyName: values.companyName, fullName: values.fullName } }))
    const orgHash = await ipfs.add(orgBuffer);
    const userBuffer = Ipfs.Buffer.from(JSON.stringify({ Docs: ipfsOwnerHash, info: { ...state, password: "", confirmPassword: "", email: values.email, companyName: values.companyName, fullName: values.fullName } }))
    const userHash = await ipfs.add(userBuffer);
    // console.log(state.companyName,
    //     orgHash[0].hash,
    //     userHash[0].hash,
    //     state.email, "j");
    var transaction = {
      "to": registryAddress,
      "data": registryContract.methods.setOrganizationAdmin(uuidv1(), values.companyName, orgHash[0].hash, userHash[0].hash, values.email).encodeABI()
    };

    // web3.eth.estimateGas(transaction).then(gasLimit => {
    transaction["gasLimit"] = 4700000;
    web3.eth.accounts.signTransaction(transaction, privateKey).then(res => {
      web3.eth.sendSignedTransaction(res.rawTransaction).on('receipt', async function (receipt) {
        // console.log(receipt);
        if (receipt.status) {
          setActiveStep(5);
        }
      }).on('error', async function (error) {
        console.log(error);
        setSnackbar({ open: true, message: "Network error Occured! Please try again later." });
        setTimeout(() => {
          setSnackbar({ open: false, message: "" });
        }, 10000)
      })
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(state => ({
      ...state,
      [name]: value
    }));
  }

  const handleAddressChange = address => {
    setState(state => ({
      ...state,
      address: address
    }));
  };

  const handleSelect = address => {
    setState(state => ({
      ...state,
      address: address
    }));
    // console.log(address);
    geocodeByAddress(address).then(results => {
      let raw = results[0].address_components;
      setState(state => ({
        ...state,
        zipcode: raw[raw.length - 1]['long_name'],
        country: raw[raw.length - 2]['long_name'],
        stateName: raw[raw.length - 3]['long_name'],
        city: raw[raw.length - 4]['long_name']
      }));
    }).catch(error => console.error('Error', error));
  };

  function handleDoc(data) {
    setLoader(true);
    console.log(data, "data is called at the end");
    let tempIpfsCompanyHash = ipfsCompanyHash;
    for (let index = 0; index < data.companyDoc.length; index++) {
      const element = data.companyDoc[index];
      console.log(element, "c");
      let file = element[0];
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async (res) => {
        let content = Ipfs.Buffer.from(res.target.result);
        await ipfs.add(content, (err, newHash) => {
          // console.log(err, newHash);
          tempIpfsCompanyHash.push(newHash[0].hash)
          setIPFSCompanyHash([
            ...tempIpfsCompanyHash
          ])
        })
      }
    }
    let tempIpfsOwnerHash = ipfsOwnerHash;
    for (let index = 0; index < data.ownerDoc.length; index++) {
      const element = data.ownerDoc[index];
      console.log(element, "o");
      let file = element[0];
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async (res) => {
        let content = Ipfs.Buffer.from(res.target.result);
        await ipfs.add(content, (err, newHash) => {
          // console.log(err, newHash);
          tempIpfsOwnerHash.push(newHash[0].hash)
          setIPFSOwnerHash([
            ...tempIpfsOwnerHash
          ])
        })
      }
    }
    setLoader(false);
  }

  function handleError(value) {
    setError(value);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          isExist
            ? <ExistingAccount handleChange={handleChange} state={state} />
            : <KeyCreation handleChange={handleChange} state={state} error={error} />)
      case 1:
        return <CompnayInfo handleChange={handleChange} handleAddressChange={handleAddressChange} handleSelect={handleSelect} state={state} useInput={useInput} />;
      case 2:
        return <DocUpload setDoc={handleDoc} ref={docRef} error={handleError} />;
      case 3:
        return <Eula state={state} values={values} />;
      default:
        throw new Error('Unknown step');
    }
  }

  async function fetchKey() {
    // console.log("hhsh");
    // web3.eth.getBalance(address).then(console.log)
    // let address = localStorage.getItem("address");
    let temp = await localStorage.getItem("data")
    // console.log(temp,"temppppppppp");
    setKeystore(JSON.parse(temp));
    // setAddress(address);
    // console.log("hhsh2");
  }

  return (<React.Fragment>
    <CssBaseline />

    <main className={classes.layout}>
      {
        loader
          ? <CircularProgress style={{
            position: 'absolute',
            top: "50%",
            left: "50%"
          }} />
          : <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              KYC
              </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {
                steps.map(label => (<Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>))
              }
            </Stepper>
            <React.Fragment>
              {
                activeStep === steps.length + 1
                  ? (<React.Fragment>
                    <Typography variant="h5" gutterBottom="gutterBottom">
                      Thank you.
                      </Typography>
                    <Typography variant="subtitle1">
                      It will take approximately 24 hours to verify your KYC.
                      </Typography>
                    <div className={classes.buttons}>
                      <Button onClick={() => {
                        props.history.push('/')
                      }} className={classes.button}>
                        Back To Home
                        </Button>
                    </div>
                  </React.Fragment>)
                  : (
                    activeStep === steps.length
                      ? (<React.Fragment>
                        <div className={classes.buttons}>
                          <Typography variant="subtitle1">
                            Transaction is in progress! Please Wait...
                          </Typography>
                        </div>
                      </React.Fragment>)
                      : (<React.Fragment>
                        {getStepContent(activeStep)}
                        <div className={classes.buttons}>
                          {
                            activeStep !== 0 && activeStep !== 1 && activeStep !== 2 && (<Button onClick={handleBack} className={classes.button}>
                              Back
                            </Button>)
                          }
                          <Button variant="contained" color="primary" disabled={error} onClick={activeStep === steps.length - 1
                            ? submitForm
                            : handleNext} className={classes.button}>
                            {
                              activeStep === steps.length - 1
                                ? 'Accept'
                                : 'Next'
                            }
                          </Button>
                        </div>
                      </React.Fragment>))
              }
            </React.Fragment>
          </Paper>
      }
    </main>
    <Dialog open={modal1} TransitionComponent={Transition} keepMounted="keepMounted" onClose={() => {
      setModal1(false)
    }} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
      <DialogTitle id="alert-dialog-slide-title">{"Please take some time to understand this for your own safety. 🙏"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <FormControlLabel control={<Checkbox
            checked={
              toggleState.checkedA
            }
            onChange={
              handleToggleChange('checkedA')
            }
            value="checkedA"
            inputProps={{
              'aria-label': 'primary checkbox',
            }}
          />} label="Do not lose it! It cannot be recovered if you lose it." />
          <FormControlLabel control={<Checkbox
            checked={
              toggleState.checkedB
            }
            onChange={
              handleToggleChange('checkedB')
            }
            value="checkedB"
            inputProps={{
              'aria-label': 'primary checkbox',
            }}
          />} label="Do not share it! Your Identity will be stolen if you use this file on a malicious/phishing site." />
          <FormControlLabel control={<Checkbox
            checked={
              toggleState.checkedC
            }
            onChange={
              handleToggleChange('checkedC')
            }
            value="checkedC"
            inputProps={{
              'aria-label': 'primary checkbox',
            }}
          />} label="Make a backup! Secure it like the millions of dollars it may one day be worth." />

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={OnmodalAccept} color="primary">
          Agree & Download
        </Button>
      </DialogActions>
    </Dialog>
    <Snackbar color="danger" open={snackbar.open} place="br" className={classes.margin} message={snackbar.message} />
  </React.Fragment>);
}

const mapStateToProps = (state) => ({ auth: state.auth, error: state.error })

export default connect(mapStateToProps)(KYCComponent)
