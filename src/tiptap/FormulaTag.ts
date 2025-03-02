import { Node, mergeAttributes, CommandProps } from "@tiptap/core";

// Define the command interface with chainable commands
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    formulaTag: {
      insertFormula: (value: string) => ReturnType;
    };
  }
}

export const FormulaTag = Node.create({
  name: "formulaTag",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      value: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-formula]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes, { "data-formula": "" }), 0];
  },

  addCommands() {
    return {
      insertFormula:
        (value: string) =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              value: value,
            },
          });
        },
    };
  },
});
