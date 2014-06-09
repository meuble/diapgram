(function() {
  var dataURL = "/data?callback=?";
  var pool = [];
  var trash = [];
  var initialized = false;


  var addToPool = function(items) {
    $.each(items, function(i, item) {
      if (pool.indexOf(item) == -1 && trash.indexOf(item) == -1) {
        pool.push(item);
        $( "<img/>" ).attr( "src", item ).appendTo( "#loader" );
      }
    });
    if (!initialized) {
      initialize();
    }
  };
  
  var initialize = function() {
    initialized = true;
    var containers = $('.photo');
    $.each(containers, function(i, item) {
      if (!checkPool()) {
        return
      }
      var pictureUrl = pool.shift();
      $('img', item).attr('src', pictureUrl)
      trash.push(pictureUrl);
    });
  };

  var getData = function() {
    $.getJSON(dataURL).done(function(data) {
      addToPool(data)
    });
  };

  var checkPool = function() {
    if (pool.length < 1) {
      if (trash.length < 1) {
        return false;
      }

      $.each(trash, function(i, item) {
        if (pool.indexOf(item) == -1) {
          pool.push(item);
        }
      });
      trash = [];
    }
    return true
  }

  var nextPicture = function() {
    if (!checkPool()) {
      return
    }

    var pictureUrl = pool.shift();
    var containers = $('.photo img');
    currentPicture = $(containers[Math.floor(Math.random() * containers.length)]);
    currentPicture.animate({width: "0px"}, 700, function() {
      currentPicture.attr('src', pictureUrl);
      currentPicture.animate({width: "100%"}, 700);
    });

    trash.push(pictureUrl);
  };

  getData();
  setInterval(nextPicture, 5000);
  setInterval(getData, 5000);
  setTimeout(function() {
    $('#application').css("width", $(window).height());
  }, 500)
})();