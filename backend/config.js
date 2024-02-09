const { pathToRegexp } = require("path-to-regexp");

const excludedPaths = [
      '/user/login',
      '/user/recovery',
      '/user/register/cli',
      '/user/find/:role',
      '/service',
    ];

const excludedRegexPaths = excludedPaths.map(path => pathToRegexp(path));

function isPathExcluded(req) {
    // console.log(req.path);
    // console.log(excludedRegexPaths.some(regex => regex.test(req.path)));
  return true;
}
module.exports = isPathExcluded