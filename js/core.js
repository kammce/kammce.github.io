
var kammce = [
	0,1,1,0,1,0,1,1,
	0,1,1,0,0,0,0,1,
	0,1,1,0,1,1,0,1,
	0,1,1,0,1,1,0,1,
	0,1,1,0,0,0,1,1,
	0,1,1,0,0,1,0,1
];
var total_fades = -1;
var last_fade = 0;
var prev_bit = 0;

String.prototype.contains = function(search, case_sense) {
	if(case_sense) { search = search.toLowerCase(); this.toLowerCase(); }
	return (this.indexOf(search) != -1);
};

function data_divs(arr) {
	var fall = "<div class=\"fall\">";
	var rise = "<div class=\"rise\">";
	var low = "<div class=\"low\">";
	var high = "<div class=\"high\">";
	var current = arr[0];
	var html = "";
	if(current == 0) {
		html += fall+"0</div>";
	} else {
		html += rise+"1</div>";
	}
	for(var i = 1; i < arr.length; i++) {
		if(arr[i] == current && arr[i] == 0) {
			html += low+arr[i];
		} else if(arr[i] == current && arr[i] == 1) {
			html += high+arr[i];
		} else if(arr[i] == 0) {
			html += fall+arr[i];
		} else if(arr[i] == 1) {
			html += rise+arr[i];
		}
		html += "</div>";
		current = arr[i];
	}
	return html;
}
function clock_divs(num) {
	var html = "";
	for (var i = 0; i < num; i++) {
		if(i%2 == 0) {
			html += "<div class=\"t1\"></div>";
		} else {
			html += "<div class=\"t0\"></div>";
		}
	}
	return html;
}
function updateScroller() {
	var s = $(window).scrollTop(),
     d = $(document).height(),
     c = $(window).height();
     scrollPercent = (s / (d-c));
	var nth = Math.floor(scrollPercent*(6*8))+1;
	if(nth > 48) { nth = 48; }

	$( "#clk div:nth-child("+(prev_bit*2)+")" ).css("border-color", "#ccc");
	$( "#clk div:nth-child("+(prev_bit*2)+")" ).css("background-color", "rgba(0,0,0,0.0)");
	$( "#clk div:nth-child("+(prev_bit*2-1)+")" ).css("border-color", "#ccc");
	$( "#clk div:nth-child("+(prev_bit*2-1)+")" ).css("background-color", "rgba(0,0,0,0.0)");

	$( "#clk div:nth-child("+(nth*2)+")" ).css("border-color", "green");
	$( "#clk div:nth-child("+(nth*2)+")" ).css("background-color", "rgba(0,255,0,0.2)");

	$( "#clk div:nth-child("+(2*nth-1)+")" ).css("border-color", "green");
	$( "#clk div:nth-child("+(2*nth-1)+")" ).css("background-color", "rgba(0,255,0,0.2)");

	$( "#data div:nth-child("+(prev_bit)+")" ).css("border-color", "#ccc");
	$( "#data div:nth-child("+(prev_bit)+")" ).css("background-color", "rgba(0,0,0,0.0)");

	$( "#data div:nth-child("+nth+")" ).css("border-color", "red");
	$( "#data div:nth-child("+nth+")" ).css("background-color", "rgba(255,0,0,0.2)");
	prev_bit = nth;
}
function resizeText () {
	if( $(window).width() < 450 ) {
		$("#ktext").css("fontSize", "40px");
		$("header").css("paddingLeft", "12.5%");
		$("header").css("paddingTop", "50px");
		$("header").css("paddingBottom", "50px");
		$("a.btn").css("width", "100%");
	} else {
		$("#ktext").css("fontSize", "inherit");
		$("header").css("paddingLeft", "0px");
		$("header").css("paddingTop", "150px");
		$("header").css("paddingBottom", "120px");
		$("a.btn").css("width", "auto");
	}
}
function isScrolledIntoView(elem)
{
    var docViewBottom =  $(window).height() + $(window).scrollTop();
    var elemTop = $(elem).offset().top+250;
    return (elemTop <= docViewBottom);
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Create Knob Graphic for Skills */
$(".dial").knob({
draw : function () {

	// "tron" case
	if(this.$.data('skin') == 'tron') {

		var a = this.angle(this.cv)  // Angle
			, sa = this.startAngle          // Previous start angle
			, sat = this.startAngle         // Start angle
			, ea                            // Previous end angle
			, eat = sat + a                 // End angle
			, r = 1;

		this.g.lineWidth = this.lineWidth;

		this.o.cursor
			&& (sat = eat - 0.3)
			&& (eat = eat + 0.3);

		if (this.o.displayPrevious) {
			ea = this.startAngle + this.angle(this.v);
			this.o.cursor
				&& (sa = ea - 0.3)
				&& (ea = ea + 0.3);
			this.g.beginPath();
			this.g.strokeStyle = this.pColor;
			this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
			this.g.stroke();
		}

		this.g.beginPath();
		this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
		this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
		this.g.stroke();

		this.g.lineWidth = 2;
		this.g.beginPath();
		this.g.strokeStyle = this.o.fgColor;
		this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
		this.g.stroke();

		return false;
	}
}
});
/* Initialize tooltips */
$('.tech').tooltip();

/* Add Dynamic modal event on 'a' tags in context */
/*$("a", "section#groups").each(function() {
	$(this).click(function() {
		var title = $(this).attr("data-title");
		var text = $(this).attr("data-content");
		$("#main_title").text(title);
		$("#main_text").text(text);
		$("#main_modal").modal('show');
	});
});*/

$(window).resize(function() {
	if($(window).width() <= 768) {
		$(".carousel").css("display", "none");
		$(".navbar-wrapper").css("display","none");
	} else {
		$(".carousel").css("display", "block");
		$(".navbar-wrapper").css("display","block");
	}
	resizeText();
});

if(!onMobileBrowser() && $(window).width() > 768) {
	var data = data_divs(kammce);
	$("#data").append(data);
	var clocks = clock_divs(6*8*2);
	$("#clk").append(clocks);
	$(".fade-trigger").css({opacity: 0.0});
	console.log("fade is not viewable");
} else {
	$(".sda").html("");
	$(".sclk").html("");
	$(".fade-trigger").css({opacity: 1.0});
	console.log("fade is viewable");
}
$("ul.nav li a[href^='#']").on('click', function(e) {

   // prevent default anchor click behavior
   e.preventDefault();

   // store hash
   var hash = this.hash;

   // animate
   $('html, body').animate({
		scrollTop: $(this.hash).offset().top-50
    }, 600, function() {

      // when done, add hash to url
      // (default click behaviour)
      window.location.hash = hash;
    });
});
$(window).scroll(function() {
	if(onMobileBrowser() || $(window).width() <= 768) { return; }
	updateScroller();
	$(".fade-trigger").each(function(index) {
   		//console.log("total_fades = "+total_fades);
		if(total_fades >= index) {
			//at this point, the user is past the 
			//scroll point of the element.
		} else if(isScrolledIntoView($(this))) {
			console.log("presenting @ "+index);
			var ran = getRandomInt(0, 2);
			//console.log("ran = "+ran);
			switch(ran) {
				case 1:
					$(this).css({
						opacity: 0.0,
						marginTop: "-25px"
					}).animate({
						opacity: 1.0,
						marginTop: "0px"
					}, 500);
					break;
				case 2:
					$(this).css({
						opacity: 0.0,
						marginLeft: "25px"
					}).animate({
						opacity: 1.0,
						marginLeft: "0px"
					}, 500);
					break;
				case 3:
					$(this).css({
						opacity: 0.0,
						marginTop: "25px"
					}).animate({
						opacity: 1.0,
						marginTop: "0px"
					}, 500);
					break;
				default:
					$(this).css({
						opacity: 0.0,
						marginLeft: "-25px"
					}).animate({
						opacity: 1.0,
						marginLeft: "0px"
					}, 500);
					break;
			}
			total_fades++;
		}
	});
});

$(window).resize();
$(window).scroll();

$("#contact-form").submit(function(e) {
	var data = $(this).serialize();
	var success = function (data) {
		console.log("[SEND-MSG] = "+data);
		if(data.contains("SUCCESS")) {
			bootbox.alert("Thank you for getting in touch with me. <br> Your message has been sent successfully.");
		} else {
			bootbox.alert("Failure to send message.");
		}
	};
	$.ajax({
		type: 'POST',
		url: 'send-msg.php',
		data: data,
		success: success,
		error: function() { bootbox.alert('Error: Failed to contact server. Refresh page and try again.'); },
		dataType: "text",
		async: true
	});
	e.preventDefault();
});
