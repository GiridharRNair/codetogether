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

const SUPPORTED_LANGUAGES = [
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C++", value: "cpp" },
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Go", value: "go" },
    { label: "Kotlin", value: "kotlin" },
];

function Room() {
    const { roomId } = useParams();
    const name = uniqueNamesGenerator(config);

    const { connectOnMount, users, language, setLanguage } = useConnectOnMount({
        channel: roomId ?? "",
        name: name,
    });

    if (!roomId || !uuidValidate(roomId)) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <h1>Room: {roomId}</h1>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
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

                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.label}
                        </option>
                    ))}
                </select>
            </div>

            <RealtimeMonaco
                connectOnMount={connectOnMount}
                language={language}
                height="90vh"
                theme="dark"
            />
        </div>
    );
}

export default Room;
