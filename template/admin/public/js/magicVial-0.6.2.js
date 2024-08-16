/*=============================================================================

	Magic Vial

	Liscensed under MIT
	Copyright (c) 2014-2015 - Jade C. Rigby

	AUTHOR: Jade C. Rigby
	DATE: 3/12/2017
	EMAIL: contact@jaderigby.com
	VERSION: 0.6.2

	Successfully tested with jQuery 1.11.1

	0.6.2 UPDATES:
	- fixed and improved "data-match" attribute for passwords, etc
	- [] added support for phone number validation
	- [] added callback support

=============================================================================*/

// TO USE: First, make sure to include both jQuery and "magicVial.js".
// Then, call the function "magicVial('form')" passing in as the
// parameter whatever you want to validate, using a "jQuery" like descriptor,
// such as "form#mainForm", etc.
// EXAMPLE: magicVial('form#contact');


function magicVial(myArg, useRequiredMessage) {
	// Available "data-" attributes
	// 1. data-validate="name"
	// 2. data-error-message="Please enter a valid First Name" (Note: can either contain a string as an "error" message, or can be left blank)
	// 3. data-required (Note: can either contain a string as a "required" error message, or can be left blank)
	//
	// initialize initial-input class
	$(myArg+' input, '+myArg+' select, '+myArg+' [data-radio]').each(function() {
		$(this).addClass('initial-input');
	});
	$(myArg+' input[type="submit"], '+myArg+' #submit').on('click', function(e) {
		var comprehensiveRequired;
		// Verify for inputs, selects, and radios
		$(myArg+' input, '+myArg+' select, '+myArg+' [data-radio]').each(function() {

			// check if passes "validation"
			var validationResult = validation(this);

			if (validationResult === 'failed') {
				e.preventDefault();
				errorMessage(this);
			}
			if (validationResult === 'passed') {
				$(this).siblings('.error-message').remove();
			}

			// check if passes "required"
			var requiredResult = required(this);

			console.log(requiredResult)
			if (requiredResult === 'failed') {
				e.preventDefault();
				$(this).addClass('is-required');
				requiredMessage(this);
				comprehensiveRequired = 'failed';
			}
			if ($(this).attr('data-radio') !== undefined && requiredResult === 'passed'){
				$(this).removeClass('is-required');
				$(this).next('.required-message').remove();
			}
			else if (requiredResult === 'passed'){
				$(this).removeClass('is-required');
				$(this).siblings('.required-message').remove();
			}

			var matchResult = match(this);

			if (matchResult.status === 'failed') {
				e.preventDefault();
				$(matchResult.item).addClass('no-match');
				var confirmItem = $(matchResult.item).eq(1);
				matchMessage(confirmItem);
			}
			else if (matchResult.status === 'passed') {
				$(matchResult.item).removeClass('no-match');
				$(matchResult.item).siblings('.no-match-message').remove();
			}
		});
		if (useRequiredMessage !== undefined || useRequiredMessage === '') {
			if ($('.status-message-box').length > 0) {
				$('.status-message-box').remove();
			}
			if (comprehensiveRequired === 'failed') {
				requiredStatusMessage();
			}
		}
	});

	// initial input handling for text inputs
	$(myArg+' input').on('focusout', function() {
		if (validation(this) === 'failed') {
			$(this).removeClass('initial-input');
			validation(this);
			errorMessage(this);
		}
	});

	// Correction for text inputs
	$(myArg+' input').on('change paste copy cut keyup keydown focusout', function() {

		// includes initial input check
		if (validation(this) === 'failed' && !$(this).hasClass('initial-input')) {
			errorMessage(this);
		}
		if (validation(this) === 'passed') {
			$(this).siblings('.error-message').remove();
		}

		var requiredResult = required(this);

		if (requiredResult === 'passed'){
			$(this).siblings('.required-message').remove();
		}

		var matchResult = match(this);

		if (matchResult.status === 'failed') {
			$(matchResult.item).addClass('no-match');
			var confirmItem = $(matchResult.item).eq(1);
			matchMessage(confirmItem);
		}
		else if (matchResult.status === 'passed') {
			$(matchResult.item).removeClass('no-match');
			$(matchResult.item).eq(1).siblings('.no-match-message').remove();
		}
	});

	// Correction for selects
	$(myArg+' select').on('change', function() {

		var validationResult = validation(this);

		if (validationResult === 'failed') {
			errorMessage(this);
		}
		if (validationResult === 'passed') {
			$(this).siblings('.error-message').remove();
		}

		var requiredResult = required(this);

		if (requiredResult === 'passed'){
			$(this).siblings('.required-message').remove();
		}
	});

	// Correction for radios
	$(myArg+' [data-radio]').on('change', function() {

		var validationResult = validation(this);

		if (validationResult === 'failed') {
			errorMessage(this);
		}
		if (validationResult === 'passed') {
			$(this).siblings('.error-message').remove();
		}

		var requiredResult = required(this);

		if (requiredResult === 'passed'){
			$(this).next('.required-message').remove();
			$(this).removeClass('is-required');
		}
	});

	function errorMessage(item) {
		var myMessage;
		// Assign a message
		if ($(item).data('error-message') && $(item).data('error-message') !== "") {
			myMessage = '<span class="error-message">'+$(item).data('error-message')+'</span>';
		}
		else {
			myMessage = '<span class="error-message">Invalid</span>';
		}
		// Check
		if ($(item).siblings('.error-message')) {
			$(item).siblings('.error-message').remove();
			$(item).after(myMessage);
		}
		else {
			$(item).after(myMessage);
		}
	}

	function requiredMessage(item) {
		if ($(item).hasClass('is-required') && $(item).attr('data-radio') !== undefined) {
			$(item).next('.required-message').remove();

			if ($(item).data('required') === "") {
				$(item).after('<div class="required-message">Required</div>');
			}
			else {
				$(item).after('<div class="required-message">'+$(item).data('required')+'</div>');
			}
		}
		else if ($(item).siblings('.required-message')) {
			$(item).siblings('.required-message').remove();

			if ($(item).data('required') === "") {
				$(item).after('<span class="required-message">Required</span>');
			}
			else {
				$(item).after('<span class="required-message">'+$(item).data('required')+'</span>');
			}
		}
		else {
			if ($(item).data('required') === "") {
				$(item).after('<span class="required-message">Required</span>');
			}
			else {
				$(item).after('<span class="required-message">'+$(item).data('required')+'</span>');
			}
		}
	}

	function requiredStatusMessage() {
		$(myArg).before('<div class="status-message-box">'+ useRequiredMessage +'</div>');
	}

	function matchMessage(item) {
		if ($(item).siblings('.no-match-message').length === 0) {
			$(item).after('<span class="no-match-message">Does not match</span>');
		}
	}

	function match(item) {
		var status;
		if ($(item).is('[data-match]')) {
			var matchSelector = '[data-match="' + $(item).data('match') + '"]';
			var matchList = $(matchSelector);
			var myMatch1 = matchList.eq(0);
			var myMatch2 = matchList.eq(1);
			if (myMatch1.val() !== myMatch2.val()) {
				$(matchList).addClass('no-match');
				status = 'failed';
			}
			else {
				status = 'passed';
			}
		}
		return {
			status: status,
			item: matchSelector
		};
	}

	function required(item) {
		var status;
		// For selects
		if ($(item).get(0).tagName === 'SELECT') {
			if ($(item).val() === "" && $(item).attr('data-required') !== undefined) {
				status = 'true';
			}
		}
		// For radios
		if ($(item).attr('data-radio') !== undefined && $(item).attr('data-required') !== undefined) {
			if ($(item).children('input[type="radio"]:checked').length === 0) {
				status = 'failed';
				$(item).addClass('is-required');
			}
			else {
				status = 'passed';
				$(item).removeClass('is-required');
			}
		}
		// For all others
		else if ($(item).attr('data-required') !== undefined) {
			($(item).val() === "") ? status = 'failed' : status = 'passed';
			if (status === 'passed'){
				$(item).removeClass('is-required');
			}
		}
		console.log('status: ', status);
		console.log('item: ', $(item))
		console.log("item value: ", $(item).val());
		return status;
	}

	// Possible validation values:
	// 1. "name"
	// 2. "email"
	// 3. "username"
	// 4. "password"
	function validation(item) {
		var errors = 'false';
		var blackSimplePat = /(drop tables|drop table)|(^var[?= ]|^var$)|\<script/;
		var blackNamePat = /(drop tables|drop table)|(^var[?= ]|^var$)|\<script|[\[\<\>\(\)\{\};\=\]]/;
		var blackUsernamePat = /(drop tables|drop table)|(^var[?= ]|^var$)|\<script/;
		var blackPasswordPat = /(drop tables|drop table)|(^var[?= ]|^var$)|\<script/;
		var whitePhonePat = /^[0-9\-\(\)\.]*$/;
		var whiteEmailPat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		switch($(item).data('validate')) {
			case 'name':
				if (blackNamePat.test($(item).val()) === true) {
					errors = 'true';
				}
				break;
			case 'simple':
				if (blackSimplePat.test($(item).val()) === true) {
					errors = 'true';
				}
				break;
			case 'email':
				if (whiteEmailPat.test($(item).val()) === false && $(item).val() !== "") {
					errors = 'true';
				}
				break;
			case 'username':
				if (blackUsernamePat.test($(item).val()) === true) {
					errors = 'true';
				}
				break;
			case 'password':
				if (blackPasswordPat.test($(item).val()) === true) {
					errors = 'true';
				}
				break;
			case 'phone':
				if (whitePhonePat.test($(item).val()) === false && $(item).val() !== "") {
					errors = 'true';
				}
			default:
				break;
		};
		var status;
		(errors === 'true') ? status = 'failed' : status = 'passed';
		// includes initial input check
		if (status === 'failed' && !$(item).hasClass('initial-input')) {
			$(item).addClass('failed');
		}
		if (status === 'passed') {
			$(item).removeClass('failed');
		}
		return status;
	}
}
