import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Tag } from 'antd';
import AddIcon from '@material-ui/icons/Add';
import ValidationLibrary from "../../helpers/validationfunction";
import CloseIcon from '@material-ui/icons/Close';
import { Paper } from "@material-ui/core";
import { apiurl } from "../../App";
import axios from 'axios';
import dateFormat from 'dateformat';
import "./TestView.css";
import { Tabs,Checkbox,Card } from 'antd';
const { TabPane } = Tabs;
export default class TestView extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      name:"",
      testCost:[],
      lab_test_list:[],
      labmanage_test: {
        'lab_test_category': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null,
        },
        'lab_instruction':{
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null,
        }, 
          'lab_test_name':{
            'value': '',
            validation: [{ 'name': 'required' }],
            error: null,
            errmsg: null,
          },
          'lab_cost':{
            'value': '',
            validation: [{ 'name': 'required' },{"name":"allowNumaricOnly"}],
            error: null,
            errmsg: null,
          }, 
          'test_instruction':{
            'value': '',
            validation: [{ 'name': 'required' }],
            error: null,
            errmsg: null,
          }, 
        }
            }
          }

          componentDidMount(){
            if(this.props.edithide){
              this.state.labmanage_test.lab_test_category.value = this.props.editdata[0].lab_test_category
              this.state.labmanage_test.lab_instruction.value = this.props.editdata[0].lab_instruction
              this.setState({})
            }
          }


      deletetag=(id)=> {
        this.state.testCost.splice(id,1)
        this.state.lab_test_list.splice(id,1)

          var testcostdelarr = []
          var labcostobjarr = []
          this.state.lab_test_list.map((data,index)=>{

              testcostdelarr.push(
                <div className="col-sm-6 preview_data" >
                <div className="close_icon"><CloseIcon className="closeicontestview" onClick={()=>this.deletetag(index)} /></div>
                  <Paper className="card_det">
              <div className="test_cnt"><div className="test_cost"><p>{this.state.labmanage_test.lab_test_name.value}</p><p>{this.state.labmanage_test.lab_cost.value}</p></div>
              <div className="instruction"><label>{this.state.labmanage_test.test_instruction.value}</label><p className="test_act">Active</p></div></div>
                  </Paper>
                </div>  
              )

              labcostobjarr.push({
          "lab_test_name":data.lab_test_name,
          "lab_cost":data.lab_cost,
          "test_instruction":data.test_instruction
          })
          })

        this.setState({testCost:testcostdelarr,lab_test_list:labcostobjarr})

      }

      changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);

        var labmanage_test = this.state.labmanage_test;
        var targetkeys = Object.keys(labmanage_test);
        var errorcheck = ValidationLibrary.checkValidation(data, labmanage_test[key].validation);
        labmanage_test[key].value = data;
        labmanage_test[key].error = !errorcheck.state;
        labmanage_test[key].errmsg = errorcheck.msg;
        this.setState({ labmanage_test });
        var filtererr = targetkeys.filter((obj) =>
          labmanage_test[obj].error == true || labmanage_test[obj].error == null);
        if (filtererr.length > 0) {
          this.setState({
            error: true,
            errordummy: false
          })
        } else {
          this.setState({ error: false })
        }
      }


      checkValidation = () => {
        var labmanage_test = this.state.labmanage_test;
        var targetkeys = Object.keys(labmanage_test);
        console.log(targetkeys);
        for (var i in targetkeys) {
          var errorcheck = ValidationLibrary.checkValidation(labmanage_test[targetkeys[i]].value, labmanage_test[targetkeys[i]].validation);
          console.log(errorcheck);
          labmanage_test[targetkeys[i]].error = !errorcheck.state;
          labmanage_test[targetkeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = targetkeys.filter((obj) =>
          labmanage_test[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
          this.setState({ error: true })
       } 
      else {
          this.setState({ error: false })
          if(this.props.edithide){
            this.update()
            this.props.closemodal(true)
          }else{
         
          var self=this
          console.log(this.state.lab_test_list,"fdgh")
          axios({
            method:'POST',
            url: apiurl+'/insert_mas_lab_test',
            data:{
              "lab_test_category": this.state.labmanage_test.lab_test_category.value,
              "lab_instruction":this.state.labmanage_test.lab_instruction.value,
              "lab_test_list":this.state.lab_test_list,
              "lab_vendor_id":"2",
              "lab_created_on": dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
              "lab_modified_on": dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
              "cost": "1",
              "active_flag": "1",
              "lab_id": "2",
              "lab_modified_by": "19",
              "lab_created_by":"19",
            }
          })
          .then((response)=>{
            console.log(response,"response_checkingg")
            self.props.callget()
          })
        }
    
        }
        var testCost = []
        var lab_test_list = []
        var customid =this.state.testCost.length

        testCost.push(...this.state.testCost,
          <div className="col-sm-6 preview_data" >
          <div className="close_icon"><CloseIcon className="closeicontestview" onClick={()=>this.deletetag(customid)} /></div>
            <Paper className="card_det">
        <div className="test_cnt"><div className="test_cost"><p>{this.state.labmanage_test.lab_test_name.value}</p><p>{this.state.labmanage_test.lab_cost.value}</p></div>
        <div className="instruction"><label>{this.state.labmanage_test.test_instruction.value}</label><p className="test_act">Active</p></div></div>
            </Paper>
          </div>  
        )

        lab_test_list.push(...this.state.lab_test_list,{
        "lab_test_name":this.state.labmanage_test.lab_test_name.value,
        "lab_cost":this.state.labmanage_test.lab_cost.value,
        })
        // this.state.labmanage_addtestcost.lab_test_name.value=""
        // this.state.labmanage_addtestcost.lab_cost.value="" 
        
        this.setState({testCost:testCost,lab_test_list:lab_test_list})
      
        this.setState({ labmanage_test })
      }

      addtestcostchangedyn = (data, key) => {
        console.log("key", key);
        console.log("data", data);

        var labmanage_addtestcost = this.state.labmanage_addtestcost;
        var targetkeys = Object.keys(labmanage_addtestcost);
        var errorcheck = ValidationLibrary.checkValidation(data, labmanage_addtestcost[key].validation);
        labmanage_addtestcost[key].value = data;
        labmanage_addtestcost[key].error = !errorcheck.state;
        labmanage_addtestcost[key].errmsg = errorcheck.msg;
        this.setState({ labmanage_addtestcost });
        var filtererr = targetkeys.filter((obj) =>
        labmanage_addtestcost[obj].error == true || labmanage_addtestcost[obj].error == null);
        if (filtererr.length > 0) {
          this.setState({
            error: true,
            errordummy: false
          })
        } else {
          this.setState({ error: false })
        }
      }


      addtestcostcheckValidation = () => {
        var labmanage_addtestcost = this.state.labmanage_addtestcost;
        var targetkeys = Object.keys(labmanage_addtestcost);
        console.log(targetkeys);
        for (var i in targetkeys) {
          var errorcheck = ValidationLibrary.checkValidation(labmanage_addtestcost[targetkeys[i]].value, labmanage_addtestcost[targetkeys[i]].validation);
          labmanage_addtestcost[targetkeys[i]].error = !errorcheck.state;
          labmanage_addtestcost[targetkeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = targetkeys.filter((obj) =>
        labmanage_addtestcost[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
          this.setState({ error: true })
       } 
      else {
          this.setState({ error: false })
          
          
        
        }
        this.setState({ labmanage_addtestcost })
      }

      update=()=>{
        this.props.closemodal(true)
        var self = this
        axios({
            method: 'PUT',
            url: apiurl + '/edit_mas_lab_test',
            data:{
              "id": this.props.editdata[0].id,
              "lab_instruction": this.state.labmanage_test.lab_instruction.value,
              "lab_test_category": this.state.labmanage_test.lab_test_category.value,
              "lab_vendor_id": "2",
              "lab_modified_on": dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
              "lab_modified_by": "19",
              "modified_on": dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss")  
            }
        })
        .then((response) => {
          console.log(response,"response_data")
          self.props.callget()
        })
      }


callback=(key)=>{
  console.log(key);
}
  
//   render() {
//     console.log(this.state.lab_test_list,"lab_test_list")
//     return (
//       <div className="testentry_container mt-4">
         
            
//          <Grid container spacing={2}>
//          <Grid item xs={12} md={!this.props.edithide ? 7 : 12}>
           
           
//          <div className="instruction_area">
//            <Labelbox
//               type="text" 
//               labelname="Test Category"
//               changeData={(data) => this.changeDynamic(data,'lab_test_category')}
//               value={this.state.labmanage_test.lab_test_category.value}
//               error={this.state.labmanage_test.lab_test_category.error}
//               errmsg={this.state.labmanage_test.lab_test_category.errmsg}/>
//            </div>

//            <div className="instruction_area">
//             <Labelbox 
//               type="textarea" 
//               labelname="Patient Instruction"
//               changeData={(data) => this.changeDynamic(data,'lab_instruction')}
//               value={this.state.labmanage_test.lab_instruction.value}
//               error={this.state.labmanage_test.lab_instruction.error}
//               errmsg={this.state.labmanage_test.lab_instruction.errmsg}/>
//             </div>
          
//          </Grid>
//          {!this.props.edithide &&
//          <Grid item xs={12} md={5} className="package_containerthird">
//            <div  className="add_test_container">
//              <div className="add_div">
//               <div  className="add_test">
//               <Labelbox 
//                 type="text" 
//                 labelname="Test Name"
//                 changeData={(data) => this.addtestcostchangedyn(data,'lab_test_name')}
//                 value={this.state.labmanage_addtestcost.lab_test_name.value}
//                 error={this.state.labmanage_addtestcost.lab_test_name.error}
//                 errmsg={this.state.labmanage_addtestcost.lab_test_name.errmsg}/>
//               </div> 
//              <div  className="add_test">
              // <Labelbox 
              //   type="text" 
              //   labelname="Cost (KWD)"
              //   changeData={(data) => this.addtestcostchangedyn(data,'lab_cost')}
              //   value={this.state.labmanage_addtestcost.lab_cost.value}
              //   error={this.state.labmanage_addtestcost.lab_cost.error}
              //   errmsg={this.state.labmanage_addtestcost.lab_cost.errmsg}/>
//               </div>
//              <AddIcon className="test_add" onClick={this.addtestcostcheckValidation} /></div>
//              <div className="test_viewtag_div">
//                {this.state.testCost}
//                </div>
  
//            </div>

//          </Grid>
//   }
//           <div className={`${this.props.edithide==="edithide" ? "manage_test_button-containeredit" : "manage_test_button-container"}`}>
//             <Button className="manage_test_Cancel" onClick={()=>this.props.closemodal(false)}>Cancel</Button>
//             <Button className="manage_test_Submit" onClick={this.checkValidation} >Submit</Button>
//           </div>
          
//           </Grid>
          
//       </div>
//     );
//   }
// }
render(){
  console.log(this.state.lab_test_list,"divya")
  return(
    <div className="manage_test_main">
         <Tabs defaultActiveKey="1" onChange={this.callback}>
             <TabPane tab="Entry" key="1">
               <Grid container spacing={5} className="parent_cnt">
                 <Grid item xs={12} md={6} spacing={2}>
                 <Labelbox
                 type="text" 
                 labelname="Test Category"
                  changeData={(data) => this.changeDynamic(data,'lab_test_category')}
                  value={this.state.labmanage_test.lab_test_category.value}
                  error={this.state.labmanage_test.lab_test_category.error}
                  errmsg={this.state.labmanage_test.lab_test_category.errmsg}
                  />
                   <Labelbox 
               type="textarea" 
               labelname="Patient Instruction"
               changeData={(data) => this.changeDynamic(data,'lab_instruction')}
               value={this.state.labmanage_test.lab_instruction.value}
               error={this.state.labmanage_test.lab_instruction.error}
               errmsg={this.state.labmanage_test.lab_instruction.errmsg}
               />
                 <div>Active</div>
                  <div className="test_ch"><Checkbox className="check_box"/></div>
                 </Grid>
               
                 <Grid item xs={12} md={6}>
                   <Grid container spacing={2} className="test_view">
                     
                     <Grid item xs={8} md={8}>
                    
                 <Labelbox 
                 type="text" 
                 labelname="Test Name"
                 changeData={(data) => this.changeDynamic(data,'lab_test_name')}
                 value={this.state.labmanage_test.lab_test_name.value}
                 error={this.state.labmanage_test.lab_test_name.error}
                 errmsg={this.state.labmanage_test.lab_test_name.errmsg}
                 />
                 </Grid>
                 <Grid item xs={4} md={4}>
                 <Labelbox 
                type="number" 
                labelname="Cost (KWD)"
                changeData={(data) => this.changeDynamic(data,'lab_cost')}
                value={this.state.labmanage_test.lab_cost.value}
                error={this.state.labmanage_test.lab_cost.error}
                errmsg={this.state.labmanage_test.lab_cost.errmsg}/>
                 </Grid>
                 <Grid item={12} md={12}>
                 <Labelbox 
               type="textarea" 
               labelname="Patient Instruction"
               changeData={(data) => this.changeDynamic(data,'test_instruction')}
               value={this.state.labmanage_test.test_instruction.value}
               error={this.state.labmanage_test.test_instruction.error}
               errmsg={this.state.labmanage_test.test_instruction.errmsg}
               />
                 </Grid>
                 <div className="add"><Button className="add_butt" onClick={this.checkValidation}>Add</Button></div>
                 </Grid>
             
               </Grid>
               </Grid>
            </TabPane>
            <TabPane tab="Preview" key="2">
           {this.state.testCost}
             </TabPane> 
          </Tabs>  
    </div>
  )
}
}