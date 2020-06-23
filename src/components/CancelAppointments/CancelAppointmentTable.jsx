import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./CancelAppointmentTable.css";

class CancelAppointmentTable extends React.Component {
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
            { id: "name", label: "Customer" },
            { id: "test", label: "Test" },
            { id: "bookeddate", label: "Booked Date" },

            { id: "date", label: "Cancelled Date" },
            { id: "time", label: "Time" },
            // { id: "", label: "Action" }
          ]}
          rowdata={[
            this.createData({
              name: "ABDHUL-KHAAFID",
              test: "Blood Test",
              bookeddate: "15 Dec 2019",
              date: "18 Dec 2019",
              time: "09:00 AM",
            }),
            this.createData({
              name: "AHMED",
              test: "Blood Test",
              bookeddate: "15 Dec 2019",
              date: "18 Dec 2019",
              time: "09:30 AM",
            }),
            this.createData({
              name: "IRFAN",
              test: "Electrocardiogram",
              bookeddate: "15 Dec 2019",
              date: "17 Dec 2019",
              time: "09:45 AM",
            }),
            this.createData({
              name: "ZAINAB",
              test: "Galactosemia Test",
              bookeddate: "15 Dec 2019",
              date: "17 Dec 2019",
              time: "10:05 AM",
            }),
            this.createData({
              name: "SAMREEN",
              test: "Immunoglobulins",
              bookeddate: "15 Dec 2019",
              date: "16 Dec 2019",
              time: "10:47 AM",
            }),
            this.createData({
              name: "RASHID",
              test: "Skull X-Ray",
              bookeddate: "15 Dec 2019",
              date: "15 Dec 2019",
              time: "11:15 AM",
            }),
          ]}
          tableicon_align={"cell_eye"}
          VisibilityIcon="close"
          EditIcon="close"
          DeleteIcon="close"
          UploadIcon="close"
          GrandTotal="close"
          Workflow="close"
          modelopen={(e) => this.modelopen(e)}
        />

        <Modalcomp
          visible={this.state.openview}
          title={"View details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>

        <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
      </div>
    );
  }
}

export default CancelAppointmentTable;
