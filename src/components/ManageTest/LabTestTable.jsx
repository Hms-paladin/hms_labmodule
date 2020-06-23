import React from "react";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./LabTestTable.css";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Packagedetails from "./Packagedetails";
import TestView from "../ManageTest/TestView";
import axios from 'axios';
import { apiurl } from "../../App";
var moment = require('moment');



class LabTestTable extends React.Component {
  state = {
    openview: false,
    tableData:[],
    responseAllData:[],
    viewdata:[],
    editdata:[]
  };

  componentDidMount(){
    this.getTableData()
  }

  componentWillReceiveProps(){
    console.log(this.props,"getdatacall")

    if(this.props.getdatacall){
      this.getTableData()
    }
  }

  handleClickclose = () => {
    this.setState({ open: false });
  }

  getTableData = () => {
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + '/get_mas_lab_test',
        data:{
          "labId":"2"       
        }
    })
    .then((response) => {
      console.log(response,"response_data")

      var tableData = [];
      var responseAllData = [];
        response.data.data.map((val) => {
            tableData.push({ test: val.lab_test_name,cost:val.lab_cost,date:moment(val.lab_created_on).format('DD-MM-YYYY'),
             id: val.lab_id })
            responseAllData.push(val) 
        })
        self.setState({
          tableData:tableData,
          responseAllData:responseAllData,
          props_loading:false
        })
    })
}

modelopen = (data,id) => {
  if (data === "view") {

    var viewdata = this.state.responseAllData.filter((viewdata)=>{
       return viewdata.lab_id===id
    })
    this.setState({ openview: true,viewdata:viewdata });

  } else if (data === "edit") {
    var editdata = this.state.responseAllData.filter((editdata)=>{
      return editdata.lab_id===id
   })

   console.log(editdata,"editdata")
    this.setState({ editopen: true,editdata:editdata });
  }
};

closemodal = (editbol) => {
  this.setState({ openview: false, editopen: false,props_loading:editbol });
};

  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "test", label: "Test" },
            { id: "cost", label: "Cost(KWD)" },
            { id: "date", label: "Created Date" },
            { id: "", label: "Action" },
          ]}
          rowdata={this.state.tableData}
          modelopen={(e,currentid) => this.modelopen(e,currentid)}
          props_loading={this.state.props_loading}
        />
        <Modalcomp
          visible={this.state.openview}
          title={"PACKAGE DETAILS"}
          closemodal={(e) => this.closemodal(e)}
          modelwidthClass={"managetestView"}
        >
          <Packagedetails viewdata={this.state.viewdata} />
        </Modalcomp>

        <Modalcomp
          visible={this.state.editopen}
          title={"EDIT DETAILS"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        >
          <TestView visible={this.state.open}
            closemodal={this.handleClickclose}
            edithide={"edithide"}
            editdata={this.state.editdata}
            callget={this.getTableData}
            closemodal={(editbol) => this.closemodal(editbol)}
            />
        </Modalcomp>
      </div>
    );
  }
}

export default LabTestTable;
