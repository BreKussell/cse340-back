const utilities = require(".")
const { body, validationResult } = require("express-validator")
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
 * Check data and return errors or continue to vendor addition
 * ***************************** */
validate.checkVendorData = async (req, res, next) => {
    const { vendor_name, vendor_address } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("./vendor/add", {
        errors,
        metaTitle: `Create a New Vendor - CSE 340`,
        title: "Add A New Vendor",    
        nav,
        vendor_name, vendor_address,
      })
      return
    }
    next()
}

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
 * Check data and return errors or continue to account update
 * ***************************** */
validate.checkVendorUpdateData = async (req, res, next) => {
  const { vendor_id, vendor_name, vendor_address } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    const vendorInfo = await vendorModel.getVendorById(vendor_id)
    let nav = await utilities.getNav()
    res.render("./vendor/edit", {
      errors,
      metaTitle: "Edit vendor - " + vendorInfo.vendor_name + " - CSE 340",
      title: "Edit vendor - " + vendorInfo.vendor_address,
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