import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./RevenueTable.css";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import { FaHourglassEnd } from "react-icons/fa";

class RevenueTable extends React.Component {
  state = {
    openview: false,
    props_loading:false
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
            { id: "customer", label: "Customer" },
            { id: "test", label: "Test" },
            { id: "date", label: "Date" },
            { id: "cash", label: "Cash" },
            { id: "card", label: "Card" },
            { id: "insurance", label: "Insurance" },
            { id: "wallet", label: "Wallet" },
            { id: "charge", label: "Total Charge(KWD)" },
            // { id: "", label: "Action" }
          ]}
          rowdata={[
            this.createData({
              customer: "AAMINA",
              test: "Blood Test",
              age: "18 Dec 2019",
              cash: "0",
              card: "40",
              insurance: "20",
              wallet: "0",
              charge: "60",
              cost:"20"
            }),
            this.createData({
              customer: "MOHAMED",
              test: "Hemoglobin Test",
              age: "18 Dec 2019",
              cash: "0",
              card: "40",
              insurance: "20",
              wallet: "10",
              charge: "50",
              cost:"20"
            }),
            this.createData({
              customer: "MOHAMED",
              test: "Hemoglobin Test",
              age: "18 Dec 2019",
              cash: "0",
              card: "40",
              insurance: "20",
              wallet: "10",
              charge: "50",
              cost:"20"
            }),
        
          ]}
          tableicon_align={"cell_eye"}
          VisibilityIcon="close"
          DeleteIcon="close"
          EditIcon="close"
          UploadIcon="close"
          Workflow="close"
          grandtotal="total"
          props_loading={this.state.props_loading}
          modelopen={(e) => this.modelopen(e)}
        />
        {/* <div className="docrevenue_total">
          <div className="totalkwd">
            <p className="grand_total">Grand Total</p>
            <span className="grand_total">:</span>
            <p className="revtotal_amt">4800 KWD</p>
          </div>
        </div> */}

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

export default RevenueTable;
