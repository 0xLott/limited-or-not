# limited-or-not

Check if any TV Show is a miniseries.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.2.5 or higher)
- [Node.js](https://nodejs.org/) (v18 or higher)
- TMDB API Key (register at [The Movie Database](https://www.themoviedb.org/settings/api))

### Running tests

To run unit tests using Bun, use the following command from any directory within the project:

```sh
bun test
```

### Updating OpenAPI documentation

_With TSOA & Redocly_

1. **Generate OpenAPI spec:**

   ```sh
   npx tsoa spec
   ```

2. **Preview API docs:**

   ```sh
   npx redocly preview-docs build/swagger.json
   ```

3. **Build HTML docs:**

   ```sh
   npx redocly build-docs build/swagger.json --output ../docs/api-docs.html
   ```

> **Note:** Run `npm i` first if setting up for the first time.

### Developer tools

- **The Movie Database (TMDB)**: [The Movie Database](https://www.themoviedb.org/)
- **TMDB API Reference**: [Getting started](https://developer.themoviedb.org/reference/intro/getting-started)

## Development progress

To track the development progress of this project, upcoming features, and bug fixes, check out the [GitHub Project Board](https://github.com/users/0xLott/projects/1).

## Acknowledgments

- Data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

## License

This project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE. Refer to the [LICENSE](./LICENSE) file for details.
