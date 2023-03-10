import SignatureCanvas from 'react-signature-canvas';
import React from 'react';
import { Button } from 'react-bootstrap';
import NumberClassifier from './NumberClassifer';

function Canvas() {
    const canvasWidth = 250;
    const canvasHeight = 250;
    const penSize = 10;
    let canvasRef = React.createRef();

    const [showAnswer, setAnswer] = React.useState(-1);
    const numberClassifier = new NumberClassifier();

    const onResetClick = () => {
        canvasRef.clear();
        setAnswer(-1)
    }

    const onSubmitClick = () => {
        const trimmedCanvas = canvasRef.getTrimmedCanvas();
        const pixels = getCanvasPixels(trimmedCanvas, trimmedCanvas.width, trimmedCanvas.height);

        const prediction = numberClassifier.predictNumber(pixels, 5);
        setAnswer(prediction)
    }

    const getCanvasPixels = (trimmedCanvas, width, height) => {
        const canvas = document.createElement("CANVAS");
        const context = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        context.drawImage(trimmedCanvas, 0, 0, 8, 8);
        const scaledCanvas = context.getImageData(0, 0, 8, 8).data;

        const alphas = alphaData(scaledCanvas);

        return alphas;
    }

    const alphaData = (pixelMap) => {
        const alphas = [];

        for (let i = 3; i < pixelMap.length; i += 4) {
            alphas.push(pixelMap[i] / 255);
        }

        return alphas
    }

    return (
      <div className="Canvas" style={{border: 'black'}}>
          <div style={{
              paddingTop: '10vh',
              textAlign: 'center',
              flexDirection: 'column',
              justifyContent:'center',
            }}>

            <SignatureCanvas penColor='black'
            style={{border:"1px", solid: "#000000"}}
              canvasProps={{
                width: canvasWidth,
                height: canvasHeight,
                className: 'sigCanvas',
                style: { border: "1px solid black" },
            }}
              minWidth={penSize} maxWidth={penSize}
              ref={(ref) => {canvasRef = ref}}
            />

          </div>
          <div style={{
            textAlign: 'center',
            flexDirection: 'column',
            justifyContent:'center'}}>

            <Button style={{display: 'inline-block', marginRight:'50px'}} onClick={onSubmitClick}>Submit</Button>
            <Button onClick={onResetClick}>Clear</Button>
            <p style={{fontSize: "20px"}}>
                {showAnswer >= 0 ? "Your number is: " + showAnswer : ""}
            </p>
          </div>
      </div>
    );
}

export default Canvas;