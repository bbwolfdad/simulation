'use client'
import { useEffect, useState } from "react";
import MonoCanvas from "./MonoCanvas";


function Simulation() {

    console.log("Simulation --- start");
    var intervalLength = 250;
    var width = 50;
    var height = 50;
    var bottomLine = Math.floor(height/3);
    var pixelMax = 256;
    // var iteration = 1;
    var canvasElement: HTMLCanvasElement;
    var canvasContext: CanvasRenderingContext2D;
    var grid: Array<Array<Array<number>>> = Array(height);

    /**
     * Picks a value between 0 and 256(max value a pixel color can be)
     * @returns 
     */
    function randomPixel(): number {
        return Math.floor(Math.random() * (pixelMax));
    }
    function initializeElements() {
        console.log("Initialize Variable Simulation --- start");
        canvasElement = document.getElementById("simulationCanvas") as HTMLCanvasElement;
        canvasContext = canvasElement.getContext('2d');
        // set up grid
        for (var i = 0; i < grid.length; i++) {
            grid[i] = Array(width);
        }

        for (var y = 0; y < grid.length; y++) {
            for (var x = 0; x < grid[y].length; x++) {
                // grid[y][x] = Array(0,0,0);// r g b 
                grid[y][x] = Array(randomPixel(), randomPixel(), randomPixel());// r g b 
            }
        }
        console.log(grid);
        console.log("Initialize Variable Simulation --- end");
        clearCanvas();
    }
    function clearCanvas() {
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(0, 0, width, height);
    }
    function createNextIteration() {
        for (var y = 0; y < grid.length; y++) {
            for (var x = 0; x < grid[y].length; x++) {
                grid[y][x] = modPixel(grid[y][x]);
                // grid[y][x] = movePixelUp(grid[y][x], grid[belowY(y)][x]);
                if (y < height - bottomLine) {
                    grid[y][x] = mixPixels(grid[y][x], grid[aboveY(y)][x]);

                } else {

                    if (x < (width / 2)) {
                        grid[y][x] = mixPixels(grid[y][x], grid[aboveY(y)][rightX(x)]);
                    } else {

                        grid[y][x] = mixPixels(grid[y][x], grid[aboveY(y)][leftX(x)]);
                    }

                }
            }
        }

    }
    function rightX(x: number): number {
        if (x + 1 >= width) {
            return 0;
        } else {
            return x + 1;
        }
    }
    function leftX(x: number): number {
        if (x - 1 < 0) {
            return width - 1;
        } else {
            return x - 1;
        }
    }
    function belowY(y: number): number {
        if (y + 1 >= height) {
            return 0;
        } else {
            return y + 1;
        }
    }
    function aboveY(y: number): number {
        if (y - 1 < 0) {
            return height - 1;
        } else {
            return y - 1;
        }
    }
    function modPixel(pixel: Array<number>): Array<number> {
        // var updateAmount = randomPixel();
        // var updateAmount = 5;
        var updateAmount = Math.floor(Math.random() * (10));
        var colorValueToChange = Math.floor(Math.random() * (7));
        var returnPixel = Array<number>(3);
        // pixel is array<number> [red, green, blue]
        switch (colorValueToChange) {
            case 0:
                // update red
                returnPixel[0] = Math.floor((pixel[0] + updateAmount) % pixelMax);
                returnPixel[1] = pixel[1];
                returnPixel[2] = pixel[2];
                return returnPixel;
            case 1:
                // update green
                returnPixel[0] = pixel[0];
                returnPixel[1] = Math.floor((pixel[1] + updateAmount) % pixelMax);
                returnPixel[2] = pixel[2];
                return returnPixel;
            case 2:
                // update blue
                returnPixel[0] = pixel[0];
                returnPixel[1] = pixel[1];
                returnPixel[2] = Math.floor((pixel[2] + updateAmount) % pixelMax);
                return returnPixel;
            case 3:
                // update red/blue
                returnPixel[0] = Math.floor((pixel[0] + updateAmount) % pixelMax);
                returnPixel[1] = pixel[1];
                returnPixel[2] = Math.floor((pixel[2] + updateAmount) % pixelMax);
                return returnPixel;
            case 4:
                // update green/blue
                returnPixel[0] = pixel[0];
                returnPixel[1] = Math.floor((pixel[1] + updateAmount) % pixelMax);
                returnPixel[2] = Math.floor((pixel[2] + updateAmount) % pixelMax);
            case 5:
                // update red/green
                returnPixel[0] = Math.floor((pixel[0] + updateAmount) % pixelMax);
                returnPixel[1] = Math.floor((pixel[1] + updateAmount) % pixelMax);
                returnPixel[2] = pixel[2];
                return returnPixel;
            case 6:
                // update red/green/blue
                returnPixel[0] = Math.floor((pixel[0] + updateAmount) % pixelMax);
                returnPixel[1] = Math.floor((pixel[1] + updateAmount) % pixelMax);
                returnPixel[2] = Math.floor((pixel[2] + updateAmount) % pixelMax);
                return returnPixel;
            default:
                // switch things
                returnPixel[0] = pixel[1];
                returnPixel[1] = pixel[2];
                returnPixel[2] = pixel[0];
                return returnPixel;

        }
        return returnPixel
    }
    function mixPixels(pixel: Array<number>, mixerPixel: Array<number>): Array<number> {
        // take values of the below pixel and average them with current pixel
        var newPixel: Array<number> = new Array<number>(3);

        for (var i = 0; i < 3; i++) {
            newPixel[i] = Math.floor((pixel[i] + mixerPixel[i]) / 2);
        }

        return newPixel;
    }

    function draw() {

        var cellWidth = 1;
        var cellHeight = 1;

        var fillStyleText = "";
        for (var y = 0; y <= height - 1; y++) {
            for (var x = 0; x <= width - 1; x++) {

                fillStyleText = 'rgba(' + String(grid[y][x][0] % pixelMax) + ', ' + String(grid[y][x][1] % pixelMax) + ', ' + String(grid[y][x][2] % pixelMax) + ', 1)';

                canvasContext.fillStyle = fillStyleText;
                canvasContext.fillRect(x, y, cellWidth, cellHeight);
            }
        }

    }
    function drawCanvasColor(canvasID: String, color: String): void {

        var cellWidth = 1;
        var cellHeight = 1;

        var fillStyleText = "";

        var colorCanvasElement = document.getElementById(canvasID) as HTMLCanvasElement;
        var colorCanvasContext = colorCanvasElement.getContext('2d');

        for (var y = 0; y <= height - 1; y++) {
            for (var x = 0; x <= width - 1; x++) {

                switch (color.toLowerCase()) {
                    case "red":
                        fillStyleText = 'rgba(' + String(grid[y][x][0] % pixelMax) + ', 0, 0, 1)';
                        break;
                    case "green":
                        fillStyleText = 'rgba(0, ' + String(grid[y][x][1] % pixelMax) + ', 0, 1)';
                        break;
                    case "blue":
                        fillStyleText = 'rgba(0,0, ' + String(grid[y][x][2] % pixelMax) + ', 1)';
                        break;
                    default:
                        fillStyleText = 'rgba(' + String(grid[y][x][0] % pixelMax) + ', ' + String(grid[y][x][1] % pixelMax) + ', ' + String(grid[y][x][2] % pixelMax) + ', 1)';
                        break;
                }


                colorCanvasContext.fillStyle = fillStyleText;
                colorCanvasContext.fillRect(x, y, cellWidth, cellHeight);
            }
        }
    }
    function generateAndDraw() {
        clearCanvas();
        createNextIteration();
        draw();
        drawCanvasColor("simulationCanvasRed", "red");
        drawCanvasColor("simulationCanvasBlue", "blue");
        drawCanvasColor("simulationCanvasGreen", "green");

    }

    useEffect(() => {
        initializeElements();
        setInterval(generateAndDraw, intervalLength);
    }, [])




    return (
        <main >
            <div >
                <h2>Simulation - All</h2>
                <canvas width={width} height={height} id="simulationCanvas" className="simulationCanvas"  ></canvas>
                <h2>Simulation - Red</h2>
                <canvas width={width} height={height} id="simulationCanvasRed" className="simulationCanvas"  ></canvas>
                <h2>Simulation - Green</h2>
                <canvas width={width} height={height} id="simulationCanvasGreen" className="simulationCanvas"  ></canvas>
                <h2>Simulation - Blue</h2>
                <canvas width={width} height={height} id="simulationCanvasBlue" className="simulationCanvas"  ></canvas>
                {/* <MonoCanvas iteration={iteration} grid={grid} width={width} height={height} name="Red"></MonoCanvas> */}
            </div>
        </main>
    );

}

export default Simulation;