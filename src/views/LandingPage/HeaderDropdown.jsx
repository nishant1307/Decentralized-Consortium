import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import {Link} from "react-router-dom";
const propTypes = {
  notif: PropTypes.bool,
  accnt: PropTypes.bool,
  tasks: PropTypes.bool,
  mssgs: PropTypes.bool,
};
const defaultProps = {
  notif: false,
  accnt: false,
  tasks: false,
  mssgs: false,
};
import { connect } from 'react-redux';

class HeaderDropdown extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      itemsCount:0
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  dropNotif() {
    let itemsCount = this.props.user.notificationList.length;
    let notificationBell;
    if(itemsCount>0){
      notificationBell = <DropdownToggle nav>
        <i className= "fa fa-bell-o"></i><Badge pill color="danger">{itemsCount}</Badge>
      </DropdownToggle>;
    }
    else{
      notificationBell = <DropdownToggle nav>
        <i className= "fa fa-bell-o"></i><Badge pill color="danger"></Badge>
      </DropdownToggle>
    }
    let notificationList = [];
    for(let i=0; i< this.props.user.notificationList.length; i++){
      notificationList.push(<DropdownItem key={i}><i className="icon-user-follow text-success" key={i}></i> {this.props.user.notificationList[i]}</DropdownItem>);
    }
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        {notificationBell}
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>You have {itemsCount} notifications</strong></DropdownItem>
          {notificationList}
        </DropdownMenu>
      </Dropdown>
    );
  }

  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="fa fa-user"  alt="admin@bootstrapmaster.com" />
        </DropdownToggle>
        <DropdownMenu right>
          {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
          <Link to="/profile" style={{ textDecoration: 'none', color: "#23282c" }}><DropdownItem><i className="fa fa-user"></i>User Profile</DropdownItem></Link>
          <Link to="/wallet" style={{ textDecoration: 'none', color: "#23282c" }}><DropdownItem><i class="fa fa-credit-card"></i>Wallet</DropdownItem></Link>
          <Link to="/organizationProfile" style={{ textDecoration: 'none', color: "#23282c" }}><DropdownItem><i className="fa fa-users"></i> Organization Profile</DropdownItem></Link>
          <Link to="/organizationDatabase" style={{ textDecoration: 'none', color: "#23282c" }}><DropdownItem><i className="fa fa-file-text"></i> Organization Database</DropdownItem></Link>
          <Link to="/userDatabase" style={{ textDecoration: 'none', color: "#23282c" }}><DropdownItem><i className="fa fa-file-text"></i> User Database</DropdownItem></Link> */}
          <DropdownItem onClick={this.props.onLogout}><i className="fa fa-lock"></i> Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const { notif, accnt, tasks, mssgs } = this.props;
    return (
        notif ? this.dropNotif() :
          accnt ? this.dropAccnt() : null
    );
  }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    errors:state.errors
})

HeaderDropdown.propTypes = propTypes;
HeaderDropdown.defaultProps = defaultProps;

export default connect(mapStateToProps)(HeaderDropdown);