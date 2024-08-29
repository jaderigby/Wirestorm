// Collapsible Drawers: uses ".collapsible.trigger", ".trigger-icon" for the icon, and ".collapsible.drawer" classes
$('.collapsible.drawer').hide();
$('.collapsible.trigger').parent().delegate('.collapsible.trigger', 'click', function() {
	$(this).next('.collapsible.drawer').slideToggle(150);
	$('.trigger-icon', this).toggleClass('active');
});

$('.droptray.drawer').hide();
$('.droptray.trigger').parent().delegate('.droptray.trigger', 'click', function() {
	$(this).next('.droptray.drawer').slideToggle(150);
	$(this).next('.droptray.drawer').toggleClass('active');
	$('.trigger-icon', this).toggleClass('active');
});

$('.toggler').parent().delegate('.toggler', 'click', function() {
	var targetItem = $(this).data('target');
	$(targetItem).slideToggle(150);
});

// Open/Close Animation Behaviors (CSS3 Animations): uses ".trigger", ".toggle", and ".closer" classes in conjunction with "data-target" attribute
// $('.trigger').parent().delegate('.trigger', 'click', function(e) {
// 	var targetItem = _$(e.target).attr('data-target');
// 	_$(targetItem).addClass('active');
// });

// _$('.toggle').click((e) => {
// 	var targetItem = $(e.target).attr('data-target');
// 	$(targetItem).toggleClass('active');
// });

jQuishy.prototype.selector = function(arg1) {
	return this.t[0].querySelectorAll(arg1);
}

_$('.trigger').click((e) => {
	const targetItem = _$(e.target).attr('data-target');
	const untarget = _$(e.target).attr('data-untarget');
	if (untarget) {
		_$(untarget).items.forEach((_elem_) => {
			if (_$(_elem_).hasClass('activated')) {
				_$(_elem_).addClass('activate-out');
				_$(_elem_).removeClass('activated');
				setTimeout(() => {
					_$(_elem_).removeClass('activate-out');
				}, 200);
			}
		});
	}
	
	if ( !(_$(e.target).hasClass('modal')) ) {
		if (_$(targetItem).hasClass('prepend') || _$(targetItem).hasClass('append')) {
			e.preventDefault();
			const blueprint = _$(`${targetItem} .blueprint`).vanilla.cloneNode(true);
			if (_$(targetItem).hasClass('prepend')) {
				const idName = _$(blueprint.querySelectorAll('input[type="checkbox"]')).vanilla[0].id + '-' + uuidv4();
				_$(blueprint.querySelectorAll('input[type="checkbox"]')).vanilla[0].id = idName;
				_$(blueprint.querySelectorAll('label')).vanilla[0].setAttribute('for', idName);
				const elemFormatted = _$(blueprint).removeClass('blueprint').vanilla;
				_$(targetItem).vanilla.prepend(elemFormatted);
			}
			else if (_$(targetItem).hasClass('append')) {
				const elem = _$(targetItem).vanilla.children[0].cloneNode(true);
				const elemFormatted = _$(elem).removeClass('blueprint');
				_$(targetItem).vanilla.append(elemFormatted);
			}
		}
		else {
			if (e.target.tagName !== 'SELECT') {
				if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
					if (e.target.checked) {
						_$(targetItem).addClass('activate-in');
						setTimeout(() => {
							_$(targetItem).addClass('activated');
							_$(targetItem).removeClass('activate-in');
						}, 200);
					}
					else {
						_$(targetItem).addClass('activate-out');
						_$(targetItem).removeClass('activated');
						setTimeout(() => {
							_$(targetItem).removeClass('activate-out');
						}, 200);
					}
				}
				else {
					if ( !(_$(targetItem).hasClass('toast')) ) {
						if (_$(targetItem).hasClass('activated')) {
							_$(targetItem).addClass('activate-out');
							_$(targetItem).removeClass('activated');
							setTimeout(() => {
								_$(targetItem).removeClass('activate-out');
							}, 200);
						}
						else {
							_$(targetItem).addClass('activate-in');
							setTimeout(() => {
								_$(targetItem).addClass('activated');
								_$(targetItem).removeClass('activate-in');
							}, 200);
						}
					}
					else {
						// toast items
						_$(targetItem).addClass('toast-activate-in');
						setTimeout(() => {
							_$(targetItem).addClass('toast-activated');
							_$(targetItem).removeClass('toast-activate-in');
						}, 300);
						setTimeout(() => {
							_$(targetItem).addClass('toast-activate-out');
							_$(targetItem).removeClass('toast-activated');
							setTimeout(() => {
								_$(targetItem).removeClass('toast-activate-out');
							}, 300);
						}, 4000);
					}
				}
			}
		}
	}
});

_$('select.trigger').items.forEach((_item_) => {
	_item_.addEventListener('change', (e) => {
		// const otps = _$(_item_).attr('data-options').split(',');
		const val = e.target.value;
		const targetItem = _$(e.target).attr('data-target');
		if (val && !_$(targetItem).hasClass('activated')) {
			_$(targetItem).addClass('activate-in');
			setTimeout(() => {
				_$(targetItem).addClass('activated');
				_$(targetItem).removeClass('activate-in');
			}, 200);
		}
		else if (val == '' && _$(targetItem).hasClass('activated')) {
			_$(targetItem).addClass('activate-out');
			_$(targetItem).removeClass('activated');
			setTimeout(() => {
				_$(targetItem).removeClass('activate-out');
			}, 200);
		}
	});
});

function initTrigger() {
	_$('.trigger').items.forEach( (_item_) => {
		const targetItem = _$(_item_).attr('data-target');
		if ( _$(targetItem).hasClass('modal') ) {
			// _$(_item_).addClass('.modal-trigger');
		}
		else {
			if (_item_.tagName === 'INPUT' && _item_.type === 'checkbox') {
				if (_item_.checked) {
					_$(targetItem).addClass('activated');
				}
			}
			else if (_item_.tagName === 'SELECT') {
				if (_item_.value) {
					_$(targetItem).addClass('activated');
				}
			}
		}
	});
}

$('.closer').parent().delegate('.closer', 'click', function() {
	var targetItem = $(this).data('target');
	$(targetItem).removeClass('active');
});

// search widget mechanism for transferring search string from input to search-results page
$('.search-widget input').keypress(function(e) {
	if(e.which == 13) {
		e.preventDefault();
		var myOption = $(this).val();
		var myUrl = $(this).parents('.search-widget').data('target');
		self.location=myUrl+'?'+myOption;
    }
});

var pageOption = document.URL.match(/\?[a-zA-Z%20]*/);
if (pageOption !== null) {
	pageOption = pageOption[0].replace('?', '');
	pageOption = pageOption.replace(/%20/g, ' ');
	$('.search-string').html('"'+ pageOption +'"');
}

// goto select-option feature
$('.option-forwarder').parent().delegate('.option-forwarder', 'click', function(e) {
	e.preventDefault();
	var myOption = $(this).data('option');
	var myUrl = $(this).attr('href');
	self.location=myUrl+'?'+myOption;
});
var pageOption = document.URL.match(/\?[a-zA-Z]*/);
if (pageOption !== null) {
	pageOption = pageOption[0].replace('?', '');
	$('#form-select').val(pageOption);
}

// manually set where to scroll to for page anchors
$('[data-move-to]').click(function() {
	var myPosition = '#' + ($(this).data('move-to'));
	var distance;
	var pat = /,.*/;
	if (pat.test(myPosition)) {
		distance = myPosition.match(pat)[0];
		distance = distance.replace(/,|,/, '');
		distance = parseInt(distance);
	}
	if (distance === undefined) {
		distance = 50;
	}
	$('html, body').animate({
        scrollTop: $(myPosition).offset().top - distance
    }, 500);
});

//== Menu close on click outside
// Behavior for Mobile Menu drawer
$(document).on("click",function(e) {
	if (!($(e.target).parents(".use-native-click").length || $(e.target).hasClass("use-native-click"))) {
		$("body, #siteWrapper, #drawer").removeClass("active");
	}
});


//
// EQUAL HEIGHT COLUMNS:
// Note: To use, add "data-equalize" to the parent element,
// then "data-equal-height" to each column.
// For those rare occasions when you need it, you can add
// a value to either "data-equalize" or "data-equal-height"
// to offset the height by a given amount.
// Use the qualifiers "+" or "-" respectively.
// Example: data-equal-height="+6"
//
// You can also add a breakpoint to the "data-equalize" element,
// in order to include responsive behavior.  Simply add
// "data-breakpoint" with a number value that uses any of the
// following qualifiers: <, <=, >, >=.
// Example: data-breakpoint="<=960"
//

function initEqualize() {
	var windowSize = $(window).width();
	$('[data-equalize]').each(function() {
		// console.log("Init Triggered!");
		if ($(this).data('breakpoint') !== undefined) {
			// console.log("This data-breakpoint is: " + $(this).data('breakpoint'));
			var myQualifier = $(this).data('breakpoint').match(/[\<\=\>]*/);
			myQualifier = myQualifier.toString();
			var myBreakpoint = $(this).data('breakpoint').replace(/[<=>]*/, '');
			myBreakpoint = parseInt(myBreakpoint);
			if (myQualifier === '<') {
				if (windowSize < myBreakpoint) {
					$('[data-equal-height]', this).css('height', '');
				}
				else {equalize()}
			}
			else if (myQualifier === '<=') {
				if (windowSize <= myBreakpoint) {
					$('[data-equal-height]', this).removeAttr('style');
				}
				else {equalize()}
			}
			else if (myQualifier === '>') {
				if (windowSize > myBreakpoint) {
					$('[data-equal-height]', this).css('height', '');
				}
				else {equalize()}
			}
			else if (myQualifier === '>=') {
				if (windowSize >= myBreakpoint) {
					$('[data-equal-height]', this).css('height', '');
				}
				else {equalize()}
			}
			else {
				equalize();
			}
		}
		else {equalize()}
	});
}

function equalize() {
	$('[data-equalize]').each(function() {
		var tallest = 0;
		var parentAugment = 0;
		if ($(this).data('equalize') !== '') {
			parentAugment = parseInt($(this).data('equalize'));
		}
		var augment;
		$('[data-equal-height]', this).each(function() {
			// console.log("The Height is: " + $(this).height());
			augment = 0;
			$(this).attr('style', '');
			if ($(this).data('equal-height') !== '') {
				augment = parseInt($(this).data('equal-height'));
			}
			if ($(this).height() > tallest) {
				tallest = $(this).height() + augment;
			}
		});
		$('[data-equal-height]', this).css('height', tallest+parentAugment+'px');
	});
}

$(window).load(function() {
	// Initialize
	initEqualize();
});

var windowSize;
// Update on window resize
$(window).resize(function() {
	windowSize = $(window).width();
	// console.log('Window size is: ' + windowSize);
	$('[data-equalize]').each(function() {
		if ($(this).data('breakpoint')) {
			var myQualifier = $(this).data('breakpoint').match(/[<=>]*/);
			myQualifier = myQualifier.toString();
			// console.log("My qualifier is: " + myQualifier);
			var myBreakpoint = $(this).data('breakpoint').replace(/[<=>]*/, '');
			myBreakpoint = parseInt(myBreakpoint);
			// console.log("My Breakpoint is: " + myBreakpoint);
			if (myQualifier === '<') {
				if (windowSize < myBreakpoint) {
					$('[data-equal-height]', this).css('height', '');
					// console.log("less than");
				}
				else {equalize()}
			}
			else if (myQualifier === '<=') {
				if (windowSize <= myBreakpoint) {
					$('[data-equal-height]', this).removeAttr('style');
					// console.log("less than or equal to");
				}
				else {equalize()}
			}
			else if (myQualifier === '>') {
				if (windowSize > myBreakpoint) {
					$('[data-equal-height]', this).css('height', '');
					// console.log("greater than");
				}
				else {equalize()}
			}
			else if (myQualifier === '>=') {
				if (windowSize >= myBreakpoint) {
					$('[data-equal-height]', this).css('height', '');
					// console.log("Yep");
				}
				else {equalize()}
			}
			else {
				equalize();
			}
		}
	});
});

//======================
//	TABS
//======================

function initTabs() {
	if ($('.tabs-widget').length > 0) {
		$('.tabs-widget').each(function() {
			if ($('.tab-element.active', this).length !== 0) {
				var targetIndex = $('.tab-element.active', this).index();
				$('ul li', this).eq(targetIndex).addClass('active');
			}
			else {
				$('ul li:first-child', this).addClass('active');
				$('.tabs-wrapper', this).children().first().addClass('active');
			}
		});
	}
	// Need to initialize "equalize" after tab is set to ".active", or equalize doesn't work
	initEqualize();
}

initTabs();

$('.tabs-widget li').click(function() {
	var myId = $(this).data('target');
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	$(this).parent().siblings('.tabs-wrapper').children('[data-tab]').removeClass('active');
	$(this).parent().siblings('.tabs-wrapper').children('[data-tab="'+ myId +'"]').addClass('active');
	// Equalizes columns on the fly, upon each tab click. Due to default state of "display: none", unable to equalize earlier
	equalize();
});

$('.tabs-wrapper').each(function() {
	var i = 0;
	var sectionTabs = $(this).prevAll('ul.tabs').children('li');
	$('.tab-element').each(function() {
		var myItem = sectionTabs[i++];
		$(this).attr('data-tab',$(myItem).html());
	});
});

//======================
//	Modal
//======================

function initModals() {
	$('.modal').hide();
	if ($('.modal').length > 0) {
		$('body').prepend('<div id="modalViewport" style="display: none; position: fixed; width: 100%; height: 100%; z-index: 9999"></div>');
		$('body').prepend('<div id="overlay" style="display: none; position: fixed; width: 100%; height: 100%; background-color: rgba(0,0,0,0.45); opacity: 0; z-index: 9998"></div>');
		$('.modal').prepend('<div class="close-modal close-modal-icon"><span class="icon-close"></span></div>');
		$('.modal').css({
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			margin: 'auto',
			padding: '20px',
			width: '84%',
			maxWidth: '650px',
			backgroundColor: '#FFF',
			'transform': 'scale(0.6)',
			opacity: 0
		});
		$('.modal').each(function() {
			var fullHeight = $(this).outerHeight();
			$(this).css({
				height: fullHeight,
				bottom: 0
			})
		})
		var thisModal = $('.modal').detach();
		$('#modalViewport').prepend(thisModal);
	}
}

function resetModal() {
	$('.modal').hide();
	$('#modalViewport').hide();
}

initModals();

$('.modal-trigger').parent().delegate('.modal-trigger', 'click', function() {
	var myModal = ($(this).data('target'));
	// var scrollTop = $(window).scrollTop();
	$('#overlay').show();
	$('#modalViewport').show();
	$('#overlay').animate({
		top: 0,
		opacity: 1
	}, 280);
	$(myModal).show();
	TweenMax.to(myModal, 0.3, {
		opacity: 1,
		scale: 1,
		ease: Power2.easeOut
	});
});

$('.modal').delegate('.close-modal', 'click', function() {
	$('#overlay').animate({
		top: 0,
		opacity: 0
	}, 280, function() {
		$(this).hide();
	});
	TweenMax.to('.modal', 0.22, {
		opacity: 0,
		scale: 0.6,
		ease: Power1.easeIn,
		onComplete: resetModal
	});
});

$('#modalViewport').click(function(e) {
	if(e.target != this) return;
	$('#overlay').animate({
		opacity: 0
	}, 280, function() {
		$(this).hide();
	});
	TweenMax.to('.modal', 0.22, {
		opacity: 0,
		scale: 0.6,
		ease: Power1.easeIn,
		onComplete: resetModal
	});
});

//======================
//	ON/OFF SWITCHES
//======================

$('.switch-object').click(function() {
	$(this).toggleClass('on');
});

function initMobileNav() {
	$('.mobile-nav li a').each(function() {
		if ($(this).siblings('ul').length > 0) {
			$(this).addClass('decorate');
		}
	});
}

initMobileNav();

$('.mobile-nav li a').click(function(e) {
	if ($(this).siblings('ul').length > 0) {
		e.preventDefault();
		$(this).siblings('ul').slideToggle(150);
		$(this).toggleClass('active');
	}
});

$('body').delegate('a.register', 'click', function() {
	$(this).parent().append('<a href=""></a>')
});

//=======================
//	FORM PLACEHOLDERS
//=======================

$('.form-element input[type="text"], .form-element input[type="email"], .form-element input[type="password"], textarea').keyup(function(e) {
	var $parent = ($(this).closest('.cell').length !== 0) ? $(this).closest('.cell').find('.form-element') : $(this).parent();
	if ($(this).val() !== "") {
		$parent.addClass('has-value');
	}
	else if ($(this).val() === "") {
		$parent.removeClass('has-value');
	}
});

$('.form-element input[type="text"], .form-element input[type="email"], .form-element input[type="password"], textarea').focus(function(e) {
	var $parent = ($(this).closest('.cell').length !== 0) ? $(this).closest('.cell').find('.form-element') : $(this).parent();
	$parent.addClass('has-value');
});

$('.form-element input[type="text"], .form-element input[type="email"], .form-element input[type="password"], textarea').focusout(function(e) {
	var $parent = ($(this).closest('.cell').length !== 0) ? $(this).closest('.cell').find('.form-element') : $(this).parent();
	if ($(this).val() === "") {
		$parent.removeClass('has-value');
	}
});

function formInit() {
	$('.form-element input[type="text"], .form-element input[type="email"], .form-element input[type="password"], textarea').each(function() {
		var $parent = ($(this).closest('.cell').length !== 0) ? $(this).closest('.cell').find('.form-element') : $(this).parent();
		if ($(this).val() !== "") {
			$parent.addClass('has-value');
		}
	});
}

//==================================
//	Url Params, goto, and goback
//==================================

$('[data-goto]').on('click', function(e) {
	e.preventDefault();
	var newLocation = $(this).attr('data-goto');
	if ($(this).attr('data-params')) {
		var params = JSON.parse($(this).attr('data-params'));
		var str = '';
		for (const [key, value] of Object.entries(params)) {
			str += (key + '=' + value + '&');
		}
		str.slice(0, -1);
		window.location.href = newLocation + '?' + str;
	}
	else {
		window.location.href = newLocation
	}
});

$('[data-goback]').on('click', function(e) {
	e.preventDefault();
	history.back(-1);
});

function getParams() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value.replace('%20', ' ');
  });
//   window.params = decodeURI(vars);
	window.params = vars;
}

getParams();

// taken from Stack Overflow Question: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}


//============================
//	Highlight Nav Element
//============================

function highlightNav() {
	_$('.nav-highlight a').removeClass('selected');
	var test = window.location.pathname.replace('/', '') + window.location.search;
	_$('.nav-highlight a').items.forEach(function(_item_) {
		if ( _$(_item_).attr('href') === test ) {
			_$(_item_).addClass('selected');
		}
	});
}

highlightNav();


//================
//	localData
//================

if (localStorage.getItem('localData') !== null) {
    console.log('localData is available!');
} else {
    const localStorageData = {};
    localStorage.setItem('localData', JSON.stringify(localStorageData));
}

const localData = JSON.parse(localStorage.getItem("localData"));

localData['save'] = function() {
	const localDataPreserve = JSON.parse(JSON.stringify(localData));
	delete localDataPreserve.save;
	localStorage.setItem('localData', JSON.stringify(localDataPreserve));
}

const thisPage = window.location.pathname.replace(/^.*\/([^/]+)\.html$/, '$1').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

if (!(localData.hasOwnProperty(thisPage))) {
	localData[thisPage] = {};
	localData.save();
}

// set up store on save items
function initStoreOnSave() {
	_$('[data-store-on-save]').items.forEach((_item_) => {
		const itemRef = _$(_item_).attr('data-store-on-save');
		const parentId = _item_.id;
		_$(itemRef).attr('data-store-binding', `#${parentId}`);
	});
	_$('[data-store-binding').items.forEach((_item_) => {
		const itemId = _item_.id; 
		if (localData[thisPage].hasOwnProperty(itemId)) {
			_item_.value = localData[thisPage][itemId];
			
			if (_$(_item_).attr('type') === 'checkbox') {
				_$(_item_).attr('checked', 'checked');
			}
		}
	});
}

initStoreOnSave();

_$('input[type="submit"][data-store-on-save], a[data-store-on-save]').click(function(e) {
	const storeTarget = _$(e.target).attr('data-store-on-save');
	_$(storeTarget).items.forEach((_item_) => {
		const itemName = _item_.id;
		val = _item_.value;

		if (_$(_item_).attr('type') === 'checkbox') {
			if (_item_.checked) {
				const val = _item_.value;
				localData[thisPage][itemName] = val;
			}
			else {
				delete localData[thisPage][itemName];
			}
		}
		else if (_item_.nodeName === 'SELECT') {
			localData[thisPage][itemName] = val;
		}
		else {
			localData[thisPage][itemName] = val;
		}
		// for empty inputs, just remove item
		if (val === '') {
			delete localData[thisPage][itemName];
		}
		localData.save();
	});
	updateVals();
});

function initDefaultCheckboxes() {
	_$('input[type="checkbox"]').items.forEach((_item_) => {
		const itemName = _item_.id;
		const defaultRef = `${itemName}--->useDefault`;
		if ( !(localData[thisPage].hasOwnProperty(defaultRef)) && _$(_item_).attr('data-checked') ) {
			_$(_item_).attr('checked', 'checked');
			const val = _item_.value;
			localData[thisPage][itemName] = val;
			localData[thisPage][defaultRef] = 'false';
			localData.save();
			updateVals();
		}
		else if ( localData[thisPage].hasOwnProperty(defaultRef) && localData[thisPage][defaultRef] === 'true' ) {
			_$(_item_).attr('checked', 'checked');
			const val = _item_.value;
			localData[thisPage][itemName] = val;
			localData[thisPage][defaultRef] = 'false';
			localData.save();
		}
	});
}

initDefaultCheckboxes();

// store items marked for storing
_$('.store').items.forEach(function(_item_) {
	let itemName = _item_.id;
	let val = _item_.value || _$(_item_).attr('value');
	if (_$(_item_).vanilla.tagName === 'SELECT') {
		if (!(localData[thisPage].hasOwnProperty(itemName))) {
			if (_$(_item_).attr('data-default')) {
				_item_.value = _$(_item_).attr('data-default')
			}
			localData[thisPage][itemName] = val;
			localData.save();
		}
		else if (localData[thisPage][itemName] === '') {
			if (_$(_item_).attr('data-default')) {
				_item_.value = _$(_item_).attr('data-default');
			}
		}
		if (localData[thisPage][itemName] !== '') {
			_item_.value = localData[thisPage][itemName];
		}
	}
	else if (_item_.tagName !== 'INPUT' && _item_.tagName !== 'SELECT') {
		if (localData[thisPage].hasOwnProperty(itemName)) {
			if (_$(_item_).attr('data-target')) {
				const selector = _$(_item_).attr('data-target');
				_$(selector).items.forEach((_elem_) => {
					_$(_elem_).addClass('activated');
				})
			}
		}
	}
	else if (_$(_item_).attr('type') !== 'submit' && _$(_item_).attr('type') !== 'checkbox' && _$(_item_).attr('type') !== 'radio') {
		if ( !(localData[thisPage].hasOwnProperty(itemName)) ) {
			localData[thisPage][itemName] = val;
			localData.save();
		}
		if (localData[thisPage][itemName] !== '') {
			_item_.value = localData[thisPage][itemName];
		}
	}
	// Check to see if it is a checkbox input; if it is, proceed
	if (_$(_item_).attr('type') === 'checkbox') {
		// Check to see if it has an entry in localData; if it does, set it to 'checked'
		if (localData[thisPage].hasOwnProperty(itemName)) {
			_$(_item_).attr('checked', 'checked');
		}
	}
	// Check to see if it is a radio input; if it is, proceed
	if (_$(_item_).attr('type') === 'radio') {
		itemName = _$(_item_).attr('data-id');
		// Check to see if it has an entry in localData; if it does, set it to 'checked'
		if (localData[thisPage].hasOwnProperty(itemName)) {
			const val = localData[thisPage][itemName];
			_$(`[data-id][value="${val}"]`).attr('checked', 'checked');
		}
	}
});

// for select items that don't have 'store' class, check for default and assign if default exists
_$('select').items.forEach((_item_) => {
	if (!(_$(_item_).hasClass('store')) && _$(_item_).attr('data-default') && (_$(_item_).vanilla.value == '' || _$(_item_).vanilla.value == null)) {
		_item_.value = _$(_item_).attr('data-default');
	}
});

function updateVals() {
	_$('[data-ref]').items.forEach(function(_item_) {
		const refName = _$(_item_).attr('data-ref');
		let val;
		if ( _$(_item_).attr('data-default') && !(localData[thisPage].hasOwnProperty(refName)) ) {
			val = _$(_item_).attr('data-default');
			_item_.innerHTML = val;
		}
		else if (localData[thisPage].hasOwnProperty(refName)) {
			val = localData[thisPage][refName];
			_item_.innerHTML = val;
		}
		else if ( _$(_item_).attr('data-fallback') && !(localData[thisPage].hasOwnProperty(refName)) ) {
			val = _$(_item_).attr('data-fallback');
			_item_.innerHTML = val;
		}
		else {
			val = '';
			_item_.innerHTML = val;
		}
	});
}

updateVals();

// store items that are not form elements, ie elements which are not imputs or selects but DO have a value attribute
_$('.store').click((e) => {
	if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
		const itemName = e.target.id;
		if ( !(localData[thisPage].hasOwnProperty(itemName)) ) {
			const val = _$(e.target).attr('value');
			localData[thisPage][itemName] = val;
		}
		else {
			delete localData[thisPage][itemName];
		}
		localData.save();
	}
});

_$('input[type="checkbox"]').click((e) => {
	const itemName = e.target.id;
	if (_$(e.target).hasClass('store')) {
		if (e.target.checked) {
			const val = e.target.value;
			localData[thisPage][itemName] = val;
		}
		else {
			delete localData[thisPage][itemName];
		}
		localData.save();
	}
});

_$('input[type="radio"]').click((e) => {
	const itemName = _$(e.target).attr('data-id');
	if (e.target.checked) {
		const val = e.target.value;
		localData[thisPage][itemName] = val;
	}
	localData.save();
});

_$('select').items.forEach((_item_) => {
	_item_.addEventListener('change', (e) => {
		if (_$(_item_).hasClass('store')) {
			const itemName = e.target.id;
			const val = e.target.value;
			localData[thisPage][itemName] = val;
			localData.save();
			updateVals();
		}
	});
});

_$('input[type="submit"').click(function(e) {
	if (_$(e.target).hasClass('store') && _$(e.target).attr('data-store') == null) {
		_$('.store').items.forEach(function(_item_) {
			let val = '';
			let itemName = _item_.id;
			if (_$(_item_).attr('type') == 'text' || _item_.nodeName == 'TEXTAREA') {
				val = _item_.value;
			}
			else if (_$(_item_).attr('type') == 'radio') {
				itemName = _$(_item_).attr('data-id');
				val = _$(`[name="${_item_.name}"]:checked`);
				console.log(val);
			}
			else {
				val = _item_.innerHTML;
			}
			localData[thisPage][itemName] = val;
			localData.save();
		});
	}
	updateVals();
});

_$('input[type="submit"][data-store], a[data-store]').click(function(e) {
	const storeTarget = _$(e.target).attr('data-store');
	_$('#' + storeTarget + ' input').items.forEach(function(_item_) {
		const itemName = _item_.id;
		val = _item_.value;
		localData[thisPage][itemName] = val;
		localData.save();
	});
	updateVals();
});

_$('[data-cancel]').click((e) => {
	const itemSet = _$(e.target).attr('data-cancel');
	_$(itemSet).items.forEach((_elem_) => {
		const itemName = _elem_.id;
		const val = localData[thisPage][itemName];
		if (val) {
			_elem_.value = val;
		}
		else {
			_elem_.value = null;
		}
	});
});

formInit();

function emphasize(PARAM1) {
	_$(PARAM1).addClass('emphasize');
}

_$('.status-indicator, .svg-indicator').click((e) => {
	const target = _$(e.target);
	const itemId = target.attr('data-item-id');
	const timeoutId = target.attr('data-timeout-id');
  
	if (timeoutId) {
	  clearTimeout(timeoutId);
	  target.removeClass('show-bubble');
  
	  setTimeout(() => {
		target.removeClass('display-block');
	  }, 200);
  
	  target.attr('data-timeout-id', '');
	} else {
	  target.addClass('display-block');
	  target.addClass('show-bubble');
  
	  const newTimeoutId = setTimeout(() => {
		target.removeClass('show-bubble');
		setTimeout(() => {
		  target.removeClass('display-block');
		}, 200);
  
		target.attr('data-timeout-id', '');
	  }, 1800);
  
	  target.attr('data-timeout-id', newTimeoutId);
	}
  });

  _$('.show-hide-password').click((e) => {
	const elem = e.target.nextElementSibling;
	elem.focus();
	if (elem.type === 'text') {
		_$(e.target).removeClass('icon-hide');
		_$(e.target).addClass('icon-show');
		elem.type = 'password';
	}
	else if (elem.type === 'password') {
		_$(e.target).removeClass('icon-show');
		_$(e.target).addClass('icon-hide');
		elem.type = 'text';
	}
  });

  _$('input[type="password"]').items.forEach((_item_) => {
	_item_.addEventListener('keyup', (e) => {
		const targetItem = e.target.offsetParent.children[0];
		console.log("its working");
		if (e.target.value !== '' && _$(targetItem).hasClass('show-hide-password')) {
			_$(targetItem).addClass('activated');
		}
		else {
			_$(targetItem).removeClass('activated');
		}
	});
  })

  function initEditable() {
	_$('.editable-body').items.forEach((_item_) => {
		const addElem = _item_.children[0].children[0];
		const addElemIcon = addElem.children[0];
		const editableText = addElem.parentElement.children[1];
		const editElemIcon = addElem.parentElement.parentElement.children[1].children[0];
		// console.log("addElem >>===========>", editElemIcon);

		if ( editableText.innerHTML === 'None' || editableText.innerHTML === '') {
			// console.log("addElem None ===========>", addElem);
			_$(addElem).css('display', 'flex');
			_$(editableText).css('display', 'none');
			_$(editElemIcon).css('display', 'none').addClass('stasis');
			_$(addElemIcon).css('display', 'block');
		}
		else {
			// console.log("addElem filled ===========>", addElem);
			_$(addElem).css('display', 'none');
			_$(editableText).css('display', 'block');
			_$(editElemIcon).css('display', 'block');
		}
	});
}

initEditable();

function runEditIconAnimation(e) {
	const target = e.target || e;
	if (!(_$(target).hasClass('slide-in') || _$(target).hasClass('stasis')) && !_$(target).hasClass('slide-out')) {
		_$(target).css('display', 'block');
		_$(target).addClass('slide-in');
		setTimeout(() => {
			_$(target).css('display', 'none');
		}, 255);
	}
	else if ((_$(target).hasClass('slide-in') || _$(target).hasClass('stasis'))) {
		_$(target).css('display', 'block');
		_$(target).removeClass('slide-in');
		_$(target).addClass('slide-out');

		setTimeout(() => {
			_$(target).removeClass('slide-out');
		}, 215);
	}
}

_$('.editable-body .editable-edit-action').click((e) => {
	e.target.parentElement.parentElement.children[0].children[2].focus();
	_$(e.target.parentElement.parentElement).addClass('editing');
	runEditIconAnimation(e);
});

_$('.editable-body .editable-done-action').click((e) => {
	const editIcon = e.target.parentElement.parentElement.nextElementSibling.children[0];
	const inputElem = e.target.parentElement.parentElement.children[2];
	const itemName = e.target.parentElement.parentElement.children[2].id;
	const val = inputElem.value;
	const editableParagraph = e.target.parentElement.parentElement.children[1];
	editableParagraph.innerHTML = val;

	localData[thisPage][itemName] = val;
	localData.save();
	_$(e.target.parentElement.parentElement.parentElement).removeClass('editing');

	runEditIconAnimation(editIcon);
	initEditable();
});

_$('.editable-body .editable-close-action').click((e) => {
	const editIcon = e.target.parentElement.parentElement.nextElementSibling.children[0];
	_$(e.target.parentElement.parentElement.nextElementSibling.children[0]).css('display', 'block');
	const val = e.target.parentElement.parentElement.children[0].innerHTML;
	e.target.parentElement.parentElement.children[1].value = val;

	_$(e.target.parentElement.parentElement.parentElement).removeClass('editing');

	runEditIconAnimation(editIcon);
	initEditable();
});

_$('.editable-add').click((e) => {
	_$(e.target).css('display', 'none');
	e.target.parentElement.parentElement.children[2].focus();
	_$(e.target.parentElement.parentElement.parentElement).addClass('editing');
});

document.addEventListener("keyup", (e) => {
	if (e.key === 'Enter' && document.activeElement.classList.contains('editable-field')) {
		const parent = _$('.editable-body.editing').vanilla;
		const editableText = parent.children[0].children[1];
		const inputElem = parent.children[0].children[2];
		const itemName = inputElem.id;
		const val = inputElem.value;
		const editIcon = parent.children[1].children[0];
		console.log("editIcon: ", editIcon);

		_$(parent).removeClass('editing');

		if (_$(inputElem).hasClass('store')) {
			editableText.innerHTML = val;
			localData[thisPage][itemName] = val;
			localData.save();
		}
		else {
			editableText.innerHTML = val;
			_$('.editable-edit-action').css('display', 'block');
		}

		runEditIconAnimation(editIcon);
		initEditable();
	}
	else if (e.key === 'Escape' && document.activeElement.classList.contains('editable-field')) {
		const parent = _$('.editable-body.editing').vanilla;
		const editIcon = parent.children[1].children[0];

		_$('.editable-body').removeClass('editing');

		runEditIconAnimation(editIcon);
		initEditable();
	}

});

// needs to come after localData, otherwise, localData state changes won't be updated
initTrigger();

_$('.hover-trigger').items.forEach((_item_) => {
	const targetItem = _$(_item_).attr('data-hover');
  
	// Initialize a data attribute to store the timeout ID
	_$(_item_).attr('data-timeout-id', '');
  
	_item_.addEventListener('mouseenter', (e) => {
	  // Clear any existing timeout
	  const existingTimeoutId = _$(targetItem).attr('data-timeout-id');
	  if (existingTimeoutId) {
		clearTimeout(existingTimeoutId);
		_$(targetItem).removeClass('activate-in');
	  }
  
	  console.log("That JUST happened!");
  
	  // Add class for entering activation
	  _$(targetItem).addClass('activate-in');
  
	  const timeoutId = setTimeout(() => {
		_$(targetItem).addClass('activated');
		_$(targetItem).removeClass('activate-in');
	  }, 200);
  
	  // Store the timeout ID
	  _$(targetItem).attr('data-timeout-id', timeoutId);
	});
  
	_item_.addEventListener('mouseleave', (e) => {
	  // Clear any existing timeout
	  const existingTimeoutId = _$(targetItem).attr('data-timeout-id');
	  if (existingTimeoutId) {
		clearTimeout(existingTimeoutId);
		_$(targetItem).removeClass('activate-in');
	  }
  
	  // Only proceed if the element is already activated or in the process of activation
	  if (_$(targetItem).hasClass('activated') || _$(targetItem).hasClass('activate-in')) {
		// Deactivate element with an animation
		_$(targetItem).addClass('activate-out');
		_$(targetItem).removeClass('activated');
  
		const timeoutId = setTimeout(() => {
		  _$(targetItem).removeClass('activate-out');
		  _$(targetItem).attr('data-timeout-id', '');  // Clear timeout ID after animation completes
		}, 200);
  
		// Store the timeout ID
		_$(targetItem).attr('data-timeout-id', timeoutId);
	  }
	});
  });

  _$('.const-trigger').click((e) => {
	const targetItem = _$(e.target).attr('data-target');
	const untarget = _$(e.target).attr('data-untarget');
	if (untarget) {
		_$(untarget).items.forEach((_elem_) => {
			if (_$(_elem_).hasClass('activated')) {
				_$(_elem_).addClass('activate-out');
				_$(_elem_).removeClass('activated');
				setTimeout(() => {
					_$(_elem_).removeClass('activate-out');
				}, 200);
			}
		});
	}
	_$(targetItem).addClass('activate-in');
	setTimeout(() => {
		_$(targetItem).addClass('activated');
		_$(targetItem).removeClass('activate-in');
	}, 200);
});
  

  

/*
input types:

- text
- radio
- checkbox
- email

*/
