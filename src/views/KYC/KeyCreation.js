
import React from 'react';
import { RemoveRedEye } from '@material-ui/icons';
import { InputAdornment, Grid, TextField, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    eye: {
        cursor: 'pointer',
    },
}));

export default function companyInfo(props) {
    const classes = useStyles();
    const { state, handleChange, error, handleAddressChange, handleSelect } = props;
    const [passwordIsMasked, setPasswordIsMasked] = React.useState(true);

    const togglePasswordMask = () => {
        setPasswordIsMasked(!passwordIsMasked)
    };


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
                        type={passwordIsMasked ? "password" : "text"}
                        error={error}
                        helperText={error ? "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters." : ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <RemoveRedEye
                                        className={classes.eye}
                                        onClick={togglePasswordMask}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        fullWidth
                        type={passwordIsMasked ? "password" : "text"}
                        error={error}
                        helperText={error ? "Please confirm your password." : ''}
                        onChange={handleChange}
                        // autoComplete="fname"
                        value={state.confirmPassword}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Link href="/recover" variant="body2">
                        Already have a account ?
                </Link>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
