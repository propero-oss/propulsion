export interface RawFilter {
  op: "raw";
  query: string;
  replacements?: Record<string, any>;
}
