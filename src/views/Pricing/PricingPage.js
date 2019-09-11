import React from 'react';
import StarIcon from '@material-ui/icons/StarBorder';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Link,
  Container,
  Box,
  Divider,
  OutlinedInput
} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

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
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
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
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'PRO',
    price: '49',
    description: ['400 Credits'],
    buttonText: 'GET STARTED',
    buttonVariant: 'outlined',
  },
  {
    title: 'BUSINESS',
    price: '149',
    description: [
      '1200 Credits'
    ],
    buttonText: 'GET STARTED',
    buttonVariant: 'outlined',
  },
  {
    title: 'ENTERPRISE',
    price: '449',
    description: [
      '3600 Credits'
    ],
    buttonText: 'GET STARTED',
    buttonVariant: 'outlined',
  },
];

export default function PricingPage() {
  const classes = useStyles();
  const [projects, setProjects] = React.useState(0);
  const [partners, setPartners] = React.useState(0);
  const [products, setProducts] = React.useState(0);

  const paymentHandler = (title, price) => {

    const paymentAmount = price*100;
    const self = this;
    const options = {
      key: "rzp_test_ryXbtVQF3Mtz28",
      amount: paymentAmount,
      name: 'Arthanium Credits',
      currency: "USD",
      description: 'Checkout for '+ title+ ' Pack',

      handler(response) {
        const paymentId = response.razorpay_payment_id;
        // console.log(paymentId);
        const url = process.env.URL+'/api/v1/rzp_capture/'+paymentId+'/'+paymentAmount;
        // Using my server endpoints to capture the payment
        fetch(url, {
          method: 'get',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(resp =>  resp.json())
        .then(function (data) {
          // console.log('Request succeeded with JSON response', data);
        })
        .catch(function (error) {
          // console.log('Request failed', error);
        });
      },

      prefill: {
        name: "Arthanium",
        email: 'test@test.com',
      },
      notes: {
        address: 'Mumbai,India',
      }
    };
    const rzp1 = new window.Razorpay(options);

    rzp1.open();
  }

  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <Divider/>
                <CardContent>
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
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} color="primary" onClick={(e) => paymentHandler(tier.title, tier.price)}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container>
      <div className="wrapper">
          <div className="row">
              <div className="columns-2 w-row">
                  <div className="column-2 w-col w-col-7">
                      <div className="margin-bottom">
                          <h2 className="heading-2">Note</h2>
                          <p>Note -
Setup and customization charges could be applicable for certain customers.<br/>
For larger customized plans contact us directly.<br/>
Additional monthly credits packs can be purchased at $ 49 for 400 Credits.<br/>
Validity of plan & credits is one month and it cannot be carried forward.<br/>
Currently we don’t charge any transaction based fee, but in future we might move to a transaction based fee model.</p>
                      </div>
                  </div>
                  <div className=" w-col w-col-5" style={{ textAlign: "-webkit-center", paddingTop: "50", paddingBottom: "50"}}>
                      <div data-animation="slide" data-duration={500} data-infinite={1} className="carousel">
                          <table className="tg">
                              <tr>
                                  <th className="tg-rnhl" colspan="4">Credit Chart</th>
                              </tr>
                              <tr>
                                  <td className="tg-rnhl">Action</td>
                                  <td className="tg-rnhl">Cost per action</td>
                                  <td className="tg-rnhl">Quantity</td>
                                  <td className="tg-rnhl" colspan="2">Credit Calculator</td>
                              </tr>
                              <tr>
                                  <td className="tg-rnhl">Projects</td>
                                  <td className="tg-rnhl">75</td>
                                  <td className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={projects} onChange={(e) => { setProjects(e.target.value) }} placeholder="Enter no. of project" /></td>
                                  <td className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={parseInt(projects) * 75} readOnly /></td>
                              </tr>
                              <tr>
                                  <td className="tg-rnhl">Partners</td>
                                  <td className="tg-rnhl">15</td>
                                  <td className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={partners} onChange={(e) => { setPartners(e.target.value) }} placeholder="Enter no. of partners" /></td>
                                  <td className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={parseInt(partners) * 15} readOnly /></td>
                              </tr>
                              <tr>
                                  <td className="tg-rnhl">Products / Docs / Devices</td>
                                  <td className="tg-g2pk">1</td>
                                  <td className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={products} onChange={(e) => { setProducts(e.target.value) }} placeholder="Enter no. of products / docs / devices" /></td>
                                  <td className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={products} readOnly /></td>
                              </tr>
                              <tr>
                                  <td className="tg-g2pk" colspan="1"></td>
                                  <td className="tg-g2pk" colspan="2">Total</td>
                                  <td className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={parseInt(projects * 75) + parseInt(partners * 15) + parseInt(products)} readOnly placeholder="Total" /></td>
                              </tr>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
          {/* </div> */}
      </div>
      </Container>
    </React.Fragment>
  );
}
