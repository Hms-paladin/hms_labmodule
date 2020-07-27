import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ResultView from "./ResultView";
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
import { apiurl } from "../../App";
import UploadView from "./UploadView";
import dateformat from 'dateformat';

import "./PendingTable.css";


class PendingTable extends React.Component {
  state = {
    openview: false,
    tableData:[],
    tableDatafull:[],
    uploaddata:[],
    openuploadview:false,
    viewdata:[],
  };

  componentDidMount(){
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + '/getTestPendingResult',
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
              time: val.uploaded_time ? val.uploaded_time : '-',
            status: <span className="pending_clrred">{val.status}</span>,
            action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon onClick={()=>this.openuploadForpending(index)}/></div>,
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
    if(newProps.propsopen){
  this.setState({
    tableData:newProps.weekMonthYearDatapending,
    tableDatafull:newProps.wk_Mn_Yr_Full_Data,
    search:newProps.searchData,
    selectedDatepen:newProps.selectedDatepen
  })
// }
}
}

openresultModel=(indexid)=>{
  var uploadcurrentdata = [this.state.tableDatafull[indexid]]
  this.setState({uploadview:true,uploaddata:uploadcurrentdata})
}

openuploadForpending=(id)=>{
  this.setState({openuploadview:true,viewdata:this.state.tableDatafull[id]  });

}


  modelopen = (data,id) => {
    if (data === "view") {
      this.setState({ openview: true,openuploadview:true,viewdata:this.state.tableDatafull[id]  });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    } else if (data === "upload") {
      this.setState({ uploadview: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false, uploadview: false,openuploadview:false });
  };

  formatTimeShow=(h_24)=> {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
}

duplicaterecall=()=>{
  this.setState({props_loading:true})
  var self = this
  var startdate = dateformat(this.state.selectedDatepen[0].startDate, "yyyy-mm-dd")
  var enddate = dateformat(this.state.selectedDatepen[0].endDate, "yyyy-mm-dd")
    axios({
        method: 'POST', //get method 
        url: apiurl + '/getTestPendingResult',
        data:{
          "lab_id": "2",
          "date":startdate,
          "period": "Day",
          "date_to":enddate
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
            action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon onClick={()=>this.openuploadForpending(index)}/></div>,
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

  render() {
    const searchdata = []
    this.state.tableDatafull.filter((data,index) => {
      console.log(data,"datadata")
      if (this.state.search === undefined || this.state.search === null){
        searchdata.push({
          name: data.customer,
          test: data.test,
          date: dateformat(data.test_date, "dd mmm yyyy"),
          time: data.test_time ? this.formatTimeShow(data.test_time) :'-',
        status: <span className="pending_clrred">{data.status}</span>,
        action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon onClick={()=>this.openuploadForpending(index)}/></div>,
        id:index
        })
      }
      else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase()) || data.test !== null && data.test.toLowerCase().includes(this.state.search.toLowerCase()) || data.test_date !== null && dateformat(data.test_date, "dd mmm yyyy").toLowerCase().includes(this.state.search.toLowerCase()) || data.test_time !== null && this.formatTimeShow(data.test_time).toLowerCase().includes(this.state.search.toLowerCase())) {
        searchdata.push({
          name: data.customer,
          test: data.test,
          date: dateformat(data.test_date, "dd mmm yyyy"),
          time: data.test_time ? this.formatTimeShow(data.test_time) :'-',
        status: <span className="pending_clrred">{data.status}</span>,
        action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon onClick={()=>this.openuploadForpending(index)}/></div>,
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
          modelopen={(e,id) => this.modelopen(e,id)}
          props_loading={this.state.props_loading}    
        />

        <Modalcomp
          visible={this.state.uploadview}
          title={"UPLOAD TEST RESULTS"}
          closemodal={(e) => this.closemodal(e)}
          modelwidthClass={"resultviewModelWidth"}
        >
          <ResultView onClose={this.closemodal} uploaddata={this.state.uploaddata} getrecall={this.duplicaterecall} />
        </Modalcomp>

        <UploadView onClose={this.closemodal} openuploadview={this.state.openuploadview} viewdata={this.state.viewdata}/>

      </div>
    );
  }
}

export default PendingTable;
