import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import { addNewLocation, closeLocationModal } from '../actions/userActions';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const LocationFormModal = (props) =>  {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const handleChange = address => {
    setAddress(address);
  };
  console.log(typeof(latitude));
  const handleSelect = address => {
    setAddress(address );
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setLatitude(latLng.lat);
        setLongitude(latLng.lng);
      })
      .catch(error => console.error('Error', error));
  };
  return (
    <div>
      <Dialog
        onClose={props.closeLocationModal}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={props.user.locationModalOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.closeLocationModal}>
          Enter a Location
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            id="standard-search"
            label="Location Alias"
            type="search"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
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
                    // inline style for demonstration purpose
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
          <CustomInput
            labelText="Latitude"
            id="company-disabled"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              disabled: true
            }}
            value={latitude}
          />
          <CustomInput
            labelText="Longitude"
            id="company-disabled"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              disabled: true
            }}
            value={longitude}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {props.addNewLocation({
            latitude: String(latitude),
            longitude: String(longitude),
            name: name,
            projectID: props.projectID
          })}} color="primary">
            Add Location
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { addNewLocation, closeLocationModal })(LocationFormModal);
