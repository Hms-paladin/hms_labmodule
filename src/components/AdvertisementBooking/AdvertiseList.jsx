import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import "./AdvertiseList.css";
import { Progress } from "antd";
import Stepper from "./Stepper";
import Workflow from "../../Images/workflow.svg";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Half from "../../Images/Half.svg";
import Full from "../../Images/Full.svg";
import DeleteMedia from "./DeleteMedia";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import { MdModeEdit } from "react-icons/md";
// import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';
const data = [{ month: "Jan.", count: 69, city: "tokyo" }];
const scale = {
  month: { alias: "Month" },
  count: { alias: "Sales" },
};
export default class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, openmodal: false };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  flowOpen = () => {
    this.setState({ openmodal: true, openmodal: false });
  };
  render() {
    return (
      <div className="location_add_container">
        <Grid container className="Ad_location_container">
          <Grid item xs={4} md={3}>
            <div>
              <p className="list_head">Ad Location</p>
              <p className="list_subhead">App Home</p>
            </div>
            <div>
              <p className="list_head">Days</p>
              <p className="list_subhead">5</p>
            </div>
          </Grid>
          <Grid item xs={4} md={3}>
            <div>
              <p className="list_head">Start Date</p>
              <p className="list_subhead">11 Nov 2020</p>
            </div>
            <div>
              <p className="list_head">Fee / Day (KWD)</p>
              <p className="list_subhead">500</p>
            </div>
          </Grid>
          <Grid item xs={4} md={3}>
            <div>
              <p className="list_head">End Date</p>
              <p className="list_subhead">15 Nov 2020</p>
            </div>
            <div>
              <p className="list_head">Total Cost (KWD)</p>
              <p className="list_subhead">1000</p>
            </div>
          </Grid>
          <Grid item xs={4} md={2}>
            <div className="phone_icon">
              {" "}
              <img src={Half} />
            </div>
            <p className="full_half_textedit">Full</p>
            <div className="icon_editing">
              <img
                src={Workflow}
                className="listdelete_icon"
                onClick={this.flowOpen}
              />
              <h3 className="edit_icon">
                {" "}
                <MdModeEdit />{" "}
              </h3>
              <DeleteIcon
                className="listdelete_icon"
                onClick={this.handleOpen}
              />
            </div>
          </Grid>
          <div className="stepper_par">
            {this.state.openmodal === true ? <Stepper /> : ""}
          </div>
        </Grid>

        <Grid container className="Ad_location_container">
          <Grid item xs={4} md={3}>
            <div>
              <p className="list_head">Ad Location</p>
              <p className="list_subhead">App Home</p>
            </div>
            <div>
              <p className="list_head">Days</p>
              <p className="list_subhead">5</p>
            </div>
          </Grid>
          <Grid item xs={4} md={3}>
            <div>
              <p className="list_head">Start Date</p>
              <p className="list_subhead">11 Nov 2020</p>
            </div>
            <div>
              <p className="list_head">Fee / Day (KWD)</p>
              <p className="list_subhead">500</p>
            </div>
          </Grid>
          <Grid item xs={4} md={3}>
            <div>
              <p className="list_head">End Date</p>
              <p className="list_subhead">15 Nov 2020</p>
            </div>
            <div>
              <p className="list_head">Total Cost (KWD)</p>
              <p className="list_subhead">1000</p>
            </div>
          </Grid>
          <Grid item xs={4} md={2}>
            <div className="phone_icon">
              <img src={Full} />
            </div>
            <p className="full_half_textedit">Half</p>
            <div className="icon_editing">
              <img src={Workflow} className="listdelete_icon" />
              <h3 className="edit_icon">
                {" "}
                <MdModeEdit />{" "}
              </h3>
              <DeleteIcon className="listdelete_icon" />
            </div>
          </Grid>
        </Grid>
        <Modalcomp
          xswidth={"xs"}
          clrchange="textclr"
          title="Delete Media"
          visible={this.state.open}
          closemodal={this.handleClose}
        >
          <DeleteMedia />
        </Modalcomp>
      </div>
    );
  }
}
