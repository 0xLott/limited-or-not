## **Why use Dependency Injection?**

Right now, `TVSeriesService` directly depends on `fetchData`, which is a global function. What if it was necessary to:

- Use a different HTTP client (such as Axios instead of `fetchData`)?
- Add caching so API calls don’t repeat unnecessarily?
- Mock API calls during testing the real TMDB API is unavailable?

With **dependency injection**, it's easier to swap out implementations without modifying the core logic.

---

## **Example: How to implement Dependency Injection (DI)**

### **1. Define an interface for Data Fetching**

Instead of directly using `fetchData`, define an interface so you can inject any implementation later:

```typescript
// interfaces/IFetchClient.ts
export interface IFetchClient {
  get(url: string): Promise<any>;
}
```

### **2. Modify `fetchData` to implement the interface**

```typescript
// utils/fetchClient.ts
import { IFetchClient } from "../interfaces/IFetchClient";

export class FetchClient implements IFetchClient {
  async get(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  }
}
```

Now `FetchClient` follows the `IFetchClient` interface, making it interchangeable with other implementations.

### **3. Modify `TVSeriesService` to accept an `IFetchClient`**

```typescript
// services/tvSeriesService.ts
import { TVSeries, Status } from "../models/tvSeries";
import { IFetchClient } from "../interfaces/IFetchClient";
import { TMDB_API } from "../config";

export class TVSeriesService {
  private fetchClient: IFetchClient;

  constructor(fetchClient: IFetchClient) {
    this.fetchClient = fetchClient;
  }

  public async getTVSeriesById(seriesId: number): Promise<TVSeries> {
    const url = `${TMDB_API.BASE_URL}/tv/${seriesId}?language=en-US`;
    const data = await this.fetchClient.get(url);

    return this.createNewTVSeries(data);
  }

  public async searchTVSeriesByTitle(seriesTitle: string): Promise<TVSeries[]> {
    const url = `${TMDB_API.BASE_URL}/search/tv?query=${seriesTitle}&include_adult=true&language=en-US&page=1`;
    const data = await this.fetchClient.get(url);

    return data.results.map((item: any) => this.createNewTVSeries(item));
  }

  private createNewTVSeries(data: any): TVSeries {
    return new TVSeries(data.id, data.name, data.type, data.status as Status, data.poster_path);
  }
}
```

Now `TVSeriesService` does NOT depend on a specific fetch function. You can inject any `IFetchClient` implementation.

### **4. Inject dependency in `index.ts`**

```typescript
import { TVSeriesService } from "./services/tvSeriesService";
import { TVSeriesController } from "./controllers/tvSeriesController";
import { FetchClient } from "./utils/fetchClient";

const fetchClient = new FetchClient(); // Inject FetchClient
const tvSeriesService = new TVSeriesService(fetchClient);
const tvSeriesController = new TVSeriesController(tvSeriesService);

const server = Bun.serve({
  async fetch(req) {
    const path = new URL(req.url).pathname;

    if (path === "/") {
      return tvSeriesController.getTVSeriesByTitle("merlin");
    }

    return new Response("Page not found", { status: 404 });
  },
});

console.log(`Listening on ${server.url}`);
```

Now we pass an instance of `FetchClient` into `TVSeriesService`, making it easy to swap out later.

## **5. Testing: Inject a mock client**

DI allows easier unit testing without calling real APIs. Instead of using `FetchClient`, we can inject a mock client.

```typescript
// tests/tvSeriesService.test.ts
import { TVSeriesService } from "../services/tvSeriesService";
import { IFetchClient } from "../interfaces/IFetchClient";

// Mock implementation of IFetchClient
class MockFetchClient implements IFetchClient {
  async get(url: string): Promise<any> {
    return { results: [{ id: 1, name: "Mock Show", status: "Ended" }] };
  }
}

describe("TVSeriesService", () => {
  it("should fetch TV series by title", async () => {
    const mockClient = new MockFetchClient();
    const service = new TVSeriesService(mockClient);

    const result = await service.searchTVSeriesByTitle("mock");

    expect(result).toEqual([{ id: 1, name: "Mock Show", status: "Ended" }]);
  });
});
```

With dependency injection, we inject a mock `IFetchClient` for testing. This avoids hitting real APIs, making tests fast and reliable.

---

## **TL;DR: why instance-based DI is better**

| ❌ **Without DI (Static methods)**                   | ✅ **With DI (Instance-Based)**                   |
| ---------------------------------------------------- | ------------------------------------------------- |
| Hardcoded dependencies                               | Injects dependencies dynamically                  |
| Difficult to test (relies on real API)               | Easy to mock (use fake clients in tests)          |
| Changing data source requires modifying service code | Just swap out injected dependency                 |
| Less flexible (always uses the same implementation)  | Can switch between different fetch clients easily |
