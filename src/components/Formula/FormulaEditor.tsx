"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FormulaTag } from "@/tiptap/FormulaTag";
import { useFormulaStore } from "@/store/useFormulaStore";
import { evaluate } from "mathjs";
import { Paper, Text } from "@mantine/core";
import { useEffect } from "react";

interface FormulaEditorProps {
  onInsertVariable: (variable: string) => void;
}

export default function FormulaEditor({}: FormulaEditorProps) {
  const { formula, setFormula, result, setResult } = useFormulaStore();

  const editor = useEditor({
    extensions: [StarterKit, FormulaTag],
    content: formula,
    onUpdate: ({ editor }) => {
      const newFormula = editor.getText();
      setFormula(newFormula);

      try {
        const evalResult = evaluate(newFormula);
        setResult(evalResult);
      } catch {
        setResult("Error");
      }
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(formula);
    }
  }, [formula, editor]);

  return (
    <Paper shadow="xs" p="md">
      <EditorContent editor={editor} />
      <Text size="lg" mt="md">
        Result: {result}
      </Text>
    </Paper>
  );
}
