/**
 *
 * Function for storing customer policy details into the database layer and into a cookie where the values of the cookie are encrypted
 *
 * @name sampleControllerFunction
 * @function
 * @access public
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Object} next Express next object
 * @returns {Promise} Promise which resolves to undefined
 */
export async function sampleControllerFunction(req, res, next) {
  try {
    return res.status(200).json({ uptime: process.uptime() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export default {
  sampleControllerFunction,
};
