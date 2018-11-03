import React, { Component } from 'react';
import EasyCoopSelect from './EasyCoopSelect'
import GreenPoleSelect from './GreenPoleSelect'
import MutualFundSelect from './MutualFundSelect'
import SbtSelect from './SbtSelect'
import FrontOffice from './FrontOffice';
import './App.css';

class Tabs extends Component {
  render() {
    return (
      <div className="navhome">
          <div class="footerX">
            Africa Prudential Data Stratification & Aggregation
          </div>
          <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#home">EasyCoop Coop. Application</a></li>
            <li><a data-toggle="tab" href="#menu1">GreenPole</a></li>
            <li><a data-toggle="tab" href="#menu2">GreenPole - Mutual Funds</a></li>
            <li><a data-toggle="tab" href="#menu4">Strategy & Business Transformation</a></li>
            <li><a data-toggle="tab" href="#menu5">Customer Enhancement</a></li>
          </ul>

          <div class="tab-content">
            <div id="home" class="tab-pane fade in active">
              <EasyCoopSelect />
            </div>
            <div id="menu1" class="tab-pane fade">
              <GreenPoleSelect />
            </div>
            <div id="menu2" class="tab-pane fade">
              <MutualFundSelect />
            </div>
            <div id="menu4" class="tab-pane fade">
            <SbtSelect />
            </div>
            <div id="menu5" class="tab-pane fade">
            <FrontOffice />
            </div>
          </div>
          <div class="displayArea" id="piechart_div"></div>
        </div>
    );
  }
}

export default Tabs;
