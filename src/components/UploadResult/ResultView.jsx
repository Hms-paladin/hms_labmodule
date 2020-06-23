
import React from 'react';
import './ResultView.css';
import { Upload, message,Icon,Button } from 'antd';
// import Button from '@material-ui/core/Button';

export default class ResultView extends React.Component{
    state={
      fileList: []   
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
    };
      render(){
        const props = {
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          onChange: this.handleChange,
          multiple: true,
        };
      const styles = "";
      const { classes, onClose, cancel, selectedValue, ...other } = this.props;

      
          return(
            <>
                      <div className="resultfirst_half">
                        <div className="resultname_child">
                              <div className="resultname_div"><p style={{width:"30%"}}>Name</p><p style={{color:"#333"}}>Abdul-Khaafid</p></div>
                              <div className="resultname_div"><p style={{width:"30%"}}>Gender</p><p style={{color:"#333"}}>Male</p></div>
                              <div className="resultname_div"><p style={{width:"30%"}}>Age</p><p style={{color:"#333"}}>26</p></div>
                              <div className="resultname_div"><p style={{width:"30%"}}>Test Date</p><p style={{color:"#333"}}>11 Apr 2010</p></div>
                              <div className="resultname_div"><p style={{width:"30%"}}>Time</p><p style={{color:"#333"}}>09:00 AM</p></div>
                              <div className="labdate-div">
                          <Upload {...props} style={{width:"100%"}} fileList={this.state.fileList}>
                              <span className="myimage_upload">Electrocardiogram.Pdf</span>
                              <Button type="primary" className="pending_browse_btn">Browse</Button>      
                          </Upload></div>
                        </div>

                      <div className="resultsecond_half">
                        {
                          this.state.fileList.map((val) => (
                                                       
                            <ul className="list_class">
                              {val.name}
                            </ul>   
                          ))
                        }
                        <div className="upload_result_cont">
                            <p className="ectro_test">Electrocardiogram</p>
                            <p className="ectro_test">Galactosemia Test</p>
                            <p className="ectro_test">Blood Test</p>
                        </div>
                        <div className="upload_result_cont">
                            <p className="ectro_test" style={{width:"120px"}}>Electrocardiogram</p>
                        </div>
                        </div>
                        </div>
                        <div className="user_buttons_container">
                            <div><Button variant="contained" className="cancel_button" onClick={()=>this.props.closemodal(false)}>Cancel</Button></div>
                            <div><Button variant="contained" className="Upload_button" color="primary">Submit</Button></div>
                        </div>
              {/* </div> */}
          
          </>
            
          )
      }
    }
  
  
