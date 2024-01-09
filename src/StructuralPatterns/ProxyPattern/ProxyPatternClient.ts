import { ProxySearcher } from "./ProxySearcher";
import { Searcher } from "./Searcher";

export const ProxyPatternClient = () => {
  const searcher: Searcher = new ProxySearcher();
  const result: string | null = searcher.doSearch("用户", "玉女心经");
  return result;
};
