import React from "react";
import "./printdata.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printtableData,"printTableData")

            var printBodyData = this.props.printtableData.map((printdata,index)=>{
                return(
                    <tr>
                  <td>{index+1}</td>
                  <td>{printdata.customer}</td>
                  <td>{printdata.doctorname}</td>
                  <td>{printdata.clinicname}</td>
                  <td>{printdata.cash}</td>
                  <td>{printdata.card}</td>
                  <td>{printdata.insurance}</td>
                  <td>{printdata.wallet}</td>
                  <td>{printdata.totalcharge}</td>
                </tr>
                )
            })
        

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Uploaded Details</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Customer</th>
            <th>Doctor Name</th>
            <th>Clinic Name</th>
            <th>Cash</th>
            <th>Card</th>
            <th>Insurance</th>
            <th>Wallet</th>
            <th>Total Charge</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }