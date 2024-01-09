import { AccessValidator } from "./AccessValidator";
import { Logger } from "./Logger";
import { RealSearcher } from "./RealSearcher";
import { Searcher } from "./Searcher";

export class ProxySearcher implements Searcher {
  #searcher: RealSearcher = new RealSearcher();
  #validator: AccessValidator | undefined;
  #logger: Logger | undefined;

  validate(userId: string): boolean {
    this.#validator = new AccessValidator();
    return this.#validator.validate(userId);
  }

  log(userId: string): void {
    this.#logger = new Logger();
    this.#logger.log(userId);
  }

  doSearch(userId: string, keyword: string): string | null {
    if (this.validate(userId)) {
      const result: string = this.#searcher.doSearch(userId, keyword);
      this.log(userId);
      return result;
    } else {
      return null;
    }
  }
}
