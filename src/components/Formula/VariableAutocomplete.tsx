import { useState } from "react";
import { List, TextInput } from "@mantine/core";
import { useAutocomplete } from "@/hooks/useAutocomplete";

export default function VariableAutocomplete({
  onInsertVariable,
}: {
  onInsertVariable: (variable: string) => void;
}) {
  const { data: suggestions } = useAutocomplete();
  const [query, setQuery] = useState("");
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);

  const filteredSuggestions = Array.from(
    new Map(
      (suggestions || [])
        .filter(
          // eslint-disable-next-line
          (s: any) =>
            s.name.toLowerCase().includes(query.toLowerCase()) &&
            !selectedVariables.includes(s.name)
        )

        // eslint-disable-next-line
        .map((s: any) => [s.id, s])
    ).values()
  );

  const handleSelectVariable = (variable: string) => {
    setSelectedVariables((prev) => [...prev, variable]);
    onInsertVariable(variable);
    setQuery("");
  };

  return (
    <div>
      <TextInput
        placeholder="Type to search variables..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && filteredSuggestions.length > 0 && (
        <List mt="sm">
          {/* eslint-disable-next-line */}
          {filteredSuggestions.map((s: any) => (
            <List.Item key={s.id} onClick={() => handleSelectVariable(s.name)}>
              {s.name ? s.name : "Unknown Variable"}
            </List.Item>
          ))}
        </List>
      )}
    </div>
  );
}
