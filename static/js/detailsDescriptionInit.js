/* Spoiler element initialization
----------------------------------- */
function initPostImages(context) {
  var done_anything = false;
  var $in_spoilers = $('div.sp-body var.postImg', context);
  $('var.postImg', context).not($in_spoilers).each(function(){
    var $v = $(this);
    var src = $v.attr('title');
    var $img = $('<img class="'+ $v.attr('className') +'" alt="pic" />').attr('src',src);
    $v.before($img).remove();
        done_anything = true;
  });
    return done_anything;
}

function initSpoilers() {
  lang_click_here = 'apasă aici';
  $('div.sp-head').not('.jsClickEvAttached').click(function(e){
      var $sp_body = $('div.sp-body:first', $(this).parents('div.sp-wrap')[0]);

      if (!$sp_body.hasClass('inited')) {
        var any_image = initPostImages($sp_body);

        $sp_body.addClass('inited');

          if ($sp_body.height()>300 || any_image)
            $sp_body.find('.sp-foot:last').show();
            }

      if (e.shiftKey) {
        e.stopPropagation();
        e.shiftKey = false;
        var fold = $(this).hasClass('unfolded');
        $('div.sp-head', $($sp_body.parents('td')[0])).filter( function(){ return $(this).hasClass('unfolded') ? fold : !fold } ).click();
      }
      else {
        $(this).toggleClass('unfolded');
        $sp_body.slideToggle('fast');
      }
  }).addClass('jsClickEvAttached').each(function(){
    this.innerHTML += ' ('+lang_click_here+')';
  });
  $('div.sp-foot').not('.jsClickEvAttached').click(function () {
    var $sp_head = $(this).parents('div.sp-wrap:first');
        // Only if our viewpoint is below the top of the spoiler
        if ( $(window).scrollTop() > $sp_head.offset().top )
        $('html, body').animate({scrollTop:$sp_head.offset().top-1}, 80);
    $sp_head.find('div.sp-head:first').click();
  }).addClass('jsClickEvAttached');
}

function initIurl() {
  $("a.lbimg").not('.initIurl').each(function(){
    if ($(this).hasClass('initIurl')) return; // Putea fi adaugat mai jos, cind deja acest ciclu era pornit
    $(this).parents('td:first').not('.initIurl').each(function(){
      $("a.lbimg",$(this)).lightBox().css("color","green").css("font-weight","bold").addClass('initIurl');
    }).addClass('initIurl');
  });
}

$(document).ready(function(){
    initSpoilers();
    initIurl();
});