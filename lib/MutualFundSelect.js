import React, { Component } from 'react';
import './App.css';

class MutualFundSelect extends Component {
  render() {
    return (
      <div className="navhomeSel">
        <label for="mutualfundselect" className="filter">Filter By:-</label>
        <select type="mutualfundselect" id="mutualfundselect">
          <option name="none" value="none" selected="selected"> ---- Select Option ---- </option>
          <option name="stateoforigin_mf" value="stateoforigin_mf">State of Origin</option>
          <option name="country_mf" value="country_mf">Country</option>
          <option name="lga_mf" value="lga_mf">Local Government Area</option>
          <option name="principal_mf" value="principal_mf">Principal</option>
          <option name="units_mf" value="units_mf">Units Owned</option>
          <option name="email_mf" value="email_mf">Email</option>
          <option name="city_mf" value="city_mf">City of Residence</option>
        </select>
        <hr />
      </div>
    );
  }
}

export default MutualFundSelect;
