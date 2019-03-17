// Load in modules
const fetch = require("node-fetch");
const yaml = require("js-yaml");
const cheerio = require("cheerio");
const colors = require("colors");

async function run() {
  // Grab down sites.yml
  let url =
    "https://raw.githubusercontent.com/gatsbyjs/gatsby/master/docs/sites.yml";

  let yamlStr;

  try {
    yamlStr = await fetch(url).then(resp => resp.text());
  } catch (err) {
    console.log(`[Err]: ${err.message}`);
    process.exit(1);
  }

  // Parse YAML
  let parsedYaml = yaml.safeLoad(yamlStr, "utf8");

  let sitesVisited = 0;
  let nonGatsbySiteCount = 0;
  let erroredOut = 0;
  let totalSitesCount = parsedYaml.length;

  // Loop over each site
  for (let site of parsedYaml) {
    let siteUrl = site.main_url;

    let siteHtml;

    // Fetch site
    try {
      siteHtml = await fetch(siteUrl).then(resp => resp.text());
    } catch (err) {
      console.log(
        `[Err]: ${site.title} (${siteUrl}) ran into an error: ${err.message}`
          .red
      );
      sitesVisited++;
      erroredOut++;
      continue; // Skip the rest of the check for this particular site
    }

    // Pass html into a parser
    let $ = cheerio.load(siteHtml);

    // Most Gatsby sites have an id of "___gatsby"
    let gatsbyContainer = $("#___gatsby");

    if (gatsbyContainer.length !== 0) {
      // The site is a gatsby site don't do anything
      sitesVisited++;
    } else {
      // The site is not a gatsby site, print out some info
      console.log(
        `[Notice]: ${site.title} (${siteUrl}) is not a Gatsby site`.yellow
      );
      sitesVisited++;
      nonGatsbySiteCount++;
    }
  }

  console.log(
    `We visited ${sitesVisited}/${totalSitesCount} sites. Out of them, ${nonGatsbySiteCount} sites were not a Gatsby site and ${erroredOut} errored out when visiting it.`
      .green
  );
}

run();
