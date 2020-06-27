import React, { Component } from "react";
import { Select } from "antd";
import Moment from "react-moment";
import UploadDetails from "./UploadDetails";
import Paper from "@material-ui/core/Paper";
import { Input } from "antd";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactSVG from "react-svg";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ReactExport from 'react-data-export';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactToPrint from "react-to-print";
import PrintData from "./printdata";

import "./UploadMaster.css"


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


class UploadMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
      date: "rrr",
      tableData:[]
    };
  }

  generatepdf=()=>{
    const doc = new jsPDF("a4")
    var bodydata  = []
    this.state.tableData.map((data,index)=>{
      bodydata.push([index+1,data.name,data.test,data.date,data.time,data.status.props.children])
    })
    doc.autoTable({
      beforePageContent: function(data) {
        doc.text("Uploaded Details", 15, 23);
        },
      margin: { top: 30 },
      showHead:"everyPage",
      theme:"grid",
      head: [['S.No', 'Customer', 'Test','Uploaded Date','Time','Status']],
      body:bodydata,
    })
     
    doc.save('UploadDeatails.pdf')
    
  }

  generateprint=()=>{
    this.setState({
      printComOpen:true
    })
  }


  render() {
    const { Option } = Select;
    const { Search } = Input;
    console.log(this.state.tableData,"tableData")
    
    var multiDataSetbody = []
    this.state.tableData.map((xldata,index)=>{
      if(index%2!==0){
        multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},{value:xldata.name},{value:xldata.test},{value:xldata.date},{value:xldata.time},{value:xldata.status.props.children}])
      }else{
      multiDataSetbody.push([
        {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.name,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},{value:xldata.test,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},{value:xldata.date,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},{value:xldata.time,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},{value:xldata.status.props.children,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}}])
      }
    })
    const multiDataSet = [
      {
          columns: [
{title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
{title: "Customer", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}}, 
{title: "Test", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
{title: "Uploaded Date",width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
{title: "Time", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
{title: "Status", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
          ],
          data: multiDataSetbody      
      }
  ];
    return (
      <Paper>
        <div className="dashboard_header">
          <div className="dashboard_title">UPLOAD RESULTS</div>
          <div
            style={{ fontSize: "14px", display: "flex", alignItems: "center" }}
          >
            <ButtonGroup
              className="clinic_group_details"
              size="small"
              aria-label="small outlined button group"
            >
              <Button className="clinic_details">This Week</Button>
              <Button className="clinic_details">This Month</Button>
              <Button className="clinic_details">This Year</Button>
            </ButtonGroup>

            <Moment format="DD-MMM-YYYY" className="mr-5"></Moment>
            <Search
              placeholder="Search"
              onSearch={(value) => console.log(value)}
              style={{ width: 150 }}
              className="mr-2 ml-2"
            />
            <div className="icon_head">
              <ReactSVG
                onClick={this.generatepdf}
                src={pdf}
                style={{ marginRight: "15px", marginLeft: "15px" }}
              />
              <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
                    <ExcelSheet dataSet={multiDataSet} name="Uploaded Details"/>
                </ExcelFile>
              
              
              <ReactToPrint
          trigger={() => <ReactSVG src={print} />}
          content={() => this.componentRef}
        />
        <div style={{ display: "none" }}><PrintData printTableData={this.state.tableData} ref={el => (this.componentRef = el)} /></div>
            </div>
          </div>
        </div>
        <Paper>
          <UploadDetails tabledataFun={(data)=>this.setState({tableData:data})} />
        </Paper>
      </Paper>
    );
  }
}
export default UploadMaster;
