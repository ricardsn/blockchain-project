import React, { Component, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerWrapper from './DatePickerWrapper';

class SalmonForm extends Component {
    render() {
        const { registerSalmon } = this.props;
        
        return (
            <form onSubmit={ registerSalmon } >
                <div class="form-group">
                    <label for="tracker_id">Tracker ID</label>
                    <input type="text" class="form-control" name="tracker_id" id="tracker_id" placeholder="Enter tracker id" />
                </div>
                <div class="form-group">
                    <label for="weight">Salmon weight</label>
                    <input type="text" class="form-control" name="weight" id="weight" placeholder="Enter weight" />
                </div>
                <div class="form-group">
                    <label for="length">Salmon length</label>
                    <input type="text" class="form-control" name="length" id="length" placeholder="Enter length" />
                </div>
                <div class="form-group">
                    <label for="status">Salmon status</label>
                    <select class="form-control" id="status" name="status">
                        <option value="0">Alive</option>
                        <option value="1">Dead</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="catch_time">Salmon catch date</label>
                    <DatePickerWrapper />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default SalmonForm;