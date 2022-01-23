import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom'

class SalmonListPage extends Component {
    state = {
        salmonIds: []
    }

    componentDidUpdate() {
        const { salmonTrack, getAllSalmonIds } = this.props;
        const { salmonIds } = this.state;

        if (Object.keys(salmonTrack).length !== 0 && salmonIds.length === 0) {
            const salmonIdsDataPromise = getAllSalmonIds();
            this.getIdsDataSalmon(salmonIdsDataPromise);
        }
    }

    getIdsDataSalmon = async (promise) => {
        const a = await promise;
        this.setState({ salmonIds: [... new Set(a)] });
        return true;
    };

    render() {
        const { salmonIds } = this.state;

        if (salmonIds.length === 0) {
            return null;
        }

        return (
            <>
                <ul class="list-group">
                    {
                        salmonIds.map((tracker_id) => {
                            return (<li class="list-group-item"> <a href={`${ window.location.origin }/salmon-page/${tracker_id}`}>{tracker_id}</a></li>)
                        })
                    }
                </ul>
            </>
        )
    }
}

export default SalmonListPage;