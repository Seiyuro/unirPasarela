<html>
<style>
    body {
        background-color: white;
        font-family: Helvetica, sans-serif;
        color: #289944;
    }

    .fa-ice-cream,
    .fa-hamburger,
    .fa-pizza-slice,
    .fa-hotdog,
    .fa-cookie {
        font-size: 3.5rem;
    }

    .center {
        display: flex;
        justify-content: center;
    }

    .left {
        display: flex;
        justify-content: right;
    }

    .fa-plus-square,
    .fa-minus-square {
        font-size: 2rem;
        cursor: pointer
    }

    .header {
        border: 1px solid #289944;
        padding: 1em;
        border-radius: 5px;
        color: #289944;
        background-color: floralwhite;
    }

    .mainContainer {
        display: flex;
        width: 100%;
    }

    .menuContainer,
    .cartContainer {
        width: 50%;
        border: 1px solid #289944;
        background-color: floralwhite;
        padding: 1em;
        margin: 1em 5em;
        position: relative;
        border-radius: 5px;
    }

    .menuContainer:after,
    .cartContainer:after {
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 50px 50px 0;
        border-color: transparent #608A32 transparent transparent;
        right: 0;
        top: 0;
        position: absolute;
    }

    .menuContainer:before,
    .cartContainer:before {
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 50px 50px 50px 0px;
        border-color: #608A32 transparent transparent #608A32;
        left: 0;
        top: 0;
        position: absolute;
    }

    .headerFont {
        display: flex;
        width: 100%;
        justify-content: center;
        font-size: 2.2rem;
    }

    .headerMenu,
    .menuItems,
    .headerCart {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .addButton,
    .removeButton {
        display: flex;
        padding: 1em;
    }

    .iconsItems,
    .pricesItems {
        width: 50%;
        display: flex;
        justify-content: start;
    }

    .pricesItems {
        justify-content: center;
    }

    .containerIcons {
        display: flex;
        width: 100%;
    }

    .prices {
        font-size: 4rem;
    }

    .containerCart {
        display: flex;
        width: 100%;
        flex-direction: column;
        font-size: 1.5rem;
    }

    .cart,
    .total {
        font-size: 2em;
        padding: 1em;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-transform: capitalize;

    }

    .total {
        padding: 8px;
        width: 100%;
        align-items: center;
        font-size: 3em;
    }

    .cart>span {
        padding: .5em 1em .25em 1em;
        font-size: 2rem;
    }

    .paymentContainer {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }

    .paymentContainer a {
        font-size: 2.5rem;
        text-decoration: none;
        border: 1px solid #289944;
        padding: 0.5em;
        border-radius: 5px;
        color: #289944;
        background-color: floralwhite;
    }

    .triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 30px 30px 0;
        border-color: transparent #608A32 transparent transparent;
        right: 0;
        top: 0;
        position: absolute;
    }
</style>

<head>
    <link href="fonts/css/all.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="js/cart.js"></script>
</head>
<header>
    <div class="center">
        <h1 class="header"><i class="fas fa-utensils"></i> Julian Serrano Restaurant <i class="fas fa-utensils"></i></h1>
    </div>
    <div class="left"><label>Precios en:</label>
        <input type="radio" checked=true name="currency" class="js-currency" value="pesos">MXN
        <input type="radio" name="currency" value="euros" class="js-currency">EUR</div>
</header>

<body>
    <div class="mainContainer ">
        <div class="menuContainer">
            <div class="headerMenu">
                <h2 class="headerFont">Menu</h2>
            </div>
            <div class="containerIcons">
                <div class="iconsItems">
                    <div class="menuItems">
                        <span class="addButton js-add" id="hamburger-add"><i class="far fa-plus-square"></i></span>
                        <i class="fas fa-hamburger"></i>
                        <span class="removeButton"><i class="far fa-minus-square js-remove" id="hamburger-remove"></i></span>
                    </div>
                </div>
                <div class="pricesItems">
                    <span class="prices js-hamburguesaPrecio">$8.00<span>
                </div>
            </div>
            <div class="containerIcons">
                <div class="iconsItems">
                    <div class="menuItems">
                        <span class="addButton js-add" id="pizza"><i class="far fa-plus-square"></i></span>
                        <i class="fas fa-pizza-slice"></i>
                        <span class="removeButton"><i class="far fa-minus-square js-remove" id="pizza-remove"></i></span>
                    </div>
                </div>
                <div class="pricesItems">
                    <span class="prices js-pizzaPrecio">$5.50<span>
                </div>
            </div>
            <div class="containerIcons">
                <div class="iconsItems">
                    <div class="menuItems">
                        <span class="addButton js-add" id="hotdog"><i class="far fa-plus-square"></i></span>
                        <i class="fas fa-hotdog"></i>
                        <span class="removeButton"><i class="far fa-minus-square js-remove" id="hotdog-remove"></i></span>
                    </div>
                </div>
                <div class="pricesItems">
                    <span class="prices js-hotDogPrecio">$4.50<span>
                </div>
            </div>
            <div class="containerIcons">
                <div class="iconsItems">
                    <div class="menuItems">
                        <span class="addButton js-add" id="cookie"><i class="far fa-plus-square"></i></span>
                        <i class="fas fa-cookie"></i>
                        <span class="removeButton"><i class="far fa-minus-square js-remove" id="cookie-remove"></i></span>
                    </div>
                </div>
                <div class="pricesItems">
                    <span class="prices js-cookiePrecio">$1.50<span>
                </div>
            </div>
            <div class="containerIcons">
                <div class="iconsItems">
                    <div class="menuItems">
                        <span class="addButton js-add" id="iceCream"><i class="far fa-plus-square"></i></span>
                        <i class="fas fa-ice-cream"></i>
                        <span class="removeButton"><i class="far fa-minus-square js-remove" id="iceCream-remove"></i></span>
                    </div>
                </div>
                <div class="pricesItems">
                    <span class="prices js-iceCreamPrecio">$2.50<span>
                </div>
            </div>
        </div>
        <div class="cartContainer">
            <div class="containerCart">
                <div class="headerCart">
                    <h2>Mi Carrito</h2>
                </div>
                <div class="js-cart cart"> Agrega Productos!
                </div>
            </div>

        </div>
    </div>
    <div class="js-total total"></div>
    <div class="paymentContainer js-paymentRedirect">

    </div>

</body>

</html>