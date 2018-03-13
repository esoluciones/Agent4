
function LoadGraph(divId, data, metadata) {
    LoadPieGraph(divId, data, metadata);
}

function LoadPieGraph(divId, data, metadata) {
    (function basic_pie(container) {
        for (var i = 0; i < data.length; i++) {
            data[i].data = [[0, parseInt(data[i].data)]];
        }
        var options = null;
        if (metadata) {
            options = metadata;
        } else {
            options = {
                HtmlText: false,
                grid: {
                    verticalLines: false,
                    horizontalLines: false,
                    outlineWidth: 0
                },
                xaxis: { showLabels: false },
                yaxis: { showLabels: false },
                pie: {
                    show: true,
                    explode: 6,
                    labelFormatter: function (pie, slice) {
                        return slice;
                    }
                },
                mouse: { track: true, trackFormatter: function (e) { return e.y } },
                legend: {
                    position: 'se',
                    backgroundColor: '#D2E8FF'
                }
            };
        }
        Flotr.draw(container, data, options);
    })(document.getElementById(divId));
}

function LoadBarGraph(divId, data, metadata) {
    (function basic_bars(container, horizontal) {
        for (var i = 0; i < data.length; i++) {
            data[i].data = [[parseFloat(data[i].data[0]), parseFloat(data[i].data[1])]];
        }
        var options = null;
        if (metadata) {
            options = metadata;
        } else {
            options = {
                /* grid: {
                outlineWidth: 0
                }, */
                xaxis: { min: null, tickDecimals: 0 },
                yaxis: { min: 0, autoscaleMargin: 1 },
                bars: {
                    show: true,
                    horizontal: false,
                    shadowSize: 0,
                    barWidth: 0.5
                },
                mouse: { track: true, relative: true }
            };
        }
        Flotr.draw(container, data, options);
    })(document.getElementById(divId));
}

function LoadLineGraph(divId, data, metadata) {
    (function basic_lines(container, horizontal) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].data.length; j++) {
                data[i].data[j][0] = parseFloat(data[i].data[j][0]);
                data[i].data[j][1] = parseFloat(data[i].data[j][1]);
            }
        }
        var options = null;
        if (metadata) {
            options = metadata;
        } else {
            options = {
                series: {
                    lines: { show: true },
                    points: { radius: 3, fill: true, show: true }
                },
                xaxis: { tickLength: 0, axisLabelUseCanvas: true },
                yaxes: [{ axisLabelUseCanvas: true }, { axisLabelUseCanvas: true}],
                legend: { noColumns: 0, position: "nw" },
                grid: { hoverable: true, borderWidth: 2 },
                mouse: { track: true, relative: true }
            };
        }
        Flotr.draw(container, data, options);
    })(document.getElementById(divId));
}
