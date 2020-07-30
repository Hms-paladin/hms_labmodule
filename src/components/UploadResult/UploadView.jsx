import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import Patient from '../../Images/11.jpg';
import CloseIcon from '@material-ui/icons/Close';
import DescriptionIcon from '@material-ui/icons/Description';

import "./UploadView.css";


export default class UploadView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null};
  }

  formatTimeShow=(h_24)=> {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
  }

  render() {
    const { classes, onClose, cancel, selectedValue,viewdata, ...other } = this.props;
    console.log(viewdata,"viewdata")
    return (
      
        <Dialog
          aria-labelledby="simple-dialog-title"
          {...other}
          className="profile_modal"
          open={this.props.openuploadview}
        >
          <CloseIcon className="on_close" onClick={()=>this.props.onClose()}/>
            <div className="img_outline">
              <img src={viewdata.profile_image} className="appointment"/></div>
         <div className="lab_dashboard_view">
         <div className="lab_details_container">
            <div className="lab_detailsdiv">
           <h3 className="patient_name">{viewdata.customer}</h3>
           <p className="patient_age">{viewdata.age +" "+ "Years"}</p>
           <p className="patientappointment_details">Appointment Details</p>
           <div className="head_text_edit">
           <div className="date_uploadetext_edit">
             <p className="uploadeddate_text_date">{this.props.tab==="upload" ?  "Uploaded Date" : "Test Date"}</p>
    <p className="date_text_date" >{this.props.tab==="upload" ? (viewdata.uploaded_date && viewdata.uploaded_date) : (viewdata.test_date && viewdata.test_date)}</p>
           </div>
           <div className="date_uploadetext_edit">
             <p className="uploadeddate_text_date">Time</p>
             <p className="date_text_date">{ this.props.tab==="upload" ?  (viewdata.uploaded_time && this.formatTimeShow(viewdata.uploaded_time)):(viewdata.test_time && this.formatTimeShow(viewdata.test_time))}</p>
           </div>
           </div>
          
          
           <Divider className="dividerlist_root"/>
           <div className="test_details_head">Test Details</div>
           <div className="test_report_container">
           <p>{viewdata.test}<span><DescriptionIcon className="file_attach"/></span></p>
              {/* <p>Galactosemia Test<span><DescriptionIcon className="file_attach"/><span className="line_edit">|</span></span></p>
              <p>Electrocardiogram<span><DescriptionIcon className="file_attach"/><span className="line_edit">|</span></span></p>
              <p className="blood_test_edit">Blood Test<span><DescriptionIcon className="file_attach" className="no_border"/></span></p> */}
           </div>
         </div>
         </div>
         </div>
       
        </Dialog>
        
    );
  }
}
