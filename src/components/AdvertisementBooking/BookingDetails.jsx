import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox"
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import { Tabs } from 'antd';
import Checkbox from '@material-ui/core/Checkbox';
import './BookingDetails.css';
import { FiInfo } from "react-icons/fi";
import { Upload, message, Icon } from 'antd';
import AdvertiseList from './AdvertiseList'
import InfoIcon from '@material-ui/icons/Info';
import UploadMedia from './UploadInstruction'
import Modalcomp from '../../helpers/ModalComp/Modalcomp'
import Calendar from './Calendar';
import Info from '../../Images/info.svg'
import DeleteMedia from './DeleteMedia';
import { NavLink, Link } from 'react-router-dom';
export default class BookingDetails extends React.Component{
constructor(props)
{
super(props)
   this.state={open:false}
}
handleOpen=()=>
{
    this.setState({open:true})
}
handleClose=()=>
{
    this.setState({open:false})
}

 callback=(key)=>{
    console.log(key);
  }
render()
{
    const { TabPane } = Tabs;
    return(
        <div className="booking_adjustable_input booking_createlist">
            <Grid container className="calendar_container" spacing={3}>
            <Grid item xs={12} md={7} >
              
                <Calendar/>-
                </Grid>
                <Grid item xs={12} md={5}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="Create Ad" key="1"> 
                <Grid  container className="booking_adjustable_picker" style={{height:"100%"}}>
                    <Grid item xs={12} md={6} className="create_container">
                       <Labelbox className="booking_adjustable_picker" type="datepicker" labelname="Start Date"/>
                       <div className="half_full_container"><Checkbox className="half_div"/><span>Half</span>
                       <Checkbox/><span>Full</span></div>
                       <p>Fee / Day (KWD)</p>
                       <p className="add_fee"><b>500</b></p>
                    </Grid>
                   <Grid item xs={12} md={6} className="create_container">
                       <Labelbox type="datepicker" labelname="End Date"/>
                       <Labelbox type="select" labelname="Placement Location"/>
                       <p>Total Cost (KWD)</p>
                       <p className="add_fee"><b>2500</b></p>
                   </Grid>
                   <Grid item xs={12} md={12} className="create_container">
                   <div className="upload_title"><label>Upload Advertisement</label><span><img src={Info} className="info_icon" onClick={this.handleOpen}/></span></div>
                       <Upload className="browse_files">
                      
                   <span>My image.jpg </span><span><Button className="button_browse">Browse</Button></span></Upload>
                       
                      
                   </Grid>
                   <Grid item xs={12} md={12} style={{paddingRight:"10px", paddingBottom:"10px"}} className="create_container">
                   <div className="datebook_container"><Button className="datebook_button" component = {NavLink} to= "/Home/Cancelpayment">Book</Button></div>
                       </Grid>
                   </Grid>  
                </TabPane>
                <TabPane tab="Ad List" key="2">
                    <AdvertiseList/>
                   
                </TabPane>

               
            </Tabs>
            <div></div>
        </Grid>

        </Grid>
        <Modalcomp xswidth={"xs"} clrchange="textclr" title="UPLOAD INSTRUCTIONS" visible={this.state.open} closemodal={this.handleClose}>
            <UploadMedia/>
        </Modalcomp>
        </div>
    )
}
}