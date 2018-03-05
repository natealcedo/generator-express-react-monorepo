/**
 * Sets the values of a given cookie by the provided object. This function
 * returns a new object with the values set.
 *
 *
 * @name setCookieValues
 * @function
 * @access public
 * @param {Object} cookie Original cookie to be ammended
 * @param {Object} keyValuePair Values to populate the given cookie
 * @returns {Object} New cookie populated with the new values
 */
export function setCookieValues(cookie, keyValuePair) {
  return {
    encrypted: true,
    ...cookie,
    ...keyValuePair,
  };
}

export default {
  setCookieValues,
};
