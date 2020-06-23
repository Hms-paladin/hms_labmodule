import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ListView from "./ListView";
import "./AppointmentsTable.css";

class Approvalmanagement extends React.Component {
  state = {
    openview: false,
  };

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };
  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "name", label: " Customer Name" },
            { id: "test", label: "Test" },
            { id: "date", label: "Date" },
            { id: "time", label: "Time" },
            { id: "", label: "Action" },
          ]}
          rowdata={[
            this.createData({
              name: "AAMINA",
              test: "Blood Test",
              date: "18 Dec 2019",
              time: "09.00 AM",
            }),
            this.createData({
              name: "MOHAMED",
              test: "Arthroscopy",
              date: "18 Dec 2019",
              time: "09.30 AM",
            }),
            this.createData({
              name: "ABLA",
              test: "Electrocardiogram",
              date: "18 Dec 2019",
              time: "09:45 AM",
            }),
            this.createData({
              name: "ZAINAB",
              test: "Galactosemia Test",
              date: "18 Dec 2019",
              time: "10.05 AM",
            }),
            this.createData({
              name: "SAMREEN",
              test: "Immunoglobulins",
              date: "18 Dec 2019",
              time: "10.47 AM",
            }),
            this.createData({
              name: "RASHID",
              test: "Skull X-Ray",
              date: "18 Dec 2019",
              time: "11.15 AM",
            }),
          ]}
          // tableicon_align={"cell_eye"}
          EditIcon="close"
          DeleteIcon="close"
          UploadIcon="close"
          GrandTotal="close"
          Workflow="close"
          modelopen={(e) => this.modelopen(e)}
        />
        <ListView open={this.state.openview} onClose={this.closemodal} />
        {/* <Modalcomp  visible={this.state.openview} className="modal"  closemodal={(e)=>this.closemodal(e)}   xswidth={"xs"}

        >
            <ListView onClose={this.closemodal} />
    
        </Modalcomp> */}

        {/* <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp> */}
      </div>
    );
  }
}
export default Approvalmanagement;
