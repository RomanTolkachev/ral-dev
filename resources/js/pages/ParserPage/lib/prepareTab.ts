import { Tab } from "../types";

type Params = {
  raw: Record<string, any>,
  exclude?: string[]
}

export function prepareTab(params: Params): Tab[] {
  const { raw, exclude = [] } = params;
  return Object.entries(raw).map(([key, value]) => ({
    label: key,
    ...value
  })).filter(item => !exclude.includes(item.label));
}