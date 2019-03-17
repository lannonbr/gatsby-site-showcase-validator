# Gatsby Site Showcase Validator

A simple node script that visits and checks all of the sites in the [Site Showcase](https://www.gatsbyjs.org/showcase/) for Gatsby.

Other than 1 false positive, the validator properly will print out sites that it sucessfully visited and were not a Gatsby site. As well, if the site linked is inaccessible for things like cert errors or if the page is just not online anymore, it will also print such out.

## Instructions

1. Clone down the repository
2. Install the dependencies with npm or yarn
3. run `node index.js`
