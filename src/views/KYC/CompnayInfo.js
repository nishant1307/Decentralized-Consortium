
import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, TextField } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

export default function companyInfo(props) {
    const { state, handleChange, handleAddressChange, useInput, handleSelect } = props;
    const classes = useStyles();
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
                        // onChange={handleChange}
                        autoComplete="companyName"
                        {...useInput('companyName', 'isRequired')}
                    // value={state.companyName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="fullName"
                        name="fullName"
                        label="Full name"
                        fullWidth
                        {...useInput('fullName', 'isRequired')}
                        // onChange={handleChange}
                        autoComplete="fname"
                    // value={state.fullName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        {...useInput('email', 'isRequired,isEmail')}
                        // onChange={handleChange}
                        autoComplete="lname"
                    // value={state.email}
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
                                            <Grid container alignItems="center">
                                                <Grid item>
                                                    <LocationOnIcon className={classes.icon} />
                                                </Grid>
                                                <Grid item xs>
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Premises number or name"
                        fullWidth
                        onChange={handleChange}
                        autoComplete="billing address-line1"
                        value={state.address1}
                    />
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
                    <TextField id="state"
                        name="stateName"
                        label="State/Province/Region"
                        onChange={handleChange}
                        value={state.stateName} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zipcode"
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
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
