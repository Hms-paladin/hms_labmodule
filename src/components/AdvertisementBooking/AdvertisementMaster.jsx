import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import Paper from "@material-ui/core/Paper";
import BookingDetails from './BookingDetails';


class RevenueMaster extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     date: "rrr"
  //   };
  // }

  render() {
    // const { Option } = Select;
    // const { Search } = Input;
    // console.log(dateFormat(new Date(),"dd mmm yyyy"))
    return (
      <div>
          <Paper>
          <div className="dashboard_header">
          <div className="dashboard_title">ADVERTISEMENT BOOKING</div>
  
            {/* <div  className="revenueclinic_container"><Labelbox type="select" value="Excel Polyclinic" style={{width:"150px"}} labelname="Clinic"/></div> */}
          </div>
          <BookingDetails/>
          </Paper>
          </div>
    );
  }
}

export default RevenueMaster;
