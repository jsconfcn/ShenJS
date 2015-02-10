
/**
 * Expose `substitute`
 */

module.exports = substitute;

/**
 * Substitute `:prop` with the given `obj` in `str`
 *
 * @param {String} str
 * @param {Object} obj
 * @param {RegExp} expr
 * @return {String}
 * @api public
 */

function substitute(str, obj, expr){
  if (!obj) throw new TypeError('expected an object');
  expr = expr || /:(\w+)/g;
  return str.replace(expr, function(_, prop){
    return null != obj[prop]
      ? obj[prop]
      : _;
  });
}
