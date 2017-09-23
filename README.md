# crosswalk-map-poc

## Overview
A POC using [GeoJSON](http://geojson.org/) to show a map with crosswalk data using [Leaflet](http://leafletjs.com/) and [Mapbox](https://www.mapbox.com/)

## Installation
After you clone the repo, follow these steps

1. Make a Mapbox account and copy your default API key
1. Install [NodeJS](https://nodejs.org/)
1. Install [Yarn](https://yarnpkg.com) by running `npm install -g yarn` // may need sudo
1. Install dependencies by running `yarn install`
1. Setup project by running `yarn run setup`
1. Paste your Mapbox API key into _src/config.json_

All done!

## Running the App
Just to get the app up and running, run `yarn run serve`

### Tasks
- `yarn run develop` - task for local development, with file watching and live reload using [webpack-dev-server]()
- `yarn run build` - production build task
- `yarn run serve` - run a production build locally
- `yarn run setup` - creates _config.json_ from the template file _config.json.tmpl_
