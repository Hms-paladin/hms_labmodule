import React, { Component } from "react";
import "antd/dist/antd.css";
import Paper from "@material-ui/core/Paper";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactSVG from "react-svg";
import Moment from "react-moment";
import { Input } from "antd";
import CancelAppointmentTable from "./CancelAppointmentTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from 'axios';
import { apiurl } from "../../App";
import { Spin } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactToPrint from "react-to-print";
import ReactExport from 'react-data-export';
import PrintData from "./printdataCancel";

var moment = require('moment');
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class CancelAppointmentMaster extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: false,
      spinner: false,
      weekMonthYearData: [],
      wk_Mn_Yr_Full_Data: [],
    };
  }

  componentDidMount() {
    var self = this
    axios({
      method: 'POST', //get method 
      url: apiurl + '/getPatientTestCancelled',
      data: {
        "lab_id": "2",
        "date": "2020-06-14",
        "period": "Day"
      }
    })
      .then((response) => {
        console.log(response, "response_data")

        var tableData = [];
        var tableDatafull = [];
        response.data.data.map((val, index) => {
          tableData.push({
            name: val.customer,
            test: val.test,
            Bookdate: moment(val.book_date).format('DD-MM-YYYY'),
            Canceldate: moment(val.cancel_date).format('DD-MM-YYYY'),
            time: "-",
            id: index
          })
          tableDatafull.push(val)
        })

        self.setState({
          weekMonthYearData: tableData,
          wk_Mn_Yr_Full_Data: tableDatafull,
          props_loading: false
        })
      })
  }

  weekFun = (period) => {
    this.setState({ spinner: true })
    var self = this
    axios({
      method: 'POST', //get method 
      url: apiurl + "/getPatientTestCancelled",
      data: {
        "lab_id": "2",
        "date": "",
        "period": period,
      }
    })
      .then((response) => {
        console.log(response, "response_dataweek")

        var weekData = [];
        var weekDatafull = [];
        response.data.data.map((val, index) => {
          weekDatafull.push(val)
          weekData.push({
            name: val.customer,
            test: val.test,
            Bookdate: moment(val.book_date).format('DD-MM-YYYY'),
            Canceldate: moment(val.cancel_date).format('DD-MM-YYYY'),
            time: "-",
            id: index
          })
        })
        self.setState({ weekMonthYearData: weekData, wk_Mn_Yr_Full_Data: weekDatafull, spinner: false })
      })
  }

  generatepdf = () => {
    const doc = new jsPDF("a4")
    var bodydata = []
    this.state.weekMonthYearData.map((data, index) => {
      bodydata.push([index + 1, data.name, data.test, data.Bookdate,data.Canceldate,data.time])
    })
    doc.autoTable({
      beforePageContent: function (data) {
        doc.text("Cancelled Appoinment", 15, 23);
      },
      margin: { top: 30 },
      showHead: "everyPage",
      theme: "grid",
      head: [['S.No', 'Customer', 'Test', 'Booked Date', 'Cancelled Date', 'Time']],
      body: bodydata,
    })

    doc.save('CancelledAppoinment.pdf')

  }

  render() {
    const { Search } = Input;
    var multiDataSetbody = []
    this.state.weekMonthYearData.map((xldata, index) => {
      if (index % 2 !== 0) {
        multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } }, { value: xldata.name }, { value: xldata.test }, { value: xldata.Bookdate }, { value: xldata.Canceldate }, { value: xldata.time }])
      } else {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.name, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }, { value: xldata.test, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }, { value: xldata.Bookdate, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }, { value: xldata.Canceldate, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },{ value: xldata.time, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }])
      }
    })
    const multiDataSet = [
      {
        columns: [
          { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Customer", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Test", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Booked Date", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Cancelled Date", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Time", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } }
        ],
        data: multiDataSetbody
      }
    ];
    return (
      <Spin className="spinner_align" spinning={this.state.spinner}>
        <div>
          <Paper>
            <div className="dashboard_header">
              <p className="dashboard_title">CANCELLED APPOINTMENTS</p>
              <div
                style={{
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ButtonGroup
                  className="clinic_group_details"
                  size="small"
                  aria-label="small outlined button group"
                >
                  <Button className="clinic_details" onClick={() => this.weekFun("WEEK")} >This Week</Button>
                  <Button className="clinic_details" onClick={() => this.weekFun("Month")} >This Month</Button>
                  <Button className="clinic_details" onClick={() => this.weekFun("YEAR")}>This Year</Button>
                </ButtonGroup>
                <Moment format="DD-MMM-YYYY" className="mr-5 "></Moment>

                <Search
                  placeholder="Search"
                  onSearch={(value) => console.log(value)}
                  style={{ width: 150 }}
                  className="mr-2 ml-2"
                  onChange={(e) => this.setState({ searchData: e.target.value })}
                />
                <div className="icon_head">
                  <ReactSVG
                    onClick={this.generatepdf}
                    src={pdf}
                    style={{ marginRight: "15px", marginLeft: "15px" }}
                  />
                  <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
                    <ExcelSheet dataSet={multiDataSet} name="Uploaded Details" />
                  </ExcelFile>

                  <ReactToPrint
                    trigger={() => <ReactSVG src={print} />}
                    content={() => this.componentRef}
                  />
                  <div style={{ display: "none" }}><PrintData printTableData={this.state.weekMonthYearData} ref={el => (this.componentRef = el)} /></div>
                </div>
              </div>
            </div>

            <CancelAppointmentTable weekMonthYearData={this.state.weekMonthYearData} wk_Mn_Yr_Full_Data={this.state.wk_Mn_Yr_Full_Data} searchData={this.state.searchData} />
          </Paper>
        </div>
      </Spin>
    );
  }
}
export default CancelAppointmentMaster;
