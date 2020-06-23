import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import './AvailabilityMaster.css'
import Moment from "react-moment";
import { Input } from "antd";
import Button from '@material-ui/core/Button';
import Plus from '../../images/plus.png'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import dateFormat from 'dateformat';
import Labelbox from "../../helpers/labelbox/labelbox";
import Paper from "@material-ui/core/Paper";
// import Calendar from './Calendar';
import Availability from './Availability'
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
const current_date=(dateFormat(new Date(),"dd mmm yyyy"))
class RevenueMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr"
    };
  }

  render() {
    const { Option } = Select;
    const { Search } = Input;
    console.log(dateFormat(new Date(),"dd mmm yyyy"))
    return (
      <div className="doctor_dashboard">
          <Paper>
          <div className="uploadsmasterheader">
          <div className="titleuser">AVAILABILITY</div>
  
            <div className="revenueclinic_container"><Labelbox type="select" value="Excel Polyclinic" style={{width:"150px"}} labelname="Clinic"/></div>
             {/* <div style={{width:"150px"}}><Labelbox type="select" value="Walk-In" style={{width:"150px"}}/></div> */}
          
          </div>
          < Availability/>
          </Paper>
          </div>
      
    );
  }
}

export default RevenueMaster;
