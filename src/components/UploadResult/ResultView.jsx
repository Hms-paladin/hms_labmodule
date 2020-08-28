
import React from 'react';
import './ResultView.css';
import { Upload, Button, notification } from 'antd';
import axios from 'axios';
import { apiurl } from "../../App";
import dateformat from 'dateformat';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import DeleteIcon from '@material-ui/icons/Delete';
import { Spin } from 'antd';

var moment = require('moment');



export default class ResultView extends React.Component {
  state = {
    fileList: [],
    resultdata: this.props.uploaddata,
    uploaddata:this.props.uploaddata,
    // loader:false,
  }


  recallget=()=>{
    axios({
      method: 'POST', //get method 
      url: apiurl + '/viewTestPendingResult',
      data:{
        "booking_id":this.props.reloadid
      }
  })
  .then((response) => {
    this.setState({uploaddata:response.data.data,loader:false})
  })
  }


  handleChange = (info, data) => {
    this.setState({loader:true})

    let fileList = [...info.fileList];

    var formData = new FormData();
    formData.append('test_result', fileList[0].originFileObj)
    formData.set("test_id", data.test_id);
    formData.set("booking_id", data.booking_id)
    formData.set("upload_date", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    formData.set("upload_time", moment(new Date()).format("HH:mm:ss"))

    axios({
      method: 'POST', //get method 
      url: apiurl + "/uploadTestResult",
      data: formData
    })
      .then((response) => {
        console.log(response, "response_dataweek")
        // self.props.onClose()
        this.props.getrecall("uploaded")
        this.recallget()
      })
      


    // fileList = fileList.slice(-2);




    // fileList = fileList.map(file => {
    //   if (file.response) {
    //     file.url = file.response.url;
    //   }
    //   return file;
    // });

    // this.setState({ fileList });
    // console.log(fileList, "fileList")
  };

  // Notification = () => {
  //   const key = 'updatable';

  //   notification.info({
  //     key,
  //     description:
  //       'Uploaded Succesfully',
  //     placement: "topRight",
  //   });
  // }

  uploadFile = () => {
    if (this.state.fileList.length === 0) {
      const key = 'updatable';

      notification.info({
        key,
        description: "Test Name Required",
        placement: "topRight",
      });
    } else {
      var self = this
      for (let i = 0; i < this.state.fileList.length; i++) {
        var formData = new FormData();
        formData.append('test_result', this.state.fileList[i].originFileObj)
        formData.set("test_id", this.state.resultdata && this.state.resultdata[0].test_id);
        formData.set("booking_id", this.state.resultdata && this.state.resultdata[0].booking_id)
        formData.set("upload_date", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
        formData.set("upload_time", moment(new Date()).format("HH:mm:ss"))

        axios({
          method: 'POST', //get method 
          url: apiurl + "/uploadTestResult",
          data: formData
        })
          .then((response) => {
            console.log(response, "response_dataweek")
            self.props.onClose()
            self.props.getrecall("uploaded")
          })
      }
    }

  }


  formatTimeShow = (h_24) => {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':' + h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
  }

  deleteuploadtest=(data)=>{
    this.setState({loader:true})
    console.log(data,"data")
    axios({
      method: 'delete', //get method 
      url: apiurl + "/deleteTestUploadResult",
      data: {
        "booking_id":data.booking_id,
        "test_id":data.test_id,
        "lab_id":2 

      }
    })
      .then((response) => {
        this.props.getrecall("uploaded")
        this.recallget()
      })
  }

  render() {
    const props = {
      name: "file",
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange,
      // multiple: true,
    };
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    const {uploaddata} = this.state
    console.log(this.props.uploaddata, "openresultView")
    console.log(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), "time")

    return (

      <Spin className="spinner_alignupload" spinning={this.state.loader}>

        <div className="resultfirst_half">
          <div className="resultname_child">

            <div className="resultnameparent_child">
              <div className="resultname_div">
                <div>Name</div><div>{uploaddata[0].customer ? uploaddata[0].customer : "---"}</div>
              </div>
              <div className="resultname_div">
                <div>Gender</div><div>{uploaddata[0].gender ? uploaddata[0].gender : "---"}</div>
              </div>
              <div className="resultname_div">
                <div>Age</div><div>{uploaddata[0].age ? uploaddata[0].age : "---"}</div>
              </div>
              <div className="resultname_div">
                <div>Test Date</div><div>{uploaddata[0].test_date ? dateformat(uploaddata[0].test_date, "dd mmm yyyy") : "---"}</div>
              </div>
              <div className="resultname_div">
                <div>Time</div><div>{uploaddata[0].test_time ? this.formatTimeShow(uploaddata[0].test_time) : "---"}</div>
              </div>

            </div>


            {/* <div className="labdate-div">
              <Upload {...props} style={{ width: "100%" }} fileList={this.state.fileList}
              //  showUploadList={false}
              >
                <p className="myimage_upload">{this.state.fileList[this.state.fileList.length - 1] && this.state.fileList[this.state.fileList.length - 1].name}</p>
                <Button type="primary" className="pending_browse_btn">Browse</Button>
              </Upload></div> */}
          </div>
          <div className="Testnameupload">
            {/* <span>Test Name:</span> */}

            <div className="resultsecond_half">
              {
                uploaddata[0].test_info.map((val) => (

                  <div className="list_class">
                    <p className={val.test_result && "uploadedfileclr"}>{val.test_name}</p>
                    <div className="list_class_svg">{val.test_result ?
                    <DeleteIcon className="list_class_delete" onClick={()=>this.deleteuploadtest(val)} />:
                    <>
                      <Upload {...props} onChange={(info) => this.handleChange(info, val)}>
                        <OpenInBrowserIcon className="list_class_browse" />
                      </Upload>
                      <DeleteIcon className="list_class_delete" />
                      </>}
                    </div>
                  </div>
                ))
              }
              {/* <div className="upload_result_cont">
                            <p className="ectro_test">Electrocardiogram</p>
                            <p className="ectro_test">Galactosemia Test</p>
                            <p className="ectro_test">Blood Test</p>
                        </div>
                        <div className="upload_result_cont">
                            <p className="ectro_test" style={{width:"120px"}}>Electrocardiogram</p>
                        </div> */}
            </div>
          </div>
        </div>
        <div className="user_buttons_container">
          <div><Button variant="contained" className="common_btn_cancel" onClick={() => this.props.onClose()}>Cancel</Button></div>
          {/* <div><Button variant="contained" className="common_btn_submit" color="primary" onClick={this.uploadFile}>Submit</Button></div> */}
        </div>

      </Spin>

    )
  }
}


