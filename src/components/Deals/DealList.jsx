import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// import Stepper from "../AdvertisementBooking/Stepper";
import Workflow from "../../Images/workflow.svg";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import NotfoundIcon from "../../Images/NotFound.svg"
import DeleteMedia from "./DeleteMedia";
import { apiurl } from "../../App";
import axios from 'axios';
import { notification, Spin } from "antd"

import "./DealList.css";

var moment = require('moment');


export default class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      open: false,
      openstepper: [],
      dyndeallist: [],
      dyndealAlllist: [],
      dataOnload: true
    };
  }

  handleOpen = (id) => {
    this.setState({ open: true, currentDeleteId: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.getlistdata()
  }
  componentWillReceiveProps() {
    // if(this.props.afteredit){
    this.getlistdata()
    // }
  }

  getlistdata = () => {
    var self = this
    axios({
      method: 'get',
      url: apiurl + "/getDeals",
      data: {
        "vendor_id": "2",
        "limit": 10,
        "pageno": 1

      }
    })
      .then((response) => {
        console.log(response.data.data, "response_data")
        var dyndeallist = []
        var dyndealAlllist = []

        response.data.data.map((listdata) => {
          console.log(listdata, "listdata1")
          dyndealAlllist.push(listdata)
          dyndeallist.push(
            <>
              <Grid item xs={12} md={12}>
                <Paper className="dyndeallistPaper">
                  <div className="aligndeallistdata">
                    <div>
                      <span>Service Type</span>
                      <div>{listdata.deal_service_type_id.includes(",") ? "ALL" : listdata.deal_service_type_id}</div>
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
                      <div>{listdata.deal_amount + "\xa0\xa0"}{listdata.deal_options && listdata.deal_options === "Amount" ? "KWD" : "%"}</div>
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
                        <div className="view">{listdata.deal_active == 1 ? "Active" : "Inactive"}</div>
                      </div>
                    </div>
                    <div className="iconsdiv">
                      {/* <img src={Workflow} alt="error" onClick={()=>this.openstepper(listdata.id)} /> */}
                      <EditIcon className="edit_icon_div" onClick={() => this.props.changeTab(listdata)} />
                      <DeleteIcon
                        className="delete_icon_div"
                        onClick={() => this.handleOpen(listdata.id)}
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

        self.setState({ dyndeallist: dyndeallist, dyndealAlllist: dyndealAlllist, dataOnload: false })

      })
  }

  openstepper = (id) => {

    if (this.state.openstepper.find((removeid) => { return removeid === id })) {
      this.state.openstepper.splice(this.state.openstepper.findIndex((findindex) => { return findindex === id }), 1)
      this.recallForOpen()
    } else {
      this.state.openstepper.push(id)
      this.recallForOpen()
    }
    this.setState({})

  }

  recallForOpen = () => {
    var dyndeallist = []

    this.state.dyndealAlllist.map((listdata) => {
      dyndeallist.push(
        <>
          <Grid item xs={12} md={12}>
            <Paper style={{ marginBottom: "10px" }}>
              <div className="aligndeallistdata">
                <div >
                  <span>Service Type</span>
                  <div>{listdata.deal_service_type_id.includes(",") ? "ALL" : listdata.deal_service_type_id}</div>
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
                  <div>{listdata.deal_amount}{+" " + listdata.deal_options === "Amount" ? "kwd" : "%"}</div>
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
                    <div className="view">{listdata.deal_active == 1 ? "Active" : "Inactive"}</div>
                  </div>
                </div>
                <div className="iconsdiv">
                  {/* <img src={Workflow} alt="error" onClick={()=>this.openstepper(listdata.id)} /> */}
                  <EditIcon className="edit_icon_div" onClick={() => this.props.changeTab(listdata)} />
                  <DeleteIcon
                    className="delete_icon_div"
                    onClick={() => this.handleOpen(listdata.id)}
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

    this.setState({ dyndeallist: dyndeallist })

  }

  deleteDealLIst = () => {
    this.setState({dataOnload:true})
    var self = this
    axios({
      method: 'DELETE',
      url: apiurl + '/deleteDeals',
      data: {
        "id": this.state.currentDeleteId
      }
    })
      .then((response) => {
        self.setState({ open: false })
        self.getlistdata()
        notification.info({
          description:
            'Record Deleted Successfully',
          placement: "topRight",
        });
      })
  }


  render() {
    console.log(this.state.openstepper, "openstepper")

    return (
      <Spin className="spinner_align" spinning={this.state.dataOnload}>
          {this.state.dyndeallist.length === 0 ? <div className={"noFoundIconCenter_deal"}><img src={NotfoundIcon} /><div>No Data Found</div></div>:
        <div className="deal_list_paper_maincontainer">
        <Grid container>
      {this.state.dyndeallist}
        </Grid>
        <Modalcomp
          xswidth={"xs"}
          clrchange="textclr"
          title="Delete Deals"
          visible={this.state.open}
          closemodal={this.handleClose}
        >
          <DeleteMedia deleteitem={this.deleteDealLIst} closeDeleteModel={this.handleClose}/>
        </Modalcomp>
      </div>}
      </Spin>
    );
  }
}
