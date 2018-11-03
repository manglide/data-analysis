import React, { Component } from 'react';
import './App.css';

class EasyCoopSelect extends Component {
  render() {
    return (
      <div className="navhomeSel">
        <label for="easycoopselect" className="filter">Filter By:-</label>
        <select type="easycoopselect" id="easycoopselect">
          <option name="none" value="none" selected="selected">--- Select Option ---</option>
          <option name="religion" value="religion">Religion</option>
          <option name="age" value="age">Age Brackets</option>
          <option name="gender" value="gender">Gender</option>
          <option name="companies" value="companies">Companies</option>
        </select>
        <hr />
      </div>
    );
  }
}

export default EasyCoopSelect;
