// Import Paswword Validator package
var passwordValidator = require('password-validator');

// Schema to make password more secure
var passwordSchema = new passwordValidator();

//Password schema rules
passwordSchema
.is().min(8) // minimum length : 8
.has().uppercase() // must have uppercase letters 
.has().lowercase() // must have lowercase letters
.has().digits(2) // must have at least 2 digits
.has().not().spaces() // must not have spaces

module.exports = passwordSchema;