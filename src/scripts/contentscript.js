"use strict";

/**
 * Created by Tomas on 6/18/2015.
 */

// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

require(["jquery"], function($) {
	$("body").append("jQuery " + $.fn.jquery + " loaded!");


	console.log("\"Allo \"Allo! Content script via require []()");

	var app = {};

	var onMercadoPagoBuyerInfo = new chrome.declarativeWebRequest.RequestMatcher({
		url: { hostSuffix: "mercadolibre.com.ar" }
	});

	var showMpFormButton = function(){
		app.show("mp-form-button");
	};

	var buyerPaid = function(){
		return true;
	};

	var mpFormRule = {
		conditions: [onMercadoPagoBuyerInfo, buyerPaid],
		actions: [showMpFormButton]
	};


// chrome.declarativeWebRequest.onRequest.addRules([mpFormRule]);


});

