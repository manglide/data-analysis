import React, { Component } from 'react';
import './App.css';

class FrontOffice extends Component {
  render() {
    return (
      <div className="navhomeSel">
        <label for="frontofficeselect" className="filter">Filter By:-</label>
        <select type="frontofficeselect" id="frontofficeselect">
          <option name="none" value="none" selected="selected"> ---- Select Option ---- </option>
          <option name="timein_fr" value="timein_fr">Time In</option>
          <option name="timeout_fr" value="timeout_fr">Time Out</option>
          <option name="purpose_fr" value="purpose_fr">Purpose</option>
          <option name="timespentinoffice_fr" value="timespentinoffice_fr">Time spent in the office</option>
          <option name="timespentinqueue_fr" value="timespentinqueue_fr">Time spent in Queue</option>
          <option name="frontofficers_fr" value="frontofficers_fr">Front Officers By Cases Handled</option>
        </select>
        <hr />
      </div>
    );
  }
}

export default FrontOffice;
