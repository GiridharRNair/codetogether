import { useParams } from "react-router";

function Room() {
    const { roomId } = useParams();
    return <div>Room: {roomId}</div>;
}

export default Room;
