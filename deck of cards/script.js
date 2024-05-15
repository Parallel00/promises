$(function () {
  let URL = 'https://deckofcardsapi.com/api/deck';
  let deckId = null;
  let $btn = $('button');
  let $cardArea = $('#cards');
  let crdOne = null;
  
  $.getJSON(`${URL}/new/draw/`).then(data => {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });

  $.getJSON(`${URL}/new/shuffle/`).then(data => {
    deckId = data.deck_id;
    $btn.show();
  });

  $.getJSON(`${URL}/new/draw/`)
    .then(data => {
      crdOne = data.cards[0];
      let deckId = data.deck_id;
      return $.getJSON(`${URL}/${deckId}/draw/`);
    })
    .then(data => {
      let crdTwo = data.cards[0];
      [crdOne, crdTwo].forEach(function(card) {
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      });
    });

  $btn.on('click', function() {
    $.getJSON(`${URL}/${deckId}/draw/`).then(data => {
      let img = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: img,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (data.remaining === 0) $btn.remove();
    });
  });
});