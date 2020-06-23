import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./PendingTable.css";
import ResultView from "./ResultView";

class PendingTable extends React.Component {
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
    } else if (data === "upload") {
      this.setState({ uploadview: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false, uploadview: false });
  };

  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "name", label: "Customer" },
            { id: "test", label: "Test" },
            { id: "date", label: "Test Date" },
            { id: "time", label: "Time" },
            { id: "status", label: "Status" },
            { id: "", label: "Action" },
          ]}
          rowdata={[
            this.createData({
              name: "ABDUL-KHAAFID",
              test: "Blood",
              date: "18 Sep 2019",
              time: "10.00 AM",
              status: <span className="pending_clrred">Pending</span>,
            }),
            this.createData({
              name: "AHMED",
              test: "Arthroscopy",
              date: "18 Sep 2019",
              time: "10.30 AM",
              status: <span className="pending_clrred">Pending</span>,
            }),
            this.createData({
              name: "IRFAN",
              test: "Electrocardiogram",
              date: "17 Sep 2019",
              time: "11.30 AM",
              status: <span className="pending_clrred">Pending</span>,
            }),
            this.createData({
              name: "ZAINAB",
              test: "Galactosemia Test",
              date: "09 Dec 2019",
              time: "11.30 AM",
              status: <span className="pending_clrred">Pending</span>,
            }),
            this.createData({
              name: "SAMREEN",
              test: "Immunoglobulins",
              date: "09 Dec 2019",
              time: "11.30 AM",
              status: <span className="pending_clrred">Pending</span>,
            }),
            this.createData({
              name: "RASHID",
              test: "Skull-XRay",
              date: "08 Dec 2019",
              time: "11.30 AM",
              status: <span className="pending_clrred">Pending</span>,
            }),
          ]}
          // tableicon_align={"cell_eye"}
          EditIcon="close"
          DeleteIcon="close"
          GrandTotal="close"
          Workflow="close"
          modelopen={(e) => this.modelopen(e)}
        />
        {/* <ResultView open={this.state.openview} onClose={this.closemodal} /> */}

        {/* <Modalcomp  visible={this.state.openview}closemodal={(e)=>this.closemodal(e)}
        // xswidth={"xs"}
        >
           
        </Modalcomp> */}

        <Modalcomp
          visible={this.state.uploadview}
          title={"UPLOAD TEST RESULTS"}
          closemodal={(e) => this.closemodal(e)}
        >
          <ResultView />
        </Modalcomp>

        {/* <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp> */}
      </div>
    );
  }
}

export default PendingTable;
