--Insert a client into the account table
INSERT INTO clients (account_firstname, account_lastname, account_email, account_password) 
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

--Modify the Tony Stark record to change the  account_type to admin
UPDATE clients SET  account_type = 'Admin' WHERE clientFirstname = 'Tony' AND
clientLastname = 'Stark';

-- Delete Delete the Tony Stark record from the database.
DELETE FROM account WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

--Modify the "GM Hummer" record to read "a huge interior" rather than "small interiors" using a single query.
UPDATE inventory SET invDescription = REPLACE(invDescription, 'small', 'huge')
WHERE invMake = 'GM' AND invModel = 'Hummer';

-- Use an inner join to select the make and model fields from the inventory table and the classification name field from
-- the classification table for inventory items that belong to the "Sport" category.
SELECT  i.inv_make,  i.inv_model FROM inventory i INNER JOIN
classification c ON i.classification_id = c.classification_id WHERE
c.classification_name = 'Sport';


--Update all records in the inventory table to add "/vehicles" to the middle of the file path in the inv_image and
--inv_thumbnail columns using a single query.
UPDATE inventory SET inv_image = concat('/vehicles', inv_image), inv_thumbnail =
concat('/vehicles', inv_thumbnail);