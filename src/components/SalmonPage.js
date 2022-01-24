import React, { Component, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerWrapper from './DatePickerWrapper';
import SalmonCard from './SalmonCard';
import { Link } from 'react-router-dom'

class SalmonPage extends Component {
    state = {
        salmonData: [],
        isShow: false
    };

    STATUSES = [
        'Dead',
        'Alive'
    ];

    componentDidMount() {
        this.tracker_id = window.location.pathname.replace('/salmon-page/', '');
    }

    componentDidUpdate() {
        const { salmonTrack } = this.props;
        const { salmonData } = this.state;

        if (Object.keys(salmonTrack).length !== 0 && salmonData.length === 0) { // Checking if contract is loaded
            const salmonDataPromise = this.props.getSalmonData(this.tracker_id);
            this.getDataSalmon(salmonDataPromise); // Getting salmon data
        }
    }

    getDataSalmon = async (promise) => {
        const a = await promise;
        this.setState({ salmonData: a });
        return true;
    };

    getStatus(status) {
        return this.STATUSES[status];
    }

    toogleShow = () => {
        const { isShow } = this.state;

        this.setState({ isShow: !isShow });
    }
    
    // Rendering history of Salmon
    renderCard() {
        const { salmonData } = this.state;

        return (
            <>
                {
                    salmonData.map( // Looping through all history data
                        (item, index) => {
                            return ( <SalmonCard salmonData={ item } index={ index } /> );
                        }
                    )
                }
            </>
        );
    }

    render() {
        const { salmonData, isShow } = this.state;

        if (salmonData === undefined) {  // Return user if salmon doesn't exist
            document.location.href="/";
        }

        if (salmonData.length === 0) {
            return null;
        }

        const {
            tracker_id,
            catch_time,
            catcher_id,
            coordinate_url,
            image_url,
            status,
            weight,
            _length: length
        } = salmonData[salmonData.length - 1];

        const date = new Date(parseInt(catch_time * 1000));

        return (
            <>
                <div class="card">
                    <img src={image_url} class="card-img-top" alt="salmon_img" />
                    <div class="card-body">
                        <h5 class="card-title">Current Salmon data</h5>
                        <p class="card-text">This data is displayed for Salmon with tracker: {tracker_id}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Weight: {weight / 1000} kgs </li>
                        <li class="list-group-item">Length: {length} cm</li>
                        <li class="list-group-item">Status: {this.getStatus(status)}</li>
                        <li class="list-group-item">Catch time: {date.getDate()}.{date.getMonth() + 1 < 10 ? '0' : ''}{date.getMonth() + 1}.{date.getFullYear()}</li>
                        <li class="list-group-item">Caught by: {catcher_id}</li>
                        <li class="list-group-item"> { coordinate_url !== 'undefined' ? <a href={ coordinate_url }>Check location</a> : null } </li>
                    </ul>
                    <div class="card-body">
                        <button className={'btn btn-secondary'} onClick={this.toogleShow} >Check History</button>
                        {isShow && this.renderCard()}
                    </div>
                </div>
            </>
        )
    }
}

export default SalmonPage;