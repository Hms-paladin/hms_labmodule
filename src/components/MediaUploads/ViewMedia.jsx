import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ViewMedia.css";
import uploadimage from "../../Images/upload-button.png";
// import View from "../../Images/view_media.png";
// import Stepper from "../AdvertisementBooking/Stepper";
export default class ViewMedia extends Component {
  render() {
    const{viewData,viewopenModal} = this.props
    console.log(viewData,"viewData_render_check")
    return (
      <div>
        {/* {" "} */}
        <div style={{ display: "flex", justifyContent:"space-between"}}>
        <div style={{ fontSize: "14px" }}>{this.props.viewData.media_title}</div>
        <p className="media_active">{this.props.viewData.is_active === 0 ? "Non Active" : "Active"}</p>
        </div>
        <Grid container>
          <Grid item xs={12} md={6} className="media_title_container">
            <div className="profile_media_div">
            <video src = {this.props.viewData.media_filename} type="video/mp4" controls className="img_uploader_edit"/> 
            {/* <img src={this.props.viewData.media_filename} className="image_uploader_edit"/>   */}
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="media_title_container">
            {/* <Labelbox
              type="text"
              labelname="Media Title"
              value="Top Five Heart Tips"
            /> */}
            {/* <Stepper /> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}