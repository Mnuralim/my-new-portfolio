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
      backgroundColor: "var(--c-bg)",
      color: "var(--c-text)",
      fontSize: "0.875rem",
      border: "1px solid var(--c-border)",
      borderRadius: "9px",
      overflow: "hidden",
    },
    "&.cm-focused": {
      outline: "none",
      borderColor: "var(--color-accent)",
    },
    ".cm-content": {
      fontFamily: "var(--font-mono, monospace)",
      caretColor: "var(--color-accent)",
    },
    ".cm-gutters": {
      backgroundColor: "var(--c-bg)",
      color: "var(--c-muted3)",
      border: "none",
    },
    ".cm-activeLine": {
      backgroundColor: "var(--c-divider)",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "var(--c-divider)",
    },
    ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
      backgroundColor: "var(--c-border) !important",
    },
  },
  {}
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
