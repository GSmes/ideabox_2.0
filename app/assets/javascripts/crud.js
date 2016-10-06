$(document).ready(() => {

  $.getJSON('/api/v1/ideas')
    .done(response => response.forEach(idea => appendRow(idea)))
    .fail(error => console.log(error))

  function appendRow(idea) {
    $("#table-body").append("<tr id=idea-"+ idea.id +">" +
      "<td>" + idea.title + "</td>" +
      "<td>" + idea.body + "</td>" +
      "<td>" + idea.quality + "</td>" +
      "<td>" + "<button type='button' id='" + idea.id + "' " + "class='delete'>Delete</button>" + "</td>" + "</tr>"
    )
  };

  function removeRow(idea_id) {
    let id = "#idea-" + idea_id
    $(id).remove()
  };

  $("#submitIdea").on('click', e => {
    e.preventDefault()
    var newData = $("#newIdea").serialize()

    $.ajax({
      url: "/api/v1/ideas",
      type: "POST",
      dataType: "JSON",
      data: newData,
      success: response => appendRow(response),
      error: error => console.log(error)
    })
  });

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
});
