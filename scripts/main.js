
function init() {
	initEvent();
	initBanner();
}

function initEvent() {

	$(window).scroll(function() {
		var _height = $(document).scrollTop();
		var toTop = $('.m-toTop');
		if(_height >= 100) {
			toTop.show();
		}else {
			toTop.hide();
		}
	});

	$('.J_toTop').on('click',function() {
		$('html,body').animate({scrollTop: '0px'},300);
	});

	$('body').on('click','.J_scroll',function(e){
		
	  var target = $(e.currentTarget);
	  if(target.hasClass('on')) return;	
	  bannerScrollTo(target.index());
	});

}

function initBanner() {
	var banner = [];
	//此处是通过自己在本机上创建的服务器，来模拟的后台数据。
	var url = 'http://localhost/mock/163-banner.mock.php?callback=?';
	$.getJSON(url, function(data) {
		var content = data.content;
		for(var i = 0; i < content.length; i++ ){
			if(content[i].advertiseTypeId == 32) {
				banner.push(content[i]);
			}
		}
		addBanner(banner);
	});
}

function addBanner(banner) {

	var imgHTML = '';
	var controlHTML = '';
	if(banner) {
		var urlHTML = '';
		$('.m-spread').show();
		if(banner.length > 1) {
			controlHTML = '<li class="J_scroll on"></li>';
		}
		banner.map(function(value, key) {
			if(value.url) {
				urlHTML = ' href= "' + value.url + '"';
			}
			imgHTML += '<a' + urlHTML + ' target="_blank" style="display:none;background:#' +
								value.backColor + ' url(' + value.imagePath + ') no-repeat;"></a>';
			if(key) {
				controlHTML += '<li class="J_scroll"></li>';
			}
		});

		$('.u-spread').html(imgHTML);
		$('.u-dot ul').html(controlHTML);
		if(banner.length > 1) {
			$('.u-spread a').eq(0).fadeIn();
			setAutoScroll(banner);
			$('.J_spread').hover(function() {
				clearInterval(oScrollTimer);
			},function() {
				setAutoScroll(banner);
			});
		}
	}
}

function setAutoScroll(banner) {
	var tNextIndex;
	oScrollTimer = setInterval(function() {
		tNextIndex = $('.topDot .on').index() + 1;
		if(tNextIndex == banner.length) {
			tNextIndex = 0;
		}
		bannerScrollTo(tNextIndex);
	},4000);
}

function bannerScrollTo(tNextIndex) {
	var tCurDom = $('.topDot .on');
	$('.u-spread a').eq(tCurDom.index()).fadeOut(300,"swing",function() {
		$('.u-spread a').eq(tNextIndex).fadeIn();
	});
	
	tCurDom.removeClass('on');
	$('.u-dot li').eq(tNextIndex).addClass('on');
}


init();