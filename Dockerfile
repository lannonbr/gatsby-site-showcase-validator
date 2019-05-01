FROM node:10-alpine

LABEL version="1.0.0"
LABEL repository="https://github.com/lannonbr/gatsby-site-showcase-validator"
LABEL maintainer="Benjamin Lannon <benjamin@lannonbr.com>"

LABEL com.github.actions.name="Gatsby Site Showcase Validator"
LABEL com.github.actions.description="Check Gatsby's Site Showcase to validate all sites are built with Gatsby"
LABEL com.github.actions.icon="monitor"
LABEL com.github.actions.color="purple"

ADD package.json /package.json
ADD yarn.lock /yarn.lock
WORKDIR /
COPY . /

RUN yarn

ENTRYPOINT [ "node", "/index.js" ]