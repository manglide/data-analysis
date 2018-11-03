import React, { Component } from 'react';
import './App.css';

class GreenPoleSelect extends Component {
  render() {
    return (
      <div className="navhomeSel">
        <label for="greenpoleselect" className="filter">Filter By:-</label>
        <select type="greenpoleselect" id="greenpoleselect">
          <option name="none" value="none" selected="selected"> ---- Select Option ---- </option>
          <option name="stateoforigin_gp" value="stateoforigin_gp">State of Origin</option>
          <option name="agebrackets_gp" value="agebrackets_gp">Age Brackets</option>
          <option name="lga_gp" value="lga_gp">Local Government Area</option>
          <option name="maritalstatus_gp" value="maritalstatus_gp">Marital Status</option>
          <option name="gender_gp" value="gender_gp">Gender</option>
          <option name="email_gp" value="email_gp">E-Mail</option>
          <option name="mobile_gp" value="mobile_gp">Mobile</option>
          <option name="gp_occupation" value="gp_occupation">Occupation</option>
        </select>
        <hr />
      </div>
    );
  }
}

export default GreenPoleSelect;
