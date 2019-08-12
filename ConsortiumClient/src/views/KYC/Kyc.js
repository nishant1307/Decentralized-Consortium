import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone'
import ipfs from "ipfs";
import { connect } from 'react-redux';
const Ipfs = require('ipfs-http-client')
import {registryContract,registryAddress} from '../../registryContract';
import web3 from '../../web3';
import uuidv1 from 'uuid/v1';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing(2),
    },
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

function Review(props) {
    const date = "18th May"
    return (
        <React.Fragment>
            <div style={{flex:1,flexDirection:'column',justifyContent:'center', alignContent:'center'}}>
                  <pre style={{ overflow: 'scroll', width:550, height:500, whiteSpace:'pre-line' }}>
                  This Arthanium Platform Users Agreement ( “Agreement”) is made and
        entered into on {date} 2019 (the “Effective Date”), between
        Arthanium Networks Private Limited (“Arthanium”) a privately
        incorporated entity under the laws of India with registered office at D /
        303, Silver Gardens, Near Kanti Nagar Ganesh Mandir, J.B. Nagar Andheri
        East, Mumbai – 400059, India and {props.companyName} (‘the user”).
        Arthanium has developed a technology platform (“Arthanium Platform”)
        which includes both web &amp; mobile phone interface’s and building an
        ecosystem of applications around it for identity management, connected
        IoT devices, digitized documentation, trade finance, vendor validation and
        blockchain explorer. Some of these applications have been already
        developed whereas some are work in progress.
        Please read the following End User License Agreement (the “EULA”)
        carefully before using the Arthanium platform or our websites located
        at www.arthanium.com or our mobile applications, or participating in any
        blockchain related architecture / applications, online features, services
        and /or programs offered by us (collectively, the “Digital Properties”).
        These EULA are in effect for all of our Digital Properties.
        These EULA are not applicable to any other web page operated and / or
        owned by any entity other than Arthanium, including, but not limited to,
        any website, mobile application, blog, forum, or other material operated
        by any third party identified on the Digital Properties.  When visiting these
        third-party websites, you should refer to the EULA and conditions in effect
        for the applicable owner.
        Please read these EULA carefully, which include important
        information about your legal rights, remedies, and obligations.
        By accessing or using the digital properties, you are entering into
        a legal contract with arthanium regarding your use of the digital
        properties.  By accessing or using the digital properties, you agree
        to be bound by the EULA and all additional EULA incorporated by
        reference.  If you do not agree to any portion of these EULA, you
        should not access or otherwise use the digital properties.
        
        We will make an effort to update this web page with any changes to these
        EULA and you are encouraged to review these EULA frequently (the date
        of the most recent revision to these EULA appears at the end of these
        EULA).
        CONVENIENCE AND INFORMATION ONLY. The Digital Properties are
        provided to you as a convenience and for your information only. By
        merely providing access to the Digital Properties, we do not warrant or
        represent that: (a) any materials, documents, images, graphics, logos,
        design, audio, video and any other information provided from or on the
        Digital Properties (collectively, the “Content”) is accurate or complete; (b)
        the Content is up-to-date or current; (c) we have any obligation to update
        any Content; (d) the Content is free from technical inaccuracies or
        programming or typographical errors; (e) the Content is free from
        changes caused by a third party; (f) your access to the Digital Properties
        will be free from interruptions, errors, computer viruses or other harmful
        components; and/or (g) any information obtained in response to
        questions asked through the Digital Properties is accurate or complete.
        By accessing or using our Website or mobile application, you acknowledge
        that you have read, understood, and agree to be bound by these terms
        and to comply with all applicable laws and regulations, including export
        and re-export control laws and regulations. If you do not agree to these
        terms, please do not use or access our Website or mobile application.
        Arthanium may, without notice to you, at any time, revise these Terms of
        Use and any other information contained in this Website / Mobile
        application. The Arthanium Platform may also make improvements or
        changes in the products, services, or programs described on our website
        at any time without notice.
        DIGITAL PROPERTIES USE AND CONTENT. The subscription of
        Arthanium platform or its products or services are provided by Arthanium
        pursuant to a separate subscription agreement. Those additional terms
        become part of your agreement with the Arthanium Platform. Unless and
        until you are a subscriber and have purchased the applicable services
        offered by us through the Digital Properties, you only may view,
        download, copy or print a single copy of any page from the Digital
        Properties for personal, non-commercial purposes if you do not remove,
        modify, or alter any copyright and proprietary rights notices that may be
        present. You may not otherwise use, modify, copy, print, display,
        distribute, publish, or sell any information from the Digital Properties
        without our express, prior, written consent.  YOU MAY NOT USE ANY
        DIGITAL PROPERTY FOR ANY COMMERCIAL USE.  Any special rules
        for the software, files, downloads, and other items accessible through the
        
        Digital Properties may be included elsewhere in the Digital Properties and
        are incorporated into these EULA by reference.
        If you are a subscriber and have purchased a service offered by us
        through the Digital Properties, such use is subject to the EULA and
        conditions of such service to which you agreed to be bound by when
        purchasing.
        We may make changes to the Digital Properties, the Content, and / or the
        User Content described in these EULA at any time and without further
        notice to you. We will make an effort to update this web page with any
        changes to the EULA.
        We know that privacy is very important to you, and it is very important to
        us as well. You consent to receive electronic communications from us. We
        will communicate with you by email or by posting notices on our Digital
        Properties. You agree that all agreements, notices, disclosures and other
        communications that we provide to you electronically satisfy any legal
        requirement that such communication be in writing. Personal data that
        you provide regarding yourself will be handled in accordance with our
        Privacy Policy and Business Associate Agreement located at
        http://Arthanium.com/privacy-policy/.
        USER ACCOUNT, PASSWORD AND SECURITY. To the extent that a
        user account is created by you to access and use the Digital Properties
        (“User Account”), the following shall apply:
        (a) USER ACCOUNT. To access certain types of features, the Content
        and the User Content available through the Digital Properties, we require
        the use of a password / private key after setting up a User Account. The
        private key can be generated by use of seed phrase which will be
        provided to you at time of creating the user account. We do not store any
        user information as the login access password / private key is stored
        directly on the user device. We also do not store the seed phrase and it’s
        your responsibility to store it securely. You, are ultimately responsible for
        protecting your password / private key, seed phrase and User Account
        information from disclosure to third parties, and you are not permitted to
        circumvent the use of required encryption technologies, if any. You agree
        to (i) immediately notify us of any unauthorized use of your password /
        private key, or User Account, or any other breach of security, and (ii)
        ensure that you exit from your User Account at the end of each session.
        While we provide certain encryption technologies and use other
        reasonable precautions to protect your confidential information and
        provide suitable security, we do not and cannot guarantee or warrant that
        
        information transmitted through the Internet is secure, or that such
        transmissions are free from delay, interruption, interception or error.
        
        (b) ACCURATE INFORMATION. In creating and using your User Account
        for use on the Digital Properties, you agree to: (i) provide true, accurate,
        current, and complete information about yourself on any registration form
        required for the Digital Properties (such information being the
        “Registration Data”); (ii) maintain and promptly update the Registration
        Data to keep it true, accurate, current, and complete; and (iii) maintain
        and promptly update payment information to keep it true, accurate,
        current, and complete. If you provide any information that is untrue,
        inaccurate, not current, or incomplete, or if we have reasonable grounds
        to suspect that such information is untrue, inaccurate, not current, or
        incomplete, then we have the right to suspend or terminate your User
        Account and refuse any and all current or future use of your User
        Account. You will also be required to submit Know your Customer (“KYC”)
        data to confirm your registration data. You will not be allowed to access
        the platform till you have updated registration data, completed KYC and
        accepted this EULA / agreement.
        (c) NON-TRANSFERABILITY OF USER ACCOUNT. User Accounts are
        non-transferable, and all users are obligated to take preventative
        measures to prohibit unauthorized users from accessing the Digital
        Properties with his or her password. / private key.
        (d) ACCOUNT DEACTIVATION. We reserve the right to deactivate or
        cancel a User Account in our sole discretion, including for the following
        reasons: (i) you request such deactivation; (ii) you are deceased; (iii) you
        do not respond to repeated communication attempts regarding the status
        of your User Account; (iv) you reside in or relocate to a country where
        use of a User Account is prohibited under applicable law; or (v) you act in
        a fraudulent or an inappropriate manner while using the User Account.
        ARTHANIUM BLOCKCHAIN ARCHITECTURE. We store most of the
        data on the Arthanium blockchain architecture. In connection with your
        use of the Digital Properties and the services provided to you by
        Arthanium, you represent and warrant that you have the authority to
        provide the data to us and such provision of data is in made in
        accordance with applicable law, and you hereby agree that Arthanium has
        the right to submit such data to the Arthanium Blockchain architecture on
        your behalf.
        
        OBJECTIONABLE MATERIAL. You acknowledge that in using the Digital
        Properties and accessing the Content and / or the User Content, you may
        encounter material that you deem to be disturbing, offensive or
        objectionable. You agree to use the Digital Properties at your sole risk and
        that we shall have no liability to you for material that may be disturbing,
        objectionable or offensive to you.
        
        NOT INTENDED FOR MINORS. We do not collect Information from any
        person that we know to be under the age of 18. Specifically, the Digital
        Properties are not intended or designed to attract minors under the age of
        18.  You affirm that you are more than 18 years of age, or an
        emancipated minor, or possess legal parental or guardian consent, and
        are fully able and competent to enter into the EULA, conditions,
        obligations, affirmations, representations, and warranties set forth in
        these EULA, and to abide by and comply with these EULA. In any case,
        you affirm that you are over the age of 18, as the digital properties are
        not intended for minors under 18 that are unaccompanied by their
        parent or legal guardian.
        PAYMENT AND REFUNDS
        (a) PAYMENT. Payment for access to the system is required at the time
        of purchasing our subscription plans, access with not be granted until
        payment is complete. Any other Invoices issued by Arthanium shall be
        paid within fifteen (15) days of the date of the invoice, unless otherwise
        agreed in writing by Arthanium.
        (b)  REFUNDS. Arthanium will refund your access / registration fee,
        minus a $25 per provider processing fee. Refunds must be requested
        within fourteen (14) days of purchase, and will be reviewed by
        management for approval. All requests must be submitted in writing to
        support@arthanium.com .
        Requests submitted after the fourteen (14) day refund period will not be
        honored. Arthanium reserves the right to deny any refund request at its
        discretion.
        DISCLAIMERS
        (a)  NO WARRANTIES FOR CONTENT. The Digital Properties are
        provided to you for your information only. We do not warrant or represent
        that: (i) the Content and/or the User Content is fair, accurate, or
        complete; (ii) the Content and/or the User Content is up-to-date or
        current; (iii) we have any obligation to update any Content; (iv) the
        
        Content and/or the User Content is free from technical inaccuracies or
        programming or typographical errors; (v) the Content and/or the User
        Content is free from changes caused by a third party; (vi) any information
        obtained in response to questions asked through the Digital Properties is
        accurate or complete; and/or (vii) the Content and/or the User Content
        are non-infringing of any third party’s intellectual rights.
        
        (b) NO WARRANTIES FOR DIGITAL PROPERTIES. When using the
        Digital Properties, information will be transmitted in such a way that may
        be beyond our control. As such, we make no warranty concerning the
        delay, failure, interruption, or corruption of any data, the Content, the
        User Content, or other information transmitted in connection with the use
        of the Digital Properties. You expressly agree that your use of the digital
        properties is at your sole risk. The digital properties, the content and the
        user content are provided “as is” and “as available” for your use, without
        warranties of any kind, either express or implied, unless such warranties
        are legally incapable of exclusion. We make no representations or
        warranties that the digital properties, the content, and the user content,
        or any services offered in connection with the digital properties, are or will
        remain uninterrupted or error-free, that defects will be corrected, or that
        the web pages on or through the digital properties, or the servers used in
        connection with the digital properties, are or will remain free from any
        viruses, worms, time bombs, drop dead devices, trojan horses, or other
        harmful components. We do not guarantee that you will be able to access
        or use the digital properties at times or locations of your choosing, or that
        we will have adequate capacity for the digital properties as a whole or in
        any specific geographic area. We make no representation or warranty
        regarding government compliance of any software used in running the
        digital properties. Our entire liability and your exclusive remedy with
        respect to the use of any service or product provided on or through the
        digital properties will be the refund of the purchase price for any content,
        user content, products, or services found to be inadequate.
        
        (c) INDEMNIFICATION. You agree to defend, indemnify, and hold
        harmless Arthanium and our directors, officers, employees, and agents
        from and against any and all claims, demands, suits, proceedings,
        liabilities, judgments, losses, damages, expenses, and costs (including
        without limitation reasonable attorneys’ fees) assessed or incurred by us,
        directly or indirectly, with respect to or arising out of: (i) your failure to
        comply with these EULA; (ii) your breach of your obligations under these
        EULA; (iii) your use of the rights granted hereunder, including without
        limitation any claims made by any third parties; and/or (iv) any claim
        that your User Content caused damage to a third party.
        
        (d) YOUR RESPONSIBILITIES. You are responsible for establishing
        such procedures as you deem appropriate to verify the accuracy of data
        transmitted hereunder (and we will have no obligation to verify the
        accuracy of such data).
        LIMITATION OF LIABILITY. In no event will we be liable for any direct,
        indirect, incidental, special, exemplary, punitive, or consequential
        damages arising from your use of or inability to use the digital properties
        and/or any content and/or user content provided in connection with the
        digital properties or for any other claim related in any way to your use of
        the digital properties and/or any content and/or user content additionally,
        we shall not be liable for negative repercussions to any party based on
        the use of or inability to use the digital properties, including but not
        limited to lost goodwill or lost profits. We shall be liable only to the extent
        of actual damages incurred by you, not to exceed the amount you
        actually paid to us for goods or services in the prior six (6) months, if
        anything. We are not liable for any personal injury, including death, or
        property damage caused by your use or misuse of the digital properties,
        the content and/or the user content. Remedies under these EULA are
        exclusive and are limited to those expressly provided for in these EULA.
        Because some states or jurisdictions do not allow the exclusion or
        limitation of liability for consequential or incidental damages, in such
        states or jurisdictions our liability will be limited to the greatest extent
        permitted by applicable law.
        THIRD PARTY CONTENT AND THIRD PARTY
        APPLICATIONS. Although we do not presently do so, in the future we
        may provide hyperlinks to other websites maintained by third parties, or
        may provide third party content on the Digital Properties by framing or
        other methods (collectively, “Third Party Content”). In addition, the
        Digital Properties may include certain applications, features, programs
        and services provided by third parties (collectively, the “Third Party
        Applications”). We do not monitor Third Party Content or Third Party
        Applications and can make no guarantee as to the accuracy or
        completeness of such Third Party Content or Third Party Applications.
        The links to third party websites, any third party content, and any third
        party applications may be provided for your convenience and information
        only. The content on any linked website or in any third party application is
        not under our control and, just as with the digital properties, we are not
        responsible for the content of linked websites and/or third party
        applications, including any further links contained in a third party website.
        We make no representations or warranties in connection with any third
        party content or third party applications, which at all times and in each
        instance is provided “as is.” Third party applications may be subject to
        
        additional EULA and conditions or agreements between you and the
        provider of such third party applications as may be provided to you in
        connection therewith, and you agree to fully comply with all such
        additional EULA, conditions and agreements. If you decide to access any
        of the third party websites linked to the digital properties, any third party
        content, and/or any third party application, you do so entirely at your
        own risk.
        
        If a third party links or refers to the Digital Properties, it is not necessarily
        an indication of an endorsement, authorization, sponsorship, affiliation,
        joint venture, or partnership by or with us. In most cases, we are not
        even aware that a third party has linked or refers to the Digital
        Properties. A third party website that links to the Digital Properties: (a)
        may link or refer to, but not replicate, the Content and/or the User
        Content; (b) may not create a browser, border environment, or frame the
        Content and/or the User Content; (c) may not imply that we are
        endorsing it or its products or services; (d) may not misrepresent its
        relationship with us; (e) may not present false or misleading information
        about our products or services; and (f) should not include content that
        could be construed as distasteful, offensive, or controversial.
        INTELLECTUAL PROPERTY. The Content of the Digital Properties is
        intellectual property owned, controlled and/or licensed by All applicable
        intellectual property laws, including copyright laws, protect our rights in
        and to the Content. No portion of the Content and/or the User Content
        may be reproduced in any form or by any means, except as provided in
        Section 2 (Digital Properties Use and Content) and elsewhere in these
        EULA.
        We are the copyright owner or authorized licensee, or are otherwise
        permitted to use, of all trademarks, service marks, and logos used and
        displayed on the Digital Properties. All trademarks and service marks of
        Arthanium, or our subsidiaries or affiliates, that may be referred to on the
        Digital Properties are the property of Arthanium, or one of our
        subsidiaries or affiliates. Other parties’ trademarks and service marks that
        may be referred to on the Digital Properties are the property of their
        respective owners. Nothing on the Digital Properties should be construed
        as granting, by implication, estoppel, or otherwise, any license or right to
        use any of Arthanium’s, or our subsidiaries’ or affiliates’, trademarks,
        service marks, or copyrights without our prior written permission. We
        aggressively enforce our intellectual property rights. Neither the name of
        Arthanium, our subsidiaries or affiliates, nor any of our other trademarks,
        service marks, or copyrighted materials may be used in any way,
        
        including in any advertising, hyperlink, publicity, or promotional materials
        of any kind, whether relating to the Digital Properties or otherwise,
        without our prior, written permission, except that a third party website
        that desires to link to the Digital Properties and that complies with the
        requirements of Section 10 (Third Party Content and Third Party
        Applications) above may use the names “Arthanium” or the title of any
        Content in or as part of that link.
        
        USER CONTENT. The Digital Properties does, or may in the future,
        permit the submission of various forms of content submitted by you and
        other users, such as materials, statements, reviews, ratings, opinions,
        personal accounts, documents, images, graphics, logos, designs, videos,
        text files, audio files, and comments (collectively, “User Content”) and the
        hosting, sharing, downloading, publishing and/or republishing of such
        User Content. We do not guarantee any confidentiality with respect to any
        user content. To protect your privacy and the privacy of others, you agree
        that you will not provide any user content that contains personally
        identifiable information (such as name, phone number, email or mailing
        address, social national identification number, etc.) Belonging to you or
        anyone else. Uploading images or video of other people without their
        permission is strictly prohibited.
        You shall be solely responsible for your User Content, and the
        consequences of posting or publishing it. You represent and warrant that:
        (a) you own or have the necessary licenses, rights, consents, and
        permissions to use, and to authorize us and those other users of the
        Digital Properties to publish, such User Content, all patent, trademark,
        trade secret, copyright, or other proprietary rights in and to any and all
        User Content, and to enable inclusion and publication of the User Content
        on the Digital Properties as we deem appropriate; and (b) to the extent
        applicable, you have the written consent, release, and/or permission of
        each identifiable individual person in the User Content to use the name or
        likeness of each such person to enable inclusion and publication of the
        User Content in the manner contemplated by the Digital Properties and
        these EULA. By providing User Content to the Digital Properties you
        hereby grant us a worldwide, non-exclusive, royalty-free, irrevocable, sub
        licenseable, and transferable license to use, reproduce, distribute, prepare
        derivative works of, display, publish, republish, and perform the User
        Content in connection with the Digital Properties and Arthanium’s (and
        our respective agents, affiliates’ and successors’) business including, but
        not limited to, publication of any portion or all of the User Content in an
        advertisement, a book, a magazine, a spoken word work, any other
        
        literary work, and/or any other audio-visual work, in any medium or
        format, anywhere in the world. You also hereby grant each authorized
        user of the Digital Properties a worldwide, non-exclusive, royalty-free,
        irrevocable, and sub licenseable license to copy, modify, use, reproduce,
        distribute, publish, republish, and prepare derivative works of, display and
        perform your User Content as permitted under these EULA.
        
        You acknowledge that we reserve the right to pre-screen User Content
        and that we shall have the right (but not the obligation) in our sole
        discretion to refuse, move, and/or remove any User Content that is
        available on or through the Digital Properties. You also consent that all
        User Content that you post to the Digital Properties will at all times be
        available to us. Without limiting the foregoing, we shall have the right to
        remove any User Content that violates these EULA or is otherwise
        objectionable, including reviews and ratings that portrays us or any third
        party in a negative light. You acknowledge and agree that you may not
        rely on any Content or User Content created by us or submitted to or
        appearing on the Digital Properties.
        You agree to not use the Digital Properties to: (i) upload, post, email,
        transmit or otherwise make available any User Content that is unlawful,
        harmful, threatening, abusive, harassing, bullying, tortious, false,
        defamatory, vulgar, obscene, pornographic, sexually explicit, libelous,
        invasive of another’s privacy, hateful, or racially, ethnically or otherwise
        objectionable; (ii) harm minors in any way; (iii) impersonate any person
        or entity, including, but not limited to, an official or an employee of
        Arthanium; (iv) falsely state or otherwise misrepresent your affiliation
        with any person or entity; (v) forge headers or otherwise manipulate
        identifiers in order to disguise the origin of any User Content transmitted
        through the Digital Properties; (vi) upload, post, email, transmit, or
        otherwise make available any User Content that you do not have a right
        to make available under any law or under contractual or fiduciary
        relationships (such as inside information, proprietary, and confidential
        information learned or disclosed as part of an employment relationship or
        under a nondisclosure or confidentiality agreement); (vii) upload, post,
        email, transmit, or otherwise make available any User Content that
        infringes any patent, trademark, trade secret, copyright, or other
        proprietary rights of any party, including privacy and publicity rights,
        unless you are the owner of such rights or have permission from the
        rightful owner to post the material and to grant us and other users of the
        Digital Properties all of the license rights granted herein; (viii) upload,
        
        post, email, transmit, or otherwise make available any unsolicited or
        unauthorized advertising, promotional materials, spam, phishing
        schemes, pyramid schemes, or any other form of solicitation; (ix) upload,
        post, email, transmit, or otherwise make available any material that
        contains software viruses or any other computer code, files or programs
        designed to interrupt, destroy or limit the functionality of any computer
        software or hardware or telecommunications equipment; (x) interfere
        with or disrupt the Digital Properties or any of the servers or networks
        connected to the Digital Properties, or disobey any requirements,
        procedures, policies, or regulations of networks connected to the Digital
        Properties; (xi) intentionally or unintentionally violate any applicable local,
        state, national, or international law; (xii) stalk or otherwise harass
        another; or (xiii) collect or store personal data about other users.
        You acknowledge and agree that, in addition to the other uses set forth in
        these EULA, we may preserve User Content and may also disclose User
        Content if required to do so by law or in the good faith belief that such
        preservation or disclosure is reasonably necessary to: (a) comply with
        legal process; (b) enforce these EULA; (c) respond to claims that any
        User Content violates the rights of any third parties; or (d) protect the
        rights, property, or personal safety of Arthanium, our users, and/or the
        public. You further acknowledge and agree that each person that has
        access to your User Content may have less restrictions on his or her use
        of your User Content, and that you submit your User Content with the
        understanding that any claim you have with respect to such use by others
        shall be between you and such other person, and shall not include us.
        We do not endorse any User Content or any opinion, recommendation, or
        advice expressed therein, and we expressly disclaims any and all liability
        in connection with User Content. We do not knowingly permit copyright
        infringing activities and infringement of intellectual property rights on the
        Digital Properties, and we will remove all Content and User Content if
        properly notified that such Content or User Content infringes or may
        infringe on another’s intellectual property rights. We reserve the right to
        remove Content and User Content without prior notice. Without limiting
        our right to cause the termination of a User Account for any or no reason,
        we will also cause the termination of a User Account if a user is
        determined to be a repeat infringer. A repeat infringer is a user of the
        Digital Properties who has been notified of infringing activity more than
        twice and/or has had User Content removed from the Digital Properties
        more than twice. We also reserve the right to decide whether User
        Content is appropriate and complies with these EULA for violations other
        than violations of intellectual property law, such as, but not limited to,
        obscene or defamatory material. We may remove such User Content
        and/or cause the termination of a User Account for uploading such
        
        material in violation of these EULA at any time, without prior notice and at
        our sole discretion. You acknowledge and agree that we may disclose
        your identity in connection with any claim of an intellectual property
        violation.
        COPYRIGHT COMPLAINTS. We own, protect and enforce copyright and
        other rights in our own intellectual property, and respect the intellectual
        property rights of others. We will respond to alleged copyright
        infringement in accordance with the Information Technology Act, 2000
        (the “IT Act 2010”).  Under the IT ACT 2010, a copyright owner may give
        notification to an online service provider of an alleged copyright
        infringement. During this process, the service provider responds by taking
        down the alleged infringing content, and takes reasonable steps to
        contact the owner of the removed content so that a counter-notification
        may be filed.  If a valid counter-notification is filed, we typically will
        restore the content in question, unless we receive notice from the
        notification provider that a legal action has been filed seeking a court
        order to restrain the alleged infringer from engaging in the infringing
        activity. We may provide copies of such notices to the affected parties or
        to any other third parties, at our discretion and as required by law. Our
        Privacy Policy does not protect information provided in these notices.
        When notifying us of potential infringement, you must include the
        following:
         identification of the copyrighted work(s) claimed to have been
        infringed. If multiple copyrighted works, then a representative list of
        such works on the Digital Properties;
         identification of the supposedly infringing material that is to be
        removed;
         information reasonably sufficient to permit us to locate the material on
        the Digital Properties;
         contact information reasonably sufficient to permit us to contact the
        complaining party, such as an address, telephone number, or email
        address;
         a statement that the complaining party has a good faith belief that use
        of the material is in fact infringing and/or not authorized by the
        copyright owner, its agent, or the law;
         a statement that, under penalty of perjury, the information in the
        notification is accurate and where relevant that the complaining party is
        authorized to act on behalf of the copyright owner; and
         the signature, physical or electronic, of the copyright owner or a person
        authorized to act on his or her behalf.
         A provider of content subject to a claim of infringement may make a
        counter notification. To file a counter notification with us, please
        
        provide the IT ACT 2010 Agent a written communication containing the
        following:
         identification of the supposedly infringing material that is to be
        removed;
         a statement that, under penalty of perjury, you have a good faith belief
        that the material was removed or disabled as a result of mistake or
        misidentification of the material to be removed or disabled;
         your name, address, and telephone number, and a statement that you
        consent to the jurisdiction of the Federal District Court for the judicial
        district in which your postal address is located, and that you will accept
        service of process from the party who submitted the infringement
        notification or his, her, or its principal or agent; and
         the signature, physical or electronic, of you or a person authorized to
        act on your behalf.
        We will promptly provide the party that provided the notice of claimed
        infringement with a copy of the counter notification, and inform the
        complaining party that we restore the removed or disabled content in ten
        (10) business days. If we do not receive notice that a lawsuit has been
        filed within ten (10) business days after we provide notice of the counter-
        notification, we will restore the removed or disabled materials. Until that
        time, your materials will remain removed or disabled.
        Notice of alleged infringement must be sent by electronic mail to the
        Arthanium Copyright Agent at support@Arthanium.com or by certified
        mail and marked “Copyright Infringement” to Arthanium, D / 303, Silver
        Gardens, Near Kanti Nagar Ganesh Mandir, J.B. Nagar, Andheri East,
        Mumbai – 400059, India Attn: IT ACT 2010 AGENT
        Before filing such a notification, make a careful determination as to
        whether or not the use of the material at issue is or may be protected by
        the “fair use” doctrine. You could potentially be held liable for costs and
        attorneys’ fees should you file a takedown notice where there is no
        infringing use. If you are unsure whether there is infringement, it may be
        advisable to seek legal counsel.
        TERMINATION OF SERVICE. We may terminate your right to access
        secured portions of the Digital Properties at any time, without notice, for
        conduct that we believe violates these EULA and/or is harmful to other
        users of the Digital Properties, to us, to our partners, to the contributors,
        to the business of our Internet service provider, or to other information
        providers.
        ADDITIONAL REMEDIES. You acknowledge that your conduct that is
        inconsistent with the provisions of these EULA may cause us irreparable
        
        damage for which remedies other than monetary relief may be
        inadequate.  In such instances, you agree that we may seek injunctive or
        other equitable relief seeking to restrain such conduct without the
        necessity of proving actual harm or posting a bond.
        GOVERNING LAW AND JURISDICTION. You agree that all matters
        relating to your access to, or use of, this website shall be governed by the
        laws of the courts of Mumbai, India. You agree and hereby submit to the
        exclusive personal jurisdiction and venue of the courts of Mumbai, India,
        with respect to such matters.
        LOCAL LAWS. We make no representation that Content or materials on
        the Digital Properties are appropriate or available for use in jurisdictions
        outside India.  Access to the Digital Properties from jurisdictions where
        such access is illegal is prohibited.  If you choose to access the Digital
        Properties from other jurisdictions, you do so at your own initiative and
        are responsible for compliance with applicable local laws. We are not
        responsible for any violation of law.  You may not use or export the
        Content or materials on the Digital Properties in violation of Indian export
        laws and regulations.  You agree to comply with all applicable laws
        regarding the transmission of technical data exported from the India and
        the country in which you reside (if different from India).
        CUSTOMER COMMENTS. By submitting comments, information or
        feedback to us through email and/or the Digital Properties, you agree that
        the information submitted will be subject to our Privacy Policy located
        at http://Arthanium.com/privacy-policy/.
        Your Consent To This Agreement
        By accessing and using the Digital Properties, you consent to and agree to
        be bound by the foregoing EULA. If we decide to change these EULA or
        some part of them, we will make an effort to post those changes on this
        web page so that you will always be able to understand and agree to the
        EULA and conditions governing your use of the Digital Properties.  Your
        use of the Digital Properties following your acceptance of any amendment
        of these EULA will signify your assent to and acceptance of its revised
        EULA for all previously collected information and information collected
        from you in the future. If you have additional questions or comments of
        any kind, or if you see anything on the Digital Properties that you think is
        inappropriate, please let us know by sending your comments or requests
        to:
        Arthanium
        D / 303, Silver Gardens,
        
        Near Kanti Nagar Ganesh Mandir,
        J.B. Nagar
        Andheri East,
        Mumbai – 400059
        India
        Attn: Customer Care – Digital Properties
        support@Arthanium.com
        Copyright © 2019. Arthanium.  All Rights Reserved.
        Effective as of: August 9, 2019
        Last updated :  August 9, 2019
                  </pre>
            </div>
        </React.Fragment>
    );
}

function PaymentForm(props) {
    const [companyDoc, setCompanyDoc] = useState([]);
    const [ownerDoc, setOwnerDoc] = useState([]);
    const onDrop = (type) => (acceptedFiles) => {
        let i;
        for (i = 0; i < acceptedFiles.length; i++) {
            if (type === "companyDoc")
                setCompanyDoc([...companyDoc, URL.createObjectURL(acceptedFiles[i])])
            else
                setOwnerDoc([...ownerDoc, URL.createObjectURL(acceptedFiles[i])])
        }
        props.setDoc({acceptedFiles:acceptedFiles,type:type})
    }
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField disabled required id="cardName" defaultValue="Company Document" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Dropzone
                        onDrop={onDrop("companyDoc")}
                        accept="image/*"
                        minSize={0}
                        maxSize={1048576}
                        multiple
                    >
                        {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                            const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;
                            return (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {!isDragActive && 'Click here or drop upto 3 images'}
                                    {isDragActive && !isDragReject && "Drop it here"}
                                    {isDragReject && "File type not accepted, sorry!"}
                                    {isFileTooLarge && (
                                        <div className="text-danger mt-2">
                                            File is too large.
                              </div>
                                    )}
                                    <div style={{
                                        position: 'relative',
                                        width: '200px',
                                        height: '200px',
                                        borderWidth: '2px',
                                        borderColor: 'rgb(102, 102, 102)',
                                        borderStyle: 'dashed',
                                        borderRadius: '5px',
                                    }} />
                                </div>
                            )
                        }}
                    </Dropzone>
                    {companyDoc.length > 0 ? <div>
                        <h4>{companyDoc.length} images uploaded</h4>
                        <div>{companyDoc.map((file) => <img src={file} height="50px" width="50px" />)}</div>
                    </div> : null}
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField disabled required id="expDate" defaultValue="Owner Document" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Dropzone
                        onDrop={onDrop("ownerDoc")}
                        accept="image/*"
                        minSize={0}
                        maxSize={1048576}
                        multiple
                    >
                        {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                            const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;
                            return (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {!isDragActive && 'Click here or drop upto 3 images'}
                                    {isDragActive && !isDragReject && "Drop it here"}
                                    {isDragReject && "File type not accepted, sorry!"}
                                    {isFileTooLarge && (
                                        <div className="text-danger mt-2">
                                            File is too large.
                              </div>
                                    )}
                                    <div style={{
                                        position: 'relative',
                                        width: '200px',
                                        height: '200px',
                                        borderWidth: '2px',
                                        borderColor: 'rgb(102, 102, 102)',
                                        borderStyle: 'dashed',
                                        borderRadius: '5px',
                                    }} />
                                </div>
                            )
                        }}
                    </Dropzone>
                    {ownerDoc.length > 0 ? <div>
                        <h4>{ownerDoc.length} images uploaded</h4>
                        <div>{ownerDoc.map((file) => <img src={file} height="50px" width="50px" />)}</div>
                    </div> : null}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

function AddressForm(props) {
    const {state, handleChange, handleAddressChange, handleSelect } = props;
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="companyName"
                        name="companyName"
                        label="Company Name"
                        fullWidth
                        onChange={handleChange}
                        autoComplete="companyName"
                        value={state.companyName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="fullName"
                        name="fullName"
                        label="Full name"
                        fullWidth
                        onChange={handleChange}
                        autoComplete="fname"
                        value={state.fullName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        onChange={handleChange}
                        autoComplete="lname"
                        value={state.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        onChange={handleChange}
                        autoComplete="billing address-line1"
                        value={state.address1}
                    />
                </Grid>
                <Grid item xs={12}>
                    <PlacesAutocomplete
                        value={state.address}
                        onChange={handleAddressChange}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <TextField
                                    id="standard-search"
                                    label="Address"
                                    type="search"
                                    fullWidth
                                    margin="normal"
                                    {...getInputProps()}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        onChange={handleChange}
                        autoComplete="billing address-level2"
                        value={state.city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        onChange={handleChange}
                        autoComplete="billing postal-code"
                        value={state.zipcode}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="billing country"
                        value={state.country}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const steps = ['Company & Personal Details', 'KYC Documents', 'Terms of Service'];



function Checkout(props) {
    const address = localStorage.getItem('address');
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [companyDoc, setCompanyDoc] = useState([]);
    const [ownerDoc, setOwnerDoc] = useState([]);
    const [state, setState] = useState({
        companyName: '',
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        country: ''
    })
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {        
        setActiveStep(activeStep - 1);
    };

    const submitForm = async () =>{
        setActiveStep(activeStep + 1);
        const privateKey = await sessionStorage.getItem('privateKey')
        const orgBuffer = Ipfs.Buffer.from(JSON.stringify({ Docs:companyDoc,orgInfo:state}))
        const orgHash = await ipfs.add(orgBuffer);
        const userBuffer = Ipfs.Buffer.from(JSON.stringify({ Docs:ownerDoc,orgInfo:state}))
        const userHash = await ipfs.add(userBuffer);
        console.log(orgHash,userHash);
        


        // var transaction = {
        //     "to": registryAddress,
        //     "data": registryContract.methods.setOrganizationAdmin(
        //       uuidv1(),
        //     state.companyName,
        //     "orgHash",
        //     "userHash",
        //     state.email
        //     ).encodeABI()
        //   };
    
        //   // web3.eth.estimateGas(transaction).then(gasLimit => {
        //   transaction["gasLimit"] = 4700000;
        //   web3.eth.accounts.signTransaction(transaction, privateKey)
        //     .then(res => {
        //       web3.eth.sendSignedTransaction(res.rawTransaction)
        //         .on('receipt', async function (receipt) {
        //             // console.log(receipt);
        //             setActiveStep(4);
        //         })
        //     })
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
        console.log(address);
        geocodeByAddress(address)
            .then(results => {
                console.log(results[0].address_components);
            })
            .catch(error => console.error('Error', error));
    };

    function handleDoc(data) {
        let i;
        for (i = 0; i < data.acceptedFiles.length; i++) {
            if (data.type === "companyDoc")
                setCompanyDoc([...companyDoc, URL.createObjectURL(data.acceptedFiles[i])])
            else
                setOwnerDoc([...ownerDoc, URL.createObjectURL(data.acceptedFiles[i])])
        }
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm handleChange={handleChange} handleAddressChange={handleAddressChange} handleSelect={handleSelect} state={state} />;
            case 1:
                return <PaymentForm setDoc={handleDoc}  />;
            case 2:
                return <Review companyName={state.companyName} />;
            default:
                throw new Error('Unknown step');
        }
    }

    useEffect(() => {
        registryContract.methods.getUserKYCStatus().call({
            from : address
          }).then(res => {
        if(res === "0"){
            setActiveStep(4);
        }
    }).catch((e)=>{
        
        if (localStorage.getItem("address") === null) {
            props.history.push('/signup');
        }
        else if (props.auth.isAuthenticated) {
            props.history.push('/dashboard');
        }
    })
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />

            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        KYC
          </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length + 1 ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you.
                </Typography>
                                <Typography variant="subtitle1">
                                    It will take approximately 24 hours to verify your KYC.
                </Typography>
                                <div className={classes.buttons}>
                                    <Button onClick={() => { props.history.push('/') }} className={classes.button}>
                                        Back To Home
                    </Button>
                                </div>
                            </React.Fragment>

                        ) : (  activeStep === steps.length ? (
                            <React.Fragment>
                                <div className={classes.buttons}>
                                <Typography variant="subtitle1">
                                    Transaction is in progress! Please Wait...
                                </Typography>
                                </div>
                            </React.Fragment>

                        ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                    </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={activeStep === steps.length - 1 ? submitForm :  handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Accept' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            ))}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToProps)(Checkout)