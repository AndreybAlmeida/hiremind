import type { RoleSetup, Message, DiagnosticSummary, GeneratedOutput } from "./types";

const KEYS = {
  roleSetup: "hiremind_role_setup",
  messages: "hiremind_messages",
  diagnostic: "hiremind_diagnostic",
  output: "hiremind_output",
} as const;

export const storage = {
  setRoleSetup: (data: RoleSetup) =>
    localStorage.setItem(KEYS.roleSetup, JSON.stringify(data)),

  getRoleSetup: (): RoleSetup | null => {
    if (typeof window === "undefined") return null;
    const d = localStorage.getItem(KEYS.roleSetup);
    return d ? JSON.parse(d) : null;
  },

  setMessages: (msgs: Message[]) =>
    localStorage.setItem(KEYS.messages, JSON.stringify(msgs)),

  getMessages: (): Message[] => {
    if (typeof window === "undefined") return [];
    const d = localStorage.getItem(KEYS.messages);
    return d ? JSON.parse(d) : [];
  },

  setDiagnostic: (data: DiagnosticSummary) =>
    localStorage.setItem(KEYS.diagnostic, JSON.stringify(data)),

  getDiagnostic: (): DiagnosticSummary | null => {
    if (typeof window === "undefined") return null;
    const d = localStorage.getItem(KEYS.diagnostic);
    return d ? JSON.parse(d) : null;
  },

  setOutput: (data: GeneratedOutput) =>
    localStorage.setItem(KEYS.output, JSON.stringify(data)),

  getOutput: (): GeneratedOutput | null => {
    if (typeof window === "undefined") return null;
    const d = localStorage.getItem(KEYS.output);
    return d ? JSON.parse(d) : null;
  },

  clear: () => Object.values(KEYS).forEach((k) => localStorage.removeItem(k)),
};
