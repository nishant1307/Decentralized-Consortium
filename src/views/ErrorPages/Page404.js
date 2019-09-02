
import React from 'react';
import { Button, Container, Grid } from '@material-ui/core';
import {Link} from "react-router-dom";
const Page404 = () => {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Grid container className="justify-content-center">
            <Grid item md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">Oops! You're lost.</h4>
                <p className="text-muted float-left">The page you are looking for was not found.</p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
}
export default Page404;
