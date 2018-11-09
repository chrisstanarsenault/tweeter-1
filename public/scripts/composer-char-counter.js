$(document).ready(function() {
  let maxCounter = parseInt($(".counter").text(), 10)
  $("textarea").on('input', function() {
    let $textArea = $(this)
    let myLength = $textArea.val().length;
    let reduceCounter = maxCounter - myLength;
    $textArea.siblings(".counter").text(reduceCounter)

    if (reduceCounter < 0) {
      $textArea.siblings(".counter").css("color", "red")
      $textArea.siblings(".counter").css("font-size", "1rem")
      $textArea.siblings(".counter").css("font-weight", "normal")
    } else if (reduceCounter === 0) {
      $textArea.siblings(".counter").css("color", "green")
      $textArea.siblings(".counter").css("font-weight", "bold")
      $textArea.siblings(".counter").css("font-size", "1.5rem")
    } else {
      $textArea.siblings(".counter").css("color", "black")
      $textArea.siblings(".counter").css("font-weight", "normal")
      $textArea.siblings(".counter").css("font-size", "1rem")
    }
  })
})

