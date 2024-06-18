import { useEffect } from "react";


function MonoCanvas(props: {
    grid: Array<Array<Array<number>>>,
    width: number,
    height: number,
    name: String,
    iteration: number
}) {

    var { grid, height, width, name, iteration } = props;
    var canvasId = name + "canvas";
    var pixelMax = 256;
    var canvasElement: HTMLCanvasElement;
    var canvasContext: CanvasRenderingContext2D;

    useEffect(() => {
        initializeElements();
        draw();
    }, [iteration])

    function initializeElements() {
        console.log("Initialize Variable " + name + " --- start");
        canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
        canvasContext = canvasElement.getContext('2d');

        console.log("Initialize Variable " + name + " --- end");
    }

    function clearCanvas() {
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(0, 0, width, height);
    }
    function draw() {

        clearCanvas();

        var cellWidth = 1;
        var cellHeight = 1;

        var fillStyleText = "";
        try {

            for (var y = 0; y <= height - 1; y++) {
                for (var x = 0; x <= width - 1; x++) {
                    fillStyleText = 'rgba(' + String(grid[y][x][0] % pixelMax) + ', 0, 0, 1)';
                    canvasContext.fillStyle = fillStyleText;
                    canvasContext.fillRect(x, y, cellWidth, cellHeight);
                }
            }

        } catch (exception) {
            console.log(exception)
        }

    }


    return (
        <div>
            <p>{canvasId} - iteration: {iteration}</p>
            <canvas width={width} height={height} id={canvasId} className="simulationCanvas"  ></canvas>
        </div>);
}


export default MonoCanvas;