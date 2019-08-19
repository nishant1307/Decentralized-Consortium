import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Iframe from 'react-iframe'

export default function MadeWithLove() {
  return (
    <div style={{height:"100%"}}>
      <Iframe url="https://docs.arthanium.org"
        width="100%"
        height="100%"
         />
    </div>
  );

}

// const useStyles = makeStyles(theme => ({

// }));

