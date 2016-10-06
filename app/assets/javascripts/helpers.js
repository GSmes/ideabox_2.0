function appendRow(idea) {
  $("#table-body").prepend(
    "<tr id='idea-"+ idea.id +"'>" +
      "<td contenteditable='true' class='title input' id=title-" + idea.id + ">" +
        idea.title +
      "</td>" +

      "<td contenteditable='true' class='body input' id=body-" + idea.id + ">" +
        idea.body +
      "</td>" +

      "<td id='quality-" + idea.id + "'>" +
        mapQuality(idea.quality) +
      "</td>" +

      "<td>" +
        "<div data-quality='" + idea.quality + "'" + "class='btn-group-vertical'>" +
          "<button type='button' id='upvote-" + idea.id + "'" + "class='upvote btn btn-sm btn-primary'>" +
            "<span class='glyphicon glyphicon-thumbs-up'></span>" +
          "</button>" +
          "<button type='button' id='downvote-" + idea.id + "'" + "class='downvote btn btn-sm btn-primary'>" +
            "<span class='glyphicon glyphicon-thumbs-down'></span>" +
          "</button>" +
        "</div>" +
      "</td>" +

      "<td>" +
        "<button type='button' id='" + idea.id + "'" + "class='delete btn btn-danger'>" +
          "<span class='glyphicon glyphicon-remove'></span>" +
        "</button>" +
      "</td>" +
    "</tr>"
  )
};

function removeRow(idea_id) {
  let id = "#idea-" + idea_id
  $(id).remove()
};

function mapQuality(index) {
  let qualities = ["swill", "plausible", "genius"]
  return qualities[index]
};

function clearFields() {
  $("#titleField").val("")
  $("#bodyField").val("")
}
