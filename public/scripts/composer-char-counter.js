
$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    const charLimit = 140;
    const charCount = $(this).val().length;
    const charRemaining = charLimit - charCount;
    const counterElement = $(this).siblings(".botton").find(".counter");
    console.log(counterElement)

    counterElement.text(charRemaining);

    if (charRemaining < 0) {
      counterElement.addClass("counter-invalid");
    } else {
      counterElement.removeClass("counter-invalid");
    }
  });
});


// // In the given code, const counterElement = $(this).siblings(".botton").find(".counter");
//  finds the DOM element with class "counter" that is a descendant of an element with class "botton"
//  that is a sibling of the textarea that triggered the event (represented by this in the code).

// // The siblings() function in jQuery selects all the sibling elements of the current element, 
// and the find() function selects descendant elements of the selected elements.

// // In this case, the siblings(".botton") method selects the sibling element with class "botton"
//  of the textarea, and the find(".counter") method selects the element with class "counter" 
//  that is a descendant of the ".botton" element.

// // After the counter element is selected, counterElement.text(charRemaining); 
// sets the text of the selected element to the value of the charRemaining variable,
//  which represents the number of characters remaining in the textarea. This updates the 
//  displayed count of characters remaining in real-time as the user types in the textarea.