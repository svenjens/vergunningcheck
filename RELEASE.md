# Release

## Prepare a release

Basically what we want to do is merge `develop` with `release` including the latest STTR-changes.
Two commands make this easy for you. Run `npm run prepare-release`, commit changes if needed and `npm run release`.

## Publish a release

We use lerna-changelog to generate our changes we can use in [CHANGELOG.md](CHANGELOG.md), so you'll need a [personal access token](https://github.com/settings/tokens) for the GitHub API with the public_repo scope for public repositories.
Make sure you are logged in by npm command line. If not, log in with `npm adduser`.

Add `export GITHUB_AUTH=...` to your profile (eg: `.zshrc`).

- Run `npm run version` and use the generate our changes we can use in [CHANGELOG.md](CHANGELOG.md)
- Determine the version number.
- Commit the changelog.
- Run `npm run publish`
- Create [a new PR](https://github.com/Amsterdam/vergunningcheck/compare/master...release) from release to master on GitHub
- After the merge the relase will be deployed to acceptance, manually verify the changes
- Approve the release to production in Jenkins
- Back-merge `master` into `release` into `develop` in case there were changes, run `npm run back-merge`
- Consider [preparing](#prepare-a-release) the next release in the section above
