import React, { Component } from "react";
import "./DashboardTable.css";
import Card from "@material-ui/core/Card";
import { NavLink, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Clientsmodal from "../UploadResult/clientsmodal";
export default class DashboardTable extends Component {
  state = {
    openview: false,
  };

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };
  render() {
    return (
      <>
        <div>
          <div className="lab_dashboard_buttons_wrap">
            <Card
              component={NavLink}
              to="/Home/AppointmentsList"
              className="lab_button5 lab_button_common_styles"
            >
              <span className="lab_button_text">Total Appointments</span>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="lab_dash_numeric_wrap">
                <p className="lab_dash_numeric_value">18</p>
              </div>
            </Card>
            <Card
              component={NavLink}
              to="/Home/Test"
              className="lab_button1 lab_button_common_styles"
            >
              <span className="lab_button_text">Manage Test</span>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="lab_dash_numeric_wrap">
                <p className="lab_dash_numeric_value">6</p>
              </div>
            </Card>
            <Card
              component={NavLink}
              to="/Home/CancelAppointments"
              className="lab_button3 lab_button_common_styles"
            >
              <span className="lab_button_text">Cancelled</span>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="lab_dash_numeric_wrap">
                <p className="lab_dash_numeric_value">5</p>
              </div>
            </Card>
            <Card
              component={NavLink}
              to="/Home/Revenue"
              className="lab_button2 lab_button_common_styles"
            >
              <span className="lab_button_text">Total Revenue(KWD)</span>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="lab_dash_numeric_wrap">
                <p className="lab_dash_numeric_value">1050</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="todaysappointment_edit">
          <span className="todays_appointment">
            <b>Today's Appointment</b>
          </span>{" "}
          <span>18 Dec 2019</span>
        </div>
        <div>
          <Tablecomponent
            heading={[
              { id: "", label: "S.No" },
              { id: "name", label: " Customer" },
              { id: "test", label: "Test Type" },
              { id: "time", label: "Time" },
              { id: "charge", label: "Charge(KWD)" },
              { id: "", label: "Action" },
            ]}
            rowdata={[
              this.createData({
                name: "AAMINA",
                test: "Blood ",
                time: "04:00PM",
                charge: "20",
              }),
              this.createData({
                name: "MOHAMED",
                test: "Blood",
                time: "13:00PM",
                charge: "20",
              }),
              this.createData({
                name: "ABLA",
                test: "General",
                time: "09:00AM",
                charge: "30",
              }),
            ]}
            // tableicon_align={"cell_eye"}
            EditIcon="close"
            DeleteIcon="close"
            UploadIcon="close"
            GrandTotal="close"
            Workflow="close"
            modelopen={(e) => this.modelopen(e)}
          />

          {/* <Modalcomp  visible={this.state.openview} title={"CLIENTS"} closemodal={(e)=>this.closemodal(e)}>          
       < Clientsmodal />
        </Modalcomp> */}

          <Modalcomp
            visible={this.state.editopen}
            title={"Edit details"}
            closemodal={(e) => this.closemodal(e)}
            xswidth={"xs"}
          ></Modalcomp>
        </div>
        <div className="page_button_container">
          <div className="butt_container">
            <Button
              component={NavLink}
              to="/Home/mediauploads"
              className="lab_dash_bottom_buttons lab_dash_bottom2"
            >
              Media Upload
            </Button>
            <Button
              component={NavLink}
              to="/Home/advertisementbooking"
              className="lab_dash_bottom_buttons lab_dash_bottom3"
            >
              Advertisement Booking
            </Button>
          </div>
        </div>
      </>
    );
  }
}
