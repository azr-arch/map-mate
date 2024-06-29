import { LatLngExpression } from "leaflet";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

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

let flag = false;

export const useGeolocation = (socket: WebSocket | null) => {
    const [coords, setCoords] = useState<LatLngExpression | null>(null);
    const [accuracy, setAccuracy] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const { user } = useUser();

    const onGeolocationSuccess = useCallback((position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setCoords(() => [latitude, longitude]);
        setAccuracy(() => position.coords.accuracy);
    }, []);

    const onGeolocationError = useCallback((err: GeolocationPositionError) => {
        console.error("Unable to get current location: ", err);
        setError(err.message);
    }, []);

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
                navigator.geolocation.clearWatch(geoId);
            }
        };
    }, [onGeolocationError, onGeolocationSuccess]);

    // Responsible for sending own's location info
    // Might move it later
    useEffect(() => {
        if (socket && user && coords) {
            const dataToSend = {
                // Upon very first render the user add event is emitted from then, user update is emitted
                type: flag ? "user::update" : "user::add",
                data: {
                    id: user.id,
                    username: user.fullName,
                    coords,
                },
            };

            socket.send(JSON.stringify(dataToSend));

            flag = true;
        }

        () => {
            socket?.close();
            flag = false;
        };
    }, [coords, socket, user]);

    return { coords, accuracy, error };
};
