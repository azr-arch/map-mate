import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { useGeolocation } from "../hooks/use-geolocation";
import { useSocket } from "../hooks/use-socket";
import { LocationPin } from "./location-pin";
// import { MyComponent } from "./my-component";

import "leaflet/dist/leaflet.css";

export const Map = () => {
    const { socket } = useSocket();
    const { coords } = useGeolocation(socket);

    return (
        // Make sure you set the height and width of the map container otherwise the map won't show
        <div className="relative flex items-center justify-center rounded-md overflow-hidden">
            <MapContainer
                center={coords}
                zoom={13}
                style={{
                    height: "400px",
                    width: "100%",
                    maxWidth: "1366px",
                    maxHeight: "768px",
                    borderRadius: "10px",
                }}
                scrollWheelZoom={false}
            >
                <LayersControl>
                    <LayersControl.BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                <LocationPin color="#000" />
            </MapContainer>
        </div>
    );
};
