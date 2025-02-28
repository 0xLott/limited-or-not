## Discovering TMDB API `type` values

This application relies on filtering TV Series data from The Movie Database (TMDB) API based on the `type` property. Specifically, we need to identify TV series with `type = 'Miniseries'` in order to categorise them. However, the [TMDB API documentation](https://developer.themoviedb.org/reference/tv-series-details) on TV Series does not provide a full list of possible values for the `type` property.

## Why this matters

1. **Testing**: Understanding all possible `type` values helps designing better [test cases](server/tests/serviceLayerTests/classify.test.ts) and avoiding unexpected behavior.
2. **Future-proofing**: Knowing all `type` values allows for anticipating changes or additions in the API responses that might impact the app's logic.

## Solution

To discover all potential values of the `type` property, a simple Javascript client was created in order to:

- Fetch details of the first 1000 TV series from TMDB API
- Extract and track all unique `type` values found in the responses
- Log the discovered `type` values

```javascript
const fetch = require("node-fetch");

const BASE_URL = "https://api.themoviedb.org/3/tv/";
const TOTAL_REQUESTS = 1000;
const trackedTypes = new Set();

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

async function fetchTVSeries(seriesId) {
  try {
    const response = await fetch(`${BASE_URL}${seriesId}?language=en-US`, options);
    const data = await response.json();
    if (data.type) {
      trackedTypes.add(data.type);
    }
  } catch (error) {
    console.error(`Error fetching series ID ${seriesId}:`, error);
  }
}

async function main() {
  const promises = [];
  for (let i = 1; i <= TOTAL_REQUESTS; i++) {
    promises.push(fetchTVSeries(i));
  }

  await Promise.all(promises);

  console.log("Tracked Type Values:", Array.from(trackedTypes));
}

main();
```

## Findings

Based on the results of the data collection, a set of possible values for the `type` property were identified. Using this information, we defined the following enum for the [TVSeries model](server/models/TVSeries.ts):

```typescript
export enum Type {
  Scripted = "Scripted",
  Talk = "Talk Show",
  Reality = "Reality",
  News = "News",
  Documentary = "Documentary",
  Miniseries = "Miniseries",
}
```
