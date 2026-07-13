"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import CodeMirror, { EditorView, type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";

export interface MarkdownEditorHandle {
  insertAtCursor: (text: string) => void;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

const theme = EditorView.theme(
  {
    "&": {
      backgroundColor: "#0a0a0a",
      color: "#ffff00",
      fontSize: "0.875rem",
      border: "2px solid #2a2a2a",
    },
    "&.cm-focused": {
      outline: "none",
      borderColor: "var(--color-accent)",
    },
    ".cm-content": {
      fontFamily: "var(--font-mono, monospace)",
      caretColor: "#ffff00",
    },
    ".cm-gutters": {
      backgroundColor: "#0a0a0a",
      color: "#555555",
      border: "none",
    },
    ".cm-activeLine": {
      backgroundColor: "#111111",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#111111",
    },
    ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
      backgroundColor: "#2a2a2a !important",
    },
  },
  { dark: true }
);

export const MarkdownEditor = forwardRef<MarkdownEditorHandle, Props>(
  function MarkdownEditor({ value, onChange, rows = 12 }, ref) {
    const editorRef = useRef<ReactCodeMirrorRef>(null);

    useImperativeHandle(ref, () => ({
      insertAtCursor(text: string) {
        const view = editorRef.current?.view;
        if (!view) {
          onChange(value + text);
          return;
        }
        const { from, to } = view.state.selection.main;
        view.dispatch({
          changes: { from, to, insert: text },
          selection: { anchor: from + text.length },
        });
        view.focus();
      },
    }));

    return (
      <CodeMirror
        ref={editorRef}
        value={value}
        onChange={onChange}
        extensions={[markdown()]}
        theme={theme}
        minHeight={`${rows * 1.6}rem`}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
        }}
      />
    );
  }
);
