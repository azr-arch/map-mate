import { useUser } from "@clerk/clerk-react";
import { useOtherLocation } from "../hooks/use-otherLocation";
import { useSocket } from "../hooks/use-socket";

interface NearbyUsersProps {
    showMarker: (data: { coords: number[]; name: string }) => void;
}

export const NearbyUsers = ({ showMarker }: NearbyUsersProps) => {
    const { socket } = useSocket();
    const { activeUsers } = useOtherLocation(socket);
    const { user: currUser } = useUser();

    if (!currUser) return <p>Loading...</p>;

    return (
        <div className="space-y-2">
            <p className="font-semibold ">Nearby</p>
            {activeUsers.length > 1 ? (
                <ul>
                    {activeUsers.map((user) => {
                        if (user.id === currUser.id) return;

                        return (
                            <li
                                key={user.id}
                                onClick={() =>
                                    showMarker({ coords: user.coords, name: user.username })
                                }
                            >
                                <p className="text-black font-medium text-sm">
                                    {user.username} is available
                                </p>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <span className="text-sm text-neutral-600">No users available</span>
            )}
        </div>
    );
};
