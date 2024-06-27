import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";

export interface UserInfo {
    id: string;
    websocket: WebSocket;
    coords: number[];
}

export interface Message {
    type: string;
    data: UserInfo;
}

const GEOLOCATION_OPTION = {
    enableHighAccuracy: true,
    timeout: 5000,
};

export const useGeolocation = (socket: WebSocket | null) => {
    const [coords, setCoords] = useState<LatLngExpression>([0, 0]);
    const [accuracy, setAccuracy] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // const [otherUsersInfo, setOtherUsersInfo] = useState<UserInfo[]>([]); Move it in other part
    const id = sessionStorage.getItem("id");

    function onGeolocationSuccess(position: GeolocationPosition) {
        console.log("Successfully got the location");
        const { latitude, longitude } = position.coords;
        setCoords(() => [latitude, longitude]);
        setAccuracy(() => position.coords.accuracy);
    }

    function onGeolocationError(err: GeolocationPositionError) {
        console.error("Unable to get current location: ", err);
        setError(err.message);
    }

    useEffect(() => {
        let geoId: number;
        if ("geolocation" in navigator) {
            geoId = navigator.geolocation.watchPosition(
                onGeolocationSuccess,
                onGeolocationError,
                GEOLOCATION_OPTION
            );
        }

        () => {
            if (geoId) {
                console.log("Clearing geoId");
                navigator.geolocation.clearWatch(geoId);
            }
        };
    }, []);

    // Responsible for sending own's location info
    // Might move it later
    useEffect(() => {
        if (socket && id) {
            const dataToSend = {
                type: "user::add",
                data: {
                    id,
                    coords,
                },
            };

            console.log("Sending data to server...");
            socket.send(JSON.stringify(dataToSend));
        }
    }, [coords, id, socket]);

    return { coords, accuracy, error };
};
