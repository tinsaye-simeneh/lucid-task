import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FormulaTag } from "@/tiptap/FormulaTag";
import { useFormulaStore } from "@/store/useFormulaStore";
import { useAutocomplete } from "@/hooks/useAutocomplete";
import { evaluate } from "mathjs";
import { Box, Paper, List, TextInput, Text } from "@mantine/core";
import { useState } from "react";

export default function FormulaInput() {
  const { formula, setFormula, result, setResult } = useFormulaStore();
  const { data: suggestions } = useAutocomplete();
  const [query, setQuery] = useState("");

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

  const insertVariable = (variable: string) => {
    if (editor) {
      editor
        .chain()
        .focus()
        .command(({ commands }) => {
          return commands.insertFormula(variable);
        })
        .run();
      setQuery("");
    }
  };

  // eslint-disable-next-line
  const filteredSuggestions = suggestions?.filter((s: any) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box>
      <Paper shadow="xs" p="md">
        <TextInput
          placeholder="Type to search variables..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && filteredSuggestions?.length > 0 && (
          <List>
            {/* eslint-disable-next-line */}
            {filteredSuggestions.map((s: any) => (
              <List.Item key={s.id} onClick={() => insertVariable(s.name)}>
                {s.name}
              </List.Item>
            ))}
          </List>
        )}
        <EditorContent editor={editor} />
        <Text size="lg" mt="md">
          Result: {result}
        </Text>
      </Paper>
    </Box>
  );
}
