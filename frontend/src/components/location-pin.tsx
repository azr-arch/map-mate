import { Marker, Popup } from "react-leaflet";
import L, { LatLng } from "leaflet";

export const LocationPin = ({
    color,
    position,
    name,
}: {
    color: string;
    position?: LatLng;
    name?: string;
}) => {
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

    console.log({ color, name });

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
            <Popup>This is {name}</Popup>
        </Marker>
    );
};
