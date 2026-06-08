"use client";

import { Editor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

type RealtimeMonacoProps = {
    connectOnMount: (editor: editor.IStandaloneCodeEditor) => void;
    language: string;
    height: string | number;
    className?: string;
    theme: "light" | "dark";
    onChange: (value: string) => void;
};

const DEFAULT_HEIGHT = 550;

const RealtimeMonaco = ({
    connectOnMount,
    language,
    height = DEFAULT_HEIGHT,
    theme,
    onChange,
    ...rest
}: RealtimeMonacoProps) => {
    return (
        <Editor
            height={height}
            language={language}
            theme={theme === "dark" ? "vs-dark" : "light"}
            onMount={connectOnMount}
            onChange={(val) => onChange?.(val ?? "")}
            {...rest}
        />
    );
};

export { RealtimeMonaco };
