$(document).ready(() => {
  $.getJSON('/api/v1/ideas')
    .done(response => response.forEach(idea => appendRow(idea)))
    .fail(error => console.log(error))
  })
