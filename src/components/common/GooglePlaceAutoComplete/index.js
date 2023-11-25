import React, { useEffect, useState } from "react";
import Html from "./Html";
import "./style.scss";
import axios from 'axios'
import environment from "../../../environment";
import addressModel from "../../../models/address.model";

const GooglePlaceAutoComplete = ({ placeholder, result, id, value }) => {
    const [searchText, setSeatchText] = useState('')
    const search = async (text) => {
        setSeatchText(text)
        result({
            event: 'value',
            value: text
        })
    }

    const placeChange = (place) => {
        setSeatchText(place.formatted_address)
        result({
            event: 'placeChange',
            value: place.formatted_address,
            place
        })
    }

    useEffect(() => {
        let isinitMap=localStorage.getItem('initMap')
        if(isinitMap) initMap()
    })

    const initMap=()=>{
        const input = document.getElementById("pac_input_" + id);
        const options = {
            // componentRestrictions: { country: "us" },
            fields: ["address_components", "geometry", "formatted_address","utc_offset_minutes"],
            strictBounds: false,
            // types: [],
        };
        const autocomplete = new (google).maps.places.Autocomplete(input, options);
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            console.log("place",place)
            placeChange(place)
        });
    }

    useEffect(() => {
        setSeatchText(value)
    }, [value])

    return <>
    <div id="initMap" onClick={e=>initMap()}></div>
    <Html
        id={id}
        result={result}
        placeholder={placeholder}
        searchText={searchText}
        search={search}
    />
    </>
}
export default GooglePlaceAutoComplete