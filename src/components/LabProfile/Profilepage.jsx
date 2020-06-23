import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Trainee from "../../Images/11.jpg";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import "./Profilepage.css";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import Modalcomp from './ProfileModal'
const styles = {};
export default class Profilepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open=()=>
  {
  	this.setState({view:true})
  }
  onclose=()=>
  {
    this.setState({view:false})
  }
  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;

    return (
      <div >
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
        >
          <Grid container className="total">
            <Grid item xs={12} md={5}>
              <div className="trainee_image_container">
                <div className="trainee_image_div">
                  <img className="trainee_image" src={Trainee} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={7} className="addtrainee_gridcontainer">
              <div className="addtraineee_containerdiv">
                <div className="icon_edit">
                  <EditIcon className="icon" onClick={this.open}/>
                </div>
                <div>
                  <h1 className="trainee_detail">Abdul Khaafid</h1>
                  <div className="age_details">
                    <h5>
                      <MdLocationOn className="group_icons"/>
                    </h5>
                    <p className="trainee_text">
                      PO Box 2, safari 13001, Kuwait City, Kuwait -54541
                    </p>
                  </div>
                  <div className="age_details">
                    <h5>
                      <MdLocalPhone className="group_icons"/>
                    </h5>
                    <p className="trainee_text">+965 220000001</p>
                  </div>
                  <div className="age_details">
                    <h5>
                      <IoIosGlobe className="group_icons"/>
                    </h5>
                    <p className="trainee_text">+965 220000001</p>
                  </div>
                  <div>
                    <h4 className="working_hour">
                      <b>Working Hours</b>
                    </h4>
                  </div>
                  <div className="working_detail">
                    <h4 className="working_hour_detail">Friday</h4>

                    <p className="working_time_detail">09.30 AM-12.30 PM</p>
                  </div>
                  <div>
                    <div className="working_detail">
                      <h4 className="working_hour_detail">Thursday</h4>
                      <p className="working_time_detail">09.30 AM-04.30 PM</p>
                    </div>
                  </div>
                  <div>
                    <div className="working_detail">
                      <h4 className="working_hour_detail">
                        Saturday-Wednesday
                      </h4>

                      <p className="working_time_detail">10.30 AM-05.30 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <Divider  className="divider_profile"/>
              <div>
                <div className="package_details_container">
                  <div className="package_details">
                    <div className="package_details_list">
                      <p>Contact Person</p>
                    </div>
                  </div>
                  <div>
                    <p>Hamad Abdallah Hassan</p>
                  </div>
                </div>
              </div>

              <div className="package_container">
                <div className="package_details_container">
                  <div className="package_details">
                    <div className="package_details_list">
                      <p> Mobile Number</p>
                    </div>
                    <div>
                      <p></p>
                    </div>
                  </div>
                  <div>
                    <p>+956 22001110</p>
                  </div>
                </div>
              </div>

            
            </Grid>
          </Grid>
        </Dialog>
        <Modalcomp  open={this.state.view} onClose={this.onclose} title="gfffffffffffffh"/>
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(Profilepage);
