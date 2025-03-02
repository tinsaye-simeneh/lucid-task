"use client";

import { useState } from "react";
import { Box, Chip, Flex, ActionIcon } from "@mantine/core";
import FormulaEditor from "./FormulaEditor";
import VariableAutocomplete from "./VariableAutocomplete";
import { FaTimes } from "react-icons/fa";

export default function FormulaInput() {
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);

  const handleInsertVariable = (variable: string) => {
    if (!selectedVariables.includes(variable)) {
      setSelectedVariables([...selectedVariables, variable]);
    }
  };

  const handleRemoveVariable = (variable: string) => {
    setSelectedVariables((prev) => prev.filter((v) => v !== variable));
  };

  return (
    <Box my="lg" py="lg" px="xl" bg="blue">
      <VariableAutocomplete onInsertVariable={handleInsertVariable} />

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

      <FormulaEditor selectedVariables={selectedVariables} />
    </Box>
  );
}
