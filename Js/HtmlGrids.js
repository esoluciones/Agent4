
// Se ejecuta en el Open de una pantalla, para ajustar el ancho de los headers
// de todas las grillas con respecto a las columnas del cuerpo.
function AdjustTablesStyle() {
    var grids = document.getElementsByTagName('table');
    if (grids) {
        var id = null;
        for (var i = 0; i < grids.length; i++) {
            try {
                id = grids[i].id;
            } catch (e) {
                id = null;
            }
            if (id) {
                if (id.startsWith('FILTEREDGRID.HEADER')) {
                    AdjustTableStyle('FILTEREDGRID', id.replace('FILTEREDGRID.HEADER.', ''), 0, false, 0, 0, false);
                } else {
                    if (id.startsWith('GRID.HEADER')) {
                        AdjustTableStyle('GRID', id.replace('GRID.HEADER.', ''), 0, false, 0, 0, false);
                    }
                }
            }
        }
    }
}

// Ajusta el ancho de los headers de una grilla con respecto a las columnas del cuerpo.
function AdjustTableStyle(prefix, tableId, bodyRow, adjustW, minW, maxW, fitParent) {
    var tableBody = $get(prefix + '.BODY.' + tableId);
    if (tableBody.rows.length > 0) {
        var tableHeader = $get(prefix + '.HEADER.' + tableId);
        var colWidth = 0;
        var tableWidth = 0;
        var tableBodyCells = tableBody.rows[bodyRow].cells;
        var tableHeaderCells = tableHeader.rows[0].cells;
        var bodyColExtraWidth = getColExtraWith(tableBody);
        var headerColExtraWidth = getColExtraWith(tableHeader);

        tableBody.parentNode.setAttribute('scrollx', 0);

        var extraWidth = 0;
        if (headerColExtraWidth > bodyColExtraWidth) {
            extraWidth = headerColExtraWidth;
        } else {
            extraWidth = bodyColExtraWidth;
        }

        for (var i = 0; i < tableHeaderCells.length; i++) {
            if (tableHeaderCells[i].offsetWidth < tableBodyCells[i].offsetWidth) {
                colWidth = tableBodyCells[i].offsetWidth;
                tableHeaderCells[i].style.width = colWidth + 'px';
                tableBodyCells[i].style.width = colWidth + 'px';
            } else {
                colWidth = tableHeaderCells[i].offsetWidth;
                tableHeaderCells[i].style.width = colWidth + 'px';
                tableBodyCells[i].style.width = colWidth + 'px';
            }
            tableWidth += colWidth + extraWidth;
        }
        if ((tableHeader.parentNode.offsetWidth + 17) <= tableWidth) {
            tableHeader.style.width = tableWidth + 'px';
            tableBody.style.width = tableWidth + 'px';
        }
    }
    AdjustTableDivWidth(prefix, tableId, adjustW, minW, maxW, fitParent)
}

// Ajusta el ancho de la grilla al tamaño de la ventana que la contiene
function AdjustTableDivWidth(prefix, tableId, adjustW, minW, maxW, fitParent) {
    if (adjustW) {
        if (prefix == 'GRID' || prefix == 'FILTEREDGRID') {
            var tableHeader = $get(prefix + '.HEADER.' + tableId);
            var tableHeaderDiv = tableHeader.parentNode;
            var gridDiv = tableHeaderDiv.parentNode;
            var headerW = tableHeader.offsetWidth;
            if (minW > maxW) {
                maxW = minW;
            }
            if (fitParent) {
                headerW = getWidthToFit(gridDiv, (headerW + 17)) - 17;
            }
            if (minW > 0 && minW > headerW) {
                headerW = minW;
            } else {
                if (maxW > 0 && maxW < headerW) {
                    headerW = maxW;
                }
            }
            tableHeaderDiv.style.width = headerW + 'px';
            gridDiv.style.width = (headerW + 17) + 'px';
        } else {
            if (prefix == 'TABLE') {
                var tableElement = $get(tableId);
                var tableDiv = tableElement.parentNode;
                var elementW = tableElement.offsetWidth;
                if (minW > maxW) {
                    maxW = minW;
                }
                if (fitParent) {
                    elementW = getWidthToFit(tableDiv, elementW);
                }
                if (minW > 0 && minW > elementW) {
                    elementW = minW;
                } else {
                    if (maxW > 0 && maxW < elementW) {
                        elementW = maxW;
                    }
                }
                tableDiv.style.width = elementW + 'px';
            }
        }
    }
}

function getWidthToFit(elementDiv, divW) {
    var screenDiv = elementDiv.offsetParent;
    var screenWidth = screenDiv.clientWidth;
    var divL = elementDiv.offsetLeft;
    var divR = divL + divW;
    if (divR > screenWidth) {
        divW = divW - (divR - screenWidth);
    }
    return divW;
}

function AdjustBodyCellsWidth(prefix, tableId, bodyRow) {
    var tableBody = $get(prefix + '.BODY.' + tableId);
    if (tableBody.rows.length > 0) {
        var tableHeader = $get(prefix + '.HEADER.' + tableId);
        var tableBodyCells = tableBody.rows[bodyRow].cells;
        var tableHeaderCells = tableHeader.rows[0].cells;
        tableBody.parentNode.setAttribute('scrollx', 0);
        for (var i = 0; i < tableHeaderCells.length; i++) {
            tableBodyCells[i].style.width = tableHeaderCells[i].offsetWidth + 'px';
        }
        tableBody.style.width = tableHeader.style.width;
    }
}

function getColExtraWith(table) {
    var colExtraWidth = 0;
    var colStyle = null;
    var cell = table.rows[0].cells[0];
    if (window.getComputedStyle) {
        colStyle = window.getComputedStyle(cell, '');
    } else {
        if (cell.currentStyle) {
            colStyle = cell.currentStyle;
        }
    }
    var colWidth = parseInt(colStyle.paddingLeft, 10) + parseInt(colStyle.paddingRight, 10);
    if (!isNaN(colWidth)) colExtraWidth += colWidth;
    colWidth = parseInt(colStyle.marginLeft, 10) + parseInt(colStyle.marginRight, 10);
    if (!isNaN(colWidth)) colExtraWidth += colWidth;
    colWidth = parseInt(colStyle.borderLeftWidth, 10) + parseInt(colStyle.borderRightWidth, 10);
    if (!isNaN(colWidth)) colExtraWidth += colWidth;
    return colExtraWidth
}

function divscroll(prefix, tableId) {
    var bodyDiv = $get(prefix +'.BODY.' + tableId).parentNode;
    var scrollx = bodyDiv.getAttribute('scrollx');
    if (scrollx != bodyDiv.scrollLeft) {
        bodyDiv.setAttribute('scrollx', bodyDiv.scrollLeft);
        var headerDiv = $get(prefix + '.HEADER.' + tableId).parentNode;
        headerDiv.style.left = '-' + bodyDiv.scrollLeft + 'px';
        headerDiv.style.width = (headerDiv.parentNode.offsetWidth + bodyDiv.scrollLeft - 17) + 'px';
    }
}

function applyfilter(prefix, tableId) {
    var tableBody = $get(prefix + '.BODY.' + tableId);
    var tableHeader = $get(prefix + '.HEADER.' + tableId);
    var tableBodyRows = tableBody.rows;
    var tableBodyRowsCount = (tableBodyRows.length - 1);
    var tableFilterCells = tableHeader.rows[1].cells;
    var filterSource = null;
    var filterValue = null;
    var mustHide = false;
    for (var i = 0; i < tableBodyRowsCount; i++) {
        for (var j = 0; j < tableFilterCells.length; j++) {
            filterValue = tableFilterCells[j].firstChild.value;
            if ((filterValue != undefined) && (filterValue != '')) {
                if (Sys.Browser.agent == Sys.Browser.Firefox) {
                    filterSource = tableBodyRows[i].cells[j].innerHTML;
                } else {
                    filterSource = tableBodyRows[i].cells[j].innerText;
                }
                if (filterSource != filterValue) {
                    mustHide = true;
                    break;
                }
            }
        }
        if (mustHide) {
            hideRowElement(tableBodyRows[i]);
        } else {
            showRowElement(tableBodyRows[i]);
        }
        mustHide = false;
    }
    AdjustBodyCellsWidth(prefix, tableId, tableBodyRowsCount);
}

function showRowElement(element) {
    if (element) {
        if (element.getAttribute("style")) {
            element.style.display = 'table-row';
        } else {
            element.setAttribute("style", 'display: table-row;');
        }
    }
}

function hideRowElement(element) {
    if (element) {
        if (element.getAttribute("style")) {
            element.style.display = 'none';
        } else {
            element.setAttribute("style", 'display: none;');
        }
    }
}

// addRowHandlers('FILTEREDGRID.BODY.SP_GRILLA_FILTRADA:ctl_93');
//
//function addRowHandlers(tableBodyId) {
//    var table = document.getElementById(tableBodyId);
//    var rows = table.getElementsByTagName("tr");
//    for (var i = 0; i < rows.length; i++) {
//        var currentRow = table.rows[i];
//        var createClickHandler = function (row) {
//            return function () {
//                alert("value:" + row.getElementsByTagName("td")[1].innerHTML);
//            }
//        }
//        currentRow.onclick = createClickHandler(currentRow);
//    }
//} 