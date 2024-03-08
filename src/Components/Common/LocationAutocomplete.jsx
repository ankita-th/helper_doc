import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";

const LocationAutocomplete = ({
  onSelect,
}) => {
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
      apiKey={process.env.REACT_APP_PLACES_API_KEY || ""}
      onPlaceSelected={handlePlaceSelect}
      types={["(regions)"]}
      placeholder="City or country"
      // componentRestrictions={{ country: "us" }} // Restrict results to a specific country if needed
    />
  );
};

export default LocationAutocomplete;
