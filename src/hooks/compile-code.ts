const API_BASE_URL = import.meta.env.DEV ? "http://localhost:8000" : "";

interface CompileResponse {
    output: string;
    error: string | null;
}

export async function compileCode(
    code: string,
    language: string,
    input = "",
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
        const error = (await response.json()) as { detail?: string };
        throw new Error(error.detail ?? "Failed to compile code");
    }

    const data = (await response.json()) as CompileResponse;
    if (!data.output && !data.error) {
        throw new Error("No output or error received from compiler");
    }

    return data.error ?? data.output;
}
