"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FormulaTag } from "@/tiptap/FormulaTag";
import { evaluate } from "mathjs";
import { Paper, Text, Select, Flex } from "@mantine/core";
import { useEffect, useState } from "react";

interface FormulaEditorProps {
  selectedVariables: string[];
}

export default function FormulaEditor({
  selectedVariables,
}: FormulaEditorProps) {
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState<string | number>("");
  const [operators, setOperators] = useState<string[]>([]);

  const editor = useEditor({
    extensions: [StarterKit, FormulaTag],
    content: formula,
    onUpdate: ({ editor }) => {
      const newFormula = editor.getText();
      setFormula(newFormula);
      updateFormulaResult(newFormula);
    },
  });

  // eslint-disable-next-line
  const updateFormulaResult = (expression: string) => {
    try {
      const variableValues = selectedVariables.reduce((acc, variable) => {
        const match = variable.match(/name (\d+)/);
        if (match) {
          acc[variable] = Number(match[1]);
        }
        return acc;
      }, {} as Record<string, number>);

      const numericFormula = selectedVariables
        .map((variable, index) => {
          const num = variableValues[variable]?.toString() ?? variable;
          return index < operators.length ? `${num} ${operators[index]}` : num;
        })
        .join(" ");

      const evalResult = evaluate(numericFormula);
      setResult(evalResult);
    } catch (error) {
      console.error(error);
      setResult("Invalid Expression");
    }
  };

  useEffect(() => {
    setOperators(
      Array(
        selectedVariables.length > 0 ? selectedVariables.length - 1 : 0
      ).fill("+")
    );
    if (editor && selectedVariables.length > 0) {
      const newText = selectedVariables.join(" ");
      editor.commands.setContent(newText);
      updateFormulaResult(newText);
    }
  }, [selectedVariables, editor]);

  useEffect(() => {
    if (editor) {
      updateFormulaResult(formula);
    }
  }, [operators, editor]);

  return (
    <Paper shadow="xs" p="md" bg="yellow">
      <Flex align="center" gap="md">
        {selectedVariables.map((variable, index) => (
          <Flex key={index} align="center" gap="sm">
            <Text>{variable}</Text>
            {index < selectedVariables.length - 1 && (
              <Select
                value={operators[index]}
                onChange={(value) => {
                  if (value) {
                    const newOperators = [...operators];
                    newOperators[index] = value;
                    setOperators(newOperators);
                  }
                }}
                data={["+", "-", "*", "/", "^"]}
                styles={{
                  input: { color: "black" },
                  dropdown: { color: "black" },
                }}
              />
            )}
          </Flex>
        ))}
      </Flex>
      {/* <EditorContent editor={editor} /> */}
      <Text size="lg" mt="md">
        Result: {result}
      </Text>
    </Paper>
  );
}
