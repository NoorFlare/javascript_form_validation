
/***********************************************************************************
 registration form validation
***********************************************************************************/
function validateRegisterationForm() {
    // get value from Form Input Fields and store in variable
	var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var icecream = document.getElementById('icecream').value;
    var maleRadio = document.getElementById("male");
    var femaleRadio = document.getElementById("female");
    var subscribe = document.getElementById("subscribe");

    //take an array to store the all error messages 
    var registerErrors = [];

    // check the null fields
    if (username === '') {
        registerErrors.push('Please fill username field.');
    }
    if (password === '') {
        registerErrors.push('Please fill password field.');
    } 
    //check the password lenght
    else if (password.length < 9) {
        registerErrors.push('Password must be at least 9 characters long.');
    }
    if (!maleRadio.checked && !femaleRadio.checked) {
        registerErrors.push('Please select your gender.');
    } 
    if (email === '') {
        registerErrors.push('Please fill in email field.');
    } 
    if (icecream ==='') {
        registerErrors.push('Please select tour favourite Ice Cream.');
    }  
    if (!subscribe.checked) {
        registerErrors.push('Please subscribed newsletter.');
    }
     // Check if the registerErrors[] array contains any error messages.
    if (registerErrors.length > 0) {
        // If there are errors, show an alert dialog with the error messages joined by newlines.
        alert(registerErrors.join('\n'));
        // Prevent the default behavior (e.g., form submission) by returning false.
        return false; 
    }
    else
    {
        alert('You are register Successfully');
    	return true;
    }
}
  
/*******************************************************************************
 order form validation - limit credit card number
*******************************************************************************/
   
// Wait for the page to finish loading before we start
document.addEventListener('DOMContentLoaded', function () {
    // Get the value from Form Input Fields and store them in variables
    const creditCardNumberInput = document.getElementById('credit-card-number');
    const creditCardTypeSelect = document.getElementById('credit-card-type');

    // When the credit card type selection changes
    creditCardTypeSelect.addEventListener('change', function () {
        const selectedCardType = creditCardTypeSelect.value;
        let maxLength;

        // Determine the maximum length based on the selected credit card type
        if (selectedCardType === 'visa' || selectedCardType === 'mastercard') {
            maxLength = 16;
        } else if (selectedCardType === 'amex') {
            maxLength = 15;
        }

        // Add an input event listener to the credit card number input
        creditCardNumberInput.addEventListener('input', function () {
            const inputValue = creditCardNumberInput.value;
            if (inputValue.length > maxLength) {
                // If the input exceeds the maximum length, truncate it and display a message
                creditCardNumberInput.value = inputValue.slice(0, maxLength);
                alert('Maximum character limit reached for this credit card type.');
            }
        });
    });
});

/***********************************************************************************************
 order form validation  - if checkbox is checked auto copy delivery address to the billing address
*************************************************************************************************/

// Trigger when webpage is fully load
document.addEventListener('DOMContentLoaded', function () {
    // Get the input fields for delivery address, billing address, and the checkbox
    var deliveryAddressInput = document.getElementById('delivery-address');
    var billingAddressInput  = document.getElementById('billing-address');
    var sameAddressCheckbox  = document.getElementById('same-address');

    // Trigger when any channge happen in sameAddress checkBox
    sameAddressCheckbox.addEventListener('change', function() {
        if (sameAddressCheckbox.checked) {
            // If the checkbox is checked, copy the value from the delivery address to the billing address
            billingAddressInput.value = deliveryAddressInput.value;
        } 
    });
});


/*****************************************************************************************
 order form validation - if delivery option is select
******************************************************************************************/

// Function to show delivery fields when 'Delivery' is selected
function showDeliveryFields() {
    // Display the delivery address, postcode, billing address, and 'Same as Delivery Address' fields
    document.getElementById('delivery-address-group').style.display = 'flex';
    document.getElementById('postcode-group').style.display = 'flex';
    document.getElementById('billing-address-group').style.display = 'flex';
    document.getElementById('same-address-group').style.display = 'flex';
}

// Function to hide delivery fields when 'Pickup' is selected
function hideDeliveryFields() {
    // Hide the delivery address, postcode, billing address, and 'Same as Delivery Address' fields
    document.getElementById('delivery-address-group').style.display = 'none';
    document.getElementById('postcode-group').style.display = 'none';
    document.getElementById('billing-address-group').style.display = 'none';
    document.getElementById('same-address-group').style.display = 'none';
}


/*****************************************************************************************
 order form validation - if pay online option is select
******************************************************************************************/
function togglePaymentFields() {
    var paymentMethod = document.getElementById('payment-method');
    var creditCardTypeGroup = document.getElementById('credit-card-type-group');
    var creditCardNumberGroup = document.getElementById('credit-card-number-group');

    if (paymentMethod.value === 'online') {
        creditCardTypeGroup.style.display = 'flex';
        creditCardNumberGroup.style.display = 'flex';
    }
    else {
        creditCardTypeGroup.style.display = 'none';
        creditCardNumberGroup.style.display = 'none';
    }
}

/*****************************************************************************************
 order form validation
******************************************************************************************/

function validateOrderForm() {
    // get value from OrderForm  Radio Buttons and store in variable
    var deliveryType = document.querySelector('input[name="delivery-type"]:checked');
    // get value from Form Input Fields and store in variable
    var icecreamFlavour = document.getElementById('ice-cream-flavour');
    var deliveryAddress = document.getElementById('delivery-address');
    var postcode = document.getElementById('postcode');
    var billingAddress = document.getElementById('billing-address');
    var sameAddressCheckbox = document.getElementById('same-address');
    var contactNumber = document.getElementById('contact-number');
    var email = document.getElementById('email');
    var paymentMethod = document.getElementById('payment-method');
    var creditCardType = document.getElementById('credit-card-type');
    var creditCardNumber = document.getElementById('credit-card-number');
    
 //take an array to store the all error messages 
    var errors = [];
     if (!icecreamFlavour.value ) {
        errors.push("Please select Ice Cream Flavour.");
    }
    
    if (!deliveryType) {
        // push/store the message in the error[] array
        errors.push("Please select Delivery or Pickup.");  
    }

    // Check if delivery type is 'delivery' then validate  all related fields
    if (deliveryType && deliveryType.value === 'delivery') {
        // delivery address is empty, add an error message.
        if (!deliveryAddress.value) {
            errors.push("Delivery Address is required.");
        }
        // Check if the postcode is not a valid 4-digit number, add an error message.
        if (!postcode.value.match(/^\d{4}$/)) {
            errors.push("Please enter a valid 4-digit Postcode.");
        }
        // Check if billing address is empty, add an error message.
        if (!billingAddress.value) {
            errors.push("Billing Address is required.");
        }

        // If the 'Same as Delivery Address' checkbox is checked, set the billing address to the delivery address.
        if (sameAddressCheckbox.checked) {
            billingAddress.value = deliveryAddress.value;
        }
    }   
    
    // Check if the contact number is empty, add an error message.
    if (!contactNumber.value.match(/\S/)) {
        errors.push("Contact Number is required.");
    }
    
    // if the 'contactNumber' value does not match a 11-digit number pattern
    else if(!contactNumber.value.match(/^\d{11}$/)) {
        errors.push("Contact Number is must be of 11 digits.");   
    }

    // Check if the email is not in a valid email format, add an error message.
    if (!email.value.match(/^\S+@\S+\.\S+$/)) {
        errors.push("Please enter a valid Email for Receipt.");
    }

    if (!paymentMethod.value) {
        errors.push("Please select a valid Payment Option.");
    }

    // Check if the payment method is 'online' and a Credit Card Type is not selected, then add an error message.
    if (paymentMethod.value === 'online' && !creditCardType.value) {
        errors.push("Please select a Credit Card Type.");
    }

    // Check if the selected Credit Card Type is 'visa' and the credit card number doesn't have 16 digits, then add an error message.
    if (creditCardType.value === 'visa' && creditCardNumber.value.length !== 16) {
        errors.push("Visa card number must have 16 digits for Visa.");
    }

    // Check if the selected Credit Card Type is 'mastercard' and the credit card number doesn't have 16 digits, then add an error message.
    if (creditCardType.value === 'mastercard' && creditCardNumber.value.length !== 16) {
        errors.push("MasterCard number must have 16 digits for MasterCard.");
    }

    // Check if the selected Credit Card Type is 'amex' and the credit card number doesn't have 15 digits, then add an error message.
    if (creditCardType.value === 'amex' && creditCardNumber.value.length !== 15) {
        errors.push("American Express card number must have 15 digits for American Express.");
    }

   // Check if the errors[] array contains any error messages.
    if (errors.length > 0) {
        // If there are errors, show an alert dialog with the error messages joined by newlines.
        alert(errors.join('\n'));
        // Prevent the default behavior (e.g., form submission) by returning false.
        return false; 
    }


    // if all fiels fulfill validation criteria 
    else
    {
        alert('Your Order Place Successfully');
        return true;
    }
}
