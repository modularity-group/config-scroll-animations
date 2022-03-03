jQuery(function($) {

  /*
   * Animate elements into view
   */

  const $window = $(window);

  const isInView = function($item) {
    return $window.scrollTop() >= ($item.offset().top - $window.height() + 120);
  };

  $('.is-style-animate-into-view').each(function() {
    const $this = $(this);

    if (isInView($this)) {
      $this.removeClass('is-style-animate-into-view');
    }
    else {
      $this.addClass('is-not-in-view');
    }
  });

  $window.scroll(function() {
    if ($('.is-not-in-view').length > 0) {

      $('.is-style-animate-into-view.is-not-in-view').each(function() {
        const $this = $(this);

        if (isInView($this)) {
          $this.addClass("is-in-view").removeClass("is-not-in-view");
        }
      });

    }
  });

  /*
   * Auto-scroll to existing anchors
   */

  scrollToAnchor('#', $);
  scrollToAnchor('/#', $);
  scrollToAnchor('/en/#', $);
  scrollToAnchor('/de/#', $);

});

function scrollToAnchor(targetStartsWith, $) {

  $('a[href^="' + targetStartsWith + '"]').on('click', function(e) {
    const href = $.attr(this, 'href');

    if (!$(this).hasClass('no-autoscroll') && href.length > targetStartsWith.length) {
      let $target = $($.attr(this, 'href').substr(targetStartsWith.length - 1));

      if ($target.length === 1) {
        e.preventDefault();

        setTimeout(function(){
          let offset = $('body').data('autoscroll-offset') || 50;
          $target.trigger('autoscrolled');
          $('html, body').animate({ scrollTop: $target.offset().top - offset }, 500);
        }, 50);
      }
    }
  });
}
