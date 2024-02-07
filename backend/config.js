const { pathToRegexp } = require("path-to-regexp");

const excludedPaths = [
      '/user/login',
      '/user/recovery',
      '/user/find/:role',
      '/service'
    ];

const excludedRegexPaths = excludedPaths.map(path => pathToRegexp(path));

function isPathExcluded(req) {
    // console.log(req.path);
    // console.log(excludedRegexPaths.some(regex => regex.test(req.path)));
  return excludedRegexPaths.some(regex => regex.test(req.path));
}
module.exports = isPathExcluded