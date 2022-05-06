const { TYPEKIT } = require("../../shared/config.json")
const social = require("./social")

function script(source) {
  return `<script src=${source} type=module crossorigin></script>`
}

function getBaseUrl() {
  let url
  if (process.env.NODE_ENV === 'testing') {
      url = 'http://localhost:3333'
  }
  else  {
      url = `https://${ process.env.NODE_ENV === 'staging' ? 'staging.' : '' }2022.cascadiajs.com`
  }
  return url
}

module.exports = function Head ({path, title, socialUrl, excerpt = null, scripts = [], rawHead = ''}) {
  // expand title
  title = `CascadiaJS 2022${ title ? ' - ' + title : '' }`

  // set a default social sharing image
  if (socialUrl === undefined || socialUrl === "") {
    socialUrl = getBaseUrl() + "/social?path=/conference"
  }

  // convert relative a socialURL to absolute, if necessary
  if (socialUrl.startsWith("/")) {
    socialUrl = getBaseUrl() + socialUrl
  }

  let url = getBaseUrl() + path

  return /*html*/`
  <head>
    <meta charset=utf-8>
    <title>${ title }</title>
    <link rel="stylesheet" href="https://use.typekit.net/${ TYPEKIT }.css">
    <link rel="stylesheet" href="/styles/normalize.css">
    <link rel="stylesheet" href="/styles/main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${ excerpt ? `<meta property="og:description" content="${ excerpt }" />` : ``}
    <meta name="image" property="og:image" content="${ socialUrl }" />
    <meta name="url" property="og:url" content="${ url }" />
    <meta name="type" property="og:type" content="website" />
    <meta name="author" content="Carter Rabasa">
    <meta property="og:title" content="${ title }" />
    <meta name="twitter:image" content="${ socialUrl }">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@cascadiajs">
    <meta name="twitter:title" content="${ title }">
    <link id="light-scheme-icon" rel="icon" href="/images/logo-blue.svg">
    <link id="dark-scheme-icon" rel="icon" href="/images/logo-green.svg">
    ${ scripts.map(s => script(s)) }
    ${ rawHead }
  </head>
`
}
