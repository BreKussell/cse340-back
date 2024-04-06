const utilities = require("../utilities/")
const vendorModel = require("../models/vendor-model")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  const vendorData = await vendorModel.getAllVendors()
  const vendorBlocks = await utilities.buildVendorGrid(vendorData.rows)
  
  res.render("index", {
    metaTitle: `CSE 340 - Homepage`,
    title: "Home",
    nav,
    vendorBlocks,
    errors: null,
  })
}

baseController.badLink = async function(req, res){
  let nav = await utilities.getNav()
  res.render("errors/error", {
    metaTitle: `CSE 340 - Server 500 Error`,
    title: '500',
    message: 'Something went wrong :-(',
    nav,
    errors: null,
  })
}

module.exports = baseController