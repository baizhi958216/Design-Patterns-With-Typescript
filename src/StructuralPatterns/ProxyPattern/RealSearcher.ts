import { Searcher } from "./Searcher";

export class RealSearcher implements Searcher {
  doSearch(userId: string, keyword: string): string {
    console.log(`用户${userId}使用关键词${keyword}查询商务信息！`);
    return "返回具体内容";
  }
}
