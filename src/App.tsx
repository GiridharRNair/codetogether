import { Button } from "#components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "#components/ui/field";
import { Input } from "#components/ui/input";

function App() {
    return (
        <div className="flex h-screen items-center justify-center w-full">
            <form className="w-90">
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>Join Room</FieldLegend>
                        <FieldGroup>
                            <Field orientation="vertical">
                                <Input
                                    id="room-code-input"
                                    placeholder="Enter code"
                                    required
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <FieldSeparator />

                    <FieldSet>
                        <FieldGroup>
                            <Button type="button" className="w-full">
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
