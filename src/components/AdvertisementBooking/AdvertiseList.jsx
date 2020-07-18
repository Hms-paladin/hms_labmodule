/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import './AdvertiseList.css'
import Workflow from '../../Images/workflow.svg'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Full from '../../Images/Half.svg'
import Half from '../../Images/Full.svg'
import DeleteMedia from '../Deals/DeleteMedia'
import Modalcomp from '../../helpers/ModalComp/Modalcomp'
import Axios from 'axios';
// import apiservice from '../../helpers/apiservices'
import { apiurl, imageUrl } from "../../App";
import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';
import Stepper from '../StepperStatus/Stepper'


const data = [
    { month: 'Jan.', count: 69, city: 'tokyo' }
];
const scale = {
    month: { alias: 'Month', },
    count: { alias: 'Sales', },
};

export default class AdvertiseList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
             open: false,
             del_id:""
    }
}

componentWillMount() {
    this.props.getAdvertiseList()
}

    handleOpen = (data) => {
        this.setState({ open: true,del_id:data })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    handleChange = event => {
        this.setState({ id: event.target.value });
      }


      handleDelete = (details) => {
        Axios({
            method: 'POST',
            url: apiurl + '/deleteAdBooking',
            data: {
                doctorid: 2,
                // advendorId:2,
            }
        }).then((response) => {
            console.log(response)
            // this.resetFormValue()
            this.getDealsList()
    
        }).catch((error) => {
        })
    }


    render(){
        return(
         <>
            <div className="location_add_container">    
            {
                this.props.ad_details && this.props.ad_details.length > 0 &&
                                this.props.ad_details.map((bookingDetails,index) => {
              
                    return(
                        <div className="Ad_location_container">
                        <div className="advertise_addlist_items">
                      
                            <div>
                                <div>
                                    <label className="list_head">Ad Location</label>
                            <h5 className="list_subhead">{bookingDetails.ad_location}</h5>
                                </div>
                                
                                <div>
                                    <label className="list_head">Days</label>
                            <h5 className="list_subhead">{bookingDetails.ad_total_cost}</h5>
                                </div>
                                
                            </div>
    
    
                            <div>
                                <div>
                                    <label className="list_head">Start Date</label>
                            <h5 className="list_subhead">{bookingDetails.ad_start_date}</h5>
                                </div>
                                
                                <div>
                                    <label className="list_head">Fee / Day (KWD)</label>
                                    <h5 className="list_subhead">{bookingDetails.ad_fee_per_day}</h5>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className="list_head">End Date</label>
                                    <h5 className="list_subhead">{bookingDetails.ad_end_date}</h5>
                                </div>
                                
                                <div>
                                    <label className="list_head">Total Cost (KWD)</label>
                                    <h5 className="list_subhead">{bookingDetails.ad_total_cost}</h5>
                                </div>
                            </div>
    
                                <div>
                                    <div> <img src={Full} /> </div>
                                    {/* <h5 className="full_half_div">{bookingDetails.ad_filename}</h5> */}
                                        <div>
                                            <img src={Workflow} className="listdelete_icon" />
                                            <EditIcon className="list_edit" 
                                            onClick={() => this.props.changeTab(bookingDetails)}
                                            />
                                            <DeleteIcon className="listdelete_icon" 
                                            onClick={() => this.handleOpen(bookingDetails.id)} />
                                        </div>
                                    {/* <img src={Full}/> */}
                                </div>
                             
                           
                        </div>
                        {/* <Stepper businessDays={bookingDetails.business_days}  /> */}
                       
                    </div>
                    
                    )
                })}

            </div>
                          
                <div>
                        <Modalcomp xswidth={"xs"} clrchange="textclr" 
                        title="Delete Media" visible={this.state.open} closemodal={this.handleClose}>
                            <DeleteMedia  delid={this.state.del_id} listName="advertisement" getAdvertiseList={this.props.getAdvertiseList}
                            apiendpoint={"deleteAdBooking"} generateAlert={this.props.generateAlert}
                            closemodal={this.handleClose} />
                        </Modalcomp>
                </div>


                </>


       
               
                    
            
        )
    }
}