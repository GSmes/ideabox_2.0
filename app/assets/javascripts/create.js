$(document).ready(() => {
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
})
