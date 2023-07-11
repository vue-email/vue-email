const fs = require("fs");
const path = require("path");

fs.readdir(".changeset", (err, files) => {
  const result =
    files.filter((f) => path.extname(f).toLowerCase() === ".md").length - 1;
  console.log("Checking number of changes in changeset: ", result);
  process.exit(result > 0 ? 0 : 1);
});
