import React, { Component } from 'react';
import './App.css';

class SbtSelect extends Component {
  render() {
    return (
      <div className="navhomeSel">
      <h1>SBT 2017 Online Google Forms Survey</h1>
        <label for="sbtselect" className="filter">Filter By:-</label>
        <select type="sbtselect" id="sbtselect">
          <option name="none" value="none" selected="selected"> ---- Select Option ---- </option>
          <option name="sbt_one" value="sbt_one">Africa Prudential Registrars is making a positive contribution to my business in its own way</option>
          <option name="sbt_two" value="sbt_two">The company responds to my inquiries in a timely manner</option>
          <option name="sbt_three" value="sbt_three">Considering the overall value of the project you paid for, it was_</option>
          <option name="sbt_four" value="sbt_four">Based on your experience with our services, how likely are you to recommend our services to colleagues or contacts within your industry</option>
          <option name="sbt_five" value="sbt_five">Overall, how satisfied are you with the amount of contact and our level of proactiveness in the way that we work with your organization</option>
          <option name="sbt_six" value="sbt_six">Which areas do you think we need to improve on_</option>
          <option name="sbt_seven" value="sbt_seven">Which additional Service would you like us to add_</option>
        </select>
        <hr />
      </div>
    );
  }
}

export default SbtSelect;
