'use strict' 




// Build inventory items into HTML table components and inject into DOM
function buildInventoryList(data) {
  let inventoryDisplay = document.getElementById("inventoryDisplay");
  // Set up the table labels
  let dataTable = "<thead>";
  dataTable += "<tr><th>Vendor Name</th><td>&nbsp;</td><td>&nbsp;</td></tr>";
  dataTable += "</thead>";
  // Set up the table body
  dataTable += "<tbody>";
  // Iterate over all vehicles in the array and put each in a row
  data.forEach(function (element) {
    console.log(element.inv_id + ", " + element.vendor_model);
    dataTable += `<tr><td>${element.inv_make} ${element.inv_model}</td>`;
    dataTable += `<td><a href='/inv/edit/${element.vendor_id}' title='Click to update'>Modify</a></td>`;
    dataTable += `<td><a href='/inv/delete/${element.vendor_id}' title='Click to delete'>Delete</a></td></tr>`;
  });
  dataTable += "</tbody>";
  // Display the contents in the Inventory Management view
  inventoryDisplay.innerHTML = dataTable;
}