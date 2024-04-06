const invModel = require('../models/inventory-model');
const utilities = require('../utilities/');

const individualCont = {};

/* ***************************
 *  Build by individual view
 * ************************** */
individualCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const individualId = req.params.individualId * 1;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const findObjectByInvId = (arr, invId) => {
    return arr.find(obj => obj.inv_id === invId);
  };
  const foundObject = findObjectByInvId(data, individualId);
  const grid = await utilities.buildIndividualGrid(foundObject);
  const header = await utilities.getHeader();
  let nav = await utilities.getNav();
  const specificVehicle = `${foundObject.inv_year} ${foundObject.inv_make} ${foundObject.inv_model}`
  res.render('./inventory/individual', {
    title: specificVehicle ,
    header,
    nav,
    grid,
  });
};

module.exports = individualCont;