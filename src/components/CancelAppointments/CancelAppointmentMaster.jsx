import React, { Component } from "react";
import "antd/dist/antd.css";
import Paper from "@material-ui/core/Paper";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactSVG from "react-svg";
import Moment from "react-moment";
import { Input } from "antd";
import CancelAppointmentTable from "./CancelAppointmentTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
class CancelAppointmentMaster extends Component {
  render() {
    const { Search } = Input;
    return (
      <div>
        <Paper>
          <div className="dashboard_header">
            <p className="dashboard_title">CANCELLED APPOINTMENTS</p>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ButtonGroup
                className="clinic_group_details"
                size="small"
                aria-label="small outlined button group"
              >
                <Button className="clinic_details">This Week</Button>
                <Button className="clinic_details">This Month</Button>
                <Button className="clinic_details">This Year</Button>
              </ButtonGroup>
              <Moment format="DD-MMM-YYYY" className="mr-5 "></Moment>

              <Search
                placeholder="Search"
                onSearch={(value) => console.log(value)}
                style={{ width: 150 }}
                className="mr-2 ml-2"
              />
              <div className="icon_head">
                <ReactSVG
                  src={pdf}
                  style={{ marginRight: "15px", marginLeft: "15px" }}
                />
                <ReactSVG src={excel} style={{ marginRight: "15px" }} />
                <ReactSVG src={print} />
              </div>
            </div>
          </div>

          <CancelAppointmentTable />
        </Paper>
      </div>
    );
  }
}
export default CancelAppointmentMaster;
