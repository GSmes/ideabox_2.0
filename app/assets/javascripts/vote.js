$(document).ready(() => {
  (function listenForVotes() {
    upvoteIdea()
    downvoteIdea()
  }())
})

function upvoteIdea() {
  $("#ideas_table").on('click', '.upvote', e => {

    let target = e.currentTarget
    let num = target.id.replace(/^\D+/g, "")
    let quality_num = parseInt($(target).parent().attr('data-quality'))
    let edit_data = { quality: upvote(quality_num) }
    updateAjax(target, edit_data, num)
  })
}

function downvoteIdea() {
  $("#ideas_table").on('click', '.downvote', e => {
    let target = e.currentTarget
    let num = target.id.replace(/^\D+/g, "")
    let quality_num = $(target).parent().attr('data-quality')
    let edit_data = { quality: downvote(quality_num) }
    updateAjax(target, edit_data, num)
  })
}

function upvote(quality) {
  if (quality < 2) {
    return quality + 1
  }
}

function downvote(quality) {
  if (quality > 0) {
    return quality - 1
  }
}

function updateAjax(target, edit_data, num) {

  $.ajax({
    url: "/api/v1/ideas/" + num,
    type: "PATCH",
    dataType: "JSON",
    data: edit_data,
    success: response => {
      $(target).parent().attr("data-quality", response.quality)
      $(target).parent()
        .parent().prev()
        .text(mapQuality(response.quality))
    },
    error: errorRes => {
      console.log(errorRes)
    }
  })
}
