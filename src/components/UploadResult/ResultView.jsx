
import React from 'react';
import './ResultView.css';
import { Upload,Button,notification } from 'antd';
import axios from 'axios';
import { apiurl } from "../../App";

export default class ResultView extends React.Component{
    state={
      fileList: [],
      resultdata:this.props.uploaddata
    } 

    

    handleChange = info => {
      let fileList = [...info.fileList];
  
    
      // fileList = fileList.slice(-2);
  
     
      fileList = fileList.map(file => {
        if (file.response) {
        
          file.url = file.response.url;
        }
        return file;
      });
  
      this.setState({ fileList });
      console.log(fileList,"fileList")
    };

    Notification=()=>{
      notification.info({
        description:
          'Uploaded Succesfully',
          placement:"topRight",
      });
    }

    uploadFile=()=>{
      console.log(this.state.resultdata)
      var self = this
      for(let i = 0;i<this.state.fileList.length;i++){
        var formData = new FormData();
        formData.append('test_result', this.state.fileList[i].originFileObj)
        formData.set("test_id",this.state.resultdata && this.state.resultdata[0].test_id);
        formData.set("booking_id",this.state.resultdata && this.state.resultdata[0].booking_id)
      axios({
        method: 'POST', //get method 
        url: apiurl + "/uploadTestResult",
        data: formData
      })
        .then((response) => {
          console.log(response, "response_dataweek")
          self.props.onClose()
          self.Notification()
        })
      }
  
    }

      render(){
        const props = {
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          onChange: this.handleChange,
          multiple: true,
        };
      const styles = "";
      const { classes, onClose, cancel, selectedValue,uploaddata, ...other } = this.props;
      console.log(this.props.uploaddata,"openresultView")

      
          return(

          <>
                      <div className="resultfirst_half">
                         <div className="resultname_child">

                              <div className="resultnameparent_child">
                                <div className="resultname_div">
                                    <div>Name</div><div>{uploaddata[0].customer?uploaddata[0].customer:"---"}</div>
                                </div>
                                <div className="resultname_div">
                                <div>Gender</div><div>{uploaddata[0].gender?uploaddata[0].gender:"---"}</div>
                                </div>
                                <div className="resultname_div">
                                <div>Age</div><div>{uploaddata[0].age?uploaddata[0].age:"---"}</div>
                                </div>
                                <div className="resultname_div">
                                <div>Test Date</div><div>{uploaddata[0].test_date?uploaddata[0].test_date:"---"}</div>
                                </div>
                                <div className="resultname_div">
                                <div>Time</div><div>{uploaddata[0].uploaded_time?uploaddata[0].uploaded_time:"---"}</div>
                                </div>

                              </div>


                              <div className="labdate-div">
                          <Upload {...props} style={{width:"100%"}} fileList={this.state.fileList}>
                              <p className="myimage_upload">{this.state.fileList[this.state.fileList.length-1] && this.state.fileList[this.state.fileList.length-1].name}</p>
                              <Button type="primary" className="pending_browse_btn">Browse</Button>      
                          </Upload></div>
                        </div>

                      <div className="resultsecond_half">
                        {
                          this.state.fileList.map((val) => (
                                                       
                            <div className="list_class">
                              {val.name}
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
                        <div className="user_buttons_container">
                            <div><Button variant="contained" className="common_btn_cancel" onClick={()=>this.props.onClose()}>Cancel</Button></div>
                            <div><Button variant="contained" className="common_btn_submit" color="primary" onClick={this.uploadFile}>Submit</Button></div>
                        </div>
          
          </>
            
          )
      }
    }
  
  
