import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Tabs,notification } from 'antd';
import Checkbox from '@material-ui/core/Checkbox';
// import Report from '../../images/report.jpg'
import './BookingDetails.css'
import DealList from './DealList'
import Calendar from '../Calendar/Calendar'
import Axios from "axios";
import { apiurl } from "../../App";
import ValidationLibrary from '../../helpers/validationfunction';
import dateformat from 'dateformat';

export default class BookingDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            serviceType: [
                {
                    id: 1,
                    service_type: "All"
                }
            ],
            edit: false,
            activeKey: "1",
            serviceTypeAll: false,
            dealOption: "M",
            deal_valid_from: new Date(),
            deal_valid_to: new Date(),
            dealActive: false,
            afteredit: false,
            valideToerror:false,
            bookingDetails: {
                'service_type': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'deal_title': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'deal_amt': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                }
            }
        }
    }
    callback = (key) => {
        this.setState({
            activeKey: key
        })
    }
    changeTabFun = (data) => {
        console.log(data, "editdata")
        this.setState({
            activeKey: "1",
            editData: data,
            edit: true
        })
        // For Edit Data form filling
        this.state.bookingDetails.service_type.value = 19
        this.state.bookingDetails.deal_title.value = data.deal_title
        this.state.bookingDetails.deal_amt.value = data.deal_amount
        this.state.dealActive = data.deal_active === 1 ? true : false
        this.state.dealOption = data.deal_options === "Amount" ? "M" : "F"
        this.state.deal_valid_from = dateformat(data.deal_valid_from, "yyyy-mm-dd")
        this.state.deal_valid_to = dateformat(data.deal_valid_to, "yyyy-mm-dd")
        this.setState({})

    }

    checkValidation = () => {
        var bookingDetails = this.state.bookingDetails;
        var bookingKeys = Object.keys(bookingDetails);
        console.log(bookingKeys);
        for (var i in bookingKeys) {
            var errorcheck = ValidationLibrary.checkValidation(bookingDetails[bookingKeys[i]].value, bookingDetails[bookingKeys[i]].validation);
            console.log(errorcheck);
            bookingDetails[bookingKeys[i]].error = !errorcheck.state;
            bookingDetails[bookingKeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = bookingKeys.filter((obj) =>
            bookingDetails[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0  ) {
            // new Date(this.state.deal_valid_from) >= new Date(this.state.deal_valid_to)
            // console.log(new Date(this.state.deal_valid_from),"fromdate")
            // console.log(new Date(this.state.deal_valid_to),"fromdate")
            // valideToerror:true 

            
            this.setState({ error: true})
        } else {
            this.setState({ error: false })
            // if(new Date(this.state.deal_valid_from) >= new Date(this.state.deal_valid_to)){
            // }else{
            this.onSubmitData()
            // }
        }
        this.setState({ bookingDetails })
    }
    changeDynamic = (data, key) => {
        var bookingDetails = this.state.bookingDetails;
        var errorcheck = ValidationLibrary.checkValidation(data, bookingDetails[key].validation);
        bookingDetails[key].value = data;
        bookingDetails[key].error = !errorcheck.state;
        bookingDetails[key].errmsg = errorcheck.msg;
        this.setState({ bookingDetails });
        if (key === "service_type" && data === 1) {
            var Data = [];
            this.state.serviceType.map(val => val.id > 1 && Data.push(val.id))
            console.log(Data.toString(), "myData")
            this.setState({
                serviceTypeAll: Data.toString()
            })
        }
        this.setState({})
    }

    changeDealOption = (data) => {
        console.log(data,"dataradio")
        this.setState({ dealOption: data });
    }

    dealActiveCheck = (e) => {
        console.log(e.target.checked, "mytargetValue")
        this.setState({
            dealActive: e.target.checked
        })
    }

    getRangeData = (data) => {
        console.log(data,"getRangeData")
        if(data.enddate===null){
            this.setState({deal_valid_from:data.startdate})
        }else{
            if(data.startdate<data.enddate){
            this.setState({deal_valid_from:data.startdate,deal_valid_to:data.enddate})
            }else{
            this.setState({deal_valid_from:data.enddate,deal_valid_to:data.startdate})
            }
        }
    }

    onSubmitData = () => {
        var bookingDetails = {
            userId: 1,
            dealvendorId: 2,
            dealservicetypeId: this.state.serviceTypeAll === false ? this.state.bookingDetails.service_type.value : this.state.serviceTypeAll,
            dealtitle: this.state.bookingDetails.deal_title.value,
            dealvalidfrom: dateformat(this.state.deal_valid_from, "yyyy-mm-dd"),
            dealvalidto: dateformat(this.state.deal_valid_to, "yyyy-mm-dd"),
            dealoptions: this.state.dealOption === "M" ? "Amount" : "Percentage",
            dealamount: this.state.bookingDetails.deal_amt.value,
            dealactive: this.state.dealActive === true ? 1 : 0,
            ipaddress: this.state.myIpAddress,
            activeflag: 1,
            createdby: 1,
            createdon: dateformat(new Date(), "yyyy-mm-dd"),
            modifiedby: 1,
            modifiedon: dateformat(new Date(), "yyyy-mm-dd"),
        }
        if (this.state.edit === false) {
            this.bookingDetailsInsertApi(bookingDetails)
        } else {
            this.bookingDetailsEditApi(bookingDetails)
        }
    }
    // Once form submitted successfully then form resets happens here
    resetFormValue = () => {
        return (

            // this.state.bookingDetails.service_type.value="",
            this.state.bookingDetails.deal_title.value = "",
            this.state.deal_valid_from = dateformat(new Date(), "yyyy-mm-dd"),
            this.state.deal_valid_to = dateformat(new Date(), "yyyy-mm-dd"),
            this.state.dealOption = "M",
            this.state.bookingDetails.deal_amt.value = "",
            this.state.dealActive = false,
            this.setState({
                edit:false
            })
        )
    }

    bookingDetailsInsertApi = (bookingDetails) => {
        Axios({
            method: 'POST',
            url: apiurl + '/insertDeals',
            data: {
                ...bookingDetails
            }
        }).then((response) => {
            console.log(response)
            this.resetFormValue()
            this.getDealsList()
            notification.info({
                description:
                  'Record Added Successfully',
                  placement:"topRight",
              });

        }).catch((error) => {
            alert(JSON.stringify(error))
        })
    }


    bookingDetailsEditApi = (bookingDetails) => {
        Axios({
            method: "PUT",
            url: apiurl + "/editDeals",
            data: {
                Id: this.state.editData.id,
                ...bookingDetails
            }
        }).then((response) => {
            this.resetFormValue()
            this.getDealsList()
            this.setState({ afteredit: true, activeKey: "2",edit:false })
            notification.info({
                description:
                  'Record Updated Successfully',
                  placement:"topRight",
              });

        }).catch((error) => {
            alert(JSON.stringify(error))
        })
    }

    // For Update purpose we are using this function here (if we try use this in dealList.jsx then we cant update automatically the list)
    getDealsList = () => {
        Axios({
            method: 'GET',
            url: apiurl + '/getDeals',
        }).then((response) => {
            this.setState({
                dealsList: response.data.data
            })
        }).catch((error) => {
            alert(JSON.stringify(error))
        })
    }

    changedateFun = (data, name) => {
        this.setState({ [name]: data })
    }

    render() {
        const { TabPane } = Tabs;
        console.log(this.state.deal_valid_from,"deal_valid_from")
        return (
            <div className="booking_createlist">
                <Grid container>
                    <Grid item xs={12} md={7}>
                        <Calendar
                            getDate={(data) => this.getRangeData(data)}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} >
                        <Tabs defaultActiveKey={"1"} activeKey={this.state.activeKey} onChange={this.callback}>
                            <TabPane tab="Create Deals" key={"1"}>
                                <Grid container spacing={2} className="deal_container">
                                    <Grid item xs={6} md={6}>
                                        <Labelbox
                                            type="select"
                                            labelname="Service Type"
                                            valuelabel={'service_type'}
                                            valuebind={"id"}
                                            dropdown={this.state.serviceType}
                                            changeData={(data) => this.changeDynamic(data, 'service_type')}
                                            value={this.state.bookingDetails.service_type.value}
                                            error={this.state.bookingDetails.service_type.error}
                                            errmsg={this.state.bookingDetails.service_type.errmsg}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                    <Labelbox
                                            type="text"
                                            labelname="Deal Title"
                                            valuelabel={'deal_title'}
                                            changeData={(data) => this.changeDynamic(data, 'deal_title')}
                                            value={this.state.bookingDetails.deal_title.value}
                                            error={this.state.bookingDetails.deal_title.error}
                                            errmsg={this.state.bookingDetails.deal_title.errmsg}
                                        />
                                    </Grid>

                                    <Grid item xs={6} md={6}>
                                    <Labelbox
                                            type="datepicker"
                                            labelname="Valid From"
                                            value={this.state.deal_valid_from}
                                            changeData={(data) => this.changedateFun(data, 'deal_valid_from')}
                                        />
                                    </Grid>

                                    <Grid item xs={6} md={6}>
                                    <Labelbox
                                    type="datepicker"
                                    labelname="Valid To"
                                    value={this.state.deal_valid_to}
                                    changeData={(data) => this.changedateFun(data, 'deal_valid_to')}
                                    />
                                    {this.state.valideToerror && <div className="valid_toErrormsg">Value should be greater than from date</div > }
                                    </Grid>

                                    <Grid item xs={6} md={6}>
                                    <div className="radio_buttons">
                                            <Labelbox
                                                labelname="Deal Options"
                                                type="radio"
                                                checked={this.state.dealOption}
                                                changeGender={(data) => this.changeDealOption(data)}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={6} md={6}>
                                        <div className="deal_radiopercent">
                                    <Labelbox
                                            type="number"
                                            labelname={this.state.dealOption === "M" ? "Deal Amount" : "Deal Percentage"}
                                            valuelabel={'deal_amt'}
                                            changeData={(data) => this.changeDynamic(data, 'deal_amt')}
                                            value={this.state.bookingDetails.deal_amt.value}
                                            error={this.state.bookingDetails.deal_amt.error}
                                            errmsg={this.state.bookingDetails.deal_amt.errmsg}
                                        />
                                            <div className="deal_kwdalign">
                                            {this.state.dealOption === "M" ? "KWD" : "%"}
                                            </div>
                                            </div>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={12}>
                                    <div className="Deal_activecheck">
                                        <div>
                                    <Checkbox className="Deal_active_check" checked={this.state.dealActive} onChange={(e) => this.dealActiveCheck(e)} /><span>Deal Active</span>
                                    </div>


                                    <div className="createbutton-container">
                                            <Button className="create_cancel" onClick={this.resetFormValue}>Cancel</Button>
                                            <Button className="media_save" onClick={this.checkValidation}>
                                                {
                                                    this.state.edit === true ? "Update" : "Save"
                                                }
                                            </Button>
                                    </div>

                                    </div>

                                    </Grid>

                                </Grid>
                            </TabPane>
                            <TabPane tab="Deals List" key="2">
                                <DealList
                                    dealsList={this.state.dealsList} // list data
                                    getDealsList={this.getDealsList} // get api function
                                    serviceType={this.state.serviceType} // dropdown val
                                    changeTab={(data) => this.changeTabFun(data)} // for automatically change the tab
                                    afteredit={this.state.afteredit}
                                />
                            </TabPane>
                        </Tabs>
                        <div></div>
                    </Grid>

                </Grid>
            </div >
        )
    }
}