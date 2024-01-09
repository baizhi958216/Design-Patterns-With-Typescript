# Proxy Pattern

When direct access to an object is not possible or when accessing an object is difficult, indirect access can be achieved through a proxy object. Depending on different requirements, the proxy pattern can be classified into protection proxy, remote proxy, virtual proxy, etc.

It involves providing a proxy or a placeholder for a certain object, and the proxy object controls access to the original object.

The proxy object acts as an intermediary between the client object and the target object, removing content and services that the client cannot see or adding additional services that the client needs.

Therefore, the proxy pattern has three roles: `Abstract Subject Role`, `Proxy Subject Role`, and `Real Subject Role`.

Now, two new features need to be added to a paid business information query system: adding pre-query authentication and adding query count with charging based on the count.

1.1. Create an access validation class (business class):

```typescript
export class AccessValidator {
  validate(userId: string): boolean {
    console.log(
      `Validating if the user ${userId} is a legitimate user in the database.`
    );
    if (userId === "user") {
      console.log("Login successful");
      return true;
    }
    console.log("Login failed");
    return false;
  }
}
```

1.2. Create a logger class (business class):

```typescript
export class Logger {
  log(userId: string): void {
    console.log(
      `Updating the database, incrementing the query count for user ${userId} by 1!`
    );
  }
}
```

2. Create an abstract query class, acting as the abstract subject role:

```typescript
export interface Searcher {
  doSearch(userId: string, keyword: string): string;
}
```

3. Create a concrete query class, acting as the real subject role:

```typescript
import { Searcher } from "./Searcher";

export class RealSearch implements Searcher {
  doSearch(userId: string, keyword: string): string {
    console.log(
      `User ${userId} is querying business information with the keyword ${keyword}!`
    );
    return "Return specific content";
  }
}
```

4. Create a proxy query class, acting as the proxy subject role:

```typescript
import { AccessValidator } from "./AccessValidator";
import { Logger } from "./Logger";
import { RealSearch } from "./RealSearch";
import { Searcher } from "./Searcher";

export class ProxySearcher implements Searcher {
  #searcher: RealSearch = new RealSearch();
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
```

5. Create a test method:

```typescript
import { ProxySearcher } from "./ProxySearcher";
import { Searcher } from "./Searcher";

export const ProxyPatternClient = () => {
  const searcher: Searcher = new ProxySearcher();
  const result: string | null = searcher.doSearch("user", "The Art of War");
  return result;
};
```
