import React, { Component, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerWrapper from './DatePickerWrapper';

class SalmonCard extends Component {
    STATUSES = [
        'Dead',
        'Alive'
    ];

    getStatus(status) {
        return this.STATUSES[status];
    }

    render() {
        const {
            salmonData: {
                tracker_id,
                catch_time,
                catcher_id,
                image_url,
                status,
                weight,
                _length: length
            },
            index
        } = this.props;

        const date = new Date(parseInt(catch_time * 1000));

        return (
            <>
                <div class="card" style={ { width: '40rem' } }> 
                    <img src={ image_url } class="card-img-top" alt="salmon_img" />
                        <div class="card-body">
                            <h5 class="card-title">{ index + 1 }. Salmon data</h5>
                            <p class="card-text">This data is displayed for Salmon with tracker: { tracker_id }</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Weight: { weight / 1000 } kgs </li>
                            <li class="list-group-item">Length: { length } cm</li>
                            <li class="list-group-item">Status: { this.getStatus(status) }</li>
                            <li class="list-group-item">Catch time: { date.getDate() }.{ date.getMonth() + 1 < 10 ? '0' : '' }{ date.getMonth() + 1 }.{ date.getFullYear() }</li>
                            <li class="list-group-item">Caught by: { catcher_id }</li>
                        </ul>
                </div>
            </>
        )
    }
}

export default SalmonCard;