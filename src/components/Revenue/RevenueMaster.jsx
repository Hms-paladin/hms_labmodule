import React, { Component } from "react";
import { Select, Dropdown } from "antd";
import Moment from "react-moment";
import RevenueTable from "./RevenueTable";
import Paper from "@material-ui/core/Paper";
import { Input } from "antd";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import  ReactSVG  from 'react-svg';
import Button from '@material-ui/core/Button';
import dateformat from 'dateformat'
import './RevenueTable.css'
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import ButtonGroup from '@material-ui/core/ButtonGroup';
class RevenueMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
      date: "rrr"
    };
  }
  componentDidMount() {
    this.dayReport([{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
  }],true)
    
  }
  dayReport=(data,firstOpen)=>{
    console.log(data,"itemdaterange")
    var startdate = dateformat(data[0].startDate, "yyyy-mm-dd")
    var enddate = dateformat(data[0].endDate, "yyyy-mm-dd")
    if(!firstOpen){
    this.setState({ spinner: true })
    }
  }
  render() {
    const { Option } = Select;
    const { Search } = Input;
    return (

      <Paper className="reve_paper">
        <div className="dashboard_header">
          <div className="dashboard_title">REVENUE</div>
          <div style={{ fontSize: "14px",display:"flex",alignItems:"center", }} >
         
          <DateRangeSelect openDateRange={this.state.openDateRange} DateRange={()=>this.setState({openDateRange:!this.state.openDateRange})} dynalign={"dynalign"} rangeDate={(item)=>this.dayReport(item)} />
           
            <Search
              placeholder="Search"
              onSearch={value => console.log(value)}
              style={{ width: 150 }}
              className="mr-2 ml-2"
            />
            <div className="icon_head">
            <ReactSVG src={pdf} style={{marginRight:"15px",marginLeft:"15px"}}/>
            <ReactSVG src={excel} style={{marginRight:"15px"}}/>
            <ReactSVG src={print}  />
          </div>
        </div>
        </div>
        <RevenueTable />
      </Paper>
    );
  }
}
export default RevenueMaster;






