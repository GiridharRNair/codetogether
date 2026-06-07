const API_BASE_URL = import.meta.env.DEV
    ? "http://localhost:8000"
    : "https://codealong.live";

interface CompileResponse {
    output: string;
    error: string;
    status: "success" | "error";
    exit_code: number;
    signal: number | null;
    time: string;
    total: string;
    memory: string;
}

export async function compileCode(
    code: string,
    language: string,
    input: string = "",
): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/compile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code,
            language,
            input,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to compile code");
    }

    const data: CompileResponse = await response.json();
    return data.output;
}
