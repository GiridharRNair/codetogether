import { useState } from "react";
import { Button } from "#components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldSeparator,
    FieldSet,
} from "#components/ui/field";
import { Input } from "#components/ui/input";
import { useNavigate } from "react-router";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import landingPageVisual from "#assets/landing-page-visual.svg";
import { toast } from "sonner";

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
        } else {
            toast.error("Please enter a valid room code");
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

                    <FieldSeparator> or </FieldSeparator>

                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <Button
                                    type="button"
                                    onClick={handleCreateRoom}
                                    className="w-full"
                                >
                                    Create Room
                                </Button>
                                <FieldDescription className="text-center">
                                    No login. Free.{" "}
                                    <a
                                        href="https://github.com/GiridharRNair/codetogether"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Opensource
                                    </a>
                                    .
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </form>
        </div>
    );
}

export default App;
