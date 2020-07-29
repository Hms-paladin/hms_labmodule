import React from "react";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "../ManageTest/LabTestTable.css";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import axios from 'axios';
import { apiurl } from "../../App";
import DeleteMedia from '../../helpers/ModalComp/deleteModal';
import { notification } from "antd"
import CategoryForm from "./CategoryForm";


var moment = require('moment');

class LabTestCategory extends React.Component {
    state = {
        openview: false,
        tableData: [],
        responseAllData: [],
        viewdata: [],
        editdata: []
    };

    componentDidMount() {
        this.getTableData()
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.getdatacall) {
            this.props.falsegetmethod()
        }
    }

    handleClickclose = () => {
        this.setState({ open: false });
    }

    getTableData = (notifyMsg, deleteData) => {
        this.setState({ props_loading: true })
        var self = this
        axios({
            method: 'POST', //get method 
            url: apiurl + '/get_mas_lab_test_category',
            data: {
                "lab_vendor_id": "2"
            }
        })
            .then((response) => {
                console.log(response, "response_data")

                var tableData = [];
                var responseAllData = [];
                response.data.data.map((val) => {
                    tableData.push({
                        test: val.lab_test_category, active: val.is_active === 1 ? "Active" : "Inactive",
                        id: val.test_category_id
                    })
                    responseAllData.push(val)
                })
                self.setState({
                    tableData: tableData,
                    responseAllData: responseAllData,
                    props_loading: false
                })
                if (notifyMsg) {
                    notification.info({
                        description:
                            deleteData === true ? notifyMsg : 'Record ' + notifyMsg + ' Successfully',
                        placement: "topRight",
                    });
                }
            })
    }

    modelopen = (data, id) => {
        if (data === "edit") {
            var editdata = this.state.responseAllData.filter((editdata) => {
                return editdata.test_category_id === id
            })

            console.log(editdata, "editdata")
            this.setState({ editopen: true, editdata: editdata });
        }
    };

    closemodal = (editbol) => {
        this.setState({ openview: false, editopen: false, props_loading: false, deleteopen: false });
    };

    deleteopen = (type, id) => {
        this.setState({
            deleteopen: true,
            iddata: id
        })
    }

    deleterow = () => {
        this.setState({ props_loading: true })
        var self = this
        axios({
            method: 'delete',
            url: apiurl + '/delete_mas_lab_test_category',
            data: {
                "test_category_id": this.state.iddata,
            }
        }).then(function (response) {
                if (response.data.msg === "Success") {
                    self.getTableData("Deleted")
                } else {
                    self.getTableData("Test name already existes for this category", true)
                }
            })
            .catch(function (error) {
                // alert("error")
            });
        this.setState({ props_loading: false })
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            search: newProps.searchData,
        })
    }

    render() {
        const searchdata = []
        this.state.responseAllData.filter((data, index) => {
            console.log(data, "datadata")
            if (this.state.search === undefined || this.state.search === null) {
                searchdata.push({
                    test: data.lab_test_category,
                    active: data.is_active === 1 ? "Active" : "Inactive",
                    id: data.test_category_id
                })
            }
            else if (data.lab_test_category !== null && data.lab_test_category.toLowerCase().includes(this.state.search.toLowerCase()) || data.is_active !== null && data.is_active === 1 ? "Actice" : "Inactive".toLowerCase().includes(this.state.search.toLowerCase())) {
                searchdata.push({
                    test: data.lab_test_category,
                    active: data.is_active === 1 ? "Active" : "Inactive",
                    id: data.test_category_id
                })
            }
        })

        return (
            <div>
                <Tablecomponent
                    heading={[
                        { id: "", label: "S.No" },
                        { id: "test", label: "Test Category" },
                        { id: "active", label: "Status" },
                        { id: "", label: "Action" },
                    ]}
                    rowdata={searchdata}
                    modelopen={(e, currentid) => this.modelopen(e, currentid)}
                    props_loading={this.state.props_loading}
                    deleteopen={this.deleteopen}
                    VisibilityIcon={"close"}
                />
                <Modalcomp
                    visible={this.state.editopen}
                    title={"MANAGE CATEGORY"}
                    closemodal={(e) => this.closemodal(e)}
                    xswidth={"xs"}
                >
                    <CategoryForm
                        visible={this.state.open}
                        closemodal={this.handleClickclose}
                        edithide={"edithide"}
                        editdata={this.state.editdata}
                        callget={this.getTableData}
                        closemodal={(editbol) => this.closemodal(editbol)}
                    />
                </Modalcomp>

                <Modalcomp visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} xswidth={"xs"}>
                    <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal} />
                </Modalcomp>

            </div>
        );
    }
}

export default LabTestCategory;
