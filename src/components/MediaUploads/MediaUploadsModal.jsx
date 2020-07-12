import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './MediaUploadsModal.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Upload } from 'antd';
import { FiInfo } from "react-icons/fi";
import uploadimage from '../../Images/upload-button.png'
import Modalcomp from '../../helpers/ModalComp/Modalcomp';
import UploadMedia from './UploadMedia';
import axios from 'axios';
import {message } from 'antd';
import { apiurl } from "../../App";
import dateformat from 'dateformat';
import ValidationLibrary from "../../helpers/validationfunction";
// var fileListData=[];
// const props = {
//   name: 'file',
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   headers: {
//     authorization: 'authorization-text',
//   },
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//       alert("file")
//     }
//     if (info.file.status === 'done') {
//       console.log("asdfjkasdfjsd",info.fileList)
//       message.success(`${info.file.name} file uploaded successfully`);
//       fileListData=info.fileList;
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },}
export default class MediaUploadsModal extends Component {
    constructor(props){
        super(props)
        this.state={
            open:false,
            imageurl:"",
            mediaupload_lab: {
              'media_title': {
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null,
              },
              'media_description':{
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null,
              },
      },
      'mediaupload_active':false,
      'upload_browser':{},
}
}
    handleOpen=()=>
    {
        this.setState({open:true})
    }
    handleClose=()=>
    {
        this.setState({open:false})
    }
    changeDynamic = (data, key) => {
    //   if (key === 'profile_pic') {
    //     this.handleChange(data)
    // }
      var mediaupload_lab = this.state.mediaupload_lab;
      var errorcheck = ValidationLibrary.checkValidation(data, mediaupload_lab[key].validation);
      mediaupload_lab[key].value = data;
      mediaupload_lab[key].error = !errorcheck.state;
      mediaupload_lab[key].errmsg = errorcheck.msg;
      this.setState({ mediaupload_lab });
    }
// VALIDATION
    checkValidation = () => {
      var mediaupload_lab = this.state.mediaupload_lab;
      var medicineKeys = Object.keys(mediaupload_lab);
      // console.log(medicineKeys);
      for (var i in medicineKeys) {
        var errorcheck = ValidationLibrary.checkValidation(mediaupload_lab[medicineKeys[i]].value, mediaupload_lab[medicineKeys[i]].validation);
        // console.log(errorcheck);
        mediaupload_lab[medicineKeys[i]].error = !errorcheck.state;
        mediaupload_lab[medicineKeys[i]].errmsg = errorcheck.msg;
      }
      var filtererr = medicineKeys.filter((obj) =>
        mediaupload_lab[obj].error == true);
      // console.log(filtererr.length)
      if (filtererr.length > 0) {
        this.setState({ error: true })
      } else {
        this.setState({ error: false })
        this.onSubmitData()
      }
      this.setState({mediaupload_lab})
    }
    onSubmitData = () => {
      console.log(this.state.imageurl.name,"checking_imageurl_value")
      var formData = new FormData();
      formData.append('imageArray', this.state.imageurl)
      formData.set("mediatype","image");
      formData.set("mediasortorder", 1)
      formData.set("mediavendorId", 2)
      formData.set("activeflag", 1)
      formData.set("createdby", 1)
      formData.set("created_on", dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"))
      formData.set("modifiedby", 1)
      formData.set("modifiedon", 1)
      formData.set("ipaddress", "192.144.23")
      formData.set("mediatitle", this.state.mediaupload_lab.media_title.value)
      formData.set("mediadescription", this.state.mediaupload_lab.media_description.value)
      formData.set("isactive", this.state.mediaupload_active == true ? 1:0)
      if(this.props.editData){
        this.mediaupload_labUpdateApi(formData)   // Update Api Call
      }else{
        this.mediaupload_labAddApi(formData)   // Insert Api Call
      }
      this.props.closemodal()
    }
    // POST API FOR ADD MEDIA
    mediaupload_labAddApi = (mediaupload_labApiData) => {
      axios({
        method: 'POST',
        url: apiurl + '/insertMediaUpload',
        data: 
          mediaupload_labApiData
      })
      .then((response) => {
        console.log(response,"post_check_response")
        this.props.getTableData()
      }).catch((error) => {
        alert(JSON.stringify(error))
      })
    }
    // for put api
   mediaupload_labUpdateApi = (mediaupload_labApiData) => {
      axios({
        method:'PUT',
        url: apiurl+'/editMediaUpload',
        data:{
          id:this.props.editData.id,
          ...mediaupload_labApiData
        }
      })
      .then((response)=>{
        console.log(response,"response_checkingg")
        this.props.getTableData()
      }).catch((error)=>{
        alert(JSON.stringify(error))
      })
    }
componentDidMount(){
      const {editData,editopenModal} = this.props;
      if(editopenModal === true){
        this.state.editId= editData.id
        this.state.mediaupload_lab.media_title.value = editData.media_title
        // this.state.media_filename = editData.media_filename
        this.state.dataa = editData.dataa
        if(editData.media_filename != undefined && editData.media_filename != ''){  
          var it = editData.media_filename.split('/');
          var test = it[it.length-1].split('_')
          var dataa = test[test.length-1]
        }
        console.log(dataa,"dataa")
        // this.state.media_filename = editData.media_filename
        this.state.media_filename = dataa
        this.state.mediaupload_lab.media_description.value = editData.media_description
        this.state.mediaupload_active=editData.is_active === 1 ? true:false
        // console.log(this.state.mediaupload_lab.media_description.value,"descri_check")
      }
      this.setState({})
}
  // For checkbox api 
  dealActiveCheck = (e) => {
    this.setState({
      mediaupload_active: e.target.checked
    })
  }

    uploadFile=(e)=>{
       this.setState({
        imageurl:e.target.files[0]
       })
    }
    render() {
      console.log(this.state.mediaupload_lab.media_description.value,"description")
      console.log(this.state,"statevalue")
      const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: this.handleChange,
        headers: {
          authorization: 'authorization-text',
        },
    }
        return (
            <>
            <div className={`lab_mediauploads ${this.state.open === true && "d-none"}`}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
             <div className="media_title_head">
                 <Labelbox
                 type="text" 
                 labelname="Media Title"
                 changeData={(data) => this.changeDynamic(data,'media_title')}
                 value={this.state.mediaupload_lab.media_title.value}
                 error={this.state.mediaupload_lab.media_title.error}
                 errmsg={this.state.mediaupload_lab.media_title.errmsg}/>
            </div>
             </Grid>
             <Grid item xs={12} md={6}>
             <div className="clinicmedia_upload">Upload<span><FiInfo className="info_icon" onClick={this.handleOpen}/></span></div>
             <div className="labupload_container">
               {/* <Upload {...props} className="upload-field"> 
             <div className="labmedia_button"> <Button className="clinicButton-container">
             Browse File<div className="uploadimage-container">
               <img className="uploadimage" src={uploadimage}/>
               </div>
             </Button>
             </div>
             </Upload> */}
             </div>
             <input  type="file" className="" onChange={this.uploadFile}/>
             {/* <input type="file" onChange={this.onFileChange} id="pdfupload" ref={ref => this.fileInput = ref}/> */}
         </Grid>
         <Grid item xs={12} md={12}>
         <div className="labmedia_checkbox">
           <Labelbox
            type="textarea"
             labelname="Description"
             changeData={(data) => this.changeDynamic(data,'media_description')}
             value={this.state.mediaupload_lab.media_description.value}
             error={this.state.mediaupload_lab.media_description.error}
             errmsg={this.state.mediaupload_lab.media_description.errmsg}/>
             </div>
         <div className="media_checkbox_container"><Checkbox checked={this.state.mediaupload_active}  onChange={(e) => this.dealActiveCheck(e)}/><span className="lab_active">Active</span></div>
        <div className="labmediabutton-container"><Button className="lab_Upload">Cancel</Button><Button className="labcancel-form"  onClick={this.checkValidation}>
          {this.props.editopenModal === true ? "update" : "upload"}
          </Button>
          </div>
        </Grid> 
           </Grid>
           </div>
         <Modalcomp clrgreen title="Upload Instructions" visible={this.state.open} closemodal={this.handleClose}>
             <UploadMedia/>
         </Modalcomp>
         </>
        )
    }
}
