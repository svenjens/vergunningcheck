# Vergunningcheck [![codecov](https://codecov.io/gh/Amsterdam/vergunningcheck/branch/develop/graph/badge.svg)](https://codecov.io/gh/Amsterdam/vergunningcheck) [![Github CI](https://github.com/Amsterdam/vergunningcheck/workflows/Github%20CI/badge.svg)](https://github.com/Amsterdam/vergunningcheck/actions)

This application allows residents of Gemeente Amsterdam to easily see if they need a permit (vergunning) for a construction activity for their specific building. For various activities, like installing a window or solar panels on the roof or extending the house, we ask a number of questions about the location and plans. This leads to an outcome, either permit-free or a permit obligation, where it is clear which questions lead to this conclusion. This tool can therefore be used to see how in a specific location you could carry out a construction activity without the requirement of a permit.

Main reason to start development on this application was the Dutch [Digitaal Stelsel Omgevingswet (DSO)](https://nl.wikipedia.org/wiki/Omgevingswet). Before the lay is actually implemented the city of Amsterdam wanted to start using new tools provided by [omgevingswetportaal.nl](https://www.omgevingswetportaal.nl) and [aandeslagmetdeomgevingswet.nl](https://aandeslagmetdeomgevingswet.nl/) like [Standaard toepasbare regels (STTR)](https://aandeslagmetdeomgevingswet.nl/digitaal-stelsel/aansluiten/standaarden/sttr-imtr/).

Our application supports:

- check multiple permits in one flow/checker (combine multiple STTR-files into JSON)
- de-duplicate questions that occur in more then 1 permit and share the answer once it's given
- do register lookups in Amsterdam Datapunt Open API's and autofill + skip the questions
- use a GraphQL backend to improve performance by querying multiple API's in parallel
- an open source STTR implementation for other governments to reuse
- sessions, refresh and continue
- support for image captions
- single page responsive application
- print/download results as pdf

## Repo structure

This repo contains 2 applications. We use Lerna under the hood to install deps and run on both apps. But you can also run and configure then individually.

Currently we have 2 applications/modules.

- `apps/client`
- `apps/graphql`

To start both of them run `npm start` from the root of this project.

## Contributing

If you want to contribute to this project please read [CONTRIBUTING.md](CONTRIBUTING.md).<br/>
To release a new version of the application see [RELEASE.md](RELEASE.md).

Apart from our apps we have some continuous integration configuration in the `.github/` and `ci/` folders.

## Tech stack

- Standaard toepasbare regels (STTR), xml files with questions and decision tables
- Lerna (and lerna-changelog)
- Prettier
- Husky
- Github Actions

## Known issues

- css sourcemaps (some issues exist in development, in prod it works, see https://github.com/facebook/create-react-app/issues/6399)
- we are not on the latest version of `react-scripts` because 3.4.1 does not play well with Lerna. See https://github.com/facebook/create-react-app/issues/8685

## Thanks to

[<img src="https://github.com/Amsterdam/atlas/blob/develop/public/images/browserstack-logo@2x.png" height="60" title="BrowserStack Logo" alt="BrowserStack Logo" />](https://www.browserstack.com/)
