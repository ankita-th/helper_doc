import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { googleSearchPlaceKey } from "../../Config/authConfig";

const LocationAutocomplete = ({ onSelect, field }) => {
  const [address, setAddress] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      onSelect(place.formatted_address, { lat, lng });
    }
  };
  return (
    <Autocomplete
      {...field}
      apiKey={googleSearchPlaceKey}
      onPlaceSelected={(place) => field.onChange(place.formatted_address)}
      onChange={(event) => field.onChange(event.target.value)}
      types={["(regions)"]}
      placeholder="City or country"
      // componentRestrictions={{ country: "us" }} // Restrict results to a specific country if needed
    />
  );
};

export default LocationAutocomplete;
