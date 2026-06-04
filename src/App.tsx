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
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import landingPageVisual from "#assets/landing-page-visual.svg";

function App() {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState("");

    const handleCreateRoom = () => {
        const roomId = uuidv4();
        navigate(`/room/${roomId}`);
    };

    const handleJoinRoom = () => {
        if (roomCode.trim() && uuidValidate(roomCode.trim())) {
            navigate(`/room/${roomCode.trim()}`);
        }
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center w-full">
            <img src={landingPageVisual} alt="CodeTogether" className="w-120" />
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
