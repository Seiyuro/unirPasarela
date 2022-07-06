$(document).ready(function () {
  const cart = {
    hamburger: { price: 8, amount: 0 },
    pizza: { price: 5.5, amount: 0 },
    hotdog: { price: 4.5, amount: 0 },
    cookie: { price: 1.5, amount: 0 },
    iceCream: { price: 2.5, amount: 0 },
  };

  const cartEU = {
    hamburger: { price: 4, amount: 0 },
    pizza: { price: 2.5, amount: 0 },
    hotdog: { price: 1.0, amount: 0 },
    cookie: { price: 0.5, amount: 0 },
    iceCream: { price: 1.0, amount: 0 },
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formatterEuro = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  $(".js-currency").click(function (evt) {
    if (evt.currentTarget.value === "euros") {
      $(".js-hamburguesaPrecio").html("4.00€");
      $(".js-pizzaPrecio").html("2.50€");
      $(".js-hotdogPrecio").html("1.00€");
      $(".js-cookiePrecio").html("0.50€");
      $(".js-iceCreamPrecio").html("1.00€");
      cart.hamburger.amount = 0;
      cart.pizza.amount = 0;
      cart.hotdog.amount = 0;
      cart.cookie.amount = 0;
      cart.iceCream.amount = 0;
    } else {
      cartEU.hamburger.amount = 0;
      cartEU.pizza.amount = 0;
      cartEU.hotdog.amount = 0;
      cartEU.cookie.amount = 0;
      cartEU.iceCream.amount = 0;

      $(".js-hamburguesaPrecio").html("$8.00");
      $(".js-pizzaPrecio").html("$5.50");
      $(".js-hotdogPrecio").html("$4.50");
      $(".js-cookiePrecio").html("$1.50");
      $(".js-iceCreamPrecio").html("$2.50");
    }

    $(".js-total").html("");
    $(".js-paymentRedirect").html("");
    $(".js-cart").html("Agrega Productos!");
  });

  $(".js-add").click(function (evt) {
    const splitName = evt.currentTarget.id.split("-")[0];
    cart[splitName].amount = cart[splitName].amount + 1;
    let total = 0;
    const selectCart = $(".js-currency").val() === "pesos";

    const dataCart = Object.entries(selectCart ? cart : cartEU).map(
      ([key, data]) => {
        if (data.amount > 0) {
          total = total + data.amount * data.price;
          return "<span>" + key + " Amount.........." + data.amount + "</span>";
        }
      }
    );

    $(".js-cart").html(dataCart);
    $(".js-total").html(function () {
      const selectedCurrency =
        $("input[name='currency']:checked").val() === "pesos";
      return selectedCurrency
        ? "<span>Total: " + formatter.format(total) + " </span>"
        : "<span> Total:" + formatterEuro.format(total) + " </span>";
    });
    $(".js-paymentRedirect").html(function () {
      const selectedCurrency =
        $("input[name='currency']:checked").val() === "pesos";
      const totalRedirect = selectedCurrency ? total / 20 : total;
      const currency = selectedCurrency ? "pesos" : "euros";
      return (
        "<h2>Pagar Ahora    <i class='fas fa-credit-card'></i></h2><a href=payment.php?importe=" +
        totalRedirect +
        "&currency=" +
        currency +
        ">Pagar</a>"
      );
    });
  });

  $(".js-remove").click(function (evt) {
    const selectCart = $(".js-currency").val() === "pesos";

    const splitName = evt.currentTarget.id.split("-")[0];
    cart[splitName].amount =
      cart[splitName].amount - 1 > 0 ? cart[splitName].amount - 1 : 0;
    let total = 0;
    const dataCart = Object.entries(selectCart ? cart : cartEU).map(
      ([key, data]) => {
        if (data.amount > 0) {
          total = total + data.amount * data.price;
          return "<span>" + key + " Amount.........." + data.amount + "</span>";
        }
      }
    );

    $(".js-cart").html(dataCart);

    if (total > 0) {
      $(".js-total").html(function () {
        const selectedCurrency =
          $("input[name='currency']:checked").val() === "pesos";
        return selectedCurrency
          ? "<span>Total: " + formatter.format(total) + " </span>"
          : "<span> Total:" + formatterEuro.format(total) + " </span>";
      });
      $(".js-paymentRedirect").html(function () {
        const selectedCurrency =
          $("input[name='currency']:checked").val() === "pesos";
        const totalRedirect = selectedCurrency ? total / 20 : total;
        const currency = selectedCurrency ? "pesos" : "euros";

        return (
          "<h2>Pagar Ahora    <i class='fas fa-credit-card'></i</h2><a href=payment.php?importe=" +
          totalRedirect +
          "&currency=" +
          currency +
          ">Pagar</a>"
        );
      });
    } else {
      $(".js-total").html("");
      $(".js-paymentRedirect").html("");
    }
  });
});
