'use strict' 

// Build inventory items into HTML table components and inject into DOM 
function buildVendorList(data) { 
    let inventoryDisplay = document.getElementById("vendorDisplay"); 
    // Set up the table labels 
    let dataTable = '<thead>'; 
    dataTable += '<tr><th>Vendor Name</th><td>&nbsp;</td><td>&nbsp;</td></tr>'; 
    dataTable += '</thead>'; 
    // Set up the table body 
    dataTable += '<tbody>'; 
    // Iterate over all vendors in the array and put each in a row 
    data.forEach(function (element) { 
     dataTable += `<tr><td>${element.vendor_name}</td>`; 
     dataTable += `<td><a href='/vendor/edit/${element.vendor_id}' title='Click to update'>Modify</a></td>`; 
     dataTable += `<td><a href='/vendor/delete/${element.vendor_id}' title='Click to delete'>Delete</a></td></tr>`; 
    }) 
    dataTable += '</tbody>'; 
    // Display the contents in the Inventory Management view 
    inventoryDisplay.innerHTML = dataTable; 
}

let classIdURL = "/vendor/getVendors/"
  fetch(classIdURL) 
  .then(function (response) { 
   if (response.ok) { 
    return response.json(); 
   } 
   throw Error("Network response was not OK"); 
  }) 
  .then(function (data) { 
   console.log(data); 
   buildVendorList(data); 
  }) 
  .catch(function (error) { 
   console.log('There was a problem: ', error.message) 
  }) 