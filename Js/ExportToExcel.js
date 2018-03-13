
function ExportToExcel(gridIndex) {
    var allGridsIds = null;
    var gridsCount = 0;
    if (!allGridsIds) {
        allGridsIds = [];
        var allDivTags = document.getElementsByTagName("DIV");
        if (allDivTags) {
            for (var i = 0; i < allDivTags.length; i++) {
                if (allDivTags[i].getAttribute("name") == 'sqlTableDiv') {
                    var id = "EngageGrid_" + gridsCount;
                    allGridsIds.push(id);
                    allDivTags[i].id = id;
                    gridsCount++;
                }
            }
        }
    }
    if (allGridsIds.length > 0) {
        if ((gridIndex >= 0) && (gridIndex < gridsCount)) {
            $get('iframeSaveDocument').contentWindow.location.href = './../Aspx/ExportToExcel.aspx?GridId=' + allGridsIds[gridIndex];
        }
    }
}
