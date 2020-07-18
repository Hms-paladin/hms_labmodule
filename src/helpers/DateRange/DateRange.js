import React from "react";
import { DateRange } from 'react-date-range';
import "./DateRange.css"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


export default class DateRangeSelect extends React.Component {
    state = {
        item: [{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }],
        onCount: 1,
    }
    onday = (item) => {
        if (this.state.onCount === 1) {
            this.setState({
                item: [item.selection],
                onCount: this.state.onCount + 1
            })
        } else {
            this.setState({
                item: [item.selection],
                onCount: 1
            })
            this.props.rangeDate([item.selection])
        }
    }
    render() {
        console.log(this.state.item, "rangedate")
        return (
            <div className={`${this.props.dynalign} daterangeMaster`}>
                <DateRange
                    editableDateInputs={true}
                    onChange={(item) => this.onday(item)}
                    moveRangeOnFirstSelection={false}
                    ranges={this.state.item}
                    showDateDisplay={false}
                />
            </div>
        )
    }
}