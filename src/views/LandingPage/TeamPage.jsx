import React from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import '../../websiteAssets/css/style.css';
import '../../websiteAssets/css/responsive.css';
import '../../websiteAssets/css/bootstrap.css';
const WebsiteHeader = React.lazy(() => import('./WebsiteHeader'));
const WebsiteFooter = React.lazy(() => import('./WebsiteFooter'));
function TeamPage() {

    return(
      <div>
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  {/*[if lt IE 9]><![endif]*/}
  {/*[if lt IE 9]><![endif]*/}
  <div className="page-wrapper">
    <WebsiteHeader/>
    {/*Form Back Drop*/}
    <div className="form-back-drop" />
    <br /><br /><br /><br /><br /><br /><br />

    {/*Appointment Box*/}
    {/*End Consulting Form*/}
    {/* App Section */}
    <section className="section">
      <div className="grid grid--container">
        <div className="section-heading section-heading--center  col-MB-60">
          <h2 className="__title" style={{textAlign: 'center'}}>Our Team</h2>
        </div>
        <br/><br />
        {/* start team */}
        <div className="team team--style-1" style={{textAlign: 'center'}}>
          <div className="__inner">
            <div className="row">
              {/* start item */}
              <div className="col col--sm-6 col--lg-4">
                <div className="__item  text--center" data-aos="zoom-in" data-aos-delay={100}>
                  <figure className="__image  center-block circled">
                    <img className="img-responsive circled lazy" src={require("../../websiteAssets/images/team/nishant.png")} data-src={require("../../websiteAssets/images/team/nishant.png")} width={230} height={230} alt="demo" />
                    <div className="social-btns">
                      <a className="fontello-linkedin  circled" href="https://www.linkedin.com/in/kumar-nishant-b5b70ba7/" target="_blank" />
                    </div>
                  </figure>
                  <div className="__content">
                    <h5 className="__title">Kumar Nishant</h5>
                    <p>
                      Co-Founder &amp; CTO
                    </p>
                    <p>
                      IITian , Blockchain  Strategist and Researcher , he leads product development and navigates the team through the various technological challenges
                    </p>
                  </div>
                </div>
              </div>
              {/* end item */}
              {/* start item */}
              <div className="col col--sm-6 col--lg-4">
                <div className="__item  text--center" data-aos="zoom-in" data-aos-delay={200}>
                  <figure className="__image  center-block circled">
                    <img className="img-responsive circled lazy" src={require("../../websiteAssets/images/team/sandesh.jpeg")} data-src={require("../../websiteAssets/images/team/sandesh.jpeg")} width={230} height={230} alt="demo" />
                    <div className="social-btns">
                      <a className="fontello-linkedin  circled" href="#" />
                    </div>
                  </figure>
                  <div className="__content">
                    <h5 className="__title">Sandesh Hegde</h5>
                    <p>
                      Founder, Investor & Mentor
                    </p>
                    <p>
                      Sandesh comes with deep global experience in strategy, finance & business development. He has also been a part of the startup ecosystem as a mentor & early investor. He got involved with blockchain in late 2017 and his vision is to apply the technology for a better and automated future.
                    </p>
                  </div>
                </div>
              </div>
              {/* end item */}
              {/* start item */}
              <div className="col col--sm-6 col--lg-4">
                <div className="__item  text--center" data-aos="zoom-in" data-aos-delay={300}>
                  <figure className="__image  center-block circled">
                    <img className="img-responsive  lazy" src={require("../../websiteAssets/images/team/akshay.jpeg")} data-src={require("../../websiteAssets/images/team/akshay.jpeg")} width={230} height={230} alt="demo" />
                    <div className="social-btns">
                      <a className="fontello-gplus  circled" href="#" />
                    </div>
                  </figure>
                  <div className="__content">
                    <h5 className="__title">Akshay Pilankar</h5>
                    <p>
                      Senior Blockchain Engineer
                    </p>
                    <p>
                      Has worked on diverse block chain applications and skill sets include JavaScript , node, react and mobile applications using react native
                    </p>
                  </div>
                </div>
              </div>
              {/* end item */}
            </div>
          </div>
        </div>
        {/* end team */}
      </div>
    </section>

    {/* End App Section */}

    <WebsiteFooter/>
  </div>
  {/*End pagewrapper*/}
  {/*Scroll to top*/}
</div>

    )
}
export default TeamPage;