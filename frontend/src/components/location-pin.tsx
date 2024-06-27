import { Marker, useMapEvents } from "react-leaflet";
import L, { LatLng } from "leaflet";
import { useState } from "react";

export const LocationPin = ({ color }: { color: string }) => {
    const [position, setPosition] = useState<LatLng | null>(null);
    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    const markerHtmlStyles = `
                            background-color: ${color};
                            width: 2rem;
                            height: 2rem;
                            display: block;
                            left: -1rem;
                            top: -1rem;
                            position: relative;
                            border-radius: 3rem 3rem 0;
                            transform: rotate(45deg);
                            border: 1px solid #FFFFFF`;

    const icon = L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 16],
        // labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${markerHtmlStyles}" />`,
    });

    if (!position) return null;

    return (
        <Marker position={position} icon={icon}>
            {/* <Popup>Accuracy is {name}</Popup> */}
        </Marker>
    );
};
