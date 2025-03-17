export interface ChatHistoryType {
  role: "user" | "model";
  parts: [{ text: string }];
}
