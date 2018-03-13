
var dynamicHeigth = null;
var dynamicWidth = null;

window.onload = function () { OnLoad(); getGraph(); }

function getGraph() {
    var chart = new TelerikCharts();
    chart.buildChart({ DivId: 'prueba1', ChartType: 'Bar', Path: './../Asp/Charts.aspx', Caption: '', Input: '' });

    var chart2 = new TelerikCharts();
    chart2.buildChart({ DivId: 'prueba2', ChartType: 'Pie', Path: './../Asp/Charts.aspx', Caption: '', Input: '' });
}

function TelerikCharts() {
    this.buildChart = function (opt) {
        var opt = opt || {};
        var vDivId = opt.DivId || "prueba1";
        var vCharType = opt.ChartType || 1;
        var vCaption = opt.Caption || "";
        var vInput = escape(opt.Input || window.document.getElementById("todojobkey").value);
        var vPath = opt.Path || "./../Asp/Charts.aspx";

        getGridStyle(vDivId);

        var param = "caption=" + vCaption + "&type=" + vCharType + "&pkeyjob=" + vInput + "&width=" + dynamicWidth + "&height=" + dynamicHeigth + "&idChart=" + vDivId;

        var request = new Sys.Net.WebRequest();
        request.set_url(vPath);
        request.set_httpVerb('POST');
        request.set_body(param);
        request.get_headers()['Content-Length'] = param.length;
        request.add_completed(function OnGetServerDataCompleted(executor, eventArgs) {
            if (executor.get_responseAvailable()) {
                var lsResponse = executor.get_responseData();
                if (lsResponse != null) {
                    var join = window.document.getElementById(vDivId);
                    join.innerHTML = lsResponse;
                }
            }
        });
        request.invoke();
    }

    function getGridStyle(vDivId) {
        if (vDivId != null) {
            var Divtabla = window.document.getElementById(vDivId);
            if (Divtabla) {
                dynamicHeigth = Divtabla.offsetParent.style.height;
                dynamicWidth = Divtabla.offsetParent.style.width;
            } else {
                dynamicHeigth = "100px";
                dynamicWidth = "100px";
            }
        }
    }
}

function getUrl(url) {
    window.open(url);
}