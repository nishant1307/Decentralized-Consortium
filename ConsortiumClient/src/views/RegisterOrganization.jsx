import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import useForm from 'react-hook-form'
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {SimpleImg} from 'react-simple-img';
import {connect} from 'react-redux';
import {registerUser} from '../actions/authentication';
// import loginBackground from '../assets/images/loginBackground.jpg';
// import logo from 'assets/logo/logo.png';
import PropTypes from 'prop-types';

import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import countryCode from 'dataset/countryCodes.js'
import {registryContract} from "registryContract";
const Register = (props) => {

  const [email, setEmail] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [error, setError] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [userRegistered, setUserRegistered] = useState('');
  const [place, setPlace] = useState('');
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(2, `First name has to be at least 2 characters`).matches(/(?=.*[a-z])(?=.*[A-Z])/, 'First name must contain only A-Z uppercase or lowercase letters\n').required('First name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    lastName: Yup.string().min(1, `Last name has to be at least 1 character`).matches(/(?=.*[a-z])(?=.*[A-Z])/, 'Last name must contain only A-Z uppercase or lowercase letters\n').required('Last name is required'),
    organizationName: Yup.string().min(1, `Organization name has to be at least 1 characters`).required('Organization name is required'),
    password: Yup.string().min(6, `Password has to be at least ${ 6} characters!`).matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Password must contain: numbers, uppercase and lowercase letters\n').required('Password is required'),
    confirmPassword: Yup.string().required('Password confirmation is required')
  })

  const handleSelect = address => {
    geocodeByAddress(address).then(results => {
      getLatLng(results[0]).then(latLng => console.log('Success', latLng))
      console.log(results);
    }).catch(error => console.error('Error', error));
  };

  const renderFunc = ({getInputProps, getSuggestionItemProps, suggestions, loading}) => (<div className="autocomplete-root">
    <InputGroup className="mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="fa fa-home"></i>
        </InputGroupText>
      </InputGroupAddon>
      <Input type="text" name="addressLine1" {...getInputProps()} placeholder="AddressLine1"/>
    </InputGroup>
    <div className="autocomplete-dropdown-container">
      {loading && <div>Loading...</div>}
      {
        suggestions.map(suggestion => (<div {...getSuggestionItemProps(suggestion)}>
          <span>{suggestion.description}</span>
        </div>))
      }
    </div>
  </div>);

  const {register, handleSubmit, errors, setError, isSubmitting} = useForm({mode: 'onChange', validationSchema: validationSchema})

  const onSubmit = (data, e) => {
    data.email = email;
    data.submittedOTP = otp;
    data.addressLine1 = data.place2+" "+place;
    data.phoneNumber = data.countryCode + "-" +data.phoneNumber
    if (data.password != data.confirmPassword) {
      alert("Passwords do not match")
    } else {
      props.registerUser(data, props.history);
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    registryContract.methods.existingEmail(email).call({
      from : localStorage.getItem('address')
    }).then(res => {
      setUserStatus(res);
    })
  }

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push('/dashboard');
    }
  }, [props]);

  const onSubmitOTP = (e) => {
    e.preventDefault();
    axios.post('/api/users/verifyOTP', {
      'email': email,
      'otp': otp
    }).then(res => {
      setOTPVerified(res.data.status)
    })
  }
  let render;
  if (!emailChecked) {
    render = <div>
      <h2>Register</h2>
      <Form>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" autoComplete="username"/>
        </InputGroup>
        <Button color="primary" type="submit" onClick={onSubmitForm} block="block">Register</Button>
      </Form>
    </div>;
  } else if (error == "Existing") {
    render = <div>
      <h3>User Has already been Registered to the Athanium platform</h3>
      <Link to="/">
        <Button color="primary" className="mt-3" active="active" tabIndex={-1}>Proceed to Login</Button>
      </Link>
    </div>;
  } else if (error == "") {
    render = <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <p className="text-muted">Create your account</p>
      {
        props.errors.signupError && (<Alert color="danger">
          {props.errors.signupError.message}
        </Alert>)
      }
      <Row>
        <Col xs={6}>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-user-circle-o"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="firstName" placeholder="First Name" valid={!errors.firstName} invalid={errors.firstName} innerRef={register}/>
            <FormFeedback>{errors.firstName}</FormFeedback>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-user-circle-o"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="lastName" placeholder="Last Name" valid={!errors.lastName} invalid={errors.lastName} innerRef={register}/>
            <FormFeedback>{errors.lastName}</FormFeedback>
          </InputGroup>
        </Col>
      </Row>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="fa fa-users"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="text" name="organizationName" placeholder="Organization Name" valid={!errors.organizationName} invalid={errors.organizationName} innerRef={register}/>
        <FormFeedback>{errors.organizationName}</FormFeedback>
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="fa fa-home"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="text" name="place2" placeholder="Premises Name" innerRef={register}/>
        <FormFeedback>{errors.organizationName}</FormFeedback>
      </InputGroup>
      <PlacesAutocomplete value={place} onChange={value => {
          setPlace(value);
        }} onSelect={handleSelect}>
        {renderFunc}
      </PlacesAutocomplete>
      <Row>
        <Col xs={6}>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-home"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="addressLine2" innerRef={register} placeholder="City"/>
          </InputGroup>
        </Col>
        <Col xs={6}>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-home"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="zipcode" innerRef={register} placeholder="Zipcode"/>
          </InputGroup>
        </Col>
      </Row>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="fa fa-home"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="select" name="country" innerRef={register} defaultValue="India" placeholder="Country">
          <option value="Afghanistan">Afghanistan</option>
          <option value="Albania">Albania</option>
          <option value="Algeria">Algeria</option>
          <option value="American Samoa">American Samoa</option>
          <option value="Andorra">Andorra</option>
          <option value="Angola">Angola</option>
          <option value="Anguilla">Anguilla</option>
          <option value="Antartica">Antarctica</option>
          <option value="Antigua and Barbuda">Antigua and Barbuda</option>
          <option value="Argentina">Argentina</option>
          <option value="Armenia">Armenia</option>
          <option value="Aruba">Aruba</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="Bahamas">Bahamas</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Barbados">Barbados</option>
          <option value="Belarus">Belarus</option>
          <option value="Belgium">Belgium</option>
          <option value="Belize">Belize</option>
          <option value="Benin">Benin</option>
          <option value="Bermuda">Bermuda</option>
          <option value="Bhutan">Bhutan</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
          <option value="Botswana">Botswana</option>
          <option value="Bouvet Island">Bouvet Island</option>
          <option value="Brazil">Brazil</option>
          <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
          <option value="Brunei Darussalam">Brunei Darussalam</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Burkina Faso">Burkina Faso</option>
          <option value="Burundi">Burundi</option>
          <option value="Cambodia">Cambodia</option>
          <option value="Cameroon">Cameroon</option>
          <option value="Canada">Canada</option>
          <option value="Cape Verde">Cape Verde</option>
          <option value="Cayman Islands">Cayman Islands</option>
          <option value="Central African Republic">Central African Republic</option>
          <option value="Chad">Chad</option>
          <option value="Chile">Chile</option>
          <option value="China">China</option>
          <option value="Christmas Island">Christmas Island</option>
          <option value="Cocos Islands">Cocos (Keeling) Islands</option>
          <option value="Colombia">Colombia</option>
          <option value="Comoros">Comoros</option>
          <option value="Congo">Congo</option>
          <option value="Congo">Congo, the Democratic Republic of the</option>
          <option value="Cook Islands">Cook Islands</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Cota D'Ivoire">Cote d'Ivoire</option>
          <option value="Croatia">Croatia (Hrvatska)</option>
          <option value="Cuba">Cuba</option>
          <option value="Cyprus">Cyprus</option>
          <option value="Czech Republic">Czech Republic</option>
          <option value="Denmark">Denmark</option>
          <option value="Djibouti">Djibouti</option>
          <option value="Dominica">Dominica</option>
          <option value="Dominican Republic">Dominican Republic</option>
          <option value="East Timor">East Timor</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Egypt">Egypt</option>
          <option value="El Salvador">El Salvador</option>
          <option value="Equatorial Guinea">Equatorial Guinea</option>
          <option value="Eritrea">Eritrea</option>
          <option value="Estonia">Estonia</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
          <option value="Faroe Islands">Faroe Islands</option>
          <option value="Fiji">Fiji</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="France Metropolitan">France, Metropolitan</option>
          <option value="French Guiana">French Guiana</option>
          <option value="French Polynesia">French Polynesia</option>
          <option value="French Southern Territories">French Southern Territories</option>
          <option value="Gabon">Gabon</option>
          <option value="Gambia">Gambia</option>
          <option value="Georgia">Georgia</option>
          <option value="Germany">Germany</option>
          <option value="Ghana">Ghana</option>
          <option value="Gibraltar">Gibraltar</option>
          <option value="Greece">Greece</option>
          <option value="Greenland">Greenland</option>
          <option value="Grenada">Grenada</option>
          <option value="Guadeloupe">Guadeloupe</option>
          <option value="Guam">Guam</option>
          <option value="Guatemala">Guatemala</option>
          <option value="Guinea">Guinea</option>
          <option value="Guinea-Bissau">Guinea-Bissau</option>
          <option value="Guyana">Guyana</option>
          <option value="Haiti">Haiti</option>
          <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
          <option value="Holy See">Holy See (Vatican City State)</option>
          <option value="Honduras">Honduras</option>
          <option value="Hong Kong">Hong Kong</option>
          <option value="Hungary">Hungary</option>
          <option value="Iceland">Iceland</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Iran">Iran (Islamic Republic of)</option>
          <option value="Iraq">Iraq</option>
          <option value="Ireland">Ireland</option>
          <option value="Israel">Israel</option>
          <option value="Italy">Italy</option>
          <option value="Jamaica">Jamaica</option>
          <option value="Japan">Japan</option>
          <option value="Jordan">Jordan</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kenya">Kenya</option>
          <option value="Kiribati">Kiribati</option>
          <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
          <option value="Korea">Korea, Republic of</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Lao">Lao People's Democratic Republic</option>
          <option value="Latvia">Latvia</option>
          <option value="Lebanon" selected="selected">Lebanon</option>
          <option value="Lesotho">Lesotho</option>
          <option value="Liberia">Liberia</option>
          <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
          <option value="Liechtenstein">Liechtenstein</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Macau">Macau</option>
          <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
          <option value="Madagascar">Madagascar</option>
          <option value="Malawi">Malawi</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Maldives">Maldives</option>
          <option value="Mali">Mali</option>
          <option value="Malta">Malta</option>
          <option value="Marshall Islands">Marshall Islands</option>
          <option value="Martinique">Martinique</option>
          <option value="Mauritania">Mauritania</option>
          <option value="Mauritius">Mauritius</option>
          <option value="Mayotte">Mayotte</option>
          <option value="Mexico">Mexico</option>
          <option value="Micronesia">Micronesia, Federated States of</option>
          <option value="Moldova">Moldova, Republic of</option>
          <option value="Monaco">Monaco</option>
          <option value="Mongolia">Mongolia</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Morocco">Morocco</option>
          <option value="Mozambique">Mozambique</option>
          <option value="Myanmar">Myanmar</option>
          <option value="Namibia">Namibia</option>
          <option value="Nauru">Nauru</option>
          <option value="Nepal">Nepal</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Netherlands Antilles">Netherlands Antilles</option>
          <option value="New Caledonia">New Caledonia</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Nicaragua">Nicaragua</option>
          <option value="Niger">Niger</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Niue">Niue</option>
          <option value="Norfolk Island">Norfolk Island</option>
          <option value="Northern Mariana Islands">Northern Mariana Islands</option>
          <option value="Norway">Norway</option>
          <option value="Oman">Oman</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Palau">Palau</option>
          <option value="Panama">Panama</option>
          <option value="Papua New Guinea">Papua New Guinea</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Peru">Peru</option>
          <option value="Philippines">Philippines</option>
          <option value="Pitcairn">Pitcairn</option>
          <option value="Poland">Poland</option>
          <option value="Portugal">Portugal</option>
          <option value="Puerto Rico">Puerto Rico</option>
          <option value="Qatar">Qatar</option>
          <option value="Reunion">Reunion</option>
          <option value="Romania">Romania</option>
          <option value="Russia">Russian Federation</option>
          <option value="Rwanda">Rwanda</option>
          <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
          <option value="Saint LUCIA">Saint LUCIA</option>
          <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
          <option value="Samoa">Samoa</option>
          <option value="San Marino">San Marino</option>
          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Senegal">Senegal</option>
          <option value="Seychelles">Seychelles</option>
          <option value="Sierra">Sierra Leone</option>
          <option value="Singapore">Singapore</option>
          <option value="Slovakia">Slovakia (Slovak Republic)</option>
          <option value="Slovenia">Slovenia</option>
          <option value="Solomon Islands">Solomon Islands</option>
          <option value="Somalia">Somalia</option>
          <option value="South Africa">South Africa</option>
          <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
          <option value="Span">Spain</option>
          <option value="SriLanka">Sri Lanka</option>
          <option value="St. Helena">St. Helena</option>
          <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
          <option value="Sudan">Sudan</option>
          <option value="Suriname">Suriname</option>
          <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
          <option value="Swaziland">Swaziland</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Syria">Syrian Arab Republic</option>
          <option value="Taiwan">Taiwan, Province of China</option>
          <option value="Tajikistan">Tajikistan</option>
          <option value="Tanzania">Tanzania, United Republic of</option>
          <option value="Thailand">Thailand</option>
          <option value="Togo">Togo</option>
          <option value="Tokelau">Tokelau</option>
          <option value="Tonga">Tonga</option>
          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
          <option value="Tunisia">Tunisia</option>
          <option value="Turkey">Turkey</option>
          <option value="Turkmenistan">Turkmenistan</option>
          <option value="Turks and Caicos">Turks and Caicos Islands</option>
          <option value="Tuvalu">Tuvalu</option>
          <option value="Uganda">Uganda</option>
          <option value="Ukraine">Ukraine</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="Vanuatu">Vanuatu</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Vietnam">Viet Nam</option>
          <option value="Virgin Islands (British)">Virgin Islands (British)</option>
          <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
          <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
          <option value="Western Sahara">Western Sahara</option>
          <option value="Yemen">Yemen</option>
          <option value="Yugoslavia">Yugoslavia</option>
          <option value="Zambia">Zambia</option>
          <option value="Zimbabwe">Zimbabwe</option>
        </Input>
      </InputGroup>
      <Row>
        <Col xs={5}>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-globe"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="countryCode"  innerRef={register} placeholder="Country Code"/>
          </InputGroup>
        </Col>
        <Col xs={7}>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-phone"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="phoneNumber" valid={!errors.phoneNumber} invalid={errors.phoneNumber} innerRef={register} placeholder="Phone Number"/>
          </InputGroup>
        </Col>
      </Row>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="fa fa-at"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="text" readOnly="readOnly" name="email" value={email} placeholder="Email"/>
      </InputGroup>
      <Button color="primary" className="mr-1">{
          isSubmitting
            ? 'Wait...'
            : 'Create account'
        }</Button>

    </Form>
  } else {
    render = <div>
      <h3>User Has been Registered Successfully</h3>
      <Link to="/login">
        <Button color="primary" className="mt-3" active="active" tabIndex={-1}>Proceed to Login</Button>
      </Link>
    </div>;
  }
  return (<div>
    <Row className="loginForm">
      <Col sm="8" xs="12" className="loginBody">
      </Col>
      <Col sm="4" xs="12">
        {render}
      </Col>
    </Row>
  </div>);
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth, errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(Register)
