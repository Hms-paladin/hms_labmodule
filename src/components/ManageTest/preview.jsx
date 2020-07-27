import React from "react";
import CloseIcon from '@material-ui/icons/Close';
import './TestView.css';

class Preview extends React.Component {
    componentWillReceiveProps() {
        console.log("checkingprops", this.props)
    }
    render() {
        return (
            <div className="row">
                {
                    this.props.previewData.length > 0 ? this.props.previewData.map((val,index) => {
                        return (
                            <div className="col-md-4">
                                <div className="card manageCard">
                                    <div className="col-md-12 p-0">
                                        <div className="col-md-5 left_content">
                                            <div className="left_header">{val.lab_test_name}</div>
                                            <div className="left_header">{val.lab_cost} KWD</div>
                                        </div>
                                        <div className="col-md-7 right_content">
                                            {val.lab_test_instruction}
                                            <CloseIcon className="closeIconRightContent" onClick={()=>this.props.deleteCard(index)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="previewNoRecord">
                        No Records Found
                    </div>
                }
            </div>
        )
    }
}

export default Preview;