import { JsonRedirectSource } from "./json-source";

const redirectSource = new JsonRedirectSource();

export function getRedirects() {
  return redirectSource.getAll();
}

export function getRedirectBySource(source: string) {
  return redirectSource.getBySource(source);
}

