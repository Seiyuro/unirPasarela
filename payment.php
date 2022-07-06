<?php
$claveEncrip = "87401456";
$merchantid = "082108630";
$acquireBIN = "0000554002";
$terminalid = "00000003";
$numoper = rand(900, 10000);

$tipoMoneda = "978";
$exponente = "2";
$Cifrado = "SHA2";
$urlok_notok = "https://unirpasarela.julianserrano.net/gracias.htmlhttps://unirpasarela.julianserrano.net/";
$Exencion_SCA = "";
$importe = $_GET['importe'];
$currency = $_GET['currency'];
$parsedImporte = $currency === "pesos" ? ceil($importe * 100) : $importe * 100;
$importeConversion = $currency === "pesos" ? $importe * 20 : $importe;
$cadena = $claveEncrip . $merchantid . $acquireBIN . $terminalid . $numoper . $parsedImporte . $tipoMoneda . $exponente . $Cifrado . $urlok_notok . $Exencion_SCA;
$firma = hash('sha256', $cadena);
?>
<style>
    body {
        background-color: white;
        font-family: Helvetica, sans-serif;
        color: #289944;
    }

    .font {
        color: #289944;
        font-size: 1.5rem
    }

    .paymentContainer {
        font-size: 1.5rem;
        padding: 0.5em;
        background-color: floralwhite;
        color: #289944;
        border: 1px solid #289944;
        border-radius: 5px;
        margin: 1em
    }

    .center {
        display: flex;
        justify-content: center;
    }

    .centerTotal {
        display: flex;
        justify-content: center;
        width: 100%;
        flex-direction: column;
        align-items: center;
    }

    .header {
        border: 1px solid #289944;
        padding: 1em;
        border-radius: 5px;
        color: #289944;
        background-color: floralwhite;
    }
</style>
<HTML>

<head>
    <link href="fonts/css/all.css" rel="stylesheet">
    <title>P&aacute;gina de pago</title>
</head>

<header>
    <div class="center">
        <h1 class="header"><i class="fas fa-utensils"></i> Julian Serrano Restaurant <i class="fas fa-utensils"></i></h1>
    </div>
</header>

<BODY>


    <form action="https://tpv.ceca.es/tpvweb/tpv/compra.action" method="POST" ENCTYPE="application/x-www-form-urlencoded">
        <input NAME="MerchantID" TYPE=hidden VALUE="082108630">
        <input NAME="AcquirerBIN" TYPE=hidden VALUE="0000554002">
        <input NAME="TerminalID" TYPE=hidden VALUE="00000003">
        <input NAME="URL_OK" TYPE=hidden VALUE="https://unirpasarela.julianserrano.net/gracias.html">
        <input NAME="URL_NOK" TYPE=hidden VALUE="https://unirpasarela.julianserrano.net/">
        <input NAME="Firma" TYPE=hidden VALUE="<? echo $firma;?>">
        <input NAME="Cifrado" TYPE=hidden VALUE="SHA2">
        <input NAME="Num_operacion" TYPE=hidden VALUE="<? echo $numoper; ?>">
        <input NAME="Importe" TYPE=hidden VALUE="<? echo $parsedImporte ;?>">
        <input NAME="TipoMoneda" TYPE=hidden VALUE="978">
        <input NAME="Exponente" TYPE=hidden VALUE="2">
        <input NAME="Pago_soportado" TYPE=hidden VALUE="SSL">
        <input NAME="Idioma" TYPE=hidden VALUE="1">

        <div class="centerTotal">
            <label class="font"> Tu total a pagar es de: $
                <? echo $importeConversion;?></label>
            <input type="submit" value="Pagar Ahora " class="paymentContainer">
        </div>
    </form>
</BODY>

</HTML>