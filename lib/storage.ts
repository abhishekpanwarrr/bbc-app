import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

export function save(key: string, value: any) {
  storage.set(key, JSON.stringify(value));
}

export function load<T>(key: string, fallback: T): T {
  const v = storage.getString(key);
  return v ? JSON.parse(v) : fallback;
}

export function remove(key: string) {
  storage.remove(key);
}
