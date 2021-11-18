# @narkdown/render-with-ejs

[![GitHub Action: View on Marketplace](https://img.shields.io/badge/GitHub%20Action-View_on_Marketplace-blue?logo=github)](https://github.com/marketplace/actions/narkdown-render-with-ejs)
[![narkdown](https://github.com/younho9/awesome-reading-list/actions/workflows/narkdown.yml/badge.svg?branch=main&event=schedule)](https://github.com/younho9/awesome-reading-list/actions/workflows/narkdown.yml)
[![Version: v0.1.1](https://img.shields.io/badge/Version-v0.1.1-green)](https://github.com/narkdown/render-with-ejs/releases/tag/v0.1.1)
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

## Related

- [@narkdown/query-in-action](https://github.com/narkdown/query-in-action)

## License

[MIT](LICENSE)
