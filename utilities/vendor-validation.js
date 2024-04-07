const utilities = require("./index");
const { body, validationResult } = require("express-validator");
const vendorModel = require("../models/vendor-model")
const validate = {}

/*  **********************************
 *  vendor Addition Data Validation Rules
 * ********************************* */
validate.vendorRules = () => {
    return [
      // name is required and must be string
      body("vendor_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide the name of this vendor."), // on error this message is sent.
  
      // address is required and must be string
      body("vendor_address")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide the address for this vendor.") // on error this message is sent.

    ]
}

/* ******************************
 * Check classification data
 * ***************************** */
validate.checkVendorData = async (req, res, next) => {
  const errors = validationResult(req);
  const {vendor_name } = req.body;

  // if there are errors, send back with error messages
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    return res.render("../vendor/add", {
      title: "Add vendor",
      nav,
      errors,
      classification_name,
      messages: req.flash(),
    });
  }

  
  next();
};

/*  **********************************
 *  Vendor Data Validation Rules
 * ********************************* */
validate.vendorUpdateRules = () => {
  return [
    // name is required and must be string
    body("vendor_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide the name of this vendor."), // on error this message is sent.

  // address is required and must be string
  body("vendor_address")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide the address for this vendor.") // on error this message is sent.
  ]
}

/* ******************************
 *  Check new vendor data
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req);
  const { vendor_id, vendor_name, vendor_address } = req.body
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    const vendorInfo = await vendorModel.getVendorById(vendor_id)
    let nav = await utilities.getNav()
    res.render("../vendor/edit", {
      errors,
      title: "Edit vendor : " + vendorInfo.vendor_address,
      nav,
      vendor_name: vendorInfo.vendor_name,
      vendor_address: vendorInfo.vendor_address,
      vendor_id
    })
    return
  }
  next()
}
  
module.exports = validate