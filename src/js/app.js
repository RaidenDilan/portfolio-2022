PIXI.utils.skipHello();

var exit_ok,
  ajax_ok,
  new_content_page,
  link_in_progress,
  plus_long,
  raf,
  raf_pixi_home,
  raf_pixi_menu,
  raf_pixi_single,
  raf_loading,
  the_raf_about,
  raf_about,
  displacementSprite,
  displacementSprite2,
  stage,
  texture2,
  displacementFilter,
  displacementFilter2,
  renderer,
  raf1,
  links,
  hovers,
  low_link,
  ladder_scale,
  the_delta_menu,
  scroll_menu_open,
  renderer_menu,
  displacementFilter3,
  displacementSprite3,
  stage_menu,
  intensity,
  height_menu,
  margins,
  expression,
  height_margin,
  percent_cursor,
  entrance_menu,
  height_entrance,
  total_slide,
  loader,
  siriWave,
  counter,
  random,
  multiplieur,
  gamma,
  delta_gamma,
  num_image,
  delayx,
  lindex;

var directory_uri = './';
var preload         = new createjs.LoadQueue();
var lethargy        = new Lethargy();
var the_scroll      = null;
var xDown           = null;
var yDown           = null;
var bloque_action   = true;
var listenCursor    = false; // true
var supportsWheel   = false;
var once_play       = false;
var passe_une_fois  = false;
var mousePos        = {};
var attributs       = {};
var attributs2      = {};
var attributs3      = {};
var displace        = {};
var displace2       = {};
var num_image_temp  = -1;
var vitesse         = 0;
var current_slide   = 0;
var former_delta    = 0;
var delta_menu      = 0;
var delta_scroll    = 0;
var ancien_height   = 0;
var dernier_ajoute  = 0;
var currentMousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

// // single hover
// document.getElementById('to_next_proj').addEventListener('mouseenter', function(event) {
//   random = [];
//   document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));
//
//   random.sort(function() {
//     return 0.5 - Math.random();
//   });
//
//   TweenMax.staggerTo(random, 0.2, {opacity: 0, ease: Power2.easeIn, onComplete:function(e) {
//     document.getElementById('to_next_proj').innerHTML = document.getElementById('to_next_proj').getAttribute('data-next');
//   }}, 0.05);
//
//   TweenMax.to('#inner_project name', 0.2, {x: (document.getElementById('project name').clientWidth + 10) / 2 + 'px', delay:0.2, ease:Power2.easeInOut});
//   TweenMax.staggerTo('.stag', 0.4, {opacity: 1, delay:0.2, ease: Power2.easeOut }, -0.02);
// });
//
// document.getElementById('to_next_proj').addEventListener('mouseleave', function(event) {
//   TweenMax.staggerTo('#to_next_proj span', 0.2, {opacity: 0, ease: Power2.easeIn, onComplete:function(e) {
//     this.target.classList.remove('blanc');
//     TweenMax.to(this.target, 0.2, {opacity: 1, ease: Power2.easeOut });
//   }}, 0.05);
//   TweenMax.to('#inner_project name', 0.2, {x: '0px', delay:0.2, ease:Power2.easeInOut});
//   TweenMax.staggerTo('.stag', 0.4, {opacity: 0, delay:0.2, ease: Power2.easeOut }, 0.02);
// });

/* Add the event listeners for each event. */
document.addEventListener('mousemove', mousePosition);
document.addEventListener('click', changeProject);

// scroll event
document.addEventListener('wheel', scrollEvent);
document.addEventListener('mousewheel', scrollEvent);
document.addEventListener('DOMMouseScroll', scrollEvent);

// swipe event
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

window.addEventListener('resize', resize);

// giroscope event
if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', processCircle, false);

function mousePosition(event) {
  currentMousePos.x = event.pageX;
  currentMousePos.y = event.pageY;
}

function changeProject() {
  if (event.target.classList.contains('change_project')) change_project(event.target);
  else if (event.target.classList.contains('to_next') && bloque_action === false) next_slide();
  else if (event.target.classList.contains('to_prev') && bloque_action === false) prev_slide();
  else if (event.target.classList.contains('all_works')) {
    document.querySelectorAll('.all_works').forEach(x => x.classList.toggle('actif'));
    if (document.querySelector('.all_works').classList.contains('actif')) {
      if (the_scroll !== null) the_scroll.off(onscroll);
      else scroll_menu_open = window.pageYOffset;

      document.querySelectorAll('.front.point, .front .point').forEach(x => x.classList.add('black'));

      document.getElementById('menu').style.display = 'block';
      TweenMax.to('.feature1', 0.2, { scaleY: 0, delay: 0.2, ease: Power2.easeIn });

      TweenMax.to('#main', 0.2, {
        opacity: 0,
        ease: Power2.easeIn,
        onComplete: function() {
          if (isMobile()) {
            window.scrollTo(0, 0);
            document.getElementById('main').classList.add('bloque');
            document.querySelector('body').classList.add('temp');
          }
        }
      });

      TweenMax.to('#menu', 0.2, { opacity: 1, delay: 0.2, ease: Power2.easeOut });

      height_menu     = document.getElementById('the_menu').clientHeight;
      margins         = window.innerHeight / 2 - 70;
      height_margin   = Math.round((100 - (height_menu - 2 * margins) * 100 / height_menu) / 2 * 100) / 100;
      entrance_menu   = document.getElementById('the_menu').querySelectorAll('li').length;
      height_entrance = Math.round((100 - 2 * height_margin) / entrance_menu * 100)/100;

      stage_menu.addChild(displacementSprite3);
      stage_menu.addChild(image_menu0);
      image_menu0.alpha = 1;

      cancelAnimationFrame(raf_pixi_home);
      cancelAnimationFrame(raf_pixi_single);

      pixi_menu();
    }
    else {
      if (the_scroll !== null) the_scroll.on(onscroll);
      if (document.querySelector('body').classList.contains('home')) document.querySelectorAll('.front.point, .front .point').forEach(x => x.classList.remove('black'));

        TweenMax.to('#menu', 0.2, {
          opacity:0,
          ease: Power2.easeIn,
          onComplete: function() {
            document.getElementById('menu').style.display = 'none';
            if (isMobile()) {
              document.getElementById('main').classList.remove('bloque');
              document.querySelector('body').classList.remove('temp');
              window.scrollTo(0, scroll_menu_open);
            }
          }
        });

        TweenMax.to('#main', 0.2, { opacity: 1, delay: 0.2, ease: Power2.easeOut });
        TweenMax.to('.feature1', 0.2, { scaleY: 1, delay: 0.2, ease: Power2.easeIn });

        stage_menu.removeChildren();
        cancelAnimationFrame(raf_pixi_menu);

        if (document.querySelector('body').classList.contains('home')) pixi_home();
        else if (document.querySelector('body').classList.contains('single')) pixi_single();
      }
  }
}

function scrollEvent(e) {
  // console.log('scroll event', e);
  if (e.type == 'wheel') supportsWheel = true;
  else if (supportsWheel) return;

  var delta = (e.deltaY || -e.wheelDelta || e.detail) || 1;

  if (lethargy.check(e) !== false && bloque_action === false && !document.querySelector('.all_works').classList.contains('actif') && document.querySelector('body').classList.contains('home')) {
    if (delta > 0) next_slide();
    else if (delta < 0) prev_slide();
  }
}

function resize() {
  if (the_scroll !== null) the_scroll.resize();
  else {
    document.getElementById('about').style.top = window.innerHeight / 2 + 'px';
    document.getElementById('contact').style.top = window.innerHeight / 2 + 'px';
  }
}

// document ready vanilla
document.addEventListener('DOMContentLoaded', function() {
  //--------------//
  // PRELOAD PART //
  //--------------//
  // preload.loadFile('http://localhost:8888/higherground/dev/wp-content/themes/higherground/img/img_home.jpg');
  preload.on('progress', handleOverallProgress);
  preload.on('complete', handleComplete);

  function handleOverallProgress(event) {
    console.log('handleOverallProgress', 1 - event.progress);
  }
  function handleComplete(event) {
    console.log('handleComplete', event.complete);
  }

  //--------------//
  // PROCESS AJAX //
  //--------------//
  // var $main = $('#main'),

  // called each time a page is launched
  var init = function() {
    exit_ok          = false;
    ajax_ok          = false;
    link_in_progress = false;
    delta_menu       = 0;
    delta_scroll     = 0;
    vitesse          = 0;
    low_link         = false;
    once_play        = false;

    TweenMax.set('#main, #the_menu, #pixi_menu', { opacity:1 });
    TweenMax.set('#main', { clearProps: 'y' });
    TweenMax.to('.feature1', 0.2, { scaleY: 1, ease: Power2.easeIn });

    document.getElementById('menu').style.display = 'none';
    document.querySelector('.all_works').classList.remove('actif');

    if (document.querySelector('body').classList.contains('is-loading')) document.querySelector('.is-loading').classList.remove('is-loading');

    // when click on link
    links = document.querySelectorAll('a');

    links.forEach(function(link) {
      link.removeEventListener('click', onClick);
    });

    function onClick(event) {
      if (!event.target.classList.contains('external')) {
        event.preventDefault();
        if (link_in_progress === false) {
          link_in_progress = true;
          var href = this.getAttribute('href');

          if (event.target.classList.contains('low_link')) low_link = true;

          // if (href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) {
          history.pushState({}, '', href);
          loadPage(href);
          the_raf_loading();

          // the_scroll.off(onscroll);
          return false;
          //}
        }
        else return false;
      }
    }

    links.forEach(function(link) {
      link.addEventListener('click', onClick);
    });

    animations();
  },
  // when get() completed
  ajaxLoad = function(html) {
    new_content_page = html;
    ajax_ok = true;
  },
  // animations input
  animations = function() {
    if (window.innerWidth < 768) document.querySelectorAll('#the_menu li').forEach(x => x.classList.remove('actif'));
    if (isMobile()) {
      window.scrollTo(0, 0);
      document.getElementById('main').classList.remove('bloque');
    }
    if (document.querySelector('body').classList.contains('home')) {
      document.querySelectorAll('.point').forEach(x => x.classList.remove('black'));
      hovers = document.querySelectorAll('.change_project');

      hovers.forEach(function(hover) {
        hover.addEventListener('mouseenter', onHover);
      });

      hovers.forEach(function(hover) {
        hover.addEventListener('mouseleave', offHover);
      });

      current_slide = 0;
      total_slide   = 0;

      renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
      document.getElementById('inner_canvas').appendChild(renderer.view);

      renderer.view.width  = window.innerWidth;
      renderer.view.height = window.innerHeight;
      // renderer.backgroundColor = 0xFF00FF;

      stage  = new PIXI.Container();
      loader = new PIXI.Loader();

      document.querySelectorAll('#images div').forEach(setDimensions);

      // displacement 1
      displacementSprite = PIXI.Sprite.from(directory_uri + 'images/gradient4.png'); //gradient4_bis //gradient4
      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP; //REPEAT // MIRRORED_REPEAT //CLAMP
      displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

      // displacement 2
      displacementSprite2 = PIXI.Sprite.from(directory_uri + 'images/gradient_large.png');
      displacementSprite2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      displacementFilter2 = new PIXI.filters.DisplacementFilter(displacementSprite2);

      // settings displacement1
      // intensity
      displacementFilter.scale.x = 50;
      displacementFilter.scale.y = 0;
      // center for slider
      displacementSprite.pivot.x = 256;
      displacementSprite.pivot.y = 256;
      // ladder x/y
      displacementSprite.scale.x = 0.2;

      // settings displacement2
      // intensity
      displacementFilter2.scale.x = 0;
      displacementFilter2.scale.y = 0;
      // ladder x/y
      displacementSprite2.scale.x = 0.8;
      // displacementSprite2.anchor.x = 1;

      stage.addChild(displacementSprite);
      stage.filters = [displacementFilter, displacementFilter2];

      loader.load((loader, resources) => {
        bloque_action = false;
        if (!document.querySelector('.all_works').classList.contains('actif')) pixi_home();
        next_slide();
        document.getElementById('progress').style.display = 'none';
      });
    }
    else if (document.querySelector('body').classList.contains('page-template-about')) {
      document.getElementById('progress').style.display = 'none';
      document.querySelectorAll('.point').forEach(x => x.classList.add('black'));

      // document.getElementById('volet1').classList.add('ouvert');
      // document.querySelector('.intro').classList.add('ouvert');

      TweenMax.to('.fond_intro', 1.2, { scaleX: 1, ease: Power4.easeOut });
      random = [];
      document.querySelectorAll('.random').forEach(x => random.push(x));

      random.sort(function() {
        return 0.5 - Math.random();
      });

      TweenMax.staggerFromTo(random, 1, { x: '-24px' }, { x: '0px', opacity: 1, delay: 0.6, ease: Power2.easeOut }, 0.1);

      if (!isMobile()) {
        if (the_scroll !== null) the_scroll.destroy();
        the_scroll = null;
        the_scroll = new global_custom2.default({
          preload: true,
          native: false,
          section: document.querySelector('.vs-section'),
          divs: document.querySelectorAll('.vs-div'),
          vs : { mouseMultiplier: 0.4 }
        });
        the_scroll.init();
      }

      TweenMax.to('#main', 0.4, { backgroundColor: '#EFEFEF', ease: Power2.easeInOut });
      TweenMax.to('#inner_svg', 1, { opacity: 1, ease: Power2.easeIn });
      TweenMax.fromTo('#inner_svg', 2, { rotation: 140 }, { rotation: 0, ease: Power2.easeOut });
      TweenMax.fromTo('#inner_svg img', 2, {
        rotation: -140
      },{
        rotation: 0,
        ease: Power2.easeOut,
        onComplete:function() {
          raf_about();
        }
      });
    }
    else if (document.querySelector('body').classList.contains('single')) {
      if (window.innerWidth < 768) {
        document.querySelectorAll('#the_menu li').forEach(x => {
          if (document.querySelector('body').classList.contains(x.getAttribute('data-id'))) x.classList.add('actif');
        });
      }

      document.querySelectorAll('.point').forEach(x => x.classList.add('black'));

      if (!isMobile()) {
        document.getElementById('to_next_proj').addEventListener('mouseover', onHoverNext);
        document.getElementById('to_next_proj').addEventListener('mouseout', offHoverNext);

        if (the_scroll !== null) the_scroll.destroy();
        the_scroll = null;

        the_scroll = new global_custom2.default({
          preload: true,
          native: false,
          section: document.querySelector('.vs-section'),
          divs: document.querySelectorAll('.vs-div'),
          vs : { mouseMultiplier: 0.4 }
        });
        the_scroll.init();
      }
      else {
        document.getElementById('to_next_proj').innerHTML = document.getElementById('to_next_proj').getAttribute('data-next');
        TweenMax.set('#inner_project name', { x: (document.getElementById('project name').clientWidth + 10) / 2 + 'px' });
        TweenMax.set('#project name .stag', { opacity: 1 });
      }

      var height;
      if (window.innerWidth > 767) {
        height               = 0.57 * window.innerWidth + 20;
        renderer             = PIXI.autoDetectRenderer(window.innerWidth, (0.57 * window.innerWidth + 20), { transparent: !0 });
        renderer.view.width  = window.innerWidth;
        renderer.view.height = window.innerHeight;
        // renderer.backgroundColor = 0xFF00FF;
      }
      else {
        height               = window.innerWidth + 20;
        renderer             = PIXI.autoDetectRenderer(window.innerWidth, (window.innerWidth + 20), { transparent: !0 });
        renderer.view.width  = window.innerWidth;
        renderer.view.height = window.innerHeight;
        // renderer.backgroundColor = 0xFF00FF;
      }
      document.getElementById('cover').appendChild(renderer.view);

      stage  = new PIXI.Container();
      loader = new PIXI.Loader();

      // document.querySelectorAll('#images div').forEach(setDimensions);
      var image = new PIXI.Sprite(PIXI.Texture.from(document.getElementById('cover').getAttribute('data-img')));

      loader.add('image', document.getElementById('cover').getAttribute('data-img'));

      var img = new Image();
      img.src = document.getElementById('cover').getAttribute('data-img');

      img.onload = function() {
        var width         = this.width;
        var height        = this.height;

        var ratio_img     = width / height;
        var ratio_fenetre = window.innerWidth/ height;

        // +10 et - 5 valeurs pour éviter les bords blancs
        if (ratio_fenetre >= ratio_img) {
          image.width  = window.innerWidth + 10;
          image.height = height * (window.innerWidth + 10) / width;
          image.x      = -5;
          image.y      = height / 2 - image.height / 2;
        }
        else {
          image.height = height;
          image.width  = (width * height/height) + 10;
          image.x      = (window.innerWidth / 2 - image.width / 2) - 5;
        }
      };

      // displacement 2
      displacementSprite2 = PIXI.Sprite.from(directory_uri + 'images/gradient_large.png');
      displacementSprite2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      displacementFilter2 = new PIXI.filters.DisplacementFilter(displacementSprite2);

      displacementFilter2.scale.x = 0; //150
      displacementSprite2.scale.x = 0.8;

      stage.addChild(displacementSprite2);
      stage.addChild(image);
      stage.filters = [displacementFilter2];

      loader.load((loader, resources) => {
        bloque_action = false;
        if (!document.querySelector('.all_works').classList.contains('actif')) pixi_single();

        random = [];
        document.querySelectorAll('.random').forEach(x => random.push(x));

        random.sort(function() {
          return 0.5 - Math.random();
        });

        TweenMax.staggerFromTo(random, 1, { x: '-24px' }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
        TweenMax.to('#cover', 1, { opacity: 1, delay: 0.4, ease: Power2.easeOut });

        vitesse = 4;

        document.getElementById('progress').style.display = 'none';

        ladder_scale = (document.getElementById('the_imgs').clientHeight + (0.28 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight;
        ladder_scale = parseFloat(Math.round(ladder_scale * 100) / 100).toFixed(2);
      });
    }
    // TweenMax.to('body', 1, {opacity:1, onComplete:function() {
    //   scroll.init();
    //   scroll.resize();
    // }});
    //
    // if ($('event')[0]) {}
    // console.log('animations');
  },
  // animations output outputs
  loadPage = function(href) {
    document.getElementById('progress').style.display = 'block';
    if (the_scroll !== null) the_scroll.off(onscroll);

    var xhr = new XMLHttpRequest();
    var method = 'GET';
    var url = href;

    xhr.open(method, url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) ajaxLoad(xhr.responseText);
    };

    xhr.send();

    // TweenMax.to('body', 3, { opacity: 0, onComplete:function() {
    //   exit_ok = true;
    // }});

    if (document.querySelector('.all_works').classList.contains('actif')) {
      cancelAnimationFrame(raf_pixi_menu);

      TweenMax.to('#the_menu, #pixi_menu', 0.4, {
        opacity: 0,
        ease: Power2.easeInOut,
        onComplete: function() {
          stage_menu.removeChildren();
          exit_ok = true;
          TweenMax.set('#main', { clearProps: 'backgroundColor' });
        }
      });
    }
    else if (document.querySelector('body').classList.contains('home')) {
      // vitesse = 4;
      listenCursor  = false;
      bloque_action = true;

      // stage.removeChild(displacementSprite);
      // stage.addChild(displacementSprite2);

      random = [];
      document.querySelectorAll('.random').forEach(x => random.push(x));

      random.sort(function() {
        return 0.5 - Math.random();
      });

      TweenMax.staggerTo(random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1);

      // TweenMax.to(attributs2, 0.9, {
      //   intensity: 150,
      //   x: 10,
      //   ease: Power2.easeIn,
      //   onUpdate: function() {
      //     displacementFilter2.scale.x = attributs2.intensity;
      //     vitesse = attributs2.x;
      //   },
      //   onComplete: function() {}
      // });

      TweenMax.to('#main', 1, {
        opacity: 0,
        delay: 0.4,
        ease: Power2.easeInOut,
        onComplete: function() {
          exit_ok = true;
        }
      });

      hovers = document.querySelectorAll('.change_project');

      hovers.forEach(function(hover) {
        hover.removeEventListener('mouseenter', onHover);
        hover.removeEventListener('mouseleave', offHover);
      });
    }
    else if (document.querySelector('body').classList.contains('single')) {
      document.getElementById('to_next_proj').removeEventListener('mouseover', onHoverNext);
      document.getElementById('to_next_proj').removeEventListener('mouseout', offHoverNext);

      if (low_link) {
        var diff;
        if (the_scroll !== null) {
          diff = document.getElementById('main').clientHeight - (the_scroll.vars.current + window.innerHeight);

          TweenMax.to('#main', 1.2, { y: - (diff + window.innerHeight), ease: Power2.easeInOut });
          TweenMax.to('#next_proj > div', 1.2, {
            y: diff + window.innerHeight - (document.getElementById('demi_haut').clientHeight / 2),
            ease: Power2.easeInOut,
            onComplete: function() {
              TweenMax.to('#next_proj > div', 0.4, {
                opacity: 0,
                ease: Power2.easeInOut,
                onComplete: function() {
                  // TweenMax.set('#main', {clearProps: 'y'});
                  exit_ok = true;
                }
              });
          }});
        }
        else {
          diff = document.getElementById('main').clientHeight - (window.pageYOffset + window.innerHeight);

          TweenMax.to('#next_proj, .inner_img', 1.2, { y: - (diff + window.innerHeight), ease: Power2.easeInOut });
          TweenMax.to('#next_proj > div', 1.2, {
            y: diff + window.innerHeight - (document.getElementById('demi_haut').clientHeight / 2),
            ease: Power2.easeInOut,
            onComplete: function() {
              TweenMax.to('#next_proj > div', 0.4, {
                opacity: 0,
                ease: Power2.easeInOut,
                onComplete: function() {
                  // TweenMax.set('#main', {clearProps: 'y'});
                  exit_ok = true;
                  window.scrollTo(0, 0);
                }
              });
            }
          });
        }
      }
      else {
        TweenMax.to('#main', 0.4, {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete:function() {
            exit_ok = true;
          }
        });
      }
      // exit_ok = true;
    }
    else if (document.querySelector('body').classList.contains('page-template-about')) {
      // document.querySelector('.intro2').classList.remove('ouvert');
      // document.querySelector('.intro').classList.remove('ouvert');
      // setTimeout(function() {
      //     document.querySelector('.intro2').classList.add('ouvert');
      // document.querySelector('.intro').classList.add('ouvert');
      // }, 400);
      TweenMax.to('#main', 0.4, {
        opacity: 0,
        clearProps: 'backgroundColor',
        ease:Power2.easeInOut,
        onComplete: function() {
          exit_ok = true;
        }
      });
    }
    else exit_ok = true;
  },
  // updating the data of the page
  updatePage = function(html) {
    var parser      = new DOMParser();
    var doc         = parser.parseFromString(html, 'text/html');
    var liste_class = doc.querySelectorAll('body')[0].getAttribute('class');

    // main title of the page
    document.title = doc.querySelector('title').innerHTML;

    // main class of body
    // document.querySelectorAll('body')[0].setAttribute('class', doc.querySelectorAll('body')[0].getAttribute('class'));
    var res = liste_class.replace('is-loading', '');
    document.querySelectorAll('body')[0].setAttribute('class', res);

    if (!isMobile()) document.querySelectorAll('body')[0].classList.add('desktop');
    else document.querySelectorAll('body')[0].classList.add('mobile');

    // main content #main
    document.getElementById('main').innerHTML = doc.getElementById('main').innerHTML;

    // on launches the new page
    init();
  };

  function the_raf_loading() {
    raf_loading = requestAnimationFrame(the_raf_loading);
    if (exit_ok === true && ajax_ok === true) {
      cancelAnimationFrame(raf_pixi_home);
      cancelAnimationFrame(raf_pixi_single);
      if (document.querySelector('body').classList.contains('single') || document.querySelector('body').classList.contains('home')) {
        stage.destroy();
        renderer.destroy();
      }
      updatePage(new_content_page);
      cancelAnimationFrame(raf_loading);
    }
  }

  // management button prev / next browser
  window.onpopstate = function(e) {
    if (e.state !== null) {
      loadPage(location.href);
      the_raf_loading();
      //the_scroll.off(onscroll);
    }
  };

  //------------------------------//
  // APPELS FIRST LOADING //
  //------------------------------//
  history.pushState({}, '', location);
  // le_raf();
  init();

  if (!isMobile()) document.querySelectorAll('body')[0].classList.add('desktop');
  else {
    document.querySelectorAll('body')[0].classList.add('mobile');
    document.getElementById('about').style.top = window.innerHeight / 2 + 'px';
    document.getElementById('contact').style.top = window.innerHeight / 2 + 'px';
  }

  // pixi menu statement
  renderer_menu = PIXI.autoDetectRenderer(0.24 * window.innerWidth, window.innerHeight - 0.074 * window.innerWidth, { transparent: !0 });
  document.getElementById('pixi_menu').appendChild(renderer_menu.view);

  renderer_menu.view.width  = window.innerWidth;
  renderer_menu.view.height = window.innerHeight;

  stage_menu = new PIXI.Container();

  document.querySelectorAll('#the_menu li a').forEach(setDimensions_menu);

  // displacement 2
  displacementSprite3 = PIXI.Sprite.from(directory_uri + 'images/gradient_large.png');
  displacementSprite3.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  displacementFilter3 = new PIXI.filters.DisplacementFilter(displacementSprite3);

  stage_menu.filters = [displacementFilter3];

  // settings displacement2
  // intensity
  displacementFilter3.scale.x = 0;
  displacementFilter3.scale.y = 0;
  // ladder x/y
  displacementSprite3.scale.x = 0.4;
});
// end doc ready vanilla

// -------------------------------------------------------------------------- //

// SLIDER FUNCTIONS
function next_slide() {
  vitesse = 4;
  transition_commune();
  update_title('next');

  window['image'+current_slide].alpha = 0;
  stage.addChild(window['image'+current_slide]);

  // image1.alpha = 1;
  var tl = new TimelineMax();

  tl.to(attributs2, 0.9, {
    intensity: 150,
    x: 20,
    // width: 0.8,
    ease: Power2.easeIn,
    onUpdate: function() {
      displacementFilter2.scale.x = attributs2.intensity;
      vitesse = attributs2.x;
      // displacementSprite2.scale.x = attributs2.width;
    },
    onComplete:function() {
      tl.reverse();

      setTimeout(function() {
        if (!isMobile()) {
          stage.removeChild(displacementSprite2);
          stage.addChild(displacementSprite);
        }
        listenCursor = true;

        if (current_slide === 0) stage.removeChild(window['image'+(total_slide-1)]);
        else stage.removeChild(window['image'+(current_slide-1)]);

        if (current_slide < (total_slide-1)) current_slide++;
        else current_slide = 0;

        displacementSprite.x = currentMousePos.x;
        bloque_action = false;
      }, 800);
    }
  });

  TweenMax.to(attributs3, 0.6, {
    opacity: 1,
    delay: 0.6,
    ease: Linear.easeNone,
    onUpdate: function() {
      window['image'+current_slide].alpha = attributs3.opacity;
    }
  });
}

function prev_slide() {
  vitesse = -4;
  transition_commune();
  update_title('prev');

  if (current_slide === 0) {
    window['image'+(total_slide-2)].alpha = 0;
    stage.addChild(window['image'+(total_slide-2)]);
  } else if (current_slide === 1) {
    window['image'+(total_slide-1)].alpha = 0;
    stage.addChild(window['image'+(total_slide-1)]);
  } else {
    window['image'+(current_slide-2)].alpha = 0;
    stage.addChild(window['image'+(current_slide-2)]);
  }

  // image1.alpha = 1;
  var tl = new TimelineMax();

  //attributs2.anchor = 0;

  tl.to(attributs2, 0.9, {
    intensity: 150,
    x: -20,
    // width: 0.8,
    // anchor: 1,
    ease: Power2.easeIn,
    onUpdate: function() {
      displacementFilter2.scale.x = attributs2.intensity;
      vitesse = attributs2.x;
      // displacementSprite2.scale.x = attributs2.width;
      // displacementSprite2.anchor.x = attributs2.anchor;
    },
    onComplete:function() {
      tl.reverse();
      // attributs2.intensity = 150;
      // attributs2.x = -20;
      // tl.to(attributs2, 0.9, {
      //     intensity: 0,
      //     x: 0,
      //     ease: Power1.easeOut,
      //     onUpdate: function() {
      //         console.log(attributs2.width);
      //         displacementFilter2.scale.x = attributs2.intensity;
      //         vitesse = attributs2.x;
      //     }
      // });
      setTimeout(function() {
        if (!isMobile()) {
          stage.removeChild(displacementSprite2);
          stage.addChild(displacementSprite);
        }
        listenCursor = true;

        if (current_slide === 0) stage.removeChild(window['image'+(total_slide-1)]);
        else stage.removeChild(window['image'+(current_slide-1)]);

        if (current_slide > 0) current_slide--;
        else current_slide = total_slide-1;

        displacementSprite.x = currentMousePos.x;
        bloque_action = false;
      }, 800);
    }
  });

  TweenMax.to(attributs3, 0.6, {
    opacity: 1,
    delay: 0.6,
    ease: Linear.easeNone,
    onUpdate: function() {
      if (current_slide === 0) window['image'+(total_slide-2)].alpha = attributs3.opacity;
      else if (current_slide === 1) window['image'+(total_slide-1)].alpha = attributs3.opacity;
      else window['image'+(current_slide-2)].alpha = attributs3.opacity;
    }
  });
}

function transition_commune() {
  listenCursor = false;
  bloque_action = true;

  stage.removeChild(displacementSprite);
  stage.addChild(displacementSprite2);

  attributs.intensity = displacementFilter.scale.x;

  TweenMax.to(attributs, 0.3, {
    intensity: 0,
    ease: Power2.easeOut,
    onUpdate: function() {
      displacementFilter.scale.x = attributs.intensity;
    }
  });

  displacementSprite2.x = 0;
  attributs2.intensity  = displacementFilter2.scale.x;
  attributs2.x          = vitesse;
  attributs2.width    = displacementSprite2.scale.x;
  attributs3.opacity    = 0;
}

function setDimensions(item, index) {
  total_slide++;

  window['image'+index] = new PIXI.Sprite(PIXI.Texture.from(item.getAttribute('data-url')));
  window['image'+index].alpha = 0;

  loader.add('image' + index, item.getAttribute('data-url'));

  var img = new Image();
  img.src = item.getAttribute('data-url');

  img.onload = function() {
    var width         = this.width;
    var height        = this.height;

    var ratio_img     = width / height;
    var ratio_fenetre = window.innerWidth / window.innerHeight;

    // +10 et - 5 valeurs pour éviter les bords blancs
    if (ratio_fenetre >= ratio_img) {
      window['image'+index].width = window.innerWidth + 10;
      window['image'+index].height = height * (window.innerWidth + 10) / width;
      window['image'+index].x = -5;
      window['image'+index].y = window.innerHeight / 2 - window['image'+index].height / 2;
    } else {
      window['image'+index].height = window.innerHeight;
      window['image'+index].width = (width * window.innerHeight / height) + 10;
      window['image'+index].x = (window.innerWidth / 2 - window['image'+index].width / 2) - 5;
    }
  };
}

function setDimensions_menu(item, index) {
  // total_slide++;
  var cadre_width  = 0.24 * window.innerWidth;
  var cadre_height = window.innerHeight - 0.074 * window.innerWidth;

  window['image_menu'+index] = new PIXI.Sprite(PIXI.Texture.from(item.getAttribute('data-img')));
  window['image_menu'+index].alpha = 0;

  var img = new Image();
  img.src = item.getAttribute('data-img');

  img.onload = function() {
    var width         = this.width;
    var height        = this.height;

    var ratio_img     = width / height;
    var ratio_fenetre = cadre_width / cadre_height;

    // +10 et - 5 valeurs pour éviter les bords blancs
    if (ratio_fenetre >= ratio_img) {
      window['image_menu'+index].width  = cadre_width + 10;
      window['image_menu'+index].height = height * (cadre_width + 10) / width;
      window['image_menu'+index].x      = -5;
      window['image_menu'+index].y      = cadre_height / 2 - window['image_menu'+index].height / 2;
    } else {
      window['image_menu'+index].height = cadre_height;
      window['image_menu'+index].width  = (width * cadre_height / height) + 10;
      window['image_menu'+index].x      = (cadre_width / 2 - window['image_menu'+index].width / 2) - 5;
    }
  };
}

function update_title(sens) {
  if (sens === 'next') {
    multiplieur = 1;
    TweenMax.to('#cercle_blanc', 0.9, {'stroke-dashoffset': 190 * (1 - 1 / total_slide - (current_slide * 1 / total_slide)), ease: Power4.easeInOut});
  }
  else {
    multiplieur = -1;

    if (current_slide === 1) TweenMax.to('#cercle_blanc', 0.9, { 'stroke-dashoffset': 0, ease: Power4.easeInOut });
    else if (current_slide === 0) TweenMax.to('#cercle_blanc', 0.9, { 'stroke-dashoffset': 190 / total_slide, ease: Power4.easeInOut });
    else TweenMax.to('#cercle_blanc', 0.9, {'stroke-dashoffset' : 190 - (current_slide-1) * 190 / total_slide, ease: Power4.easeInOut });
  }

  random = [];
  document.querySelectorAll('.random').forEach(x => random.push(x));

  random.sort(function() {
    return 0.5 - Math.random();
  });

  TweenMax.staggerTo(random, 0.4, { x: multiplieur * 24 + 'px', opacity: 0, ease: Power2.easeIn }, 0.1, allDone);
}

function allDone() {
  document.querySelectorAll('.random.first').forEach(x => x.classList.remove('first'));
  document.querySelector('#num_letter .current').classList.add('after');

  if (multiplieur === 1) {
    if (document.querySelector('#num_letter .current').nextElementSibling !== null) {
      document.querySelector('#num_letter .current').nextElementSibling.classList.add('before');
      var next = document.querySelector('#num_letter .current').nextElementSibling;
      TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut });

      TweenMax.to(document.querySelector('#num_letter .current').nextElementSibling.querySelector('div'), 0.4, { x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: function() {
        document.querySelector('#num_letter .current').classList.remove('current','after');
        next.classList.add('current');
        next.classList.remove('before');
      }});
    }
    else {
      var first = document.querySelector('#num_letter div');
      first.classList.add('before');

      TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut });
      TweenMax.to(first.querySelector('div'), 0.4, { x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: function() {
        if (document.querySelectorAll('.change_project')[total_slide-1].classList.contains('first')) document.querySelectorAll('.change_project')[total_slide-1].classList.remove('first');
        document.querySelector('#num_letter .current').classList.remove('current','after');
        first.classList.add('current');
        first.classList.remove('before');
      }});
    }
    document.getElementById('num_project').innerHTML = current_slide + 1;
    document.getElementById('title_h2').innerHTML   = document.querySelectorAll('#images div')[current_slide].getAttribute('data-title');
    document.getElementById('type').innerHTML       = document.querySelectorAll('#images div')[current_slide].getAttribute('data-cat');
    document.getElementById('year').innerHTML       = document.querySelectorAll('#images div')[current_slide].getAttribute('data-year');

    document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href',document.querySelectorAll('#images div')[current_slide].getAttribute('data-perma')));
  }
  else {
    if (document.querySelector('#num_letter .current').previousElementSibling !== null) {
      document.querySelector('#num_letter .current').previousElementSibling.classList.add('before');
      var prev = document.querySelector('#num_letter .current').previousElementSibling;

      TweenMax.to('.current .letter', 0.4, { x:'-100%', clearProps: 'x', ease: Power4.easeInOut});
      TweenMax.fromTo(document.querySelector('#num_letter .current').previousElementSibling.querySelector('div'), 0.4, { x: '100%'}, { x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: function() {
        document.querySelector('#num_letter .current').classList.remove('current','after');
        prev.classList.add('current');
        prev.classList.remove('before');
      }});
    }
    else {
      var last = document.querySelectorAll('#num_letter > div')[total_slide-1];
      last.classList.add('before');

      TweenMax.to('.current .letter', 0.4, { x: '-100%', clearProps: 'x', ease: Power4.easeInOut });
      TweenMax.fromTo(last.querySelector('div'), 0.4, { x:'100%' }, { x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: function() {
        document.querySelector('#num_letter .current').classList.remove('current','after');
        last.classList.add('current');
        last.classList.remove('before');
      }});
    }

    if (current_slide === 1) {
      document.getElementById('num_project').innerHTML = total_slide;
      document.getElementById('title_h2').innerHTML   = document.querySelectorAll('#images div')[total_slide-1].getAttribute('data-title');
      document.getElementById('type').innerHTML       = document.querySelectorAll('#images div')[total_slide-1].getAttribute('data-cat');
      document.getElementById('year').innerHTML       = document.querySelectorAll('#images div')[total_slide-1].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[total_slide-1].getAttribute('data-perma')));
    }
    else if (current_slide === 0) {
      document.getElementById('num_project').innerHTML = total_slide-1;
      document.getElementById('title_h2').innerHTML   = document.querySelectorAll('#images div')[total_slide-2].getAttribute('data-title');
      document.getElementById('type').innerHTML       = document.querySelectorAll('#images div')[total_slide-2].getAttribute('data-cat');
      document.getElementById('year').innerHTML       = document.querySelectorAll('#images div')[total_slide-2].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x=> x.setAttribute('href', document.querySelectorAll('#images div')[total_slide-2].getAttribute('data-perma')));
    }
    else {
      document.getElementById('num_project').innerHTML = current_slide-1;
      document.getElementById('title_h2').innerHTML   = document.querySelectorAll('#images div')[current_slide-2].getAttribute('data-title');
      document.getElementById('type').innerHTML       = document.querySelectorAll('#images div')[current_slide-2].getAttribute('data-cat');
      document.getElementById('year').innerHTML       = document.querySelectorAll('#images div')[current_slide-2].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[current_slide-2].getAttribute('data-perma')));
    }
  }

  document.querySelectorAll('#title_h2 span').forEach(addRandom);
  random = [];
  document.querySelectorAll('.random').forEach(x => random.push(x));

  random.sort(function() {
    return 0.5 - Math.random();
  });

  TweenMax.staggerFromTo(random, 1, { x: -multiplieur * 24 + 'px', opacity: 0 }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
}

function addRandom(item, index) {
  item.classList.add('random');
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // return true;
}

//------------------//
// RAFS             //
//------------------//

// cancelAnimationFrame(raf_pixi);

function pixi_home() {
  raf_pixi_home = requestAnimationFrame(pixi_home);
  // console.log('pixi home tourne');

  renderer.render(stage);

  if (listenCursor) {
    //window['image' + (current_slide - 1)].x = 100
    mousePos.x = displacementSprite.x;
    //mousePos.y = displacementSprite.y;
    mousePos.intensity = displacementFilter.scale.x;
    mousePos.width = displacementSprite.scale.x;

    if (current_slide !== num_image_temp) {
      num_image_temp = current_slide;

      if (current_slide === 0) num_image = total_slide-1;
      else num_image = current_slide-1;
      // currentMousePos.x = 0;
      delayx = window['image' + num_image].x;
    }
    mousePos.correction = 0;

    TweenMax.to(mousePos, 0.3, {
      x: currentMousePos.x,
      //y: currentMousePos.y,
      intensity: (currentMousePos.x - former_delta) * 10,
      width: Math.abs(((currentMousePos.x - former_delta) / 80) - 0.2),
      correction: (currentMousePos.x - former_delta) / 40,
      onUpdate: function() {
        displacementSprite.x = mousePos.x;
        // displacementSprite.y = mousePos.y;
        displacementFilter.scale.x = mousePos.intensity;
        displacementSprite.scale.x = mousePos.width;
        window['image' + num_image].x = delayx + mousePos.correction;
      },
      ease: Linear.easeNone
    });

    // console.log((currentMousePos.x - former_delta) / 100);

    if (isMobile()) {
      mousePos.penche = displacementFilter2.scale.x;

      TweenMax.to(mousePos, 0.3, {
        penche: (gamma * 20 - delta_gamma),
        onUpdate: function() {
          displacementFilter2.scale.x = mousePos.penche;
        },
        ease: Linear.easeNone
      });

      // document.getElementById('title_h2').innerHTML = gamma;
      displacementSprite2.x += 10;
    }
  }
  else displacementSprite2.x += vitesse;

  former_delta = currentMousePos.x;
  delta_gamma  = gamma * 20;
}

function pixi_menu() {

  raf_pixi_menu = requestAnimationFrame(pixi_menu);
  // console.log('pixi menu tourne');

  renderer_menu.render(stage_menu);
  displacementSprite3.x += 4;

  if (!isMobile()) {
    percent_cursor = Math.round(currentMousePos.y * 100 / window.innerHeight * 100)/100;
    the_delta_menu = currentMousePos.y;
  }
  else {
    percent_cursor = window.pageYOffset * 100 / (height_menu - window.innerHeight);
    the_delta_menu = window.pageYOffset;
  }

  if (Math.abs((the_delta_menu - delta_menu) / 200 + 1) < 1.8) intensity = Math.abs((the_delta_menu - delta_menu) / 200 + 1);
  else intensity = 1.8;

  // déplacement menu
  if (!isMobile()) {
    expression = -1 * (height_menu - window.innerHeight) / window.innerHeight * currentMousePos.y;

    TweenMax.to('#the_menu', 1.4, {
      y: expression + 'px',
      scaleY: intensity,
      ease: Power2.easeOut
    });
  }
  else TweenMax.to('#the_menu', 1.4, { scaleY: intensity, ease:Power2.easeOut });

  if (window.innerWidth > 767) {
    if (percent_cursor > height_margin && percent_cursor < (100 - height_margin)) document.querySelectorAll('#the_menu li').forEach(checkerMenu);

    displace.intensity = displacementFilter3.scale.x;

    TweenMax.to(displace, 0.3, {
      intensity: (the_delta_menu - delta_menu) * 4,
      onUpdate: function() {
        displacementFilter3.scale.x = displace.intensity;
      },
      ease: Linear.easeNone
    });
  }
  delta_menu = the_delta_menu;
}

function pixi_single() {
  if (document.querySelector('.vs-section').clientHeight != ancien_height && !isMobile()) {
    the_scroll.resize();
    ancien_height = document.querySelector('.vs-section').clientHeight;
  }

  raf_pixi_single = requestAnimationFrame(pixi_single);

  //l adder_scale = parseFloat(Math.round((document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight * 100) / 100).toFixed(2);
  // ladder_scale = (document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight;
  // ladder_scale = parseFloat(Math.round(ladder_scale * 100) / 100).toFixed(2);
  // console.log(ladder_scale);
  // console.log('pixi single tourne');

  renderer.render(stage);

  displacementSprite2.x += vitesse;

  if (the_scroll !== null) {
    if (the_scroll.vars.target !== 0 && passe_une_fois === false) {
      passe_une_fois = true;
      singleAnimation();
    } else if (the_scroll.vars.target === 0 && passe_une_fois === true) {
      passe_une_fois = false;
      singleAnimation2();
    }
  } else {
    if (window.pageYOffset !== 0 && passe_une_fois === false) {
      passe_une_fois = true;
      singleAnimation();
    } else if (window.pageYOffset === 0 && passe_une_fois === true) {
      passe_une_fois = false;
      singleAnimation2();
    }
  }

  // TweenMax.to('#the_imgs', 1.4, { scaleY: intensity, ease: Power2.easeOut });

  // if (the_scroll !== null) delta_scroll = the_scroll.vars.current;
  // else {}
}

function raf_about() {
  the_raf_about = requestAnimationFrame(raf_about);

  if (the_scroll !== null) {
    TweenMax.to('#inner_svg', 1, { rotation: -the_scroll.vars.current / 4, ease: Linear.easeNone });
    TweenMax.to('#inner_svg img', 1, { rotation: the_scroll.vars.current / 4, ease: Linear.easeNone });

    if (Math.abs((the_scroll.vars.current - delta_scroll) / 200 + 1) < 2.2) intensity = Math.abs((the_scroll.vars.current - delta_scroll) / 200 + 1);
    else intensity = 2.2;
  }
  else {
    TweenMax.to('#inner_svg', 1, {rotation: -window.pageYOffset/4, ease: Linear.easeNone});
    TweenMax.to('#inner_svg img', 1, {rotation: window.pageYOffset/4, ease: Linear.easeNone});

    if (Math.abs((window.pageYOffset - delta_scroll) / 200 + 1) < 2.2) intensity = Math.abs((window.pageYOffset - delta_scroll) / 200 + 1);
    else intensity = 2.2;
  }

  // if (the_scroll !== null) {
  // }else{
  // }

  TweenMax.to('#scaleA', 1.4, { scaleX: intensity, ease: Power2.easeOut });

  if (the_scroll !== null) delta_scroll = the_scroll.vars.current;
  else delta_scroll = window.pageYOffset;
}

// function le_raf() {
//   raf = requestAnimationFrame(le_raf);
// }

function checkerMenu(item, index) {
  if (percent_cursor > (height_margin + (index * height_entrance)) && percent_cursor < (height_margin + ((index + 1) * height_entrance)) && !item.classList.contains('actif')) {
    document.querySelector('#the_menu .actif').classList.remove('actif');
    item.classList.add('actif');

    document.getElementById('pixi_menu').setAttribute('href',item.querySelector('a').getAttribute('href'));

    // ajouter la nouvelle image
    stage_menu.addChild(window['image_menu' + index]);

    displace2.alpha = 0;
    // stage_menu.removeChild(displacementSprite3);

    TweenMax.to(displace2, 0.2, {
      alpha: 1,
      onUpdate: function() {
        window['image_menu' + index].alpha = displace2.alpha;
      },
      onComplete: function() {
        // to do : gestion suppression ancien child
        // stage_menu.removeChildren(2);
        // dernier_ajoute = index;
      },
      ease: Linear.easeNone
    });
  }
}

function change_project(element) {
  if (element.classList.contains('current')) return;
  else {
    lindex = Array.from(document.getElementById('num_letter').children).indexOf(element);
    const index_courant = Array.from(document.getElementById('num_letter').children).indexOf(document.querySelector('#num_letter .current'));

    vitesse = 4;
    transition_commune();

    window['image'+lindex].alpha = 0;
    stage.addChild(window['image'+lindex]);

    var tl = new TimelineMax();

    tl.to(attributs2, 0.9, {
      intensity: 150,
      x: 20,
      ease: Power2.easeIn,
      onUpdate: function() {
        displacementFilter2.scale.x = attributs2.intensity;
        vitesse = attributs2.x;
      },
      onComplete:function() {
        tl.reverse();
        setTimeout(function() {
          stage.removeChild(displacementSprite2);
          stage.addChild(displacementSprite);
          listenCursor = true;

          stage.removeChild(window['image'+(index_courant)]);

          if (lindex >= total_slide-1) current_slide = 0;
          else current_slide = lindex + 1;
          displacementSprite.x = currentMousePos.x;
          bloque_action = false;
        }, 800);
      }
    });

    TweenMax.to(attributs3, 0.6, {
      opacity: 1,
      delay: 0.6,
      ease: Linear.easeNone,
      onUpdate: function() {
        window['image'+lindex].alpha = attributs3.opacity;
      }
    });

    TweenMax.to('#cercle_blanc', 0.9, { 'stroke-dashoffset' : 190 * (1 - 1 / total_slide - (lindex * 1 / total_slide)), ease: Power4.easeInOut });

    random = [];
    document.querySelectorAll('.random').forEach(x => random.push(x));

    random.sort(function() {
      return 0.5 - Math.random();
    });

    TweenMax.staggerTo(random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1, allDone2);
  }
}

function allDone2() {
  document.querySelector('#num_letter .current').classList.add('after');
  TweenMax.to('.current .letter', 0.4, { x:'100%', clearProps:'x', ease:Power4.easeInOut});
  document.querySelectorAll('#num_letter > div')[lindex].classList.add('before');
  TweenMax.to(document.querySelectorAll('#num_letter > div')[lindex].querySelector('div'), 0.4, {
    x: '0%',
    clearProps: 'x',
    ease: Power4.easeInOut,
    onComplete: function() {
      document.querySelector('#num_letter .current').classList.remove('current','after');
      document.querySelectorAll('#num_letter > div')[lindex].classList.add('current');
      document.querySelectorAll('#num_letter > div')[lindex].classList.remove('before');
    }
  });

  // if (document.querySelector('#num_letter .current').nextElementSibling !== null) {
  //     document.querySelector('#num_letter .current').nextElementSibling.classList.add('before');
  //     var next = document.querySelector('#num_letter .current').nextElementSibling;
  //     TweenMax.to('.current .letter', 0.4, {x:'100%', clearProps:'x', ease:Power4.easeInOut});
  //     TweenMax.to(document.querySelector('#num_letter .current').nextElementSibling.querySelector('div'), 0.4, {x:'0%', clearProps:'x', ease:Power4.easeInOut, onComplete:function() {
  //         document.querySelector('#num_letter .current').classList.remove('current','after');
  //         next.classList.add('current');
  //         next.classList.remove('before');
  //     }});
  // }else{
  //     var first = document.querySelector('#num_letter div');
  //     first.classList.add('before');

  //     TweenMax.to('.current .letter', 0.4, {x:'100%', clearProps:'x', ease:Power4.easeInOut});
  //     TweenMax.to(first.querySelector('div'), 0.4, {x:'0%', clearProps:'x', ease:Power4.easeInOut, onComplete:function() {
  //         document.querySelector('#num_letter .current').classList.remove('current','after');
  //         first.classList.add('current');
  //         first.classList.remove('before');
  //     }});
  // }

  document.getElementById('num_project').innerHTML = lindex + 1;
  document.getElementById('title_h2').innerHTML   = document.querySelectorAll('#images div')[lindex].getAttribute('data-title');
  document.getElementById('type').innerHTML       = document.querySelectorAll('#images div')[lindex].getAttribute('data-cat');
  document.getElementById('year').innerHTML       = document.querySelectorAll('#images div')[lindex].getAttribute('data-year');

  document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href',document.querySelectorAll('#images div')[lindex].getAttribute('data-perma')));
  document.querySelectorAll('#title_h2 span').forEach(addRandom);
  random = [];
  document.querySelectorAll('.random').forEach(x => random.push(x));

  random.sort(function() {
    return 0.5 - Math.random();
  });

  TweenMax.staggerFromTo(random, 1, { x: '-24px', opacity:0}, {x: '0px', opacity:1, ease:Power2.easeOut }, 0.1);
}

function singleAnimation() {
  vitesse           = 4;
  var attributs2bis = { intensity : 0, x : 4 };

  TweenMax.to(attributs2bis, 0.9, {
    intensity: 150,
    x: 6,
    ease: Power2.easeIn,
    onUpdate: function() {
      displacementFilter2.scale.x = attributs2bis.intensity;
      vitesse = attributs2bis.x;
    }
  });
}

function singleAnimation2() {
  vitesse           = 6;
  var attributs2bis = { intensity : 150, x : 6 };

  TweenMax.to(attributs2bis, 0.9, {
    intensity: 0,
    x: 4,
    ease: Power2.easeOut,
    onUpdate: function() {
      displacementFilter2.scale.x = attributs2bis.intensity;
      vitesse = attributs2bis.x;
    }
  });
}

function onHover(event) {
  event.target.classList.add('feature');
  document.querySelector('.change_project.current').classList.add('temp');
}

function offHover(event) {
  event.target.classList.remove('feature');
  document.querySelector('.change_project.current').classList.remove('temp');
}

function onHoverNext (event) {
  if (once_play === false) {
    once_play = true;

    random = [];
    document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));

    random.sort(function() {
      return 0.5-Math.random();
    });

    TweenMax.staggerTo(random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, allDoneNext);
    TweenMax.to('#inner_project name', 0.4, { x: (document.getElementById('project name').clientWidth + 10) / 2 + 'px', delay: 0.4, ease: Power2.easeOut });
    TweenMax.staggerTo('.stag', 0.4, { opacity: 1, delay: 0.4, ease: Power2.easeOut }, -0.02);
  }
}

function allDoneNext() {
  document.getElementById('to_next_proj').innerHTML = document.getElementById('to_next_proj').getAttribute('data-next');
  TweenMax.set('#to_next_proj span', {opacity:0});

  random = [];
  document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));

  random.sort(function() {
    return 0.5 - Math.random();
  });

  TweenMax.staggerTo(random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);
}

function offHoverNext (event) {
  if (once_play === true) {
    once_play = false;

    random = [];
    document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));
    random.sort(function() {
      return 0.5 - Math.random();
    });

    TweenMax.staggerTo(random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, allDoneNext2);
  }
}

function allDoneNext2() {
  document.getElementById('to_next_proj').innerHTML = '<span>N</span><span>e</span><span>x</span><span>t</span>';
  TweenMax.set('#to_next_proj span', { opacity: 0 });

  random = [];
  document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));

  random.sort(function() {
    return 0.5 - Math.random();
  });

  TweenMax.staggerTo(random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);

  TweenMax.to('#inner_project name', 0.4, { x: '0px', ease: Power2.easeOut });
  TweenMax.staggerTo('.stag', 0.4, { opacity: 0, ease: Power2.easeOut }, 0.02);
}

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) return;

  var xUp   = evt.touches[0].clientX;
  var yUp   = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant */
    if (document.querySelector('body').classList.contains('home') && bloque_action === false) {
      if (xDiff > 0) next_slide();
      else prev_slide();
    }
  }
  else {
    if (document.querySelector('body').classList.contains('home') && bloque_action === false) {
      if (yDiff > 0) next_slide();
      else prev_slide();
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

function processCircle(event) {
  if (window.orientation === 0) gamma = event.gamma;
  else if (window.orientation === 180) gamma = -event.gamma;
  else if (window.orientation === -90) gamma = -event.beta;
  else if (window.orientation === 90) gamma = event.beta;
}

// const ticker = new PIXI.ticker.Ticker();
// ticker.stop();
// ticker.add((deltaTime) => {
//   // do something every frame
//   console.log('iii');
// });
// ticker.start();
