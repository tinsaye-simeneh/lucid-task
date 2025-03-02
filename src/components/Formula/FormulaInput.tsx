"use client";

import { useState } from "react";
import { Box, Chip, Flex, ActionIcon } from "@mantine/core";
import FormulaEditor from "./FormulaEditor";
import VariableAutocomplete from "./VariableAutocomplete";
import { FaTimes } from "react-icons/fa";

export default function FormulaInput() {
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);

  // ✅ Add variable (only if not already added)
  const handleInsertVariable = (variable: string) => {
    if (!selectedVariables.includes(variable)) {
      setSelectedVariables([...selectedVariables, variable]);
    }
  };

  // ✅ Remove variable
  const handleRemoveVariable = (variable: string) => {
    setSelectedVariables((prev) => prev.filter((v) => v !== variable));
  };

  return (
    <Box my="lg" py="lg" px="xl" bg="blue">
      <VariableAutocomplete onInsertVariable={handleInsertVariable} />

      {/* Selected Variables Display */}
      <Flex wrap="wrap" mt="md" gap="sm">
        {selectedVariables?.map((variable) => (
          <Chip key={variable} checked>
            {variable}{" "}
            <ActionIcon
              size="xs"
              color="red"
              onClick={() => handleRemoveVariable(variable)}
            >
              <FaTimes />
            </ActionIcon>
          </Chip>
        ))}
      </Flex>

      {/* Formula Editor */}
      <FormulaEditor selectedVariables={selectedVariables} />
    </Box>
  );
}
