import React from 'react';
import plus from "../../Images/plus.png";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import { Input} from 'antd';
import LabTestCategory from './LabTestCategory';
import CategoryForm from './CategoryForm';

class ManageCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            callgetapi: false,
        };
    }
    handleClickopen = () => {
        this.setState({ open: true });
    };
    handleClickclose = () => {
        this.setState({ open: false });
    };
    callget = () => {
        this.setState({
            callgetapi: true
        })
    }

    render() {
        const { Search } = Input;
        return (
            <div>
                <div className="dashboard_header">
                    <div className="dashboard_title">MANAGE CATEGORY</div>

                    <div style={{ fontSize: "16px" }}>
                        <Search
                            placeholder=" search "
                            onSearch={value => console.log(value)}
                            style={{ width: 150 }}
                            onChange={(e) => this.setState({ searchData: e.target.value })}
                        />
                        <img
                            className="plus-icon"
                            src={plus}
                            style={{ width: 40 }}
                            className="mr-4 ml-5"
                            onClick={this.handleClickopen}
                        />
                    </div>
                </div>


                <LabTestCategory getdatacall={this.state.callgetapi} falsegetmethod={() => this.setState({ callgetapi: false })} searchData={this.state.searchData} />
                <div className="Upload-modal-container">
                    <Modalcomp
                        visible={this.state.open}
                        closemodal={this.handleClickclose}
                        title={"MANAGE CATEGORY"}
                    >
                        <CategoryForm visible={this.state.open}
                            closemodal={this.handleClickclose}
                            callget={this.callget}
                        />
                    </Modalcomp>
                </div>
            </div>
        )
    }
}

export default ManageCategory;