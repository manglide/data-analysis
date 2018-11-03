$(document).ready(function() {
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  	var target = $(e.target).attr("href") // activated tab
  	if(target==="#menu4") {
			$('#piechart_div').css({'border':'thin solid #fff'}).slideUp('slow').empty();
		} else {
			$('#piechart_div').css({'border':'thin solid #fff'}).empty().html('');
		}
	});
	$("#easycoopselect").val('none');
	$("#easycoopselect").trigger('change');
	$("#greenpoleselect").val('none');
	$("#greenpoleselect").trigger('change');
	$("#mutualfundselect").val('none');
	$("#mutualfundselect").trigger('change');
	$("#sbtselect").val('none');
	$("#sbtselect").trigger('change');
	$("#frontofficeselect").val('none');
	$("#frontofficeselect").trigger('change');
	$("#easycoopselect").select2({ width: '30%' });
	$("#greenpoleselect").select2({ width: '30%' });
	$("#mutualfundselect").select2({ width: '30%' });
	$("#frontofficeselect").select2({ width: '30%' });
	$("#sbtselect").select2({ width: '80%' });
	$(".dropdown-button").dropdown({hover: false});
	$(function () {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      setTimeout(() => {
        ele.classList.add('available')
        setTimeout(() => {
        ele.outerHTML = ''
      }, 2000)
      }, 1000)
    }
	 });
	 $("#sbtselect").on('change', function() {
		 if($(this).val() === "sbt_one") {
			 $('#piechart_div').slideUp('slow').empty().html('<br clear="all"><div align="center"><img src="/images/one.png" /></div>').slideDown('slow');
		 } else if ($(this).val() === "sbt_two") {
			 $('#piechart_div').slideUp('slow').empty().html('<br clear="all"><div align="center"><img src="/images/two.png" /></div>').slideDown('slow');
		 } else if ($(this).val() === "sbt_three") {
			 $('#piechart_div').slideUp('slow').empty().html('<br clear="all"><div align="center"><img src="/images/three.png" /></div>').slideDown('slow');
		 } else if ($(this).val() === "sbt_four") {
			 $('#piechart_div').slideUp('slow').empty().html('<br clear="all"><div align="center"><img src="/images/four.png" /></div>').slideDown('slow');
		 } else if ($(this).val() === "sbt_five") {
			 $('#piechart_div').slideUp('slow').empty().html('<br clear="all"><div align="center"><img src="/images/five.png" /></div>').slideDown('slow');
		 } else if ($(this).val() === "sbt_six") {
			 $('#piechart_div').slideUp('slow').empty().html('<br clear="all"><div align="center"><img src="/images/six.png" /></div>').slideDown('slow');
		 } else if ($(this).val() === "sbt_seven") {
			 $('#piechart_div').slideUp('slow').empty().html('<br clear="all"><div align="center"><img src="/images/seven.png" /></div>').slideDown('slow');
		 }
	 });
	 $("#mutualfundselect").on('change', function() {
		 if($(this).val() === "stateoforigin_mf") {
			 $.ajax({
									 url: '/states_mutualfunds',
									 type: "GET",
									 beforeSend: function () {
											 $('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="" /></div>');
									 },
									 success: function (response) {
											 console.log(JSON.parse(response));
											 if (response === null || response === undefined) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											 } else if (response.length === 0) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											 } else {
													 var _load = JSON.parse(response).data.map(obj => obj);
													 this.point = [];
													 for (var key in _load) {
															 if (_load.hasOwnProperty(key)) {
																	 var _obj = {};
																	 _obj.state = _load[key].state;
																	 _obj.y = parseInt(_load[key].number);
																	 this.point.push(_obj);
															 }
													 }
													 var tx = [];
													 var bx = {
															 type: "pie",
															 name: "Mutual Funds Userbase By States",
															 colorByPoint: true,
															 data: this.point
													 };
													 tx.push(bx);
													 var options = {
															 chart: {
																	 renderTo: 'piechart_div',
																	 plotBackgroundColor: null,
																	 plotBorderWidth: null,
																	 plotShadow: false
															 },
															 title: {
																	 text: 'Mutual Funds Userbase By States'
															 },
															 tooltip: {
																	 formatter: function () {
																			 //return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			 return '<b>' + this.point.state + '</b> ' + this.point.y;
																	 }
															 },
															 plotOptions: {
																	 pie: {
																			 allowPointSelect: true,
																			 cursor: 'pointer',
																			 dataLabels: {
																					 enabled: true,
																					 color: '#000000',
																					 connectorColor: '#000000',
																					 formatter: function () {
																							 //return '<b>' + this.point.state + '</b> ' + this.point.y;
																							 return '<b>' + (this.point.state==null?'No State Specified':this.point.state) + '</b> --- ' + this.point.y;
																					 }
																			 },
																			 showInLegend: false
																	 }
															 },
															 series: []
													 };
													 options.series = tx;
													 chart = new Highcharts.Chart(options);
											 }
									 },
									 error: function () {
											 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									 }
							 });
		 } else if ($(this).val() === "city_mf") {
			 $.ajax({
									 url: '/city_mutualfunds',
									 type: "GET",
									 beforeSend: function () {
											 $('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
									 },
									 success: function (response) {
											 console.log(JSON.parse(response));
											 if (response === null || response === undefined) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											 } else if (response.length === 0) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											 } else {
													 var _load = JSON.parse(response).data.map(obj => obj);
													 this.point = [];
													 for (var key in _load) {
															 if (_load.hasOwnProperty(key)) {
																	 var _obj = {};
																	 _obj.city = _load[key].city;
																	 _obj.y = parseInt(_load[key].number);
																	 this.point.push(_obj);
															 }
													 }
													 var tx = [];
													 var bx = {
															 type: "pie",
															 name: "Mutual Funds Userbase By Cities",
															 colorByPoint: true,
															 data: this.point
													 };
													 tx.push(bx);
													 var options = {
															 chart: {
																	 renderTo: 'piechart_div',
																	 plotBackgroundColor: null,
																	 plotBorderWidth: null,
																	 plotShadow: false
															 },
															 title: {
																	 text: 'Mutual Funds Userbase By Cities'
															 },
															 tooltip: {
																	 formatter: function () {
																			 //return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			 return '<b>' + this.point.city + '</b> ' + this.point.y;
																	 }
															 },
															 plotOptions: {
																	 pie: {
																			 allowPointSelect: true,
																			 cursor: 'pointer',
																			 dataLabels: {
																					 enabled: true,
																					 color: '#000000',
																					 connectorColor: '#000000',
																					 formatter: function () {
																							 //return '<b>' + this.point.state + '</b> ' + this.point.y;
																							 return '<b>' + (this.point.city==null?'No State Specified':this.point.city) + '</b> --- ' + this.point.y;
																					 }
																			 },
																			 showInLegend: false
																	 }
															 },
															 series: []
													 };
													 options.series = tx;
													 chart = new Highcharts.Chart(options);
											 }
									 },
									 error: function () {
											 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									 }
							 });
		 } else if ($(this).val() === "country_mf") {
			 $.ajax({
									 url: '/country_mutualfunds',
									 type: "GET",
									 beforeSend: function () {
											 $('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
									 },
									 success: function (response) {
											 console.log(JSON.parse(response));
											 if (response === null || response === undefined) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											 } else if (response.length === 0) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											 } else {
													 var _load = JSON.parse(response).data.map(obj => obj);
													 this.point = [];
													 for (var key in _load) {
															 if (_load.hasOwnProperty(key)) {
																	 var _obj = {};
																	 _obj.country = _load[key].country;
																	 _obj.y = parseInt(_load[key].number);
																	 this.point.push(_obj);
															 }
													 }
													 var tx = [];
													 var bx = {
															 type: "pie",
															 name: "Mutual Funds Userbase By Countries",
															 colorByPoint: true,
															 data: this.point
													 };
													 tx.push(bx);
													 var options = {
															 chart: {
																	 renderTo: 'piechart_div',
																	 plotBackgroundColor: null,
																	 plotBorderWidth: null,
																	 plotShadow: false
															 },
															 title: {
																	 text: 'Mutual Funds Userbase By Countries'
															 },
															 tooltip: {
																	 formatter: function () {
																			 //return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			 return '<b>' + this.point.country + '</b> ' + this.point.y;
																	 }
															 },
															 plotOptions: {
																	 pie: {
																			 allowPointSelect: true,
																			 cursor: 'pointer',
																			 dataLabels: {
																					 enabled: true,
																					 color: '#000000',
																					 connectorColor: '#000000',
																					 formatter: function () {
																							 //return '<b>' + this.point.state + '</b> ' + this.point.y;
																							 return '<b>' + (this.point.country==null?'No State Specified':this.point.country) + '</b> --- ' + this.point.y;
																					 }
																			 },
																			 showInLegend: false
																	 }
															 },
															 series: []
													 };
													 options.series = tx;
													 chart = new Highcharts.Chart(options);
											 }
									 },
									 error: function () {
											 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									 }
							 });
		 } else if ($(this).val() === "lga_mf") {
			 $.ajax({
									 url: '/lga_mutualfunds',
									 type: "GET",
									 beforeSend: function () {
											 $('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
									 },
									 success: function (response) {
											 console.log(JSON.parse(response));
											 if (response === null || response === undefined) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											 } else if (response.length === 0) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											 } else {
													 var _load = JSON.parse(response).data.map(obj => obj);
													 this.point = [];
													 for (var key in _load) {
															 if (_load.hasOwnProperty(key)) {
																	 var _obj = {};
																	 _obj.lga = _load[key].lga;
																	 _obj.y = parseInt(_load[key].number);
																	 this.point.push(_obj);
															 }
													 }
													 var tx = [];
													 var bx = {
															 type: "pie",
															 name: "Mutual Funds Userbase By LGAs",
															 colorByPoint: true,
															 data: this.point
													 };
													 tx.push(bx);
													 var options = {
															 chart: {
																	 renderTo: 'piechart_div',
																	 plotBackgroundColor: null,
																	 plotBorderWidth: null,
																	 plotShadow: false
															 },
															 title: {
																	 text: 'Mutual Funds Userbase By LGAs'
															 },
															 tooltip: {
																	 formatter: function () {
																			 //return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			 return '<b>' + this.point.lga + '</b> ' + this.point.y;
																	 }
															 },
															 plotOptions: {
																	 pie: {
																			 allowPointSelect: true,
																			 cursor: 'pointer',
																			 dataLabels: {
																					 enabled: true,
																					 color: '#000000',
																					 connectorColor: '#000000',
																					 formatter: function () {
																							 //return '<b>' + this.point.state + '</b> ' + this.point.y;
																							 return '<b>' + (this.point.lga==null?'No State Specified':this.point.lga) + '</b> --- ' + this.point.y;
																					 }
																			 },
																			 showInLegend: false
																	 }
															 },
															 series: []
													 };
													 options.series = tx;
													 chart = new Highcharts.Chart(options);
											 }
									 },
									 error: function () {
											 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									 }
							 });
		 } else if ($(this).val() === "principal_mf") {
			 $.ajax({
									 url: '/principal_mutualfunds',
									 type: "GET",
									 beforeSend: function () {
											 $('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
									 },
									 success: function (response) {
											 console.log(JSON.parse(response));
											 if (response === null || response === undefined) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											 } else if (response.length === 0) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											 } else {
													 var _load = JSON.parse(response).data.map(obj => obj);
													 this.point = [];
													 for (var key in _load) {
															 if (_load.hasOwnProperty(key)) {
																	 var _obj = {};
																	 _obj.principal = _load[key].principal;
																	 _obj.y = parseInt(_load[key].number);
																	 this.point.push(_obj);
															 }
													 }
													 var tx = [];
													 var bx = {
															 type: "pie",
															 name: "Mutual Funds Userbase By Principal Amounts Held",
															 colorByPoint: true,
															 data: this.point
													 };
													 tx.push(bx);
													 var options = {
															 chart: {
																	 renderTo: 'piechart_div',
																	 plotBackgroundColor: null,
																	 plotBorderWidth: null,
																	 plotShadow: false
															 },
															 title: {
																	 text: 'Mutual Funds Userbase By Principal Amounts Held'
															 },
															 tooltip: {
																	 formatter: function () {
																			 //return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			 return '<b>' + this.point.principal + '</b> ' + this.point.y;
																	 }
															 },
															 plotOptions: {
																	 pie: {
																			 allowPointSelect: true,
																			 cursor: 'pointer',
																			 dataLabels: {
																					 enabled: true,
																					 color: '#000000',
																					 connectorColor: '#000000',
																					 formatter: function () {
																							 //return '<b>' + this.point.state + '</b> ' + this.point.y;
																							 return '<b>' + (this.point.principal==null?'No Pricipal Held':this.point.principal) + '</b> --- ' + this.point.y;
																					 }
																			 },
																			 showInLegend: false
																	 }
															 },
															 series: []
													 };
													 options.series = tx;
													 chart = new Highcharts.Chart(options);
											 }
									 },
									 error: function () {
											 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									 }
							 });
		 } else if ($(this).val() === "units_mf") {
			 $.ajax({
									 url: '/units_mutualfunds',
									 type: "GET",
									 beforeSend: function () {
											 $('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
									 },
									 success: function (response) {
											 console.log(JSON.parse(response));
											 if (response === null || response === undefined) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											 } else if (response.length === 0) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											 } else {
													 var _load = JSON.parse(response).data.map(obj => obj);
													 this.point = [];
													 for (var key in _load) {
															 if (_load.hasOwnProperty(key)) {
																	 var _obj = {};
																	 _obj.units = _load[key].units;
																	 _obj.y = parseInt(_load[key].number);
																	 this.point.push(_obj);
															 }
													 }
													 var tx = [];
													 var bx = {
															 type: "pie",
															 name: "Mutual Funds Userbase By Units Held",
															 colorByPoint: true,
															 data: this.point
													 };
													 tx.push(bx);
													 var options = {
															 chart: {
																	 renderTo: 'piechart_div',
																	 plotBackgroundColor: null,
																	 plotBorderWidth: null,
																	 plotShadow: false
															 },
															 title: {
																	 text: 'Mutual Funds Userbase By Units Held'
															 },
															 tooltip: {
																	 formatter: function () {
																			 //return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			 return '<b>' + this.point.units + '</b> ' + this.point.y;
																	 }
															 },
															 plotOptions: {
																	 pie: {
																			 allowPointSelect: true,
																			 cursor: 'pointer',
																			 dataLabels: {
																					 enabled: true,
																					 color: '#000000',
																					 connectorColor: '#000000',
																					 formatter: function () {
																							 //return '<b>' + this.point.state + '</b> ' + this.point.y;
																							 return '<b>' + (this.point.units==null?'No Units Held':this.point.units) + '</b> --- ' + this.point.y;
																					 }
																			 },
																			 showInLegend: false
																	 }
															 },
															 series: []
													 };
													 options.series = tx;
													 chart = new Highcharts.Chart(options);
											 }
									 },
									 error: function () {
											 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									 }
							 });
		 } else if ($(this).val() === "email_mf") {
			 $.ajax({
									 url: '/units_mutualfunds',
									 type: "GET",
									 beforeSend: function () {
											 $('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
									 },
									 success: function (response) {
											 console.log(JSON.parse(response));
											 if (response === null || response === undefined) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											 } else if (response.length === 0) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											 } else {
													 var _load = JSON.parse(response).data.map(obj => obj);
													 this.point = [];
													 for (var key in _load) {
															 if (_load.hasOwnProperty(key)) {
																	 var _obj = {};
																	 _obj.email = _load[key].email;
																	 _obj.y = parseInt(_load[key].number);
																	 this.point.push(_obj);
															 }
													 }
													 var tx = [];
													 var bx = {
															 type: "pie",
															 name: "Mutual Funds Userbase Emails",
															 colorByPoint: true,
															 data: this.point
													 };
													 tx.push(bx);
													 var options = {
															 chart: {
																	 renderTo: 'piechart_div',
																	 plotBackgroundColor: null,
																	 plotBorderWidth: null,
																	 plotShadow: false
															 },
															 title: {
																	 text: 'Mutual Funds Userbase Emails'
															 },
															 tooltip: {
																	 formatter: function () {
																			 //return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			 return '<b>' + this.point.email + '</b> ' + this.point.y;
																	 }
															 },
															 plotOptions: {
																	 pie: {
																			 allowPointSelect: true,
																			 cursor: 'pointer',
																			 dataLabels: {
																					 enabled: true,
																					 color: '#000000',
																					 connectorColor: '#000000',
																					 formatter: function () {
																							 return '<b>' + this.point.email + '</b> ' + this.point.y;
																							 //return '<b>' + (this.point.email==null?'No Email':this.point.email) + '</b> --- ' + this.point.y;
																					 }
																			 },
																			 showInLegend: false
																	 }
															 },
															 series: []
													 };
													 options.series = tx;
													 chart = new Highcharts.Chart(options);
											 }
									 },
									 error: function () {
											 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									 }
							 });
		 }
	 });
	 $("#frontofficeselect").on('change', function() {
		 if($(this).val() === "timein_fr") {
			 $.ajax({
									 url: '/timein_fr',
									 type: "GET",
									 beforeSend: function () {
											 $('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
									 },
									 success: function (response) {
											 console.log(JSON.parse(response));
											 if (response === null || response === undefined) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											 } else if (response.length === 0) {
													 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											 } else {
													 var _load = JSON.parse(response).data.map(obj => obj);
													 this.point = [];
													 for (var key in _load) {
															 if (_load.hasOwnProperty(key)) {
																	 var _obj = {};
																	 _obj.state = _load[key].state;
																	 _obj.y = parseInt(_load[key].number);
																	 this.point.push(_obj);
															 }
													 }
													 var tx = [];
													 var bx = {
															 type: "pie",
															 name: "Customers Walk In Time",
															 colorByPoint: true,
															 data: this.point
													 };
													 tx.push(bx);
													 var options = {
															 chart: {
																	 renderTo: 'piechart_div',
																	 plotBackgroundColor: null,
																	 plotBorderWidth: null,
																	 plotShadow: false
															 },
															 title: {
																	 text: 'Customers Walk In Time'
															 },
															 tooltip: {
																	 formatter: function () {
																			 //return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			 return '<b>Walk In Time Range --- ' + this.point.state + ' ---</b> ' + this.point.y;
																	 }
															 },
															 plotOptions: {
																	 pie: {
																			 allowPointSelect: true,
																			 cursor: 'pointer',
																			 dataLabels: {
																					 enabled: true,
																					 color: '#000000',
																					 connectorColor: '#000000',
																					 formatter: function () {
																							 return '<b>Walk In Time Range --- ' + this.point.state + ' --- </b> ' + this.point.y;
																							 //return '<b>' + (this.point.state==null?'No State Specified':this.point.state) + '</b> --- ' + this.point.y;
																					 }
																			 },
																			 showInLegend: false
																	 }
															 },
															 series: []
													 };
													 options.series = tx;
													 chart = new Highcharts.Chart(options);
											 }
									 },
									 error: function () {
											 $("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									 }
							 });
		 } else if ($(this).val() === "timeout_fr") {
			 $.ajax({
									url: '/timeout_fr',
									type: "GET",
									beforeSend: function () {
											$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
									},
									success: function (response) {
											console.log(JSON.parse(response));
											if (response === null || response === undefined) {
													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											} else if (response.length === 0) {
													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											} else {
													var _load = JSON.parse(response).data.map(obj => obj);
													this.point = [];
													for (var key in _load) {
															if (_load.hasOwnProperty(key)) {
																	var _obj = {};
																	_obj.state = _load[key].state;
																	_obj.y = parseInt(_load[key].number);
																	this.point.push(_obj);
															}
													}
													var tx = [];
													var bx = {
															type: "pie",
															name: "Customers Walk Out Time",
															colorByPoint: true,
															data: this.point
													};
													tx.push(bx);
													var options = {
															chart: {
																	renderTo: 'piechart_div',
																	plotBackgroundColor: null,
																	plotBorderWidth: null,
																	plotShadow: false
															},
															title: {
																	text: 'Customers Walk Out Time'
															},
															tooltip: {
																	formatter: function () {
																			//return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			return '<b>Walk Out Time Range --- ' + this.point.state + ' ---</b> ' + this.point.y;
																	}
															},
															plotOptions: {
																	pie: {
																			allowPointSelect: true,
																			cursor: 'pointer',
																			dataLabels: {
																					enabled: true,
																					color: '#000000',
																					connectorColor: '#000000',
																					formatter: function () {
																							return '<b>Walk Out Time Range --- ' + this.point.state + ' --- </b> ' + this.point.y;
																							//return '<b>' + (this.point.state==null?'No State Specified':this.point.state) + '</b> --- ' + this.point.y;
																					}
																			},
																			showInLegend: false
																	}
															},
															series: []
													};
													options.series = tx;
													chart = new Highcharts.Chart(options);
											}
									},
									error: function () {
											$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									}
							});
		 } else if ($(this).val() === "purpose_fr") {
			 $.ajax({
									url: '/purpose_fr',
									type: "GET",
									beforeSend: function () {
											$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
									},
									success: function (response) {
											console.log(JSON.parse(response));
											if (response === null || response === undefined) {
													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											} else if (response.length === 0) {
													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											} else {
													var _load = JSON.parse(response).data.map(obj => obj);
													this.point = [];
													for (var key in _load) {
															if (_load.hasOwnProperty(key)) {
																	var _obj = {};
																	_obj.state = _load[key].state;
																	_obj.y = parseInt(_load[key].number);
																	this.point.push(_obj);
															}
													}
													var tx = [];
													var bx = {
															type: "pie",
															name: "Purpose of Visit",
															colorByPoint: true,
															data: this.point
													};
													tx.push(bx);
													var options = {
															chart: {
																	renderTo: 'piechart_div',
																	plotBackgroundColor: null,
																	plotBorderWidth: null,
																	plotShadow: false
															},
															title: {
																	text: 'Purpose of Visit'
															},
															tooltip: {
																	formatter: function () {
																			//return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			return '<b>' + this.point.state + '</b> ' + this.point.y;
																	}
															},
															plotOptions: {
																	pie: {
																			allowPointSelect: true,
																			cursor: 'pointer',
																			dataLabels: {
																					enabled: true,
																					color: '#000000',
																					connectorColor: '#000000',
																					formatter: function () {
																							return '<b>' + this.point.state + '</b> ' + this.point.y;
																							//return '<b>' + (this.point.state==null?'No State Specified':this.point.state) + '</b> --- ' + this.point.y;
																					}
																			},
																			showInLegend: false
																	}
															},
															series: []
													};
													options.series = tx;
													chart = new Highcharts.Chart(options);
											}
									},
									error: function () {
											$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									}
							});
		 } else if ($(this).val() === "timespentinoffice_fr") {
			 $.ajax({
									url: '/timespentinoffice_fr',
									type: "GET",
									beforeSend: function () {
											$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
									},
									success: function (response) {
											console.log(JSON.parse(response));
											if (response === null || response === undefined) {
													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											} else if (response.length === 0) {
													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											} else {
													var _load = JSON.parse(response).data.map(obj => obj);
													this.point = [];
													for (var key in _load) {
															if (_load.hasOwnProperty(key)) {
																	var _obj = {};
																	_obj.state = _load[key].state;
																	_obj.y = parseInt(_load[key].number);
																	this.point.push(_obj);
															}
													}
													var tx = [];
													var bx = {
															type: "pie",
															name: "Customer Duration",
															colorByPoint: true,
															data: this.point
													};
													tx.push(bx);
													var options = {
															chart: {
																	renderTo: 'piechart_div',
																	plotBackgroundColor: null,
																	plotBorderWidth: null,
																	plotShadow: false
															},
															title: {
																	text: 'Customer Duration'
															},
															tooltip: {
																	formatter: function () {
																			//return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			return '<b>' + this.point.state + '</b> ' + this.point.y;
																	}
															},
															plotOptions: {
																	pie: {
																			allowPointSelect: true,
																			cursor: 'pointer',
																			dataLabels: {
																					enabled: true,
																					color: '#000000',
																					connectorColor: '#000000',
																					formatter: function () {
																							return '<b>' + this.point.y + ' customers spent</b> ' + this.point.state + ' minutes';
																							//return '<b>' + (this.point.state==null?'No State Specified':this.point.state) + '</b> --- ' + this.point.y;
																					}
																			},
																			showInLegend: false
																	}
															},
															series: []
													};
													options.series = tx;
													chart = new Highcharts.Chart(options);
											}
									},
									error: function () {
											$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									}
							});
		 } else if ($(this).val() === "timespentinqueue_fr") {
			 $.ajax({
									url: '/timespentinqueue_fr',
									type: "GET",
									beforeSend: function () {
											$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
									},
									success: function (response) {
											console.log(JSON.parse(response));
											if (response === null || response === undefined) {
													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											} else if (response.length === 0) {
													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											} else {
													var _load = JSON.parse(response).data.map(obj => obj);
													this.point = [];
													for (var key in _load) {
															if (_load.hasOwnProperty(key)) {
																	var _obj = {};
																	_obj.state = _load[key].state;
																	_obj.y = parseInt(_load[key].number);
																	this.point.push(_obj);
															}
													}
													var tx = [];
													var bx = {
															type: "pie",
															name: "Time spent in waiting",
															colorByPoint: true,
															data: this.point
													};
													tx.push(bx);
													var options = {
															chart: {
																	renderTo: 'piechart_div',
																	plotBackgroundColor: null,
																	plotBorderWidth: null,
																	plotShadow: false
															},
															title: {
																	text: 'Time spent in waiting'
															},
															tooltip: {
																	formatter: function () {
																			//return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			return '<b>' + this.point.state + '</b> ' + this.point.y;
																	}
															},
															plotOptions: {
																	pie: {
																			allowPointSelect: true,
																			cursor: 'pointer',
																			dataLabels: {
																					enabled: true,
																					color: '#000000',
																					connectorColor: '#000000',
																					formatter: function () {
																							return '<b>' + this.point.y + ' customers spent</b> ' + this.point.state + ' minutes waiting';
																							//return '<b>' + (this.point.state==null?'No State Specified':this.point.state) + '</b> --- ' + this.point.y;
																					}
																			},
																			showInLegend: false
																	}
															},
															series: []
													};
													options.series = tx;
													chart = new Highcharts.Chart(options);
											}
									},
									error: function () {
											$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									}
							});
		 }else if ($(this).val() === "frontofficers_fr") {
			 $.ajax({
									url: '/frontofficers_fr',
									type: "GET",
									beforeSend: function () {
											$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
									},
									success: function (response) {
											console.log(JSON.parse(response));
											if (response === null || response === undefined) {
													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											} else if (response.length === 0) {
													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
											} else {
													var _load = JSON.parse(response).data.map(obj => obj);
													this.point = [];
													for (var key in _load) {
															if (_load.hasOwnProperty(key)) {
																	var _obj = {};
																	_obj.state = _load[key].state;
																	_obj.y = parseInt(_load[key].number);
																	this.point.push(_obj);
															}
													}
													var tx = [];
													var bx = {
															type: "bar",
															name: "Staff Performance and Turn Around Time",
															colorByPoint: true,
															data: this.point
													};
													tx.push(bx);
													var options = {
															chart: {
																	renderTo: 'piechart_div',
																	plotBackgroundColor: null,
																	plotBorderWidth: null,
																	plotShadow: false
															},
															title: {
																	text: 'Staff Performance and Turn Around Time'
															},
															tooltip: {
																	formatter: function () {
																			//return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																			return '<b>' + this.point.state + '</b> ' + this.point.y;
																	}
															},
															plotOptions: {
																	bar: {
																			allowPointSelect: true,
																			cursor: 'pointer',
																			dataLabels: {
																					enabled: true,
																					color: '#000000',
																					connectorColor: '#000000',
																					formatter: function () {
																							return '<b>' + this.point.y + ' customers were attended to by </b><i style="color:f60437">' + this.point.state + '</i>';
																							//return '<b>' + (this.point.state==null?'No State Specified':this.point.state) + '</b> --- ' + this.point.y;
																					}
																			},
																			showInLegend: false
																	}
															},
															series: []
													};
													options.series = tx;
													chart = new Highcharts.Chart(options);
											}
									},
									error: function () {
											$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
									}
							});
		 }
	 });
	 $("#greenpoleselect").on('change', function() {
		 if($(this).val() === "stateoforigin_gp") {
			 $.ajax({
										url: '/states_greenpole',
										type: "GET",
										beforeSend: function () {
												$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
										},
										success: function (response) {
												console.log(JSON.parse(response));
												if (response === null || response === undefined) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
												} else if (response.length === 0) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
												} else {
														var _load = JSON.parse(response).data.map(obj => obj);
														this.point = [];
														for (var key in _load) {
																if (_load.hasOwnProperty(key)) {
																		var _obj = {};
																		_obj.state = _load[key].state;
																		_obj.y = parseInt(_load[key].number);
																		this.point.push(_obj);
																}
														}
														var tx = [];
														var bx = {
																type: "pie",
																name: "GreenPole Userbase By States",
																colorByPoint: true,
																data: this.point
														};
														tx.push(bx);
														var options = {
																chart: {
																		renderTo: 'piechart_div',
																		plotBackgroundColor: null,
																		plotBorderWidth: null,
																		plotShadow: false
																},
																title: {
																		text: 'GreenPole Userbase By States'
																},
																tooltip: {
																		formatter: function () {
																				//return '<b>' + (this.point.state==null?'Empty':this.point.state) + '</b> --- ' + this.point.y;
																				return '<b>' + this.point.state + '</b> ' + this.point.y;
																		}
																},
																plotOptions: {
																		pie: {
																				allowPointSelect: true,
																				cursor: 'pointer',
																				dataLabels: {
																						enabled: true,
																						color: '#000000',
																						connectorColor: '#000000',
																						formatter: function () {
																								//return '<b>' + this.point.state + '</b> ' + this.point.y;
																								return '<b>' + (this.point.state==null?'No State Specified':this.point.state) + '</b> --- ' + this.point.y;
																						}
																				},
																				showInLegend: false
																		}
																},
																series: []
														};
														options.series = tx;
														chart = new Highcharts.Chart(options);
												}
										},
										error: function () {
												$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
										}
								});
		 } else if ($(this).val() === "gp_occupation") {
			 $.ajax({
										url: '/occupation_greenpole',
										type: "GET",
										beforeSend: function () {
												$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
										},
										success: function (response) {
												console.log(JSON.parse(response));
												if (response === null || response === undefined) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
												} else if (response.length === 0) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
												} else {
														var _load = JSON.parse(response).data.map(obj => obj);
														this.point = [];
														for (var key in _load) {
																if (_load.hasOwnProperty(key)) {
																		var _obj = {};
																		if(_load[key].status !== null) {
																			_obj.status = _load[key].status;
																			_obj.y = parseInt(_load[key].number);
																			this.point.push(_obj);
																		}
																}
														}
														var tx = [];
														var bx = {
																type: "pie",
																name: "GreenPole Userbase By Occupation",
																colorByPoint: true,
																data: this.point
														};
														tx.push(bx);
														var options = {
																chart: {
																		renderTo: 'piechart_div',
																		plotBackgroundColor: null,
																		plotBorderWidth: null,
																		plotShadow: false
																},
																title: {
																		text: 'GreenPole Userbase By Occupation'
																},
																tooltip: {
																		formatter: function () {
																				//return '<b>Between ' + (this.point.agegroup==null||this.point.agegroup==''?'No Gender Specified':this.point.agegroup) + '</b> --- ' + this.point.y;
																				return '<b>' + this.point.status + '</b> ' + this.point.y;
																		}
																},
																plotOptions: {
																		pie: {
																				allowPointSelect: true,
																				cursor: 'pointer',
																				dataLabels: {
																						enabled: true,
																						color: '#000000',
																						connectorColor: '#000000',
																						formatter: function () {
																								return '<b>' + this.point.status + '</b> ' + this.point.y;
																								//return '<b>Between ' + (this.point.agegroup==null||this.point.agegroup==''?'No DOB Specified':this.point.agegroup) + '</b> --- ' + this.point.y;
																						}
																				},
																				showInLegend: false
																		}
																},
																series: []
														};
														options.series = tx;
														chart = new Highcharts.Chart(options);
												}
										},
										error: function () {
												$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
										}
								});
		 } else if ($(this).val() === "agebrackets_gp") {
			 $.ajax({
										url: '/agebracket_greenpole',
										type: "GET",
										beforeSend: function () {
												$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
										},
										success: function (response) {
												console.log(JSON.parse(response));
												if (response === null || response === undefined) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
												} else if (response.length === 0) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
												} else {
														var _load = JSON.parse(response).data.map(obj => obj);
														this.point = [];
														for (var key in _load) {
																if (_load.hasOwnProperty(key)) {
																		var _obj = {};
																		if(_load[key].agegroup !== null) {
																			_obj.agegroup = _load[key].agegroup;
																			_obj.y = parseInt(_load[key].number);
																			this.point.push(_obj);
																		}
																}
														}
														var tx = [];
														var bx = {
																type: "pie",
																name: "GreenPole Userbase By Age Groups",
																colorByPoint: true,
																data: this.point
														};
														tx.push(bx);
														var options = {
																chart: {
																		renderTo: 'piechart_div',
																		plotBackgroundColor: null,
																		plotBorderWidth: null,
																		plotShadow: false
																},
																title: {
																		text: 'GreenPole Userbase By Age Group'
																},
																tooltip: {
																		formatter: function () {
																				return '<b>Between ' + (this.point.agegroup==null||this.point.agegroup==''?'No Gender Specified':this.point.agegroup) + '</b> --- ' + this.point.y;
																				//return '<b>' + this.point.agegroup + '</b> ' + this.point.y;
																		}
																},
																plotOptions: {
																		pie: {
																				allowPointSelect: true,
																				cursor: 'pointer',
																				dataLabels: {
																						enabled: true,
																						color: '#000000',
																						connectorColor: '#000000',
																						formatter: function () {
																								//return '<b>' + this.point.agegroup + '</b> ' + this.point.y;
																								return '<b>Between ' + (this.point.agegroup==null||this.point.agegroup==''?'No DOB Specified':this.point.agegroup) + '</b> --- ' + this.point.y;
																						}
																				},
																				showInLegend: false
																		}
																},
																series: []
														};
														options.series = tx;
														chart = new Highcharts.Chart(options);
												}
										},
										error: function () {
												$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
										}
								});
		 } else if ($(this).val() === "lga_gp") {
			 $.ajax({
										url: '/lga_greenpole',
										type: "GET",
										beforeSend: function () {
												$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
										},
										success: function (response) {
												console.log(JSON.parse(response));
												if (response === null || response === undefined) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
												} else if (response.length === 0) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
												} else {
														var _load = JSON.parse(response).data.map(obj => obj);
														this.point = [];
														for (var key in _load) {
																if (_load.hasOwnProperty(key)) {
																		var _obj = {};
																		_obj.lga = _load[key].lga;
																		_obj.y = parseInt(_load[key].number);
																		this.point.push(_obj);
																}
														}
														var tx = [];
														var bx = {
																type: "pie",
																name: "GreenPole Userbase By Local Government Area",
																colorByPoint: true,
																data: this.point
														};
														tx.push(bx);
														var options = {
																chart: {
																		renderTo: 'piechart_div',
																		plotBackgroundColor: null,
																		plotBorderWidth: null,
																		plotShadow: false
																},
																title: {
																		text: 'GreenPole Userbase By Local Government Areas'
																},
																tooltip: {
																		formatter: function () {
																				//return '<b>' + (this.point.gender==null||this.point.gender==''?'No Gender Specified':this.point.state) + '</b> --- ' + this.point.y;
																				return '<b>' + this.point.lga + '</b> ' + this.point.y;
																		}
																},
																plotOptions: {
																		pie: {
																				allowPointSelect: true,
																				cursor: 'pointer',
																				dataLabels: {
																						enabled: true,
																						color: '#000000',
																						connectorColor: '#000000',
																						formatter: function () {
																								return '<b>' + this.point.lga + '</b> ' + this.point.y;
																								//return '<b>' + (this.point.lga==null||this.point.lga==''?'No Gender Specified':this.point.gender) + '</b> --- ' + this.point.y;
																						}
																				},
																				showInLegend: false
																		}
																},
																series: []
														};
														options.series = tx;
														chart = new Highcharts.Chart(options);
												}
										},
										error: function () {
												$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
										}
								});
		 } else if ($(this).val() === "maritalstatus_gp") {
			 $.ajax({
										url: '/marital_greenpole',
										type: "GET",
										beforeSend: function () {
												$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
										},
										success: function (response) {
												console.log(JSON.parse(response));
												if (response === null || response === undefined) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
												} else if (response.length === 0) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
												} else {
														var _load = JSON.parse(response).data.map(obj => obj);
														this.point = [];
														for (var key in _load) {
																if (_load.hasOwnProperty(key)) {
																		var _obj = {};
																		_obj.status = _load[key].status;
																		_obj.y = parseInt(_load[key].number);
																		this.point.push(_obj);
																}
														}
														var tx = [];
														var bx = {
																type: "pie",
																name: "GreenPole Userbase By Gender",
																colorByPoint: true,
																data: this.point
														};
														tx.push(bx);
														var options = {
																chart: {
																		renderTo: 'piechart_div',
																		plotBackgroundColor: null,
																		plotBorderWidth: null,
																		plotShadow: false
																},
																title: {
																		text: 'GreenPole Userbase By Gender'
																},
																tooltip: {
																		formatter: function () {
																				//return '<b>' + (this.point.gender==null||this.point.gender==''?'No Gender Specified':this.point.state) + '</b> --- ' + this.point.y;
																				return '<b>' + this.point.status + '</b> ' + this.point.y;
																		}
																},
																plotOptions: {
																		pie: {
																				allowPointSelect: true,
																				cursor: 'pointer',
																				dataLabels: {
																						enabled: true,
																						color: '#000000',
																						connectorColor: '#000000',
																						formatter: function () {
																								//return '<b>' + this.point.state + '</b> ' + this.point.y;
																								return '<b>' + (this.point.status==null||this.point.status==''?'No Gender Specified':this.point.status) + '</b> --- ' + this.point.y;
																						}
																				},
																				showInLegend: false
																		}
																},
																series: []
														};
														options.series = tx;
														chart = new Highcharts.Chart(options);
												}
										},
										error: function () {
												$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
										}
								});
		 } else if ($(this).val() === "gender_gp") {
			 $.ajax({
										url: '/gender_greenpole',
										type: "GET",
										beforeSend: function () {
												$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
										},
										success: function (response) {
												console.log(JSON.parse(response));
												if (response === null || response === undefined) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
												} else if (response.length === 0) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
												} else {
														var _load = JSON.parse(response).data.map(obj => obj);
														this.point = [];
														for (var key in _load) {
																if (_load.hasOwnProperty(key)) {
																		var _obj = {};
																		_obj.gender = _load[key].gender;
																		_obj.y = parseInt(_load[key].number);
																		this.point.push(_obj);
																}
														}
														var tx = [];
														var bx = {
																type: "pie",
																name: "GreenPole Userbase By Gender",
																colorByPoint: true,
																data: this.point
														};
														tx.push(bx);
														var options = {
																chart: {
																		renderTo: 'piechart_div',
																		plotBackgroundColor: null,
																		plotBorderWidth: null,
																		plotShadow: false
																},
																title: {
																		text: 'GreenPole Userbase By Gender'
																},
																tooltip: {
																		formatter: function () {
																				//return '<b>' + (this.point.gender==null||this.point.gender==''?'No Gender Specified':this.point.state) + '</b> --- ' + this.point.y;
																				return '<b>' + this.point.gender + '</b> ' + this.point.y;
																		}
																},
																plotOptions: {
																		pie: {
																				allowPointSelect: true,
																				cursor: 'pointer',
																				dataLabels: {
																						enabled: true,
																						color: '#000000',
																						connectorColor: '#000000',
																						formatter: function () {
																								//return '<b>' + this.point.state + '</b> ' + this.point.y;
																								return '<b>' + (this.point.gender==null||this.point.gender==''?'No Gender Specified':this.point.gender) + '</b> --- ' + this.point.y;
																						}
																				},
																				showInLegend: false
																		}
																},
																series: []
														};
														options.series = tx;
														chart = new Highcharts.Chart(options);
												}
										},
										error: function () {
												$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
										}
								});
		 } else if ($(this).val() === "email_gp") {
			 $.ajax({
										url: '/email_greenpole',
										type: "GET",
										beforeSend: function () {
												$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
										},
										success: function (response) {
												console.log(JSON.parse(response));
												if (response === null || response === undefined) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
												} else if (response.length === 0) {
														$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
												} else {
														var _load = JSON.parse(response).data.map(obj => obj);
														this.point = [];
														for (var key in _load) {
																if (_load.hasOwnProperty(key)) {
																		var _obj = {};
																		_obj.name = _load[key].name;
																		_obj.y = parseInt(_load[key].number);
																		this.point.push(_obj);
																}
														}
														var tx = [];
														var bx = {
																type: "pie",
																name: "GreenPole Userbase By Valid Email Addresses",
																colorByPoint: true,
																data: this.point
														};
														tx.push(bx);
														var options = {
																chart: {
																		renderTo: 'piechart_div',
																		plotBackgroundColor: null,
																		plotBorderWidth: null,
																		plotShadow: false
																},
																title: {
																		text: 'GreenPole Userbase By Valid Email Addresses'
																},
																tooltip: {
																		formatter: function () {
																				return '<b>' + (this.point.name=='hasEmail'?'Number with Email Addresses':'Number without Email Addresses') + '</b> --- ' + this.point.y;
																				//return '<b>' + this.point.name + '</b> ' + this.point.y;
																		}
																},
																plotOptions: {
																		pie: {
																				allowPointSelect: true,
																				cursor: 'pointer',
																				dataLabels: {
																						enabled: true,
																						color: '#000000',
																						connectorColor: '#000000',
																						formatter: function () {
																								//return '<b>' + this.point.name + '</b> ' + this.point.y;
																								return '<b>' + (this.point.name=='hasEmail'?'Number with Email Addresses':'Number without Email Addresses') + '</b> --- ' + this.point.y;
																								//return '<b>' + (this.point.number==null||this.point.number==''?'No Gender Specified':this.point.number) + '</b> --- ' + this.point.y;
																						}
																				},
																				showInLegend: false
																		}
																},
																series: []
														};
														options.series = tx;
														chart = new Highcharts.Chart(options);
												}
										},
										error: function () {
												$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
										}
								});
		 }
	 });
	 // EasyCoop Select
	 $("#easycoopselect").on('change', function() {
		 console.log($(this).val());
		 if($(this).val() !== "none") {
			 if($(this).val() === "religion") {
				 $.ajax({
											url: '/religion',
											type: "GET",
											beforeSend: function () {
													$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
											},
											success: function (response) {
													console.log(JSON.parse(response));
													if (response === null || response === undefined) {
															$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
													} else if (response.length === 0) {
															$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
													} else {
															var _load = JSON.parse(response).data.map(obj => obj);
															this.point = [];
															for (var key in _load) {
																	if (_load.hasOwnProperty(key)) {
																			var _obj = {};
																			console.log(_load[key].name);
																			_obj.name = _load[key].name;
																			_obj.y = parseInt(_load[key].number);
																			this.point.push(_obj);
																	}
															}
															var tx = [];
															var bx = {
																	type: "pie",
																	name: "Faith Based",
																	colorByPoint: true,
																	data: this.point
															};
															tx.push(bx);
															var options = {
																	chart: {
																			renderTo: 'piechart_div',
																			plotBackgroundColor: null,
																			plotBorderWidth: null,
																			plotShadow: false
																	},
																	title: {
																			text: 'Number of Members based on Faith'
																	},
																	tooltip: {
																			formatter: function () {
																					return '<b>' + this.point.name + '</b> ' + this.point.y;
																			}
																	},
																	plotOptions: {
																			pie: {
																					allowPointSelect: true,
																					cursor: 'pointer',
																					dataLabels: {
																							enabled: true,
																							color: '#000000',
																							connectorColor: '#000000',
																							formatter: function () {
																									return '<b>' + this.point.name + '</b> ' + this.point.y;
																							}
																					},
																					showInLegend: true
																			}
																	},
																	series: []
															};
															options.series = tx;
															chart = new Highcharts.Chart(options);
													}
											},
											error: function () {
													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											}
									});
			 } else if ($(this).val() === "age") {
				 // Age
				 $.ajax({
											url: '/agebrackets',
											type: "GET",
											beforeSend: function () {
													$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
											},
											success: function (response) {
													console.log(JSON.parse(response));
													if (response === null || response === undefined) {
															$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
													} else if (response.length === 0) {
															$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
													} else {
															var _load = JSON.parse(response).data.map(obj => obj);
															this.point = [];
															for (var key in _load) {
																	if (_load.hasOwnProperty(key)) {
																			var _obj = {};
																			//if(_load[key].age < 90) {}
																			_obj.age = _load[key].age;
																			_obj.y = parseInt(_load[key].number);
																			this.point.push(_obj);
																	}
															}
															var tx = [];
															var bx = {
																	type: "pie",
																	name: "Age Brackets",
																	colorByPoint: true,
																	data: this.point
															};
															tx.push(bx);
															var options = {
																	chart: {
																			renderTo: 'piechart_div',
																			plotBackgroundColor: null,
																			plotBorderWidth: null,
																			plotShadow: false
																	},
																	title: {
																			text: 'Easy Coop Members Age Brackets'
																	},
																	tooltip: {
																			formatter: function () {
																					return this.point.y + ' people are ' + this.point.age + ' years old ';
																			}
																	},
																	plotOptions: {
																			pie: {
																					allowPointSelect: true,
																					cursor: 'pointer',
																					dataLabels: {
																							enabled: true,
																							color: '#000000',
																							connectorColor: '#000000',
																							formatter: function () {
																									//return '<b>' + this.point.age + '</b> ' + this.point.y;
																									return this.point.y + ' people are ' + this.point.age + ' years old ';
																							}
																					},
																					showInLegend: false
																			}
																	},
																	series: []
															};
															options.series = tx;
															chart = new Highcharts.Chart(options);
													}
											},
											error: function () {
													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
											}
									});
			 				} else if ($(this).val() === "gender") {
									// gender
									$.ajax({
				 											url: '/gender',
				 											type: "GET",
				 											beforeSend: function () {
				 													$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
				 											},
				 											success: function (response) {
				 													console.log(JSON.parse(response));
				 													if (response === null || response === undefined) {
				 															$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
				 													} else if (response.length === 0) {
				 															$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
				 													} else {
				 															var _load = JSON.parse(response).data.map(obj => obj);
				 															this.point = [];
				 															for (var key in _load) {
				 																	if (_load.hasOwnProperty(key)) {
				 																			var _obj = {};
																							_obj.gender = _load[key].gender;
																							_obj.y = parseInt(_load[key].number);
																							this.point.push(_obj);
				 																	}
				 															}
				 															var tx = [];
				 															var bx = {
				 																	type: "pie",
				 																	name: "Gender",
				 																	colorByPoint: true,
				 																	data: this.point
				 															};
				 															tx.push(bx);
				 															var options = {
				 																	chart: {
				 																			renderTo: 'piechart_div',
				 																			plotBackgroundColor: null,
				 																			plotBorderWidth: null,
				 																			plotShadow: false
				 																	},
				 																	title: {
				 																			text: 'Easy Coop Members By Gender'
				 																	},
				 																	tooltip: {
				 																			formatter: function () {
				 																					return '<b>' + this.point.gender + '</b> ' + this.point.y;
				 																			}
				 																	},
				 																	plotOptions: {
				 																			pie: {
				 																					allowPointSelect: true,
				 																					cursor: 'pointer',
				 																					dataLabels: {
				 																							enabled: true,
				 																							color: '#000000',
				 																							connectorColor: '#000000',
				 																							formatter: function () {
				 																									return '<b>' + this.point.gender + '</b> ' + this.point.y;
				 																									//return this.point.y + ' people are ' + this.point.age + ' years old ';
				 																							}
				 																					},
				 																					showInLegend: false
				 																			}
				 																	},
				 																	series: []
				 															};
				 															options.series = tx;
				 															chart = new Highcharts.Chart(options);
				 													}
				 											},
				 											error: function () {
				 													$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
				 											}
				 									});

							} else if ($(this).val() === "companies") {
								// companies
								$.ajax({
														url: '/companies',
														type: "GET",
														beforeSend: function () {
																$('#piechart_div').html('<br clear="all"><div align="center"><img width="350" height="290" src="/images/monkeywalk3.gif" /></div>');
														},
														success: function (response) {

																if (response === null || response === undefined) {
																		$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
																} else if (response.length === 0) {
																		$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:20px;color:#5CB85C;font-family: Open Sans Condensed, sans-serif;">No Records Found.</div>');
																} else {
																		var _load = JSON.parse(response).data.map(obj => obj);
																		this.point = [];
																		for (var key in _load) {
																				if (_load.hasOwnProperty(key)) {
																						var _obj = {};
																						_obj.companies = _load[key].companies;
																						_obj.y = parseInt(_load[key].number);
																						this.point.push(_obj);
																				}
																		}
																		var tx = [];
																		var bx = {
																				type: "pie",
																				name: "Gender",
																				colorByPoint: true,
																				data: this.point
																		};
																		tx.push(bx);
																		var options = {
																				chart: {
																						renderTo: 'piechart_div',
																						plotBackgroundColor: null,
																						plotBorderWidth: null,
																						plotShadow: false
																				},
																				title: {
																						text: 'Easy Coop Members By Gender'
																				},
																				tooltip: {
																						formatter: function () {
																								return '<b>' + this.point.companies + '</b> ' + this.point.y;
																						}
																				},
																				plotOptions: {
																						pie: {
																								allowPointSelect: true,
																								cursor: 'pointer',
																								dataLabels: {
																										enabled: true,
																										color: '#000000',
																										connectorColor: '#000000',
																										formatter: function () {
																												return '<b>' + this.point.companies + '</b> ' + this.point.y;
																												//return this.point.y + ' people are ' + this.point.age + ' years old ';
																										}
																								},
																								showInLegend: false
																						}
																				},
																				series: []
																		};
																		options.series = tx;
																		chart = new Highcharts.Chart(options);
																}
														},
														error: function () {
																$("#piechart_div").fadeIn(2000).html('<div style="text-align:center;font-size:23px;color:#f60437;font-family: Open Sans Condensed, sans-serif;">Operation failed</div>');
														}
												});

							}
		 }

		});
});
