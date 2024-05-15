let num = 4;
let URL = "http://numbersapi.com";

// 1.
$.getJSON(`${URL}/${num}?json`).then(data => {
  console.log(data);
});

let favNumbers = [7, 11, 22];
$.getJSON(`${URL}/${num}?json`).then(data => {
  console.log(data);
});

Promise.all(
  Array.from({ length: 10 }, () => {
    return $.getJSON(`${URL}/${num}?json`);
  })
).then(facts => {
  facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});
