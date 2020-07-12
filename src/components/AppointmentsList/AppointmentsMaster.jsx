import React, { Component } from "react";
import { Select } from "antd";
import Moment from "react-moment";
import PrintData from "./printdataAppoinment";
import AppointmentsTable from "./AppointmentsTable";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactSVG from 'react-svg';
import Paper from "@material-ui/core/Paper";
import { Input } from "antd";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';
import { apiurl } from "../../App";
import { Spin } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactToPrint from "react-to-print";
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


class AppointmentsList extends Component {
  constructor(props) {

    super(props);
    this.state = {
      view: false,
      date: "rrr",
      spinner: false,
      weekMonthYearData: [],
      wk_Mn_Yr_Full_Data: [],
    };
  }

  componentDidMount() {
    var self = this
    axios({
      method: 'POST', //get method 
      url: apiurl + '/getTestPendingResult',
      data: {
        "lab_id": "2",
        "date": "2020-06-18",
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
            date: val.test_date,
            time: val.uploaded_time ? val.uploaded_time : '-',
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
      url: apiurl + "/getTestPendingResult",
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
            date: val.test_date,
            time: val.uploaded_time ? val.uploaded_time : '-',
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
      bodydata.push([index + 1, data.name, data.test, data.date, data.time])
    })
    doc.autoTable({
      beforePageContent: function (data) {
        doc.text("Appoinment Details", 15, 23);
      },
      margin: { top: 30 },
      showHead: "everyPage",
      theme: "grid",
      head: [['S.No', 'Customer', 'Test', 'Date', 'Time']],
      body: bodydata,
    })

    doc.save('AppoinmentDeatails.pdf')

  }


  render() {
    const { Option } = Select;
    const { Search } = Input;
    var multiDataSetbody = []
    this.state.weekMonthYearData.map((xldata, index) => {
      console.log(xldata,"xldata")
      if (index % 2 !== 0) {
        multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } }, { value: xldata.name }, { value: xldata.test }, { value: xldata.date }, { value: xldata.time }])
      } else {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.name, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }, { value: xldata.test, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }, { value: xldata.date, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }, { value: xldata.time, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }])
      }
    })
    const multiDataSet = [
      {
        columns: [
          { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Customer", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Test", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Date", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Time", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Status", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
        ],
        data: multiDataSetbody
      }
    ];
    return (
      <Spin className="spinner_align" spinning={this.state.spinner}>
        <Paper>
          <div className="dashboard_header">
            <div className="dashboard_title">APPOINTMENT LIST</div>
            <div style={{ fontSize: "14px", display: "flex", alignItems: "center", }} >
              <ButtonGroup className="clinic_group_details" size="small" aria-label="small outlined button group">
                <Button className="clinic_details" onClick={() => this.weekFun("WEEK")} >This Week</Button>
                <Button className="clinic_details" onClick={() => this.weekFun("Month")}>This Month</Button>
                <Button className="clinic_details" onClick={() => this.weekFun("YEAR")}>This Year</Button>
              </ButtonGroup>
              <Moment format="DD-MMM-YYYY" className="mr-5 "></Moment>
              <Search
                placeholder="Search"
                onSearch={value => console.log(value)}
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
                  <ExcelSheet dataSet={multiDataSet} name="Appoinment Details" />
                </ExcelFile>


                <ReactToPrint
                  trigger={() => <ReactSVG src={print} />}
                  content={() => this.componentRef}
                />
                <div style={{ display: "none" }}><PrintData printTableData={this.state.weekMonthYearData} ref={el => (this.componentRef = el)} /></div>
              </div>
            </div>

          </div>
          <AppointmentsTable weekMonthYearData={this.state.weekMonthYearData} wk_Mn_Yr_Full_Data={this.state.wk_Mn_Yr_Full_Data} searchData={this.state.searchData} />
        </Paper>
      </Spin>
    );
  }
}
export default AppointmentsList;










