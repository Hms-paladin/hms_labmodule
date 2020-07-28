import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// import Stepper from "../AdvertisementBooking/Stepper";
import Workflow from "../../Images/workflow.svg";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import DeleteMedia from "./DeleteMedia";
import { apiurl } from "../../App";
import axios from 'axios';
import { notification } from "antd"

import "./DealList.css";

var moment = require('moment');


export default class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
     name: "",
     open: false,
     openstepper:[],
     dyndeallist:[],
     dyndealAlllist:[], 
    };
  }

  handleOpen = (id) => {
    this.setState({ open: true,currentDeleteId:id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount(){
    this.getlistdata()
  }
  
  // Unsafe_componentWillReceiveProps(){
  //   // if(this.props.afteredit){
  //   this.getlistdata()
  //   // }
  // }

  getlistdata=(notifymsg)=>{
    var self = this
    axios({
        method: 'get',
        url: apiurl + "/getDeals",
        data:{
          "vendor_id":"2", 
          "limit":10, 
          "pageno":1
          
        } 
    })
    .then((response) => {
      console.log(response.data.data,"response_data")
      var dyndeallist= []
      var dyndealAlllist= []

      response.data.data.map((listdata)=>{
        dyndealAlllist.push(listdata)
        dyndeallist.push(
          <>
                    <Grid item xs={12} md={12}>
              <Paper className="dyndeallistPaper">
                <div className="aligndeallistdata">
                  <div>
                    <span>Service Type</span>
                    <div>{listdata.deal_title}</div>
                  </div>
                  <div>
                    <span> Start Date</span>
                    <div>{moment(listdata.deal_valid_from).format('DD-MM-YYYY')}</div>
                  </div>
                  <div>
                    <span>End Date</span>
                    <div>{moment(listdata.deal_valid_to).format('DD-MM-YYYY')}</div>
                  </div>
                  <div>
                    <span>Amount</span>
        <div>{listdata.deal_amount}{" "}{listdata.deal_options==="Amount"?"KWD":"%"}</div>
                  </div>
                </div>
                <div className="aligndeallistdataRow2">
                  <div className={"titleDealFlex"}>
                  <div className={"listTitleWidth"}>
                    <span>Title</span>
                <div>{listdata.deal_title}</div>
                  </div>
                  <div>
                    <span>Deal</span>
                <div className="view">{listdata.deal_active==1?"Active":"Inactive"}</div>
                  </div>
                  </div>
                  <div className="iconsdiv">
                  {/* <img src={Workflow} alt="error" onClick={()=>this.openstepper(listdata.id)} /> */}
                  <EditIcon className="edit_icon_div" onClick={()=>this.props.changeTab(listdata)}/>
                  <DeleteIcon
                    className="delete_icon_div"
                    onClick={()=>this.handleOpen(listdata.id)}
                  />
                </div>
                </div>

                <div>
                {/* {this.state.openstepper.includes(listdata.id) && <Stepper /> } */}
                </div>
  
              </Paper>
  
            </Grid>
          </>
        )
      })

      if(notifymsg){
        notification.info({
          description:notifymsg,
            placement:"topRight",
        });
      }

      self.setState({dyndeallist:dyndeallist,dyndealAlllist:dyndealAlllist})
      
    })
  }

  openstepper = (id) => {

    if(this.state.openstepper.find((removeid)=>{return removeid===id})){
      this.state.openstepper.splice(this.state.openstepper.findIndex((findindex)=>{return findindex===id}),1)
      this.recallForOpen()
    }else{
      this.state.openstepper.push(id)
      this.recallForOpen()
    }
    this.setState({})

  }

  recallForOpen=()=>{
    var dyndeallist= []

    this.state.dyndealAlllist.map((listdata)=>{
      dyndeallist.push(
        <>
                  <Grid item xs={12} md={12}>
            <Paper style={{ marginBottom: "10px" }}>
              <div className="aligndeallistdata">
                <div >
                  <span>Service Type</span>
                  <div>{listdata.deal_title}</div>
                </div>
                <div>
                  <span> Start Date</span>
                  <div>{moment(listdata.deal_valid_from).format('DD-MM-YYYY')}</div>
                </div>
                <div>
                  <span>End Date</span>
                  <div>{moment(listdata.deal_valid_to).format('DD-MM-YYYY')}</div>
                </div>
                <div>
                  <span>Amount</span>
                  <div>{listdata.deal_amount}</div>
                </div>
              </div>
              <div className="aligndeallistdataRow2">
                <div className={"titleDealFlex"}>
                <div className={"listTitleWidth"}>
                  <span>Title</span>
              <div>{listdata.deal_title}</div>
                </div>
                <div>
                  <span>Deal</span>
              <div className="view">{listdata.deal_active==1?"Active":"Inactive"}</div>
                </div>
                </div>
                <div className="iconsdiv">
                {/* <img src={Workflow} alt="error" onClick={()=>this.openstepper(listdata.id)} /> */}
                <EditIcon className="edit_icon_div" onClick={()=>this.props.changeTab(listdata)}/>
                <DeleteIcon
                  className="delete_icon_div"
                  onClick={()=>this.handleOpen(listdata.id)}
                />
              </div>
              </div>
              <div>
              {/* {this.state.openstepper.includes(listdata.id) && <Stepper /> } */}
              </div>

            </Paper>

          </Grid>
        </>
      )
    })

    this.setState({dyndeallist:dyndeallist})
    
  }

  deleteDealLIst=()=>{
    var self=this
    axios({
      method:'DELETE',
      url: apiurl+'/deleteDeals',
      data:{
        "id":this.state.currentDeleteId
      }
    })
    .then((response)=>{
      self.setState({open: false})
      self.getlistdata("Deal Deleted Successfully")
    })
  }


  render() {
    console.log(this.state.openstepper,"openstepper")

    return (
      <div className="deal_list_paper_maincontainer">
        <Grid container>
      {this.state.dyndeallist}
        </Grid>
        <Modalcomp
          xswidth={"xs"}
          clrchange="textclr"
          title="Delete Media"
          visible={this.state.open}
          closemodal={this.handleClose}
        >
          <DeleteMedia closemodal={this.handleClose} deleteitem={this.deleteDealLIst} closeDeleteModel={this.handleClose}/>
        </Modalcomp>
      </div>
    );
  }
}