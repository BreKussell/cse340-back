// Needed Resources 
const express = require("express")
const router = new express.Router() 
const vendorController = require("../controllers/vendorController")
const utilities = require("../utilities/index")
const venValidate = require("../utilities/vendor-validation")

// Route to main vendor management view
router.get("/", utilities.checkLogin, utilities.checkIsAdmin, utilities.handleError(vendorController.buildManagement));

// Route to build vendor 
router.get("/edit/:vendor_id", utilities.checkLogin, utilities.checkIsAdmin, utilities.handleError(vendorController.buildVendorEditView));

// Route to update an vendor information
router.post("/edit/", utilities.checkLogin, utilities.checkIsAdmin, venValidate.vendorUpdateRules(), venValidate.checkVendorUpdateData, utilities.handleError(vendorController.updateVendor))

// Route to perform the vendor delete
router.post("/delete/", utilities.checkLogin, utilities.checkIsAdmin, utilities.handleError(vendorController.deleteVendor))

// Route to delete a vendor
router.get("/delete/:vendor_id", utilities.checkLogin, utilities.checkIsAdmin, utilities.handleError(vendorController.buildVendorDeleteView))

// Route to build account signup 
router.get("/add", utilities.checkLogin, utilities.checkIsAdmin, utilities.handleError(vendorController.buildAdd));

// Route to retrieve vendor 
router.get("/getVendors/", utilities.handleError(vendorController.getVendorJSON))

// Route to handle the account signup
router.post(
    "/add",
    utilities.checkLogin, utilities.checkIsAdmin, 
    venValidate.vendorRules(),
    venValidate.checkVendorData,
    utilities.handleError(vendorController.registerVendor)
)

module.exports = router;