export type FieldOption = {
  label: string;
  value?: string;
};

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
};
