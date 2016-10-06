$(document).ready(() => {
  $("#ideas_table").on('blur', '.input', e => {
    var idea_id = e.currentTarget.id
    var num = idea_id.replace(/^\D+/g, "")
    var title_id = "#title-" + num
    var body_id = "#body-" + num
    var edit_data = {
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
  })
})
