function appendRow(idea) {
  $("#table-body").append("<tr id=idea-"+ idea.id +">" +
   "<td contenteditable='true' class='title input' id=title-" + idea.id + ">" + idea.title + "</td>" +
   "<td contenteditable='true' class='body input' id=body-" + idea.id + ">" + idea.body + "</td>" +
   "<td>" + idea.quality + "</td>" +
   "<td>" + "<button type='button' id='" + idea.id + "' " + "class='delete'>Delete</button>" + "</td>" + "</tr>"
  )
};

function removeRow(idea_id) {
  let id = "#idea-" + idea_id
  $(id).remove()
}
