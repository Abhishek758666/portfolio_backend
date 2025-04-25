export interface ChatHistoryType {
  role: "user" | "model";
  parts: [{ text: string }];
}

export interface Role {
  Admin: "admin";
  Customer: "user";
}
