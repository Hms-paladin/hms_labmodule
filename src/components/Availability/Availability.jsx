import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./Availability.css";
import Button from '@material-ui/core/Button';
import DeleteMedia from './DeleteMedia'
import Calendar from '../Calendar/Calendar'
import Modalcomp from '../../helpers/ModalComp/Modalcomp'
export default class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
      <Grid container className="calendar_container">
          <Grid item xs={12} md={7} >
             <Calendar/>
          </Grid>
          <Grid item xs={12} md={5} className="calendar_buttons_container">
              {this.state.open===false?<div><div className="Avail_butt_container"><Button variant="contained" onClick={this.handleClickopen} className="Cancel_butt">Cancel</Button></div>
              <div className="Avail_butt_container"><Button variant="contained" className="Block_butt">Block</Button></div>
              <div className="Avail_butt_container"><Button variant="contained" className="Deals_butt">Deals</Button></div>
              <div className="Avail_butt_container"><Button variant="contained" className="Advertise_butt">Advertise</Button></div></div>:""}
          </Grid>
      </Grid>
      <Modalcomp xswidth={"xs"}  clrchange="text_color" visible={this.state.open} title="Cancel" closemodal={this.handleClickclose}>
      <DeleteMedia/>
      </Modalcomp>
       
      </div>
      
    );
  }
}
