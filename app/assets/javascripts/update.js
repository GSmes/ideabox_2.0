$(document).ready(() => {
  $("#ideas_table").on('blur', '.input', e => {
    let idea_id = e.currentTarget.id
    let num = idea_id.replace(/^\D+/g, "")
    let title_id = "#title-" + num
    let body_id = "#body-" + num
    let edit_data = {
      title: $(title_id).text(),
      body: $(body_id).text()
    }

    $.ajax({
      url: "/api/v1/ideas/" + num,
      type: "PATCH",
      dataType: "JSON",
      data: edit_data,
      success: response => {
        $(title_id).text(response.title)
        $(body_id).text(response.body)
      },
      error: error => console.log(error)
    })
  });

  $("#ideas_table").on('click', '.upvote', e => {
    let target = e.currentTarget
    let num = target.id.replace(/^\D+/g, "")
    let quality_num = parseInt($(target).parent().attr('data-quality'))
    let edit_data = {
      quality: upvote(quality_num)
    }
    updateAjax(target, edit_data, num)
  });

  $("#ideas_table").on('click', '.downvote', e => {
    let target = e.currentTarget
    let num = target.id.replace(/^\D+/g, "")
    let quality_num = $(target).parent().attr('data-quality'))
    let edit_data = {
      quality: downvote(quality_num)
    }
    updateAjax(target, edit_data, num)
  });

  function upvote(quality) {
    if (quality < 2) {
      return quality + 1
    }
  };

  function downvote(quality) {
    if (quality > 0) {
      return quality - 1
    }
  };

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
      error: error => console.log(error)
    })
  };
})
