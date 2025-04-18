# What is a miniseries?

Understanding Miniseries in TMDB (The Movie Database)

## Definition

A miniseries is formally defined as:

> A television show or series that tells a story in a predetermined, limited number of episodes.

[Miniseries, Wikipedia](https://en.wikipedia.org/wiki/Miniseries)

## Identification challenges in TMDB

When working with TMDB's database, identifying miniseries presents some challenges due to:

1. The variety of attributes available to characterize TV Series
2. Potential inconsistencies in community-sourced data
3. Overlapping characteristics with other series types

## Initial identification approach

The most straightforward criteria for identifying a miniseries would be:

1. Single season (`"numberOfSeasons": 1`)
2. Genre (`"type": "Scripted"` or `"type": "Miniseries"`)

However, this approach reveals complexities in TMDB's data structure, specially for Series with `"type": "Scripted"`.

### Suspected edge cases

Consider the following example:

```json
{
   "id": 80901,
   "name": "The Most Difficult Love in the World",
   "number_of_episodes": 10,
   "number_of_seasons": 1,
   "status": "Ended",
   "type": "Scripted",
   "vote_average": 7,
   "vote_count": 1
}
```

This series meets the initial criteria for a Miniseries (Single season and appropriate genre). **This suggests that it could potentially be a miniseries**.

 However, it does not present `"type": "Miniseries"`, suggesting either:

- A scripted series canceled after one season
- Potential misclassification in TMDB

## Some considerations

The only assertive way to rule out that similar shows to the example above have been, in fact, cancelled is looking up for news on the internet. Unfortunately, this would be infeasible considering the purpose and resources of this project.

Given TMDB's community-driven nature, data inconsistencies may occur. The current implementation of this software adopts a more conservative approach by:

1. Explicitly checking for `"type": "Miniseries"`
2. Acknowledging that this may exclude some conceptually valid miniseries

This trade-off prioritizes precision over recall to maintain data reliability.
