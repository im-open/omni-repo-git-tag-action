# Release Action

This action generates git tags. It is only run for main branch builds; feature branches are skipped.

## Example

```yml
name: Create Git Tag
on: workflow_dispatch
jobs:
  map-some-version:
    runs-on: ubuntu-20.04
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Map versions
        id: map-versions
        uses: im-open/omni-repo-version-map-action@v1
      - name: Tag Project Versions
        uses: im-open/omni-repo-git-tag-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          version_map: ${{ steps.map-versions.outputs.version_map }}
```

## Inputs

| Parameter                   | Is Required                |Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `github_token`                 | Yes     | Needed to generate and push release tags                                                                                           |
| `version_map`               | Yes    |  A JSON object that maps projects to the tag to give them                                             |  

The `version_map` needs to have the following schema:

```json
{
  "Project Name": {
    "tag": "The git tag you want to create"
  }
}
```

This is most easily generated in a previous step, such as with this [versioning action](https://github.com/im-open/omni-repo-version-map-action).

## Recompiling

If changes are made to the action's code in this repository, or its dependencies, you will need to re-compile the action.

```
# Installs dependencies and bundles the code
npm run build

# Bundle the code (if dependencies are already installed)
npm run bundle
```

These commands utilize [esbuild](https://esbuild.github.io/getting-started/#bundling-for-node) to bundle the action and its dependencies into a single file located in the `dist` folder.
