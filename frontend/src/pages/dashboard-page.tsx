import { useEffect, useState } from "react";
import { Map } from "../components/map";
import { NearbyUsers } from "../components/nearby-users";
import { useSocket } from "../hooks/use-socket";

export interface IMarker {
    coords: number[];
    name: string;
}

export const DashboardPage = () => {
    const [markers, setMarkers] = useState<IMarker[]>([]);
    const { socket } = useSocket();

    const handleAddMarker = (data: { coords: number[]; name: string }) => {
        setMarkers((prev) => [...prev, data]);
    };

    // const handleRemoveMarkers = (data: { coords: LatLng[]; name: string }) => {
    //     setMarkers((prev) => prev.filter((item) => item.name !== data.name));
    // };

    useEffect(() => {
        if (socket) {
            socket.send(
                JSON.stringify({
                    type: "user::remove",
                })
            );
        }

        return () => {
            socket?.close();
        };
    }, [socket]);

    return (
        <div className="w-full h-full pt-8 px-16 space-y-4">
            <Map markers={markers} />

            {/* List of nearby users */}
            <NearbyUsers showMarker={handleAddMarker} />
        </div>
    );
};
