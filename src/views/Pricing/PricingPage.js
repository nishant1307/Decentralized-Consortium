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
  OutlinedInput,
  Table,
  TableHead,
  TableCell,
  TableRow
} from '@material-ui/core';

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

    const paymentAmount = price * 100;
    const self = this;
    const options = {
      key: "rzp_test_ryXbtVQF3Mtz28",
      amount: paymentAmount,
      name: 'Arthanium Credits',
      currency: "USD",
      description: 'Checkout for ' + title + ' Pack',

      handler(response) {
        const paymentId = response.razorpay_payment_id;
        // console.log(paymentId);
        const url = process.env.URL + '/api/v1/rzp_capture/' + paymentId + '/' + paymentAmount;
        // Using my server endpoints to capture the payment
        fetch(url, {
          method: 'get',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
          .then(resp => resp.json())
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
                <Divider />
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
                  <ul className="landing-bullet">
                    <li className="tab-class-inner">Setup and customization charges could be applicable for certain customers.</li>
                    <li className="tab-class-inner"> For larger customized plans contact us directly.</li>
                    <li className="tab-class-inner"> Additional monthly credits packs can be purchased at $ 49 for 400 Credits.</li>
                    <li className="tab-class-inner"> Validity of plan & credits is one month and it cannot be carried forward.</li>
                    <li className="tab-class-inner"> Currently we don’t charge any transaction based fee, but in future we might move to a transaction based fee model.</li>
                  </ul>
                </div>
              </div>
              <div className=" w-col w-col-5" style={{ textAlign: "-webkit-center", paddingTop: "50", paddingBottom: "50" }}>
                <div data-animation="slide" data-duration={500} data-infinite={1} className="carousel">
                  <Table className="tg">
                    <TableRow>
                      <TableHead className="tg-rnhl" colspan="4">Credit Chart</TableHead>
                    </TableRow>
                    <TableRow>
                      <TableCell className="tg-rnhl">Action</TableCell>
                      <TableCell className="tg-rnhl">Cost per action</TableCell>
                      <TableCell className="tg-rnhl">Quantity</TableCell>
                      <TableCell className="tg-rnhl" colspan="2">Credit Calculator</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="tg-rnhl">Projects</TableCell>
                      <TableCell className="tg-rnhl">75</TableCell>
                      <TableCell className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={projects} onChange={(e) => { setProjects(e.target.value) }} placeholder="Enter no. of project" /></TableCell>
                      <TableCell className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={projects === NaN ? 0 : parseInt(projects) * 75} readOnly /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="tg-rnhl">Partners</TableCell>
                      <TableCell className="tg-rnhl">15</TableCell>
                      <TableCell className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={partners} onChange={(e) => { setPartners(e.target.value) }} placeholder="Enter no. of partners" /></TableCell>
                      <TableCell className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={partners === NaN ? 0 : parseInt(partners) * 15} readOnly /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="tg-rnhl">Products / Docs / Devices</TableCell>
                      <TableCell className="tg-g2pk">1</TableCell>
                      <TableCell className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={products} onChange={(e) => { setProducts(e.target.value) }} placeholder="Enter no. of products / docs / devices" /></TableCell>
                      <TableCell className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={products} readOnly /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="tg-g2pk" colspan="1"></TableCell>
                      <TableCell className="tg-g2pk" colspan="2">Total</TableCell>
                      <TableCell className="tg-rnhl"><OutlinedInput type="number" style={{ width: "50" }} value={projects === NaN ? 0 : parseInt(projects * 75) + parseInt(partners * 15) + (products === NaN ? 0 : parseInt(products))} readOnly placeholder="Total" /></TableCell>
                    </TableRow>

                  </Table>
                  {/* </div> */}
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
