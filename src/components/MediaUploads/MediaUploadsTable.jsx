import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ViewMedia from "./ViewMedia";
import MediaUploadsModal from "./MediaUploadsModal";
import order from "../../Images/order.svg";
import "./MediaUploadsTable.css";
import ReactSVG from "react-svg";
import axios from 'axios';
import { apiurl } from "../../App";
import dateformat from 'dateformat';
import DeleteMedia from '../../helpers/ModalComp/deleteModal';
import { ConsoleSqlOutlined } from "@ant-design/icons";
class MediaUploadsTable extends React.Component {
  state = {
    openview: false,
    deleteopen: false,
    tableData:[],
    editData: "",
    viewData:"",
    // workflow:false,
  };
  componentDidMount() {
    this.getTableData()
}
  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);
    var returnobj = {};
    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };
  // modelopen = (data) => {
  //   if (data === "view") {
  //     this.setState({ openview: true });
  //   } else if (data === "edit") {
  //     this.setState({ editopen: true });
  //     this.setState({
  //     })
  //   } else if (data === "workflow") {
  //     this.setState({ workflow: true });
  //     console.log(this.state.workflow,"workflow_check")
  //   }
  // };
  modelopen = (data,id) => {
    console.log(data,"data_checking")
    if (data === "view") {
        console.log(data,"edit_data")
        this.setState({ openview:true })
        this.setState({
          viewData:this.state.totalData[0].details.find(val =>val.id ===id)
        })
        console.log(this.state.viewData,"view_id_check")
        // console.log(id,"id_view")
    }
    else if (data === "edit") {
        this.setState({ editopen: true })
        this.setState({
            editData:this.state.totalData[0].details.find(val => val.id ===id)
        })
        // console.log(this.state.totalData,"dataaa")
        console.log(this.state.editData,"editdata_checkk")
        // alert(this.state.editData,"editdata_check_table")
        // console.log(id,"id_check")
        // Console.log(editData,"editdata_table_check")
        // console.log(this.state.totalData.details,"total_data_check")
    }
}
   // get table data
   getTableData = () => {
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + '/mediauploaddetails',
        data:{
          doctorid:2,
          // vendor_id:1,
          limit:100,
          offset:1,
          pageno:1         
        }
    })
    .then((response) => {
      // console.log(response.data.data[0].details,"res")
      console.log(response,"response_data_table")
      var tableData = [];
        response.data.data[0].details.map((val) => {
            tableData.push({ title: val.media_title,type:val.media_type,uploaded:val.created_on,status:val.is_active,id: val.id })
             console.log(val.id,"idddddd")
        })
        self.setState({
            tableData:tableData,
            props_loading: false,
            totalData:response.data.data
        })
        // console.log(tableData,"table")
        console.log(response.data.data[0].details,"iddd_checkkk")
    }).catch((error) => {
    })
}
closemodal = () => {
  this.setState({ openview:false,editopen:false, deleteopen:false,workflow:false})
}
deleteopen = (type,id) => {
  this.setState({
      deleteopen: true,
      iddata: id
  })
  console.log(id,"type")
}
deleterow = () => {
  this.setState({ props_loading: true })
  var self = this
  axios({
      method: 'delete',
      url: apiurl + '/deleteMediaUpload',
      data: {
          "id": this.state.iddata,
      }
  })
      .then(function (response) {
          self.getTableData()
      })
      .catch(function (error) {
      });
  this.setState({ props_loading: false })
}
  render() {
    const img_var = <ReactSVG src={order} />;
    return (
      <div>
        <Tablecomponent
          heading={[
            //  {id:"order", label:"Order"},
            { id: "", label: "S.No" },
            { id: "title", label: "Media Title" },
            { id: "type", label: "Media Type" },
            { id: "uploaded", label: "Uploaded On" },
            { id: "status", label: "Status" },
            { id: "", label: "Action" },
          ]}
          rowdata={this.state.tableData && this.state.tableData}
          tableicon_align={"cell_eye"}
          deleteopen={this.deleteopen}
          UploadIcon="close"
          GrandTotal="close"
          modelopen={(e,id) => this.modelopen(e,id)}
        />
        {/* <ViewMedia open={this.state.openview} onClose={this.closemodal} /> */}
        <Modalcomp
          visible={this.state.openview}
          title={"VIEW MEDIA"}
          closemodal={(e) => this.closemodal(e)}
          // xswidth={"xs"}
        >
          <ViewMedia visible={this.state.openview} viewData={this.state.viewData} viewopenModal ={this.state.openview && true}/>
        </Modalcomp>
        <Modalcomp  visible={this.state.editopen} editData={this.state.editData}  title={"EDIT MEDIA UPLOADS"} closemodal={(e) => this.closemodal(e)} >
          <MediaUploadsModal getTableData={this.getTableData} closemodal ={this.closemodal} editData={this.state.editData} editopenModal ={this.state.editopen && true} />
        </Modalcomp>
        <Modalcomp  visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} xswidth={"xs"}>
           <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal}  />
         </Modalcomp>
      </div>
    );
  }
}
export default MediaUploadsTable