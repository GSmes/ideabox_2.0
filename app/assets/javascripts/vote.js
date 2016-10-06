$(document).ready(function() {
  upvoteIdea();
  downvoteIdea();
});

function upvoteIdea() {
  $("#ideas_table").on('click', '.upvote', function(e) {
    var target = e.currentTarget;
    var ideaId = target.id.replace(/^\D+/g, "");
    var currentQuality = parseInt($(target).parent().attr('data-quality'), 10);
    var qualityParams = { quality: upvote(currentQuality) };

    updateAjax(target, qualityParams, ideaId);
  });
}

function downvoteIdea() {
  $("#ideas_table").on('click', '.downvote', function(e) {
    var target = e.currentTarget;
    var ideaId = target.id.replace(/^\D+/g, "");
    var currentQuality = parseInt($(target).parent().attr('data-quality'), 10);
    var qualityParams = { quality: downvote(currentQuality) };

    updateAjax(target, qualityParams, ideaId);
  });
}

function upvote(quality) {
  if (quality < 2) {
    return quality + 1;
  } else {
    return quality;
  }
}

function downvote(quality) {
  if (quality > 0) {
    return quality - 1;
  } else {
    return quality;
  }
}

function updateAjax(target, qualityParams, ideaId) {
  var newQuality = parseInt(qualityParams.quality, 10);

  $.ajax({
    url: "/api/v1/ideas/" + ideaId,
    type: "PATCH",
    data: qualityParams,
    success: function() {
      $(target).parent().attr("data-quality", newQuality);
      $(target).closest("td").prev().text(mapQuality(newQuality));
    },
    error: function(errorRes) {
      console.log(errorRes);
    }
  });
}
