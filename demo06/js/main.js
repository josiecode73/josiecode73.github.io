
$(function(){
  const $menubar = $('#menubar');
  const $menubarHdr = $('#menubar_hdr');
  const breakPoint = 900;	
  const HIDE_MENUBAR_IF_HDR_HIDDEN = false;
  const isTouchDevice = ('ontouchstart' in window) ||
                       (navigator.maxTouchPoints > 0) ||
                       (navigator.msMaxTouchPoints > 0);
  function debounce(fn, wait) {
    let timerId;
    return function(...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn.apply(this, args);
      }, wait);
    };
  }
  function initDropdown($menu, isTouch) {
    $menu.find('ul li').each(function() {
      if ($(this).find('ul').length) {
        $(this).addClass('ddmenu_parent');
        $(this).children('a').addClass('ddmenu');
      }
    });
    if (isTouch) {
      $menu.find('.ddmenu').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const $dropdownMenu = $(this).siblings('ul');
        if ($dropdownMenu.is(':visible')) {
          $dropdownMenu.hide();
        } else {
          $menu.find('.ddmenu_parent ul').hide(); 
          $dropdownMenu.show();
        }
      });
    } else {
      $menu.find('.ddmenu_parent').hover(
        function() {
          $(this).children('ul').show();
        },
        function() {
          $(this).children('ul').hide();
        }
      );
    }
  }
  function initHamburger($hamburger, $menu) {
    $hamburger.on('click', function() {
      $(this).toggleClass('ham');
      if ($(this).hasClass('ham')) {
        $menu.show();
        if ($(window).width() < breakPoint) {
          $('body').addClass('noscroll');
        }
      } else {
        $menu.hide();
        if ($(window).width() < breakPoint) {
          $('body').removeClass('noscroll');
        }
      }
      $menu.find('.ddmenu_parent ul').hide();
    });
  }
  const handleResize = debounce(function() {
    const windowWidth = $(window).width();
    if (windowWidth < breakPoint) {
      $('body').removeClass('large-screen').addClass('small-screen');
    } else {
      $('body').removeClass('small-screen').addClass('large-screen');
      $menubarHdr.removeClass('ham');
      $menubar.find('.ddmenu_parent ul').hide();
      $('body').removeClass('noscroll'); 
      if (HIDE_MENUBAR_IF_HDR_HIDDEN) {
        $menubarHdr.hide();
        $menubar.hide();
      } else {
        $menubarHdr.hide();
        $menubar.show();
      }
    }
    if (windowWidth < breakPoint) {
      $menubarHdr.show();
      if (!$menubarHdr.hasClass('ham')) {
        $menubar.hide();
        $('body').removeClass('noscroll'); 
      }
    }
  }, 200);
  initDropdown($menubar, isTouchDevice);
  initHamburger($menubarHdr, $menubar);
  handleResize();
  $(window).on('resize', handleResize);
  $menubar.find('a[href^="#"]').on('click', function() {
    if ($(this).hasClass('ddmenu')) return;
    if ($menubarHdr.is(':visible') && $menubarHdr.hasClass('ham')) {
      $menubarHdr.removeClass('ham');
      $menubar.hide();
      $menubar.find('.ddmenu_parent ul').hide();
      $('body').removeClass('noscroll'); 
    }
  });
});
$(function() {
    var topButton = $('.pagetop');
    var scrollShow = 'pagetop-show';
    function smoothScroll(target) {
        var scrollTo = target === '#' ? 0 : $(target).offset().top;
        $('html, body').animate({scrollTop: scrollTo}, 500);
    }
    $('a[href^="#"], .pagetop').click(function(e) {
        e.preventDefault(); 
        var id = $(this).attr('href') || '#'; 
        smoothScroll(id); 
    });
    $(topButton).hide(); 
    $(window).scroll(function() {
        if($(this).scrollTop() >= 300) { 
            $(topButton).fadeIn().addClass(scrollShow); 
        } else {
            $(topButton).fadeOut().removeClass(scrollShow); 
        }
    });
    if(window.location.hash) {
        $('html, body').scrollTop(0);
        setTimeout(function() {
            smoothScroll(window.location.hash);
        }, 500);
    }
});
$(function() {
	var slides = $('#mainimg .slide');
	var slideCount = slides.length;
	var currentIndex = 0;
	slides.eq(currentIndex).css('opacity', 1).addClass('active');
	setInterval(function() {
		var nextIndex = (currentIndex + 1) % slideCount;
		slides.eq(currentIndex).css('opacity', 0).removeClass('active');
		slides.eq(nextIndex).css('opacity', 1).addClass('active');
		currentIndex = nextIndex;
	}, 5000); 
});
$(function () {
  var $grid = $('.masonry-grid');
  if (!$grid.length) return;
  $grid.find('.thumb-video').each(function () {
    var v = this;
    $(v).attr({
      'muted': true,       
      'playsinline': true, 
      'preload': 'metadata'
    });
    var playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.then(function() {
        v.pause();           
        v.currentTime = 0.1; 
        setTimeout(function(){
            if (false) {
                // $grid.masonry('layout');
            }
        }, 100);
      }).catch(function(error) {
        console.log('Autoplay was prevented:', error);
      });
    }
  });
  $grid.imagesLoaded(function () {
    // $grid.masonry({
    //   itemSelector: '.grid-item',
    //   columnWidth: '.grid-sizer',
    //   percentPosition: true,
    //   gutter: 16
    // });
  });
  $grid.imagesLoaded().progress(function () {
    // $grid.masonry('layout');
  });
  $('[data-fancybox]').fancybox({
    loop: true,
    smallBtn: true,
    toolbar: false
  });
  $grid.on('mouseenter', '.is-video video', function () {
    this.play();
  });
  $grid.on('mouseleave', '.is-video video', function () {
    this.pause();
  });
});
$(function () {
  var $header = $('header');
  $('header nav a').on('click', function (e) {
    if ($(window).width() <= 900) {
      if (!$header.hasClass('is-open')) {
        e.preventDefault();
        $header.addClass('is-open');
        return; 
      }
    }
  });
  $(document).on('click', function (e) {
    if (!$(e.target).closest('header').length) {
      $header.removeClass('is-open');
    }
  });
});
