import { useParams, Navigate } from "react-router";
import { validate as uuidValidate } from "uuid";
import { RealtimeMonaco } from "#components/realtime-monaco";

function Room() {
    const { roomId } = useParams();

    if (!roomId || !uuidValidate(roomId)) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <h1>Room: {roomId}</h1>
            <RealtimeMonaco channel={roomId} height="90vh" />
        </div>
    );
}

export default Room;
