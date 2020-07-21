# Vergunningcheck [![codecov](https://codecov.io/gh/Amsterdam/vergunningcheck/branch/develop/graph/badge.svg)](https://codecov.io/gh/Amsterdam/vergunningcheck) [![Github CI](https://github.com/Amsterdam/vergunningcheck/workflows/Github%20CI/badge.svg)](https://github.com/Amsterdam/vergunningcheck/actions)

This application allows residents of Amsterdam to easily see if they need a permit for a construction activity for their specific building. For various activities, like installing a window or solar panels on the roof or extending the house, we ask a number of questions about the location and plans. This leads to an outcome, either license-free or licensing obligation, where it is clear which questions lead to this conclusion. This tool can therefore be used to see how in a specific location you could carry out a construction activity without the requirement of a permit.

## Install / run

This repo contains 2 apps, `client` and `graphql`. We use Lerna under the hood to install deps and run on both apps. But you can also run and configure then individually.

```bash
npm i
npm start
```

## Contributing

If you want to contribute to this project please read [CONTRIBUTING.md](CONTRIBUTING.md).<br/>
To release a new version of the application see [RELEASE.md](RELEASE.md).

## Repo structure

We use Lerna to manage the apps in our monorepo. Currently we have 2 applications/modules.

- apps/client
- apps/graphql

Apart from our apps we have some continuous integration configuration in the `.github/` and `ci/` folders.

## Tech stack

- Lerna (and lerna-changelog)
- Prettier
- Husky
- Github Actions

## Known issues

- css sourcemaps (some issues exist in development, in prod it works, see https://github.com/facebook/create-react-app/issues/6399)
- we are not on the latest version of `react-scripts` because 3.4.1 does not play well with Lerna. See https://github.com/facebook/create-react-app/issues/8685

## Thanks to

[<img src="https://github.com/Amsterdam/atlas/blob/develop/public/images/browserstack-logo@2x.png" height="60" title="BrowserStack Logo" alt="BrowserStack Logo" />](https://www.browserstack.com/)
