const product = [
  {
      id: 0,
      image: 'img/bayonetta1.jpg',
      title: 'Bayonetta',
      price: 35990,
  },
  {
      id: 1,
      image: 'img/bayonetta-2.jpg',
      title: 'Bayonetta 2',
      price: 41990,
  },
  {
      id: 2,
      image: 'img/bayonetta-3.jpg',
      title: 'Bayonetta 3',
      price: 42990,
  },
  {
      id: 3,
      image: 'img/donkey-kong-country-tropical-freeze-switch.jpg',
      title: 'Donkey Kong Country',
      price: 43990,
  },
  {
      id: 4,
      image: 'img/zelda.jpg',
      title: 'Zelda: Tears Of The Kingdom',
      price: 47990,
  },
  {
      id: 6,
      image: 'img/mario-kart-8.jpg',
      title: 'Mario Kart 8 Deluxe',
      price: 42990,
  },
  {
      id: 7,
      image: 'img/metroid-dread.jpg',
      title: 'Metroid Dread - Switch',
      price: 42990,
  },
  {
      id: 8,
      image: 'img/luigi-s-mansion-3.jpg',
      title: 'Luigis Mansion 3 - Switch',
      price: 43990,
  },
  {
      id: 9,
      image: 'img/baten-kaitos-i-ii-hd.jpg',
      title: 'Baten Kaitos I & II Hd',
      price: 48990,
  },
  {
      id: 10,
      image: 'img/bob-esponja-batalla.jpg',
      title: 'Bob Esponja Batalla Por Fondo Bikini',
      price: 29900,
  },
  {
      id: 11,
      image: 'img/child-of-light-ultimate.jpg',
      title: 'Child Of Light Ultimate Edition + Valiant hearts',
      price: 42990,
  },
];

const categories = [...product];

$('#root').html(categories.map((item, index) => {
  const { image, title, price } = item;
  return `
    <div class='box'>
      <div class='img-box'>
        <img class='images' src=${image}></img>
      </div>
      <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}</h2>
        <button class='buy-button' data-index=${index}>Comprar</button>
      </div>
    </div>
  `;
}).join(''));

var cart = [];

$(document).on('click', '.buy-button', function () {
  var index = $(this).data('index');
  cart.push({ ...categories[index] });
  displaycart();
  
  $(this).addClass('boton-estilizado');
});

function delElement(a) {
  cart.splice(a, 1);
  displaycart();
}

function displaycart() {
  let total = 0;
  $('#count').text(cart.length);
  if (cart.length === 0) {
    $('#cartItem').html('Your cart is empty');
    $('#total').html('$ ' + 0 + '');
  } else {
    $('#cartItem').html(cart.map((items, index) => {
      const { image, title, price } = items;
      total += price;
      $('#total').html('$ ' + total + '');
      return `
        <div class='cart-item'>
          <div class='row-img'>
            <img class='rowimg' src=${image}>
          </div>
          <p style='font-size:12px;'>${title}</p>
          <h2 style='font-size: 15px;'>$ ${price}</h2>
          <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
        </div>
      `;
    }).join(''));
  }
}

var cartButton = $('.cart-button');
var modal = $('.modal');
var closeButton = $('.head span');

cartButton.on('click', function () {
  modal.css('display', 'block');
});

closeButton.on('click', function () {
  modal.css('display', 'none');
});

$(window).on('click', function (event) {
  if (event.target === modal[0]) {
    modal.css('display', 'none');
  }
});