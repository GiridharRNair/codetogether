import { useParams } from "react-router";
import { RealtimeMonaco } from "#components/realtime-monaco";

function Room() {
    const { roomId } = useParams();

    if (!roomId) {
        return null;
    }

    return (
        <div>
            <h1>Room: {roomId}</h1>
            <RealtimeMonaco channel={roomId} height="90vh" />
        </div>
    );
}

export default Room;
