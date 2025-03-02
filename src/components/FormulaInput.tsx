import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useFormulaStore } from "@/store/useFormulaStore";
import { Box, Paper } from "@mantine/core";

export default function FormulaInput() {
  const { formula, setFormula } = useFormulaStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Type a formula...",
      }),
    ],
    content: formula,
    onUpdate: ({ editor }) => {
      setFormula(editor.getHTML());
    },
  });

  return (
    <Box>
      <Paper shadow="xs" p="md">
        <EditorContent editor={editor} />
      </Paper>
    </Box>
  );
}
