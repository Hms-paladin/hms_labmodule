import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ListView from "./ListView";
import axios from 'axios';
import { apiurl } from "../../App";

import "./AppointmentsTable.css";

class Approvalmanagement extends React.Component {
  state = {
    openview: false,
    tableData:[],
    tableDatafull:[],
  };

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  componentDidMount(){
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + '/getTestPendingResult',
        data:{
          "lab_id":"2",
          "date":"2020-06-18",
          "period":"Day"        
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
              time: val.uploaded_time ? val.uploaded_time : '-',
              id:index
            })
            tableDatafull.push(val)
        })

        self.setState({
          tableData:tableData,
          tableDatafull:tableDatafull,
          props_loading:false
        })
    })
}

UNSAFE_componentWillReceiveProps(newProps){
  console.log(newProps,"newProps")
  this.setState({
    tableData:newProps.weekMonthYearData,
    tableDatafull:newProps.wk_Mn_Yr_Full_Data,
    search:newProps.searchData,
  })
}

  render() {
    const searchdata = []
    this.state.tableDatafull.filter((data,index) => {
      console.log(data,"datadata")
      if (this.state.search === undefined || this.state.search === null){
        searchdata.push({
            name: data.customer,
            test: data.test,
            date: data.test_date,
            time: data.uploaded_time ? data.uploaded_time : '-',
          id:index
          })
      }
      else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase()) || data.test !== null && data.test.toLowerCase().includes(this.state.search.toLowerCase()) || data.test_date !== null && data.test_date.toLowerCase().includes(this.state.search.toLowerCase()) || data.uploaded_time !== null && data.uploaded_time.toLowerCase().includes(this.state.search.toLowerCase())) {
        searchdata.push({
          name: data.customer,
          test: data.test,
          date: data.test_date,
          time: data.uploaded_time ? data.uploaded_time : '-',
        id:index
        })
      }
  })
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "name", label: " Customer Name" },
            { id: "test", label: "Test" },
            { id: "date", label: "Date" },
            { id: "time", label: "Time" },
            { id: "", label: "Action" },
          ]}
          rowdata={searchdata}
          EditIcon="close"
          DeleteIcon="close"
          modelopen={(e) => this.modelopen(e)}
          props_loading={this.state.props_loading}

        />
        <ListView open={this.state.openview} onClose={this.closemodal} />
        {/* <Modalcomp  visible={this.state.openview} className="modal"  closemodal={(e)=>this.closemodal(e)}   xswidth={"xs"}

        >
            <ListView onClose={this.closemodal} />
    
        </Modalcomp> */}

        {/* <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp> */}
      </div>
    );
  }
}
export default Approvalmanagement;
