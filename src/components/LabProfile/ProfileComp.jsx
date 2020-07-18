import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Profilepage from "./Profilepage";

import './ProfileComp.css'

class ProfileComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr"
    };
  }

  render() {
  
    return (
      <div className="deal_listcreatead">
          <Paper className="profile_background">
             <div className="profileback_first">PROFILE</div>
             <Profilepage />
          </Paper>
      </div>
      
    );
  }
}

export default ProfileComp;
