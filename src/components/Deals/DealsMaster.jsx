import React, { Component } from "react";
import BookingDetails from "./BookingDetails";

export default class DealsMaster extends Component {
  render() {
  
    return (
      <div>
        <div className="dashboard_header">
          <div className="dashboard_title">DEALS</div>
        </div>
        <BookingDetails />
      </div>
    );
  }
}
