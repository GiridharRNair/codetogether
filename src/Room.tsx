import {
    uniqueNamesGenerator,
    adjectives,
    animals,
} from "unique-names-generator";
import type { Config } from "unique-names-generator";
import { useParams, Navigate } from "react-router";
import { validate as uuidValidate } from "uuid";
import { RealtimeMonaco } from "#components/realtime-monaco";
import { useConnectOnMount } from "#hooks/use-connect-on-mount";

const config: Config = {
    dictionaries: [adjectives, animals],
    separator: " ",
    style: "capital",
};

function Room() {
    const { roomId } = useParams();
    const name = uniqueNamesGenerator(config);

    const { connectOnMount, users } = useConnectOnMount({
        channel: roomId ?? "",
        name: name,
    });

    if (!roomId || !uuidValidate(roomId)) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <h1>Room: {roomId}</h1>

            <div>
                Users:{" "}
                {users.map((user) => (
                    <span
                        key={user.clientId}
                        style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: user.color || "gray",
                            marginRight: 5,
                        }}
                    />
                ))}
            </div>

            <RealtimeMonaco
                connectOnMount={connectOnMount}
                height="90vh"
                theme="dark"
            />
        </div>
    );
}

export default Room;
