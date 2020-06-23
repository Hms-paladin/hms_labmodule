import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import "./ProfileView.css";
import Patient from '../../Images/11.jpg'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const styles = {};
export default class ProfileView extends React.Component {
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
      <div className="lab_popup_details">
      
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          className="lab_profile_modal"
        >
            <div><img src={Patient} className="lab"/></div>
         <div className="lab_dashboard_view">
         <div className="lab_details_container">
            <div className="lab_detailsdiv">
           <h3 className="lab_name">Abdul Khadher</h3>
           <p className="lab_age">45 Years</p>
           <p className="labappointment_details">Appointment Details</p>
           
           <div className="labappointment_details"><p className="labappointment_details">Date<span className="lab_date">08 Dec 2019</span></p></div>
           <div className="labappointment_details-div"><p className="labappointment_details">Time<span className="lab_date">09:15AM</span></p></div>
          
           <div className="labappointment_details"><Button variant="contained" className="view_detailsbutton">View Details<ChevronRightIcon className="right_arrowview"/></Button></div>
           <Divider className="divider_root"/>
          
         </div>
         </div>
         </div>
        </Dialog>
        
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(ProfileView);
