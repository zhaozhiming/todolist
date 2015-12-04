if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.prd');
} else {
  module.exports = require('./Root.dev');
}
