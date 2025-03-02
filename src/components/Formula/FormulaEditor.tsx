"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FormulaTag } from "@/tiptap/FormulaTag";
import { useFormulaStore } from "@/store/useFormulaStore";
import { evaluate } from "mathjs";
import { Paper, Text } from "@mantine/core";
import { useEffect } from "react";

interface FormulaEditorProps {
  selectedVariables: string[]; // Accept selected variables
  onInsertVariable: (variable: string) => void;
}

export default function FormulaEditor({
  selectedVariables,
}: FormulaEditorProps) {
  const { formula, setFormula, result, setResult } = useFormulaStore();

  const editor = useEditor({
    extensions: [StarterKit, FormulaTag],
    content: formula,
    onUpdate: ({ editor }) => {
      const newFormula = editor.getText();
      setFormula(newFormula);

      try {
        // Convert selected variables into values (Example: { A: 5, B: 10, C: 2 })
        const variableValues = Object.fromEntries(
          selectedVariables.map((variable, index) => [variable, index + 1]) // Assign values dynamically
        );

        // Evaluate the formula with variable values
        const evalResult = evaluate(newFormula, variableValues);
        setResult(evalResult);
      } catch {
        setResult("Invalid Expression");
      }
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(formula);
    }
  }, [formula, editor]);

  return (
    <Paper shadow="xs" p="md" bg="gray">
      <EditorContent editor={editor} />
      <Text size="lg" mt="md">
        Result: {result}
      </Text>
    </Paper>
  );
}
