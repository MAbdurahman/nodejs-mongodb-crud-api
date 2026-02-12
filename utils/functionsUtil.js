function getFirstName(fullName) {
   let name = [];
   name = fullName.split(' ');

   return name[0];
}

function getLastName(fullName) {
   let name = [];
   name = fullName.split(' ');

   if (name.length <= 2) {
      return name[name.length - 1];

   } else {
      name = name[1];
      name = name.replace(',', '');
      return name;
   }
}

function validateUserInfo(userName, fullName, email, password) {

   let username_trimmed = userName.trim();
   let fullname_trimmed = fullName.trim();
   let email_trimmed = email.trim();
   let password_trimmed = password.trim();

   const username_pattern = /^(?=[a-z])(?=.*\d)[a-z0-9]{4,16}$/;
   const username_start_pattern = /^(?=.*[a-z])/g;
   const username_allowable_pattern = /^[a-z0-9]*$/;
   const username_digit_pattern = /^(?=.*\d{1,})/g;

   const fullname_pattern = /^([a-zA-Z-]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;
   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,32}$/i;
   const lowercase_pattern = /^(?=.*[a-z])/g;
   const uppercase_pattern = /^(?=.*[A-Z])/g;
   const digit_pattern = /^(?=.*\d{1,})/g;
   const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

   /************************* username conditional statements *************************/
   if (username_trimmed.length === 0) {
      return {isValid: false, error: 'Username is required!'};

   } else if (!username_trimmed.match(username_start_pattern)) {
      return {isValid: false, error: 'Username must start with a lowercase letter!'};

   } else if (!username_trimmed.match(username_allowable_pattern)) {
      return {
         isValid: false,
         error: 'Username must contain only lowercase letters and numbers!'
      };

   } else if (!username_trimmed.match(username_digit_pattern)) {
      return {isValid: false, error: 'Username must contain at least one number!'};

   } else {
      if (!username_trimmed.match(username_pattern)) {
         return {
            isValid: false,
            error: 'Username must be lowercase letters amd numbers, and between 4 and 16 characters!'
         };

      }
   }

   /************************* fullname conditional statements *************************/

   if (fullname_trimmed.length === 0) {
      return {isValid: false, error: 'First and last name are required!'};

   } else {
      if (!fullname_trimmed.match(fullname_pattern)) {
         return {isValid: false, error: 'Enter a valid first and last name!'};
      }
   }

   /************************* email conditional statements *************************/

   if (email_trimmed.length === 0) {
      return {isValid: false, error: 'Email is required!'};

   } else {
      if (!email_trimmed.match(email_pattern)) {
         return {isValid: false, error: 'Enter a valid email!'};
      }
   }

   /************************* password conditional statements *************************/

   if (password_trimmed.length === 0) {
      return {isValid: false, error: 'Password is required!'};

   } else if (!password_trimmed.match(lowercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must contain at least one lowercase letter!'
      };

   } else if (!password_trimmed.match(uppercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must contain at least one uppercase letter!'
      };

   } else if (!password_trimmed.match(digit_pattern)) {
      return {isValid: false, error: 'Password must contain at least one number!'};

   } else if (!password_trimmed.match(special_pattern)) {
      return {
         isValid: false,
         error: `Password must include at least one: '-+_!@#$%^&*?'!`
      };

   } else if (!password_trimmed.match(password_pattern)) {
      return {isValid: false, error: 'Password must be at least 8 characters long!'};

   } else {
      return {isValid: true};
   }

}

function validateEmailAndPassword(email, password) {
   let email_trimmed = email.trim();
   let password_trimmed = password.trim();

   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;
   const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,}$/i;
   const lowercase_pattern = /^(?=.*[a-z])/g;
   const uppercase_pattern = /^(?=.*[A-Z])/g;
   const digit_pattern = /^(?=.*\d{1,})/g;
   const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

   if (email_trimmed.length === 0) {
      return {isValid: false, error: 'Email is required!'};

   } else {
      if (!email_trimmed.match(email_pattern)) {
         return {isValid: false, error: 'Enter a valid email!'};
      }
   }


   if (password_trimmed.length === 0) {
      return {isValid: false, error: 'Password is required!'};

   } else if (!password_trimmed.match(lowercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must contain at least one lowercase letter!'
      };

   } else if (!password_trimmed.match(uppercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must contain at least one uppercase letter!'
      };

   } else if (!password_trimmed.match(digit_pattern)) {
      return {isValid: false, error: 'Password must contain at least one number!'};

   } else if (!password_trimmed.match(special_pattern)) {
      return {
         isValid: false,
         error: `Password must include at least one: '-+_!@#$%^&*?'!`
      };

   } else if (!password_trimmed.match(password_pattern)) {
      return {
         isValid: false,
         error: 'Password must be between 8 and 32 characters long!'
      };

   } else {
      return {isValid: true};
   }

}

function validateFullname(fullname) {
   let fullname_trimmed = fullname.trim();

   const fullname_pattern = /^([a-zA-Z-]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;

   if (fullname_trimmed.length === 0) {
      return {isValid: false, error: 'First and last name are required!'};

   } else if (!fullname_trimmed.match(fullname_pattern)) {
      return {isValid: false, error: 'Enter a valid first and last name!'};

   } else {
      return {isValid: true};
   }

}

function validateEmail(email) {
   let email_trimmed = email.trim();
   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   if (email_trimmed.length === 0) {
      return {isValid: false, error: 'Email is required!'};

   } else if (!email_trimmed.match(email_pattern)) {
      return {isValid: false, error: 'Enter a valid email!'};

   } else {
      return {isValid: true};
   }

}

function validatePassword(password) {
   let password_trimmed = password.trim()

   const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,32}$/i;
   const lowercase_pattern = /^(?=.*[a-z])/g;
   const uppercase_pattern = /^(?=.*[A-Z])/g;
   const digit_pattern = /^(?=.*\d{1,})/g;
   const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

   if (password_trimmed.length === 0) {
      return {isValid: false, error: 'Password is required!'};

   } else if (!password_trimmed.match(lowercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must contain at least one lowercase letter!'
      };

   } else if (!password_trimmed.match(uppercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must contain at least one uppercase letter!'
      };

   } else if (!password_trimmed.match(digit_pattern)) {
      return {isValid: false, error: 'Password must contain at least one number!'};

   } else if (!password_trimmed.match(special_pattern)) {
      return {
         isValid: false,
         error: `Password must include at least one: '-+_!@#$%^&*?'!`
      };

   } else if (!password_trimmed.match(password_pattern)) {
      return {
         isValid: false,
         error: 'Password must be between 8 and 32 characters long!'
      };

   } else {
      return {isValid: true};
   }
}

function validatedFullnameEmailAndPassword(fullname, email, password) {
   let fullname_trimmed = fullname.trim();
   let email_trimmed = email.trim();
   let password_trimmed = password.trim();


   const fullname_pattern = /^([a-zA-Z-]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;
   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,32}$/i;
   const lowercase_pattern = /^(?=.*[a-z])/g;
   const uppercase_pattern = /^(?=.*[A-Z])/g;
   const digit_pattern = /^(?=.*\d{1,})/g;
   const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;


   /************************* fullname conditional statements *************************/

   if (fullname_trimmed.length === 0) {
      return {isValid: false, error: 'First and last name are required!'};

   } else {
      if (!fullname_trimmed.match(fullname_pattern)) {
         return {isValid: false, error: 'Enter a valid first and last name!'};
      }
   }

   /************************* email conditional statements *************************/

   if (email_trimmed.length === 0) {
      return {isValid: false, error: 'Email is required!'};

   } else {
      if (!email_trimmed.match(email_pattern)) {
         return {isValid: false, error: 'Enter a valid email!'};
      }
   }

   /************************* password conditional statements *************************/

   if (password_trimmed.length === 0) {
      return {isValid: false, error: 'Password is required!'};

   } else if (!password_trimmed.match(lowercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must contain at least one lowercase letter!'
      };

   } else if (!password_trimmed.match(uppercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must contain at least one uppercase letter!'
      };

   } else if (!password_trimmed.match(digit_pattern)) {
      return {isValid: false, error: 'Password must contain at least one number!'};

   } else if (!password_trimmed.match(special_pattern)) {
      return {
         isValid: false,
         error: `Password must include at least one: '-+_!@#$%^&*?'!`
      };

   } else if (!password_trimmed.match(password_pattern)) {
      return {isValid: false, error: 'Password must be at least 8 characters long!'};

   } else {
      return {isValid: true};
   }

}

function validatePassCode(passCode) {
   let passCode_trimmed = passCode.trim();

   const passCode_pattern = /^(?=[a-z])(?=.*\d)[a-z0-9]{6}$/;
   const passCode_start_pattern = /^(?=.*[a-z])/g;
   const passCode_allowable_pattern = /^[a-z0-9]*$/;
   const passCode_digit_pattern = /^(?=.*\d{1,})/g;

   /************************* passCode conditional statements *************************/
   if (passCode_trimmed.length === 0) {
      return {isValid: false, error: 'PassCode is required!'};

   } else if (!passCode_trimmed.match(passCode_start_pattern)) {
      return {isValid: false, error: 'PassCode must start with a lowercase letter!'};

   } else if (!passCode_trimmed.match(passCode_allowable_pattern)) {
      return {
         isValid: false,
         error: 'PassCode must contain only lowercase letters and numbers!'
      };

   } else if (!passCode_trimmed.match(passCode_digit_pattern)) {
      return {isValid: false, error: 'PassCode must contain at least one number!'};

   } else if (!passCode_trimmed.match(passCode_pattern)) {
      return {
         isValid: false,
         error: 'PassCode must be lowercase letters amd numbers, and between 4 and 16 characters!'
      };

   } else {
      return {isValid: true};
   }

}

module.exports = {
   getFirstName,
   getLastName,
   validateUserInfo,
   validateEmailAndPassword,
   validateFullname,
   validateEmail,
   validatePassword,
   validatePassCode,
   validatedFullnameEmailAndPassword
}