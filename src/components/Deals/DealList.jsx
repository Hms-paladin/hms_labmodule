import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import "./DealList.css";
import { Progress } from "antd";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

// import Workflow from "../../images//workflow.svg";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import DeleteMedia from "./DeleteMedia";
import dateFormat from "dateformat";
import { Tabs } from "antd";

const data = [{ month: "Jan.", count: 69, city: "tokyo" }];
const scale = {
  month: { alias: "Month" },
  count: { alias: "Sales" },
};
export default class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", dealsList: [], open: false, del_id: "" };

    console.log("asdfshdgfhsdglhsdf",this.props)
  }
  handleOpen = (data) => {
    this.setState({ open: true, del_id: data });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentWillMount() {
    this.props.getDealsList();
  }
  render() {
    const { TabPane } = Tabs;

    return (
        <div className="deal_list_paper_maincontainer">
          <Grid container>
            <Grid item xs={12} md={12} className="deallist_maingrid">
              {this.props.dealsList &&
                this.props.dealsList.length > 0 &&
                this.props.dealsList.map((val) => {
                  console.log("sdfkjsdhfjsdhfjshfjsdf", val);
                  return (
                    <Paper style={{ marginBottom: "3px" }}>
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "10px",
                            }}
                          >
                            <div>
                              <b>Service Type</b>
                              <div>{ val.deal_service_type === "" ? "All" : val.deal_service_type}</div>
                            </div>
                            <div>
                              <b> Start Date</b>
                              <div>
                                {dateFormat(val.deal_valid_from, "dd mmm yyyy")}
                              </div>
                            </div>
                            <div>
                              <b>End Date</b>
                              <div>
                                {dateFormat(val.deal_valid_to, "dd mmm yyyy")}
                              </div>
                            </div>
                            <div>
                              <b>Amount</b>
                              <div>
                                {" "}
                                {val.deal_options === "Amount"
                                  ? `Amount: ${val.deal_amount} KWD`
                                  : `Percentage: ${val.deal_amount} %`}
                              </div>
                            </div>
                          </div>
                         
                          <div style={{ display: "flex", padding: "10px" }}> 
                          <div>
                           <b style={{ marginRight: "20px" }}>Title</b>
                            <div style={{ marginRight: "22px" }}>
                                {val.deal_title}
                            </div>
                            </div>

                            <div>
                              <b>Deal</b>
                              <div className="view">
                                {val.deal_active === 1
                                  ? "Active"
                                  : "Not Active"}
                              </div>
                            </div>
                          </div>
                          <div className="iconsdiv">
                            {/* <img src={Workflow} alt="error" /> */}
                            <EditIcon
                              className="edit_icon_div"
                              onClick={() => this.props.changeTab(val)}
                            />
                            <DeleteIcon
                              className="delete_icon_div"
                              onClick={() => this.handleOpen(val.id)}
                            />
                          </div>
                          {/* <div>
                            <Stepper />
                          </div> */}
                        </Grid>
                      </Grid>
                    </Paper>
                  );
                })}
            </Grid>
          </Grid>

          <Modalcomp
            xswidth={"xs"}
            clrchange="textclr"
            title="Delete Deals"
            visible={this.state.open}
            closemodal={this.handleClose}
          >
            <DeleteMedia
              delid={this.state.del_id}
              getDealsList={this.props.getDealsList}
              closemodal={this.handleClose}
              listName="deals"
              apiendpoint="deleteDeals"
            />
          </Modalcomp>
        </div>
    );
  }
}































