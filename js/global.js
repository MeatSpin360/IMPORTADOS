(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/


    try {
        $('#input-start').daterangepicker({
            ranges: true,
            autoApply: true,
            applyButtonClasses: false,
            autoUpdateInput: false
        }, function (start, end) {
            $('#input-start').val(start.format('MM/DD/YYYY'));
            $('#input-end').val(end.format('MM/DD/YYYY'));
        });

        $('#input-start-2').daterangepicker({
            ranges: true,
            autoApply: true,
            applyButtonClasses: false,
            autoUpdateInput: false
        }, function (start, end) {
            $('#input-start-2').val(start.format('MM/DD/YYYY'));
            $('#input-end-2').val(end.format('MM/DD/YYYY'));
        });

    } catch (er) { console.log(er); }
    /*==================================================================
        [ Single Datepicker ]*/


    try {
        var singleDate = $('.js-single-datepicker');

        singleDate.each(function () {
            var that = $(this);
            var dropdownParent = '#dropdown-datepicker' + that.data('drop');

            that.daterangepicker({
                "singleDatePicker": true,
                "showDropdowns": true,
                "autoUpdateInput": true,
                "parentEl": dropdownParent,
                "opens": 'left',
                "locale": {
                    "format": 'MM/DD/YYYY'
                }
            });
        });

    } catch (er) { console.log(er); }
    /*==================================================================
        [ Special Select ]*/

    try {
        var body = $('body,html');

        var selectSpecial = $('#js-select-special');
        var info = selectSpecial.find('#info');
        var dropdownSelect = selectSpecial.parent().find('.dropdown-select');
        var listRoom = dropdownSelect.find('.list-room');
        var btnAddRoom = $('#btn-add-room');
        var totalRoom = 1;

        selectSpecial.on('click', function (e) {
            e.stopPropagation();
            $(this).toggleClass("open");
            dropdownSelect.toggleClass("show");
        });

        dropdownSelect.on('click', function (e) {
            e.stopPropagation();
        });

        body.on('click', function () {
            selectSpecial.removeClass("open");
            dropdownSelect.removeClass("show");
        });


        listRoom.on('click', '.plus', function () {
            var that = $(this);
            var qtyContainer = that.parent();
            var qtyInput = qtyContainer.find('input[type=number]');
            var oldValue = parseInt(qtyInput.val());
            var newVal = oldValue + 1;
            qtyInput.val(newVal);

            updateRoom();
        });

        listRoom.on('click', '.minus', function () {
            var that = $(this);
            var qtyContainer = that.parent();
            var qtyInput = qtyContainer.find('input[type=number]');
            var min = qtyInput.attr('min');

            var oldValue = parseInt(qtyInput.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            qtyInput.val(newVal);

            updateRoom();
        });



        listRoom.on('change', '.inputQty', function () {
            var that = $(this);
            if (isNumber(that.val())) {
                var qtyVal = parseInt(that.val());
                if (that.val().length === 0) {
                    qtyVal = 0;
                }

                if (qtyVal < 0) {
                    qtyVal = 0;
                }
                that.val(qtyVal);

                updateRoom();
            }
        });

        function isNumber(n) {
            return typeof (n) != "boolean" && !isNaN(n);
        }

        btnAddRoom.on('click', function (e) {
            e.preventDefault();

            totalRoom++;

            listRoom.append('<li class="list-room__item">' +
                '                                        <span class="list-room__name"> Room ' + totalRoom + '</span>' +
                '                                        <ul class="list-person">' +
                '                                            <li class="list-person__item">' +
                '                                                <span class="name">' +
                '                                                    Adults' +
                '                                                </span>' +
                '                                                <div class="quantity quantity1">' +
                '                                                    <span class="minus">' +
                '                                                        -' +
                '                                                    </span>' +
                '                                                    <input type="number" min="0" value="0" class="inputQty">' +
                '                                                    <span class="plus">' +
                '                                                        +' +
                '                                                    </span>' +
                '                                                </div>' +
                '                                            </li>' +
                '                                            <li class="list-person__item">' +
                '                                                <span class="name">' +
                '                                                    Children' +
                '                                                </span>' +
                '                                                <div class="quantity quantity2">' +
                '                                                    <span class="minus">' +
                '                                                        -' +
                '                                                    </span>' +
                '                                                    <input type="number" min="0" value="0" class="inputQty">' +
                '                                                    <span class="plus">' +
                '                                                        +' +
                '                                                    </span>' +
                '                                                </div>' +
                '                                            </li>' +
                '                                        </ul>');


            updateRoom();
        });


        function countAdult() {
            var listRoomItem = listRoom.find('.list-room__item');
            var totalAdults = 0;

            listRoomItem.each(function () {
                var that = $(this);
                var numberAdults = parseInt(that.find('.quantity1 > input').val());

                totalAdults = totalAdults + numberAdults;

            });

            return totalAdults;
        }

        function countChildren() {
            var listRoomItem = listRoom.find('.list-room__item');
            var totalChildren = 0;

            listRoomItem.each(function () {
                var that = $(this);
                var numberChildren = parseInt(that.find('.quantity2 > input').val());

                totalChildren = totalChildren + numberChildren;
            });

            return totalChildren;
        }

        function updateRoom() {
            var totalAd = parseInt(countAdult());
            var totalChi = parseInt(countChildren());
            var adults = 'Adult, ';
            var rooms = 'Room';

            if (totalAd > 1) {
                adults = 'Adults, ';
            }

            if (totalRoom > 1) {
                rooms = 'Rooms';
            }

            var infoText = totalAd + ' ' + adults + totalChi + ' ' + 'Children, ' + totalRoom + ' ' + rooms;

            info.val(infoText);
        }

    } catch (e) {
        console.log(e);
    }
    /*[ Select 2 Config ]
        ===========================================================*/

    try {
        var selectSimple = $('.js-select-simple');

        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });

    } catch (err) {
        console.log(err);
    }


})(jQuery);


/*  Mostrar menu de busqueda avanzada ]
    ==============================================================*/

function showContent() {
    element = document.querySelector("#MenuBusquedaOculto");
    check = document.querySelector("#checkbusquedaavanzada");
    if (check.checked) {
        element.style.display = 'block';
    }
    else {
        element.style.display = 'none';
    }
}

/*  Agregar o quitar filas en planilla de Muestreo*/

function agregarFilaMuestreo(event) {
    if (event) event.preventDefault();
    const tabla = document.querySelector("#TablaPlanillaMuestreo tbody");
    const nuevaFila = tabla.insertRow();

    for (let i = 0; i < 5; i++) {
        const celda = nuevaFila.insertCell();
        let input = document.createElement('input');
        input.type = 'text';
        celda.appendChild(input);
    }
}

function eliminarFilaMuestreo(event) {
    if (event) event.preventDefault();
    const tableBody = document.querySelector("#TablaPlanillaMuestreo tbody");
    const filas = tableBody.children.length;

    if (filas === 0) {
        alert("No hay filas para eliminar.");
        return;
    }

    if (confirm("¿Estás seguro de que querés eliminar la última fila?")) {
        tableBody.removeChild(tableBody.lastElementChild);
    }
}

/*  Agregar o quitar filas en planilla de Pendientes*/

function agregarFilaPendientes() {
    event.preventDefault();
    const tabla = document.querySelector('#TablaPlanillaPendientes tbody');
    const nuevaFila = tabla.insertRow();

    for (let i = 0; i < 5; i++) {
        const celda = nuevaFila.insertCell();
        let input = document.createElement('input');
        input.type = 'text';
        celda.appendChild(input);
    }
}

function eliminarFilaPendientes(event) {
    if (event) event.preventDefault();
    const tableBody = document.querySelector("#TablaPlanillaPendientes tbody");
    const filas = tableBody.children.length;

    if (filas === 0) {
        alert("No hay filas para eliminar.");
        return;
    }

    if (confirm("¿Estás seguro de que querés eliminar la última fila?")) {
        tableBody.removeChild(tableBody.lastElementChild);
    }
}


// 📌 Manejar pegado múltiple desde Google Sheets

document.addEventListener('paste', function (e) {
    const activeElement = document.activeElement;

    if (activeElement.tagName.toLowerCase() === 'input') {
        e.preventDefault();

        const text = (e.clipboardData || window.clipboardData).getData('text');
        const rows = text.split(/\r?\n/).filter(r => r.trim() !== '');
        const data = rows.map(r => r.split('\t'));

        const currentCell = activeElement.closest('td');
        const currentRow = currentCell.closest('tr');
        const tableBody = currentRow.parentNode;
        const startRowIndex = Array.from(tableBody.children).indexOf(currentRow);
        const startColIndex = Array.from(currentRow.children).indexOf(currentCell);

        const totalNeededRows = startRowIndex + data.length;
        while (tableBody.children.length < totalNeededRows) {
            agregarFilaMuestreo();
        }

        data.forEach((rowData, rowIndex) => {
            const targetRow = tableBody.children[startRowIndex + rowIndex];
            rowData.forEach((cellData, colIndex) => {
                const targetCell = targetRow.children[startColIndex + colIndex];
                if (!targetCell) return;
                const input = targetCell.querySelector('input');
                if (input) input.value = cellData;
            });
        });
    };
});

// BORRAR DATOS DE PLANILLA

function borrarDatos(event) {
    if (event) event.preventDefault();
    if (confirm("¿Seguro de que querés borrar todos los datos de la planilla? Los cambios no se guardaran hasta que no se confirmen en el boton GUARDAR")) {
        const inputs = document.querySelectorAll('#TablaPlanillaMuestreo input');
        inputs.forEach(input => input.value = '');
    };
};


// IMPRIMIR PLANILLA DE MUESTREO

function ImprimirPlanillaMuestreo(event) {
    if (event) event.preventDefault();

    let planillaOriginal = document.getElementById("PlanillaMuestreo");
    let clonPlanilla = planillaOriginal.cloneNode(true);

    // Reemplazar inputs por sus valores
    let inputs = clonPlanilla.querySelectorAll('input');
    inputs.forEach(input => {
        let texto = document.createTextNode(input.value);
        input.parentNode.replaceChild(texto, input);
    });

    // Crear ventana de impresión
    let ventana = window.open('', '_blank', 'width=800,height=600');

    ventana.document.write(`
        <html>
        <head>
            <title>Planilla de Muestreo</title>
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    background: white;
                    padding: 20px;
                    color: #333;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    background: white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                th, td {
                    border: 1px solid #999;
                    padding: 10px;
                    text-align: left;
                    vertical-align: top;
                }

                th {
                    background-color: #e8f0fe;
                }

                h2 {
                    margin-bottom: 20px;
                }

                /* Estilos específicos para impresión */
                @media print {
                    body {
                        background: white;
                        padding: 0;
                        color: #000;
                    }

                    h2, .btn {
                        display: none !important;
                    }

                    table {
                        box-shadow: none;
                    }

                    th, td {
                        border: 1px solid #999;
                        background: transparent;
                    }
                }
            </style>
        </head>
        <body>
            ${clonPlanilla.innerHTML}
            <script>
                window.onload = function() {
                    window.print();
                    window.close();
                }
            <\/script>
        </body>
        </html>
    `);

    ventana.document.close();
}


function ImprimirPlanillaPendientes() {
    event.preventDefault(); // Evita enviar el formulario

    let contenido = document.getElementById("planillaPendientes").innerHTML;

    let ventana = window.open('', '_blank', 'width=800,height=600');

    ventana.document.write(`
        <html>
        <head>
            <title>Planilla de Muestreo</title>
            <link rel="stylesheet" href="css/main.css"> 
            <style>
                button { display: none; } /* Opcional: oculta los botones para impresión */
            </style>
        </head>
        <body>
            ${contenido}
            <script>
                window.onload = function() {
                    window.print();
                    window.close();
                }
            <\/script>
        </body>
        </html>
    `);

    ventana.document.close();
}