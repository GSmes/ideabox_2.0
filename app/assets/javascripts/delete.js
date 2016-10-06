$(document).ready(() => {
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
})
