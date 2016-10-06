$(document).ready(function() {
  getIdeas();
  createIdea();
  deleteIdea();
  updateIdeaText();
});

function getIdeas() {
  $.getJSON('/api/v1/ideas')
    .done(function(response) {
      response.forEach(function(idea) {
        appendRow(idea);
      });
    })
    .fail(function(error) {
      console.log(error);
    });
}

function createIdea() {
  $("#submitIdea").on('click', function(e) {
    e.preventDefault();
    var newData = $("#newIdea").serialize();

    $.ajax({
      url: "/api/v1/ideas",
      type: "POST",
      dataType: "JSON",
      data: newData,
      success: function(response) {
        appendRow(response);
        clearFields();
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
}

function deleteIdea() {
  $("#ideas_table").on('click', '.delete', function(e) {
    var id = e.currentTarget.id;

    $.ajax({
      url: "/api/v1/ideas/" + id,
      type: "DELETE",
      dataType: "JSON",
      success: function(response) {
        removeRow(id);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
}

function updateIdeaText() {
  $("#ideas_table").on('blur', '.input', function(e) {
    var idea_id = e.currentTarget.id;
    var num = idea_id.replace(/^\D+/g, "");
    var title_id = "#title-" + num;
    var body_id = "#body-" + num;
    var edit_data = {
      title: $(title_id).text(),
      body: $(body_id).text()
    };

    $.ajax({
      url: "/api/v1/ideas/" + num,
      type: "PATCH",
      dataType: "JSON",
      data: edit_data,
      success: function(response) {
        $(title_id).text(trimBody(response.title));
        $(body_id).text(trimBody(response.body));
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
}
