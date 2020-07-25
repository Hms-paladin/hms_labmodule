import React,{Component} from 'react';
import 'antd/dist/antd.css';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './BasicDetails.css'
import Axios from 'axios';
import ValidationLibrary from "../../helpers/validationfunction";

export default class BasicDetails extends React.Component{
    state={
        open:"",
        ProfileEditData:{
              'Address':{
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null
              },
              'contactperson':{
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null
              },
              'Website':{
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null
              },
              'mobno':{
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null
              },
              'email':{
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null
              }
        }
    }
    changeDynamic = (data, key) => {
        var ProfileEdit = this.state.ProfileEditData;
        var errorcheck = ValidationLibrary.checkValidation(data, ProfileEdit[key].validation);
        ProfileEdit[key].value = data;
        ProfileEdit[key].error = !errorcheck.state;
        ProfileEdit[key].errmsg = errorcheck.msg;
        this.setState({ ProfileEdit });
      }

      
      componentDidMount(){
        // const {EditData,EditOpen}=this.props
        console.log("ProfileGetdata",this.props.ProfileGetdata)
        var EditData = this.props.ProfileGetdata
        // if(EditOpen===true){
          // this.state.editId=EditData[0].vendorId
        this.state.ProfileEditData.Address.value=EditData[0].vendor_address
        this.state.ProfileEditData.contactperson.value=EditData[0].vendor_contact
        this.state.ProfileEditData.Website.value=EditData[0].vendor_website 
        this.state.ProfileEditData.mobno.value=EditData[0].vendor_phone   
        this.state.ProfileEditData.email.value=EditData[0].vendor_email 
        // }
        // console.log(EditData[0].vendor_address,"add")
        this.setState({})
        // console.log(EditData[0].vendor_address,"data")
      }
      EditProfileApi =()=>{
          Axios({
              method:"POST",
              url:"http://52.200.251.222:8158/api/v1/lab/editlabprofiledetails",
              data:{
                // address:"Aminjikarai",
                // mobile:"7397352059",
                // email:"caprillsweet6@gmail.com",
                // website:"www.nurse.com",
                // contact:"nurse company",
                // modifiedby:1,
                // labId:2,
                // uploadFile:"",
          "labId":"2",
	        "address":this.state.ProfileEditData.Address.value,
	        "contact":this.state.ProfileEditData.contactperson.value,
         	"website":this.state.ProfileEditData.Website.value,
         	"mobile":this.state.ProfileEditData.mobno.value,
	        "email":this.state.ProfileEditData.email.value,
          "modifiedby":1,
              }
          })
          .then((response)=>{
              console.log(response,"response")
              // this.props.LabProfileGetapi()
          })
      }
     render(){ 
         const ProfileGetdata =this.props
         console.log(ProfileGetdata,"ProfileGetdata")
        return(
        <div className="basic_details_container">
            <Grid container>
            <Grid item xs={12} md={6} className="basicdetails_container">
                <div className="basicdetails_firstgrid">
                    <div className="basicdetails_child">
                        <Labelbox type="text" labelname="Address"
                         changeData={(data) => this.changeDynamic(data, 'Address')}
                         value={this.state.ProfileEditData.Address.value}
                         error={this.state.ProfileEditData.Address.error}
                         errmsg={this.state.ProfileEditData.Address.errmsg}
                         />
                        <Labelbox type="text" labelname="Contact Person"
                          changeData={(data) => this.changeDynamic(data, 'contactperson')}
                          value={this.state.ProfileEditData.contactperson.value}
                          error={this.state.ProfileEditData.contactperson.error}
                          errmsg={this.state.ProfileEditData.contactperson.errmsg}
                          />
                        <Labelbox type="text" labelname="Website"
                            changeData={(data) => this.changeDynamic(data, 'Website')}
                            value={this.state.ProfileEditData.Website.value}
                            error={this.state.ProfileEditData.Website.error}
                            errmsg={this.state.ProfileEditData.Website.errmsg}
                        />
                   </div>
                </div>
            </Grid>
            <Grid item xs={12} md={6} className="basicdetails_container">
                <div className="basicdetails_firstgrid">
                    <div className="basicdetails_child">
                        <Labelbox type="text" labelname="Mobile Number"
                         changeData={(data) => this.changeDynamic(data, 'mobno')}
                         value={this.state.ProfileEditData.mobno.value}
                         error={this.state.ProfileEditData.mobno.error}
                         errmsg={this.state.ProfileEditData.mobno.errmsg}
                         />
                        <Labelbox type="text" labelname="Email Id"
                         changeData={(data) => this.changeDynamic(data, 'email')}
                         value={this.state.ProfileEditData.email.value}
                         error={this.state.ProfileEditData.email.error}
                         errmsg={this.state.ProfileEditData.email.errmsg}
                         />
                    </div>
                </div>
            </Grid>
            </Grid>
            <div className="buttons_container basicProfilebtn">
                <div>
                    <div>
                        <Button className="cancel_button" variant="contained" onClick={()=>this.props.onClose()}>Cancel</Button>
                    </div>
                 </div>
                <div>
                    <div>
                        <Button className="update_button" variant="contained" color="primary"
                          onClick={this.EditProfileApi}>Update</Button>
                        </div>
                     </div> 
            </div>
        </div>
    )
}
}