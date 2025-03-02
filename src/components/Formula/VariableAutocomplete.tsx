import { useState } from "react";
import { List, TextInput } from "@mantine/core";
import { useAutocomplete } from "@/hooks/useAutocomplete";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function VariableAutocomplete({
  onInsertVariable,
}: {
  onInsertVariable: (variable: string) => void;
}) {
  const { data: suggestions } = useAutocomplete();
  const [query, setQuery] = useState("");

  const filteredSuggestions = Array.from(
    new Map(
      (suggestions || [])
        .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
        .map((s) => [s.id, s])
    ).values()
  );

  return (
    <div>
      <TextInput
        placeholder="Type to search variables..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && filteredSuggestions.length > 0 && (
        <List>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {filteredSuggestions.map((s: any, index) => (
            <List.Item
              key={`${s.id}-${index}`}
              onClick={() => onInsertVariable(s.name)}
            >
              {s.name}
            </List.Item>
          ))}
        </List>
      )}
    </div>
  );
}
