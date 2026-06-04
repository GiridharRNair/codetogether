import { useState } from "react";
import { Button } from "#components/ui/button";
import {
    Field,
    FieldGroup,
    FieldSeparator,
    FieldSet,
} from "#components/ui/field";
import { Input } from "#components/ui/input";
import { useNavigate } from "react-router";
import landingPageVisual from "./assets/landing-page-visual.svg";

const generateRoomId = () => Math.random().toString(36).slice(2, 8);

function App() {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState("");

    const handleCreateRoom = () => {
        const roomId = generateRoomId();
        navigate(`/room/${roomId}`);
    };

    const handleJoinRoom = () => {
        if (roomCode.trim()) {
            navigate(`/room/${roomCode.trim()}`);
        }
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center w-full">
            <img
                src={landingPageVisual}
                alt="CodeTogether"
                className="w-120"
            />
            <form className="w-90">
                <FieldGroup>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <Input
                                    id="room-code-input"
                                    placeholder="Enter code"
                                    value={roomCode}
                                    onChange={(e) =>
                                        setRoomCode(e.target.value)
                                    }
                                    required
                                />
                                <Button
                                    type="submit"
                                    className="w-full mt-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleJoinRoom();
                                    }}
                                >
                                    Join Room
                                </Button>
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <FieldSeparator> or continue with </FieldSeparator>

                    <FieldSet>
                        <FieldGroup>
                            <Button
                                type="button"
                                onClick={handleCreateRoom}
                                className="w-full"
                            >
                                Create Room
                            </Button>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </form>
        </div>
    );
}

export default App;
