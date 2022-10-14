# Release Action

This action pushes supplied tag values to the remote repository. It is only run for main/master branch builds; feature branches are skipped.
    
## Index 

- [Example](#example)
- [Inputs](#inputs)
- [Contributing](#contributing)
  - [Recompiling](#recompiling)
  - [Incrementing the Version](#incrementing-the-version)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

## Example

```yml
name: Create Git Tag
on: workflow_dispatch
jobs:
  map-some-version:
    runs-on: ubuntu-20.04
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Map versions
        id: map-versions
        uses: im-open/omni-repo-version-map-action@v1.1.0
      - name: Tag Project Versions
        uses: im-open/omni-repo-git-tag-action@v1.1.0
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          version_map: ${{ steps.map-versions.outputs.version_map }}
```

## Inputs

| Parameter      | Is Required | Description                                              |
| -------------- | ----------- | -------------------------------------------------------- |
| `github_token` | Yes         | Needed to generate and push release tags                 |
| `version_map`  | Yes         | A JSON object that maps projects to the tag to give them |

The `version_map` needs to have the following schema:

```json
{
  "Project Name": {
    "tag": "The git tag you want to create"
  }
}
```

This is most easily generated in a previous step, such as with this [versioning action](https://github.com/im-open/omni-repo-version-map-action).

## Contributing

When creating new PRs please ensure:
1. The action has been recompiled.  See the [Recompiling](#recompiling) section below for more details.
2. For major or minor changes, at least one of the commit messages contains the appropriate `+semver:` keywords listed under [Incrementing the Version](#incrementing-the-version).
3. The `README.md` example has been updated with the new version.  See [Incrementing the Version](#incrementing-the-version).
4. The action code does not contain sensitive information.

### Recompiling

If changes are made to the action's code in this repository, or its dependencies, you will need to re-compile the action.

```sh
# Installs dependencies and bundles the code
npm run build

# Bundle the code (if dependencies are already installed)
npm run bundle
```

These commands utilize [esbuild](https://esbuild.github.io/getting-started/#bundling-for-node) to bundle the action and
its dependencies into a single file located in the `dist` folder.

### Incrementing the Version

This action uses [git-version-lite] to examine commit messages to determine whether to perform a major, minor or patch increment on merge.  The following table provides the fragment that should be included in a commit message to active different increment strategies.
| Increment Type | Commit Message Fragment                     |
| -------------- | ------------------------------------------- |
| major          | +semver:breaking                            |
| major          | +semver:major                               |
| minor          | +semver:feature                             |
| minor          | +semver:minor                               |
| patch          | *default increment type, no comment needed* |

## Code of Conduct

This project has adopted the [im-open's Code of Conduct](https://github.com/im-open/.github/blob/master/CODE_OF_CONDUCT.md).

## License

Copyright &copy; 2021, Extend Health, LLC. Code released under the [MIT license](LICENSE).

[git-version-lite]: https://github.com/im-open/git-version-lite
