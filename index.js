const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const prettier = require("prettier");
const core = require("@actions/core");

try {
  (async () => {
    const templateFilePath = core.getInput("template-file-path");
    const targetFilePath = core.getInput("target-file-path");
    const data = core.getInput("data") || null;

    const template = await fs.promises.readFile(
      path.resolve(templateFilePath),
      "utf8"
    );

    const markdown = prettier.format(ejs.render(template, JSON.parse(data)), {
      parser: "markdown",
    });

    await fs.promises.writeFile(targetFilePath, markdown);
  })();
} catch (error) {
  core.setFailed(error.message);
}
