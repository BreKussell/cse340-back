const vendorModel = require("../models/vendor-model")
const utilities = require("../utilities/index")

const vendorCont = {}

/* ****************************************
*  Deliver main management view
* *************************************** */
vendorCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("../views/vendor/vendor-manage", {
    title: "Vendor Management",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Deliver add new Vendor view
* *************************************** */
vendorCont.buildAdd = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("../views/vendor/add", {
    title: "Add A New Vendor",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process New Vendor Form
* *************************************** */
vendorCont.registerVendor = async function registerVendor(req, res) {
  let nav = await utilities.getNav()
  const { vendor_name, vendor_address } = req.body

  const regResult = await vendorModel.registerVendor(
    vendor_name,
    vendor_address
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, ${vendor_name} has been successfully added to the site.`
    )
    res.status(201).render("../views/vendor/vendor-manage", {
      title: "vendor Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the Vendor could not be added.")
    res.status(501).render("../views/vendor/add", {
      title: "Add Vendor",
      nav,
      errors: null,
    })
  }
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
vendorCont.getVendorJSON = async function getVendor(req, res, next) {
  const vendorData = await vendorModel.getAllVendors()
  if (vendorData) {
    return res.json(vendorData.rows)
  } else {
    next(new Error("No data returned"))
  }
}

/* ****************************************
 *  Build vendor delete form
 * ************************************** */
vendorCont.buildVendorDeleteView = async function buildVendorDeleteView(req, res, next) {
  const vendor_id = parseInt(req.params.vendor_id)
  const nav = await utilities.getNav()
  const vendorInfo = await vendorModel.getVendorById(vendor_id)
  res.render("../views/vendor/delete", {
    title: "Delete Vendor - " + vendorInfo.vendor_name,
    nav,
    vendor_id: vendorInfo.vendor_id,
    vendor_name: vendorInfo.vendor_name,
    vendor_address: vendorInfo.vendor_address,
    errors: null,
  })
}

/* ****************************************
*  Delete vendor Data
* *************************************** */
vendorCont.deleteVendor = async function deleteVendor(req, res) {
  let nav = await utilities.getNav()
  const {
    vendor_id,
  } = req.body
  const theVendor = await vendorModel.getVendorById(parseInt(vendor_id))
  const deleteResult = await vendorModel.deleteVendor(
    parseInt(vendor_id),
  )

  const itemName = `${theVendor.vendor_name}`
  if (deleteResult) {
    req.flash("notice", `The ${itemName} Vendor was successfully deleted.`)
    res.redirect("../views/vendor/")
  } else {
    req.flash("notice", "Sorry, the delete failed.")
    res.status(501).render("vendor/delete", {
      title: `Delete ${itemName}`,
      nav,
      vendor_name,
      vendor_address,
      errors: null,
    })
  }
}


/* ****************************************
 *  Build account edit form
 * ************************************** */
vendorCont.buildVendorEditView = async function buildVendorEditView(req, res, next) {
  const vendor_id = parseInt(req.params.vendor_id)
  const nav = await utilities.getNav()
  const vendorInfo = await vendorModel.getVendorById(vendor_id)
  res.render("../views/vendor/edit", {
    title: "Edit Vendor: " + vendorInfo.vendor_name,
    nav,
    vendor_id,
    vendor_name: vendorInfo.vendor_name,
    vendor_address: vendorInfo.vendor_address,
    errors: null,
  })
}

/* ****************************************
*  Process Vendor Updates
* *************************************** */
vendorCont.updateVendor = async function updateVendor(req, res) {
  let nav = await utilities.getNav()
  const { vendor_id, vendor_name, vendor_address } = req.body

  const regResult = await vendorModel.updateVendor(
    vendor_id,
    vendor_name,
    vendor_address
  )

  if (regResult) {
    req.flash(
      "notice",
      `The information associated with the ${vendor_name} has been successfully updated!`
    )
    res.status(201).render("../views/vendor/vendor-manage", {
      title: "Vendor Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("../views/vendor/vendor-manage", {
      title: "Vendor Management",
      nav,
      errors: null,
    })
  }
}



module.exports = vendorCont