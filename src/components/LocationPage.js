import React, { Component, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import './leaflet.css';

class LocationPage extends Component {
    componentDidMount() {
        const L = window.L;
        const map = window.L.map('map').setView([51.505, -0.09], 5);
        const headers = new Headers();
        L.tileLayer(
            'https://api.mapbox.com/styles/v1/mapbox/emerald-v8/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmljaHl6enoiLCJhIjoiY2t5cmN4cmc2MHNucjJ2bzN0NjF2djJoMyJ9.L5ne3O9rILT_GIgI_fziag', {
            tileSize: 512,
            zoomOffset: 0,
            attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        this.getCoordinates();

        setTimeout(() => {
            if (this.lat && this.long) {
                map.setView([this.lat, this.long]);
                L.marker([this.lat, this.long]).addTo(map)
                .bindPopup(`Mock Salmon position [${ this.lat }, ${ this.long }]`)
                .openPopup();
            }
        }, 1000);

    }

    saveData = (long, lat) => {
        this.long = long;
        this.lat = lat;
    }

    // Creating Mock api request for coordinates
    getCoordinates = async () => {
        const response = await fetch('http://localhost:8010/proxy/?randomland=yes&json=1 ', {  // Used proxy  lcp --proxyUrl https://api.3geonames.org
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        })
        .then(response => response.json())
        .then(data => { 
            this.saveData(data.major.longt, data.major.latt)
         });
    }

    render() {

        return (
            <>
                <div id="map"></div>
            </>
        )
    }
}

export default LocationPage;