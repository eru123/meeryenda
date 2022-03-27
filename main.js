const menu = [
  { name: "Food 1", image: "https://via.placeholder.com/500", price: 100 },
  { name: "Food 2", image: "https://via.placeholder.com/500", price: 50 },
  { name: "Food 3", image: "https://via.placeholder.com/500", price: 80 },
  { name: "Food 4", image: "https://via.placeholder.com/500", price: 20 },
]

const order = []
const qty = []
const total = []
let total_qty = 0
let total_price = 0
let total_cash = 0

function onOrderFormChangedHandler() {
  order.forEach((item, i) => qty[ i ] = parseInt($(item).val() || 0))
  qty.forEach((item, i) => total[ i ] = item * menu[ i ].price)
  qty_total = qty.reduce((a, b) => a + b, 0)
  price_total = total.reduce((a, b) => a + b, 0)
  $(".total-orders-number").text(qty_total);
  $("#bills").val(price_total);
}

function resetForm(){
  total_qty = 0
  total_price = 0
  total_cash = 0
  $('#cash').val(0)
  $('#name').val('')
  $('#address').val('')
  $('#contact').val('')
  $('#bills').val(0)
  $('.total-orders-number').text(0)
  order.forEach((item, i) => {
    $(item).val(0)
  })
}

function submitForm(){
  onOrderFormChangedHandler()
  $('#invoice').text('')
  total_price = parseInt($('#bills').val())
  total_cash = parseInt($('#cash').val())
  const data = [
    {key: "Name", value: $('#name').val()},
    {key: "Address", value: $('#address').val()},
    {key: "Contact #", value: $('#contact').val()},
    {key: "Total Bill", value: total_price, price: true},
    {key: "Payment", value: total_cash, price: true},
    {key: "Change", value: ( total_cash - total_price), price: true},
  ]

  data.forEach((item) => {
    $('#invoice').append(`
      <div class="invoice-row text-left">
        <div class="label">${item.key}: </div>
        <div class="value">${item.price ? '<span>' + item.value+'</span>' : item.value}</div>
      </div>
    `)
  })
}

$(document).ready(() => {
  menu.forEach((item, i) => {
    $('#menu-items').append(`
      <div class="col">
        <div class="card">
          <img src="${item.image}" class="card-img-top">
          <div class="card-body">
            ${item.name} <span class="price">${item.price}</span>
          </div>
        </div>
      </div>
    `)

    $('#quantitities').append(`
      <div class="form-row">
        <label for="${item.name}">${item.name} Quantity: </label>
        <input type="number" class="form-control" name="${item.name}" id="order-qty-${i}">
      </div>
    `)

    order.push('#order-qty-' + i)

    $(order[ i ]).on('change', onOrderFormChangedHandler)
  })

  $('#cash').on('change', () => total_cash = parseInt($('#cash').val() || 0))
  $('#submit-form').on('click', submitForm)
  $('#reset-form').on('click', resetForm)
});

