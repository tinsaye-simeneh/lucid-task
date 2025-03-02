import { create } from "zustand";

interface FormulaState {
  formula: string;
  result: string | number;
  setFormula: (formula: string) => void;
  setResult: (result: string | number) => void;
}

export const useFormulaStore = create<FormulaState>((set) => ({
  formula: "",
  result: "",
  setFormula: (formula) => set({ formula }),
  setResult: (result) => set({ result }),
}));
