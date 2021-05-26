# Release Action

This action generates git tags. It is only run for main branch builds; feature branches are skipped.

```yml
- name: Create tags
  uses: ./path/to/action
  if: ${{ !env.ACT }}
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    version_map: ${{ steps.versioning.outputs.version_map }}
    "Notifications.Bff": "Participant Guidance Notifications Micro-Frontend"
```

## Inputs

```yml
inputs:
  github_token:
    required: true
    description: 'Needed to generate and push release tags'
  version_map:
    required: true
    description: 'A JSON map of projects to update and their expected version'
```

`version_map` follows the given schema:

```json
{
  "Project Name": {
    "tag": "expected git tag",
    "version": "expected semver version"
  }
}
```

This should be generated in a previous step such as with this [versioning action](https://github.com/im-open/omni-repo-version-map-action).

## Recompiling

If changes are made to the action's code in this repository, or its dependencies, you will need to re-compile the action.

```
# Installs dependencies and bundles the code
npm run build

# Bundle the code (if dependencies are already installed)
npm run bundle
```

These commands utilize [esbuild](https://esbuild.github.io/getting-started/#bundling-for-node) to bundle the action and its dependencies into a single file located in the `dist` folder.
