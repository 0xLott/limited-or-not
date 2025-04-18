# limited-or-not

Check if any TV Show is a miniseries.

> A miniseries is a television show that tells a story in a predetermined, limited number of episodes.

## Getting started

### Prerequisites

- [Bun](https://bun.sh/) (v1.2.5 or higher)
- [Node.js](https://nodejs.org/) (v18 or higher)
- TMDB API Key (register at [The Movie Database](https://www.themoviedb.org/settings/api))

### Setting up environment variables

Create an `.env` file to the `/server` directory with the following entry:

`TMDB_API_KEY=<your-api-key>`

Replace `<your-api-key>` with your actual TMDB API key and ensure you save the file.

Bun will take care of sourcing and loading the environment variables.

### Dependency management  

This app uses Bun to manage dependencies for both the back end (`/server`) and front end (`/client`). From the root directory, install dependencies with:  

```sh
# Install dependencies for the back end  
cd server  
bun install  

# Install dependencies for the front end  
cd client  
bun install  
```

Run the following to add, remove, or upgrade packages:  

- **Add a package**: `bun add package-name`  
- **Remove a package**: `bun remove package-name`  
- **Upgrade all dependencies**: `bun upgrade`  

Bun automatically generates a `bun.lock` file for deterministic installs. Ensure this file is committed to version control for consistensy across different environments.

### Starting development servers  

Start the back end and front end development servers using:  

#### Back End (`/server`)  

```sh
cd server  
bun .
```  

#### Front End (`/client`)  

```sh
cd client  
bun run dev --open  
```  

Ensure both servers are running for full functionality.

### Running tests

To run unit tests using Bun, use the following command from any directory within the project:

```sh
bun test
```

### Managing OpenAPI documentation

To update the server docs with _tsoa_ & _Redocly_, refer to the following commands:

   ```sh
   # Generate updated OpenAPI spec
   npx tsoa spec 

   # Preview API docs (optional)
   npx redocly preview-docs build/swagger.json

   # Build updated HTML docs
   npx redocly build-docs build/swagger.json --output ../docs/api-docs.html
   ```

> **Note:** Run `npm i` first if setting up for the first time.

### Developer tools

- **The Movie Database (TMDB)**: [The Movie Database](https://www.themoviedb.org/)
- **TMDB API Reference**: [Getting started](https://developer.themoviedb.org/reference/intro/getting-started)

## Development progress

To track the development progress of this project and upcoming feature,s check out this [project's board](https://github.com/users/0xLott/projects/1) on GitHub.

## Acknowledgments

Data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

## License

This project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE. Refer to the [LICENSE](./LICENSE) file for details.
