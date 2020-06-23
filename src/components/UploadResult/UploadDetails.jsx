import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Tabs } from 'antd';
// import Report from '../../Images/report.jpg'
import './UploadDetails.css'
import UploadTable from "./UploadTable";
import PendingTable from './PendingTable';
export default class ViewDetails extends React.Component{
constructor(props)
{
super(props)
   this.state={name:""}
}
 callback=(key)=>{
    console.log(key);
  }
render()
{
    const { TabPane } = Tabs;
    return(
        <div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="Uploaded" key="1">
                   {/* <Uploading/> */}
                   <UploadTable />
                </TabPane>
                <TabPane tab="Pending" key="2">
                  <PendingTable/>
                  {/* <Pending/> */}
                </TabPane>
                
            </Tabs>
            <div></div>
        </div>
    )
}
}