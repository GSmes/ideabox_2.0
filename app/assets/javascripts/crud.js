$(document).ready(() => {

  $.getJSON('/api/v1/ideas')
    .done(response => response.forEach(idea => appendRow(idea)))
    .fail(error => console.log(error))

  function appendRow(idea) {
    $("#table-body").append("<tr id=idea-"+ idea.id +">" +
      "<td>" + idea.title + "</td>" +
      "<td>" + idea.body + "</td>" +
      "<td>" + idea.quality + "</td>" + "</tr>"
    );
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
  })
});
