// Needed Resources 
const express = require("express")
const router = new express.Router() 
const vendorController = require("../controllers/vendorController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/vendor-validation')

// Route to main vendor management view
router.get("/", utilities.checkLogin, utilities.checkIsAdmin, utilities.handleErrors(vendorController.buildManagement));

// Route to build vendor by subpage
router.get("/edit/:vendorId", utilities.checkLogin, utilities.checkIsAdmin, utilities.handleErrors(vendorController.buildVendorEditView));

// Route to update an vendor information
router.post("/edit/", utilities.checkLogin, utilities.checkIsAdmin, regValidate.vendorUpdateRules(), regValidate.checkVendorUpdateData, utilities.handleErrors(vendorController.updateVendor))

// Route to perform the vendor delete
router.post("/delete/", utilities.checkLogin, utilities.checkIsAdmin, utilities.handleErrors(vendorController.deleteVendor))

// Route to delete a vendor
router.get("/delete/:vendorId", utilities.checkLogin, utilities.checkIsAdmin, utilities.handleErrors(vendorController.buildVendorDeleteView))

// Route to build account signup subpage
router.get("/add", utilities.checkLogin, utilities.checkIsAdmin, utilities.handleErrors(vendorController.buildAdd));

// Route to retrieve vendor via ajax
router.get("/getVendors/", utilities.handleErrors(vendorController.getvendorJSON))

// Route to handle the account signup
router.post(
    "/add",
    utilities.checkLogin, utilities.checkIsAdmin, 
    regValidate.vendorRules(),
    regValidate.checkVendorData,
    utilities.handleErrors(vendorController.registerVendor)
)

module.exports = router;