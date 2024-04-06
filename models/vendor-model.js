const pool = require("../database/")

/* *****************************
*   Register new vendor
* *************************** */
async function registerVendor(vendor_name, vendor_address){
    try {
      const sql = "INSERT INTO vendor (vendor_name, vendor_address) VALUES ($1, $2) RETURNING *"
      return await pool.query(sql, [vendor_name, vendor_address])
    } catch (error) {
      return error.message
    }
}

/* *****************************
* Return vendor data using account_id
* ***************************** */
async function getVendorById (vendor_id) {
  try {
    const result = await pool.query(
      'SELECT * FROM vendor WHERE vendor_id = $1',
      [vendor_id])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching vendor found")
  }
}

/* ***************************
 *  Get all classification data
 * ************************** */
async function getAllVvendors(){
    return await pool.query("SELECT * FROM public.vendor ORDER BY vendor_name")
  }

/* *****************************
*   Delete vendor Data
* *************************** */
async function deleteVendor(vendor_id){
    try {
      const sql = 'DELETE FROM vendor WHERE vendor_id = $1';
      const data = await pool.query(sql, [vendor_id])
      return data
    } catch (error) {
      console.error("Delete vendor error: " + error)
    }
}

/* *****************************
*   Update account
* *************************** */
async function updateVendor(vendor_id, vendor_name, vendor_address){
  try {
    const sql = "UPDATE vendor SET vendor_name = $2, vendor_address = $3 WHERE vendor_id = $1 RETURNING *"
    const data = await pool.query(sql, [vendor_id, vendor_name, vendor_address])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

module.exports = { registerVendor, getAllVendor, getVendorById, deleteVendor, updateVendor }