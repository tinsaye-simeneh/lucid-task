import { Node, mergeAttributes } from "@tiptap/core";

const FormulaTag = Node.create({
  name: "formulaTag",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      value: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: "formula-tag" }];
  },

  renderHTML({ node }) {
    return ["formula-tag", mergeAttributes(), node.attrs.value];
  },

  addCommands() {
    return {
      insertFormula:
        (value: any) =>
        // add comment

        ({ commands: { insertContent } }: any) => {
          return insertContent({
            type: "formulaTag",
            attrs: { value },
          });
        },
    };
  },
});

export default FormulaTag;
