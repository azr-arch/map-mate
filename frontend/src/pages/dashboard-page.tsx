import { Map } from "../components/map";
import { NearbyUsers } from "../components/nearby-users";

export const DashboardPage = () => {
    return (
        <div className="w-full h-full pt-8 px-16 space-y-4">
            <Map />

            {/* List of nearby users */}
            <NearbyUsers />
        </div>
    );
};
