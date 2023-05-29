export type JSONPrimitive = string | number | boolean | null
export type JSONRecord = Record<string, JSONPrimitive>
export type JSONValue = JSONPrimitive | JSONRecord | JSONArray
export type JSONArray = Array<JSONValue>
