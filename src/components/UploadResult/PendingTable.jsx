import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ResultView from "./ResultView";
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
import { apiurl } from "../../App";

import "./PendingTable.css";


class PendingTable extends React.Component {
  state = {
    openview: false,
    tableData:[],
    tableDatafull:[],
    uploaddata:[],
  };

  componentDidMount(){
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + '/getTestPendingResult',
        data:{
          "lab_id":"2",
          "date":"2020-06-22",
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
            status: <span className="pending_clrred">{val.status}</span>,
            action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon /></div>,
            id:index
            })
            tableDatafull.push(val)
        self.props.tabledataFun(tableData)
        })
        self.setState({
          tableData:tableData,
          tableDatafull:tableDatafull,
          props_loading:false
        })
    })
}

UNSAFE_componentWillReceiveProps(newProps){
  console.log(newProps.weekMonthYearDatapending,"pendingdata")

  // if(newProps.weekMonthYearDatapending.length!==0){
  this.setState({
    tableData:newProps.weekMonthYearDatapending,
    tableDatafull:newProps.wk_Mn_Yr_Full_Data,
    search:newProps.searchData,
  })
// }
}

openresultModel=(indexid)=>{
  var uploadcurrentdata = [this.state.tableDatafull[indexid]]
  this.setState({uploadview:true,uploaddata:uploadcurrentdata})
}


  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    } else if (data === "upload") {
      this.setState({ uploadview: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false, uploadview: false });
  };

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
        status: <span className="pending_clrred">{data.status}</span>,
        action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon /></div>,
        id:index
        })
      }
      else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase()) || data.test !== null && data.test.toLowerCase().includes(this.state.search.toLowerCase()) || data.test_date !== null && data.test_date.toLowerCase().includes(this.state.search.toLowerCase()) || data.uploaded_time !== null && data.uploaded_time.toLowerCase().includes(this.state.search.toLowerCase())) {
        searchdata.push({
          name: data.customer,
          test: data.test,
          date: data.test_date,
          time: data.uploaded_time ? data.uploaded_time : '-',
        status: <span className="pending_clrred">{data.status}</span>,
        action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon /></div>,
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
            { id: "date", label: "Test Date" },
            { id: "time", label: "Time" },
            { id: "status", label: "Status" },
            { id: "action", label: "Action" },
          ]}
          rowdata={searchdata}
          actionclose="close"
          modelopen={(e) => this.modelopen(e)}
          props_loading={this.state.props_loading}    
        />

        <Modalcomp
          visible={this.state.uploadview}
          title={"UPLOAD TEST RESULTS"}
          closemodal={(e) => this.closemodal(e)}
          modelwidthClass={"resultviewModelWidth"}
        >
          <ResultView onClose={this.closemodal} uploaddata={this.state.uploaddata} />
        </Modalcomp>

      </div>
    );
  }
}

export default PendingTable;
