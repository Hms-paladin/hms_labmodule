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
import "./UploadView.css";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import Patient from '../../Images/11.jpg';
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DescriptionIcon from '@material-ui/icons/Description';
const styles = {};
export default class UploadView extends React.Component {
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
      // <div className="lab_popup_details">
      
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          className="profile_modal"
        >
          <CloseIcon className="on_close" onClick={this.props.onClose}/>
            <div className="img_outline">
              <img src={Patient} className="appointment"/></div>
         <div className="lab_dashboard_view">
         <div className="lab_details_container">
            <div className="lab_detailsdiv">
           <h3 className="patient_name">AAMINA</h3>
           <p className="patient_age">45 Years</p>
           <p className="patientappointment_details">Appointment Details</p>
           <div className="head_text_edit">
           <div className="date_uploadetext_edit">
             <p className="uploadeddate_text_date">Uploaded Date</p>
             <p className="date_text_date" >08 Dec 2019</p>
           </div>
           <div className="date_uploadetext_edit">
             <p className="uploadeddate_text_date">Time</p>
             <p className="date_text_date">09:00 AM</p>
           </div>
           </div>
           
           {/* <div className="patientlist_detailsdiv"><p className="patientappointment_details">Uploaded Date</p><p className="patient_date">08 Dec 2019</p></div>
           <div className="patientlist_detailsdiv"><p className="patientappointment_details_info">Time</p><p className="patient_date">09:15AM</p></div> */}
          
          
          
           <Divider className="dividerlist_root"/>
           <div className="test_details_head">Test Details</div>
           <div className="test_report_container">
              <p>Galactosemia Test<span><DescriptionIcon className="file_attach"/><span className="line_edit">|</span></span></p>
              <p>Electrocardiogram<span><DescriptionIcon className="file_attach"/><span className="line_edit">|</span></span></p>
              <p className="blood_test_edit">Blood Test<span><DescriptionIcon className="file_attach" className="no_border"/></span></p>
           </div>
         </div>
         </div>
         </div>
       
        </Dialog>
        
      // {/* </div> */}
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(UploadView);
