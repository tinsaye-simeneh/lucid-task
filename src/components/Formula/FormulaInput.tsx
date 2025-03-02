"use client";

import { Box } from "@mantine/core";
import FormulaEditor from "./FormulaEditor";
import VariableAutocomplete from "./VariableAutocomplete";

export default function FormulaInput() {
  const handleInsertVariable = (variable: string) => {
    console.log(`Insert variable: ${variable}`);
  };

  return (
    <Box>
      <VariableAutocomplete onInsertVariable={handleInsertVariable} />
      <FormulaEditor onInsertVariable={handleInsertVariable} />
    </Box>
  );
}
