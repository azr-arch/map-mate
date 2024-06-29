import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { useSocket } from "../hooks/use-socket";
import { useGeolocation } from "../hooks/use-geolocation";
import { LocationPin } from "./location-pin";

export const MyComponent = () => {
    const map = useMap();

    const { socket } = useSocket();
    const { coords: myCoords, accuracy } = useGeolocation(socket);

    // const myId = sessionStorage.getItem("id") || "";

    useEffect(() => {
        map.setView(myCoords, 15);
    }, [map, myCoords]);

    return (
        <>
            {/* My Pin */}
            {/* <Marker position={myCoords}>
                <Popup>This is me</Popup>
            </Marker> */}

            <LocationPin coords={myCoords} color="#46e166" name={`${accuracy}`} />

            {/* Other user's pin */}
            {/* {otherUsersInfo.map((user) => {
                if (user.id === myId) return;

                return (
                    <LocationPin
                        key={user.id}
                        coords={user.coords as LatLngExpression}
                        color={randomColor()}
                        name={user.id}
                    />
                );
            })} */}
        </>
    );
};
