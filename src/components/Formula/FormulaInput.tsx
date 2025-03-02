"use client";

import { useState } from "react";
import { Box, Paper, Badge, ActionIcon, Group } from "@mantine/core";
import FormulaEditor from "./FormulaEditor";
import VariableAutocomplete from "./VariableAutocomplete";
import { FaTimes } from "react-icons/fa";

export default function FormulaInput() {
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);

  const handleInsertVariable = (variable: string) => {
    if (!selectedVariables.includes(variable)) {
      setSelectedVariables((prev) => [...prev, variable]);
    }
  };

  const handleRemoveVariable = (variable: string) => {
    setSelectedVariables((prev) => prev.filter((v) => v !== variable));
  };

  return (
    <Box my="lg" py="lg" px="xl" bg="gray">
      <VariableAutocomplete onInsertVariable={handleInsertVariable} />

      {/* Display Selected Variables */}
      <Paper shadow="xs" p="md" my="md">
        <Group>
          {selectedVariables.map((variable) => (
            <Badge key={variable} color="blue" mx="sm" size="lg">
              {variable}{" "}
              <ActionIcon
                color="red"
                size="sm"
                onClick={() => handleRemoveVariable(variable)}
              >
                <FaTimes />
              </ActionIcon>
            </Badge>
          ))}
        </Group>
      </Paper>

      <FormulaEditor selectedVariables={selectedVariables} />
    </Box>
  );
}
