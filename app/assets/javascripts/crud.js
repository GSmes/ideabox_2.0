$(document).ready(() => {
  (function listenForCrud() {
    getIdeas()
    createIdea()
    deleteIdea()
    updateIdeaText()
  }())
})

function getIdeas() {
  $.getJSON('/api/v1/ideas')
    .done(response => response.forEach(idea => appendRow(idea)))
    .fail(error => console.log(error))
}

function createIdea() {
  $("#submitIdea").on('click', e => {
    e.preventDefault()
    var newData = $("#newIdea").serialize()

    $.ajax({
      url: "/api/v1/ideas",
      type: "POST",
      dataType: "JSON",
      data: newData,
      success: response => {
        appendRow(response)
        clearFields()
      },
      error: error => console.log(error)
    })
  })
}

function deleteIdea() {
  $("#ideas_table").on('click', '.delete', e => {

    var id = e.currentTarget.id

    $.ajax({
      url: "/api/v1/ideas/" + id,
      type: "DELETE",
      dataType: "JSON",
      success: response => removeRow(id),
      error: error => console.log(error)
    })
  })
}

function updateIdeaText() {
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
        $(title_id).text(trimBody(response.title))
        $(body_id).text(trimBody(response.body))
      },
      error: error => console.log(error)
    })
  })
}
