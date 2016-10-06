function appendRow(idea) {
  $("#table-body").prepend(
    "<tr id='idea-"+ idea.id +"'>" +
      "<td contenteditable='true' class='title input' id=title-" + idea.id + ">" +
        idea.title + "</td>" +

      "<td contenteditable='true' class='body input' id=body-" + idea.id + ">" +
        trimBody(idea.body) +
      "</td>" +

      "<td class='quality' id='quality-" + idea.id + "'>" +
        mapQuality(idea.quality) +
      "</td>" +

      "<td>" +
        "<center>" +
          "<div data-quality='" + idea.quality + "'" + "class='btn-group'>" +
            "<button type='button' id='upvote-" + idea.id + "'" + "class='upvote btn btn-md btn-primary'>"+
              "<span class='glyphicon glyphicon-thumbs-up'></span>" +
            "</button>" +
            "<button type='button' id='downvote-" + idea.id + "'" + "class='downvote btn btn-md btn-warning'>" +
              "<span class='glyphicon glyphicon-thumbs-down'></span>" +
            "</button>" +
          "</div>" +
        "</center>" +
      "</td>" +

      "<td>" +
        "<center>" +
          "<button type='button' id='" + idea.id + "'" + "class='delete btn btn-md btn-danger'>" +
            "<span class='glyphicon glyphicon-remove'></span>" +
          "</button>" +
        "</center>" +
      "</td>" +
    "</tr>"
  );
}

function removeRow(idea_id) {
  var id = "#idea-" + idea_id;
  $(id).remove();
}

function mapQuality(index) {
  var qualities = ["swill", "plausible", "genius"];
  return qualities[index];
}

function clearFields() {
  $("#titleField").val("");
  $("#bodyField").val("");
}

function trimBody(body) {
  if (body.length > 100) {
    var trimmed = body.substr(0, 100);
    return trimmed.substr(0, Math.min(trimmed.length,
    trimmed.lastIndexOf(" "))) + "...";
  } else {
    return body;
  }
}
