import React from 'react'
import './Packagedetails.css';
import { Paper } from "@material-ui/core";
class Packagedetails extends React.Component{
    render(){

        const {viewdata}=this.props
        console.log(viewdata,"viewdata")

        return(

            <div>
                {/* Button Edit */}
                <div className="butt_parent"> 
        <button className="general_button">{viewdata[0].lab_test_category}</button>
      
                </div>
                <div className="p_active">Active</div>
                {/* Instruction Edit */}
                <div className="common_row">
                <div style={{width:"50%"}}>
                    <div className="Instruction_text_edit">Instruction</div>
                        <div className="green_upload_container">
                            <span  className="green_uploadint"></span>
                            <span className="para_edit">
                                {viewdata[0].lab_instruction}
                            </span>
                        </div>
                </div>
            {/*Border Edit  */}
                <div className="border_edit"></div>

                {/* Test edit */}
                <div className="overall_paper_div">
                    <div className="Instruction_text_edit">Test</div>
                    <div>
                        <Paper>
                        <div >
{/*                             
                            <button className="kwd_edit">{viewdata[0].lab_test_name} <label>dfgh</label></button>
                           
                        
                            <span className="blood_edit">{viewdata[0].lab_cost}</span> */}
                             <div className="test_cnt"><div className="test_cost"><label>{viewdata[0].lab_test_name}</label><div>{viewdata[0].lab_cost +"KWD"}</div></div>
                <div className="instruction"><label>{viewdata[0].lab_instruction}</label></div></div>
                        </div>
                        </Paper>

                        {/* <Paper className="Paper_edit">
                        <div >
                            <button className="kwd_edit">400 KWD</button>
                            <span className="blood_edit">Urine Test</span>
                        </div>
                        </Paper>

                        <Paper className="Paper_edit">
                        <div >
                            <button className="kwd_edit">400 KWD</button>
                            <span className="blood_edit">Corona Test</span>
                        </div>
                        </Paper> */}
                    </div>
                        {/* <Paper className="Paper_edit">Blood Test</Paper>
                        <Paper className="Paper_edit">Blood Test</Paper> */}
                    </div>
                </div>
            </div>

        )
    }
}
export default Packagedetails;