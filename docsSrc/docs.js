const dox = require("dox");
const fs = require("fs");
const hljs = require("highlight.js");
const CleanCSS = require("clean-css");

const buildDir = "docs";

const css = fs.readFileSync("./docsSrc/index.css");
const src = fs.readFileSync("./index.js", "utf-8");
const obj = dox.parseComments(src);

const docEntry = (o) => {
  const name = o.ctx.name;
  const example = o.tags.find((tag) => tag.type === "example").string;
  const seeObj = o.tags.find((tag) => tag.type === "see");

  const seeAlso = seeObj
    ? `<p class="card__see">See also ${seeObj.string
        .split(" ")
        .map((s) => `<a class="link" href="#${s}">${s}</a>`)
        .join(" ")}</p>`
    : "";

  return `
    <div class="card" id="${name}">
      <h2 class="card__title">
        <div class="card__title-left">
          <a class="card__title-text" href="#${name}">${name}</a>
          <div class="card__sig">${
            o.tags.find((tag) => tag.type === "sig").string
          }</div>
        </div>
        <a
          class="card__src link"
          href="https://github.com/benji6/imlazy/blob/master/index.js#L${
            o.line
          }"
          rel="noopener"
          target="_blank"
        >src</a>
      </h2>
      ${o.description.full.slice(
        0,
        2,
      )} class="card__description"${o.description.full.slice(2)}
      <pre class="hljs">${
        hljs.highlight(example, { language: "js" }).value
      }</pre>
      ${seeAlso}
    </div>
  `;
};

const page = (children) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>imlazy docs</title>
    <link rel="stylesheet" href="index.css">
  </head>
  <body>
    <header class="header">
      <h1 class="header__title">imlazy</h1>
      <a class="link" href="https://github.com/benji6/imlazy">GitHub</a>
    </header>
    <main>
      ${children}
    </main>
  </body>
  </html>
`;

if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);

fs.writeFileSync(`${buildDir}/index.html`, page(obj.map(docEntry).join("")), {
  collapseWhitespace: true,
});
fs.writeFileSync(`${buildDir}/index.css`, new CleanCSS({}).minify(css).styles);
