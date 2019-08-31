
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';



export default function ExistingAccount(props) {
    const { state, handleChange } = props;


    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        fullWidth
                        onChange={handleChange}
                        // autoComplete="companyName"
                        value={state.password}
                        type="password"
                    />
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}