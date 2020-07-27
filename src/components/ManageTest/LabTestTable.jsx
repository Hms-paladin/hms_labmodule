import React from "react";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./LabTestTable.css";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Packagedetails from "./Packagedetails";
import TestView from "../ManageTest/TestView";
import axios from 'axios';
import { apiurl } from "../../App";
import DeleteMedia from '../../helpers/ModalComp/deleteModal';
import {notification} from "antd"


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

  UNSAFE_componentWillReceiveProps(newProps) {
    if(newProps.getdatacall){
      this.props.falsegetmethod()
    }
  }

  handleClickclose = () => {
    this.setState({ open: false });
  }

  getTableData = (notifyMsg) => {
  this.setState({ props_loading: true })
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
             id: val.lab_test_id })
            responseAllData.push(val) 
        })
        self.setState({
          tableData:tableData,
          responseAllData:responseAllData,
          props_loading:false
        })
                if(notifyMsg){
        notification.info({
          description:
            'Record ' + notifyMsg + ' Successfully',
            placement:"topRight",
        });
      }
    })
}

modelopen = (data,id) => {
  if (data === "view") {

    var viewdata = this.state.responseAllData.filter((viewdata)=>{
       return viewdata.lab_test_id===id
    })
    this.setState({ openview: true,viewdata:viewdata });

  } else if (data === "edit") {
    var editdata = this.state.responseAllData.filter((editdata)=>{
      return editdata.lab_test_id===id
   })

   console.log(editdata,"editdata")
    this.setState({ editopen: true,editdata:editdata });
  }
};

closemodal = (editbol) => {
  this.setState({ openview: false, editopen: false,props_loading:false,deleteopen:false });
};

deleteopen = (type,id) => {

  this.setState({
      deleteopen: true,
      iddata: id
  })
}

deleterow = () => {
  this.setState({ props_loading: true })
  var self = this
  axios({
      method: 'delete',
      url: apiurl + '/delete_mas_lab_singletest',
      data: {
          "lab_test_id": this.state.iddata,
      }
  })
      .then(function (response) {
          self.getTableData("Deleted")
      })
      .catch(function (error) {
      });
  this.setState({ props_loading: false })
}

UNSAFE_componentWillReceiveProps(newProps){
  this.setState({
    search:newProps.searchData,
  })
}

  render() {
    const searchdata = []
    this.state.responseAllData.filter((data,index) => {
      console.log(data,"datadata")
      if (this.state.search === undefined || this.state.search === null){
        searchdata.push({
          test: data.lab_test_name,
          cost:data.lab_cost,
          date:moment(data.lab_created_on).format('DD MMM YYYY'),
          id: data.lab_test_id
          })
      }
      else if (data.lab_test_name !== null && data.lab_test_name.toLowerCase().includes(this.state.search.toLowerCase()) || data.lab_cost !== null && data.lab_cost.toString().toLowerCase().includes(this.state.search.toLowerCase()) || data.lab_created_on !== null && moment(data.lab_created_on).format('DD MMM YYYY').toLowerCase().includes(this.state.search.toLowerCase())) {
        searchdata.push({
          test: data.lab_test_name,
          cost:data.lab_cost,
          date:moment(data.lab_created_on).format('DD MMM YYYY'),
          id: data.lab_test_id
        })
      }
  })

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
          rowdata={searchdata}
          modelopen={(e,currentid) => this.modelopen(e,currentid)}
          props_loading={this.state.props_loading}
          deleteopen={this.deleteopen}

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

        <Modalcomp  visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} xswidth={"xs"}>
           <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal}  />
         </Modalcomp>

      </div>
    );
  }
}

export default LabTestTable;
