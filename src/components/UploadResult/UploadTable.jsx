import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import UploadView from "./UploadView";
import axios from 'axios';
import { apiurl } from "../../App";
import dateformat from 'dateformat';

import "./UploadTable.css";

class UploadTable extends React.Component {
  state = {
    openview: false,
    tableData:[],
    tableDatafull:[],
    openuploadview:false,
    viewdata:[],
    search:null
  };

 componentDidMount(){
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + '/getTestUploadResult',
        data:{
          "lab_id": "2",
          "date": dateformat(new Date(), "yyyy-mm-dd"),
          "period": "Day",
          "date_to":dateformat(new Date(), "yyyy-mm-dd")
        }
    })
    .then((response) => {
      console.log(response,"response_data")

      var tableData = [];
      var tableDatafull = [];
        response.data.data.map((val,index) => {
            tableData.push({
              name: val.customer,
              test: val.test,
              date: val.test_date,
              time: val.uploaded_time,
            status: <span className="uploader_clrgreen">{val.status}</span>,
            id:index
            })
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

UNSAFE_componentWillReceiveProps(newProps){
  console.log(newProps.weekMonthYearData,"inside")
  if(newProps.propsopen){
  this.setState({
    tableData:newProps.weekMonthYearData,
    tableDatafull:newProps.wk_Mn_Yr_Full_Data,
    search:newProps.searchData,
  })
}
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

    console.log(this.state.tableDatafull,"tableDatafull")
    console.log(this.state.search,"tableDatafull")

    const searchdata = []
    this.state.tableDatafull.filter((data,index) => {
      console.log(data,"datadata")
      if (this.state.search === undefined || this.state.search === null){
        searchdata.push({
            name: data.customer,
            test: data.test,
            date: data.test_date,
            time: data.uploaded_time,
          status: <span className="uploader_clrgreen">{data.status}</span>,
          id:index
          })
      }
      else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase()) || data.test !== null && data.test.toLowerCase().includes(this.state.search.toLowerCase()) || data.test_date !== null && data.test_date.toLowerCase().includes(this.state.search.toLowerCase()) || data.uploaded_time !== null && data.uploaded_time.toLowerCase().includes(this.state.search.toLowerCase())) {
        searchdata.push({
          name: data.customer,
          test: data.test,
          date: data.test_date,
          time: data.uploaded_time,
        status: <span className="uploader_clrgreen">{data.status}</span>,
        id:index
        })
      }
  })
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
          rowdata={searchdata}
          EditIcon="close"
          DeleteIcon="close"
          modelopen={(e,id) => this.modelopen(e,id)}
          props_loading={this.state.props_loading}
        />

        <UploadView onClose={this.closemodal} openuploadview={this.state.openuploadview} viewdata={this.state.viewdata}/>

      </div>
    );
  }
}
export default UploadTable;
