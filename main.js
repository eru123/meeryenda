
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
  order.forEach((item, i) => qty[ i ] = parseInt($(item).val() || 0)) // get each order quantity and store in qty array
  qty.forEach((item, i) => total[ i ] = item * menu[ i ].price)       // get each order total and store in total array
  qty_total = qty.reduce((a, b) => a + b, 0)                          // get total qty
  price_total = total.reduce((a, b) => a + b, 0)                      // get total price
  $(".total-orders-number").text(qty_total);                          // set total orders
  $("#bills").val(price_total);                                       // set total price
}

function resetForm() {
  total_qty = 0                     // set total qty to 0
  total_price = 0                   // set total price to 0
  total_cash = 0                    // set total cash to 0
  $('#cash').val(0)                 // set cash to 0
  $('#name').val('')                // set name to empty
  $('#address').val('')             // set address to empty
  $('#contact').val('')             // set contact to empty
  $('#bills').val(0)                // set bills to 0
  $('.total-orders-number').text(0) // set total orders to 0
  order.forEach((item, i) => {
    $(item).val(0)                  // set each order quantity to 0
  })
}

function submitForm() {
  onOrderFormChangedHandler() // update qty and total
  $('#invoice').text('')      // clear invoice
  total_price = parseInt($('#bills').val() || 0)  // get total price
  total_cash = parseInt($('#cash').val() || 0)    // get total cash
  const data = [
    { key: "Name", value: $('#name').val() },                           // get name
    { key: "Address", value: $('#address').val() },                     // get address
    { key: "Contact #", value: $('#contact').val() },                   // get contact
    { key: "Total Bill", value: total_price, price: true },             // get total price
    { key: "Payment", value: total_cash, price: true },                 // get total cash
    { key: "Change", value: (total_cash - total_price), price: true },  // get change
  ]

  // add data items to invoice
  data.forEach((item) => {
    $('#invoice').append(`
      <div class="invoice-row text-left">
        <div class="label">${item.key}: </div>
        <div class="value">${item.price ? '<span>' + item.value + '</span>' : item.value}</div>
      </div>
    `)
  })
}

$(document).ready(() => {

  // loop each menu item
  menu.forEach((item, i) => {

    // append item to menu
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

    // append item to order form
    $('#quantitities').append(`
      <div class="form-row">
        <label for="${item.name}">${item.name} Quantity: </label>
        <input type="number" class="form-control" name="${item.name}" id="order-qty-${i}" value="0">
      </div>
    `)

    // add the appended order form id to order array for later use
    order.push('#order-qty-' + i)

    // call onOrderFormChangedHandler function when order form value changes
    $(order[ i ]).on('change', onOrderFormChangedHandler)
  })

  // on #cash value change set total_cash
  $('#cash').on('change', () => total_cash = parseInt($('#cash').val() || 0))

  // on submit button click call submitForm function
  $('#submit-form').on('click', submitForm)

  // on reset button click call resetForm function
  $('#reset-form').on('click', resetForm)
});

