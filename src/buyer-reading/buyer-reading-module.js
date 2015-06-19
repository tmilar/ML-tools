define(["jquery"], function($) {

	String.prototype.removeSpaces = function(options){
		if(options === "longOnly"){
			return this.replace(/\s\s+/g, " ").trim();
		}

		return this.replace(/\s/g, "");
	};

	function getCurrentDate(){
		//return current date in dd/mm/yyyy
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
			dd="0"+dd;
		}
		if(mm<10){
			mm="0"+mm;
		}
		return dd+"/"+mm+"/"+yyyy;
	}

	function getCurrentLocation () {
		return "CABA";
	}

	function readData(){
		//1st get raw data
		var $product = $(".item .data-item");

		var productName = $product.find("a.itemUrl").text();
		var priceQuantityText = $product.find(":contains($)").text();

		var priceQuantity = priceQuantityText.removeSpaces().split("x");
		var price = priceQuantity[0];
		var quantity = priceQuantity[1].match(/\d/)[0] ;
		var productId = $product.find(".nroPublicacion").text().match(/\#\d+/)[0];

		var $buyer =  $("ul.buyer-info");
		var buyerName = $buyer.find(".name span").text();
		var buyerNickname = $buyer.find(".nickname a").text().removeSpaces().match(/[A-Z]+/)[0];
		var buyerPhone = $buyer.find(".phone").text().removeSpaces("longOnly");
		var buyerEmail = $buyer.find(".email .email-complete").text();

		var buyerAddress = "";

		var paymentInfo = $("ul.payment-status-list").find("span:contains(Cobro)").text();
		var paymentId = paymentInfo.match(/\#\d+/)[0];


		var sellerNickname = $(".ml-nick-name").text();

		var date = getCurrentDate();
		var location = getCurrentLocation();

		//2nd post-process
		var data = {
			buyer: {
				name: buyerName,
				phone: buyerPhone,
				address: buyerAddress,
				nickname: buyerNickname
			},
			product: {
				description: productName + " x" + quantity + "u." + " ("+productId+")",
				operationId: paymentId
			},

			seller: {
				nickname: sellerNickname
			},
			locationAndDate: location + ", "+ date
		};

		return data;
	}

	console.log("[ML-tools:buyer-data-reading-module] Estamos en url https://myaccount.mercadolibre.com.ar/sales/vop?&orderId=*");
	setTimeout(function(){
		console.log("[ML-tools:buyer-data-reading-module] Leyendo datos ..");
		var buyerData = readData();
		console.log("[ML-tools:buyer-data-reading-module] "+ readData());
		console.log("[ML-tools:buyer-data-reading-module] "+ JSON.stringify(readData()));

	}, 1);
});


