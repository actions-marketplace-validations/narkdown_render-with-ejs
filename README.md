# @narkdown/render-with-ejs

[![GitHub Action: View on Marketplace](https://img.shields.io/badge/GitHub%20Action-View_on_Marketplace-blue?logo=github)](https://github.com/marketplace/actions/narkdown-render-with-ejs)
[![narkdown](https://github.com/younho9/awesome-reading-list/actions/workflows/narkdown.yml/badge.svg?branch=main&event=schedule)](https://github.com/younho9/awesome-reading-list/actions/workflows/narkdown.yml)
[![Version: v0.1.1](https://img.shields.io/badge/Version-v0.1.1-green)](https://github.com/younho9/notion2github/releases/tag/v0.1.1)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

This action writes a markdown file with ejs template. If you want commit output markdown file, use it with commit action.

## Inputs

### `template-file-path`

EJS template file path.

_Default_ `template.md`

### `target-file-path`

Target markdown file path.

_Default_ `README.md`

### `data`

`object`, Data to be used to render ejs templates.

## Outputs

None. This action just write file in GitHub action runner environment.

## Example usage

- [younho9/awesome-reading-list](https://github.com/younho9/awesome-reading-list/blob/main/.github/workflows/narkdown.yml)

<details>
  <summary>Show example workflow</summary>

```yaml
name: narkdown

on:
  schedule:
    - cron: 0 0 * * * # KST 9:00 AM on everyday
  push:
    branches:
      - ci/**
  workflow_dispatch: {}

jobs:
  narkdown:
    name: narkdown
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2

      - id: narkdown-query
        uses: narkdown/query-in-action@v0.3.1
        with:
          database-id: ${{ secrets.DATABASE_ID }}
          notion-api-key: ${{ secrets.NOTION_KEY }}

      - id: create-ejs-data
        uses: actions/github-script@v5
        env:
          rows: ${{ steps.narkdown-query.outputs.rows }}
        with:
          script: |
            const today = new Date();
            const rows = JSON.parse(process.env.rows);
            const categories = [...new Set(rows.map((content) => content.Category))];
            const categorizedLists = categories.map((category) =>
              rows.filter((article) => category === article.Category),
            )

            return {
              date: `${today.getFullYear()}--${today.getMonth() + 1}--${today.getDate()}`,
              count: Object.keys(rows).length,
              categories,
              categorizedLists
            }

      - uses: narkdown/render-with-ejs@v0.1.1
        with:
          template-file-path: template.md
          target-file-path: README.md
          data: ${{ steps.create-ejs-data.outputs.result }}

      - uses: EndBug/add-and-commit@v7
        with:
          message: 'docs: updated by narkdown'
          default_author: github_actions

```

</details>

## Related

- [@narkdown/query-in-action](https://github.com/narkdown/query-in-action)

## License

[MIT](LICENSE)
