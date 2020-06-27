import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import UploadView from "./UploadView";
import axios from 'axios';
import { apiurl } from "../../App";


import "./UploadTable.css";

class UploadTable extends React.Component {
  state = {
    openview: false,
    tableData:[],
    tableDatafull:[],
    openuploadview:false,
    viewdata:[],
  };

 componentDidMount(){
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + '/getTestUploadResult',
        data:{
          "lab_id":"2",
          "date":"2020-06-23",
          "period":"Day"        
        }
    })
    .then((response) => {
      console.log(response,"response_data")

      var tableData = [];
      var tableDatafull = [];
        response.data.data.map((val,index) => {
          for(let i = 0;i<100;i++){
            tableData.push({
              name: val.customer,
              test: val.test,
              date: val.test_date,
              time: val.uploaded_time,
            status: <span className="uploader_clrgreen">{val.status}</span>,
            id:index
            })
          }
            tableDatafull.push(val)
        })
        self.props.tabledataFun(tableData)

        self.setState({
          tableData:tableData,
          tableDatafull:tableDatafull,
          props_loading:false
        })
    })
}

  modelopen = (data,id) => {
    if (data === "view") {
      this.setState({ openview: true,openuploadview:true,viewdata:this.state.tableDatafull[id] });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false,openuploadview:false });
  };
  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "name", label: "Customer" },
            { id: "test", label: "Test" },
            { id: "date", label: "Uploaded Date" },
            { id: "time", label: "Time" },
            { id: "status", label: "Status" },
            { id: "", label: "Action" },
          ]}
          rowdata={this.state.tableData}
          // tableicon_align={"cell_eye"}
          EditIcon="close"
          DeleteIcon="close"
          UploadIcon="close"
          GrandTotal="close"
          Workflow="close"
          modelopen={(e,id) => this.modelopen(e,id)}
          props_loading={this.state.props_loading}
        />

        <UploadView onClose={this.closemodal} openuploadview={this.state.openuploadview} viewdata={this.state.viewdata}/>

      </div>
    );
  }
}
export default UploadTable;
