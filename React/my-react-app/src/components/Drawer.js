import { useEffect } from "react";
import { saveAs } from 'file-saver';
import { watermark } from 'dynamic-watermark';

export function Drawer(props) {
    let canvas, c, canvasAux, cAux, selection, image, originalImg;

    const id = props.match.params.PhotoId.toString();
    image = sessionStorage.getItem("link");

    //load once
    useEffect(() => { 
        canvas = document.getElementById('canvas');
        let img = new Image();
        img.src = image;
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            originalImg = this;
            draw(img);
        };
     }, []);

    //render, depending on state of loading
    return (
        <div>
            <div id="toolbar" className="d-flex flex-row justify-content-between">
                <div>
                    <button id="Save" onClick={saveToPNG}>Save</button>
                </div>
                <div>
                    <input id="RemoveNoise" size="2"/>
                    <button id="Remove Noise" onClick={saltPepperRemoval}>Remove Noise</button>
                </div>
                <div>
                    <button id="Rotate" onClick={rotate}>Rotate</button>
                </div>
                <div>
                    <button id="Flip X" onClick={flipHorizontal}>Flip X</button>
                </div>
                <div>
                    <button id="Flip Y" onClick={flipVertical}>Flip Y</button>
                </div>
                <div>
                    <button id="Gray" onClick={RGBAtoGray}>Gray</button>
                </div>
                <div>
                    <button id="Contrast" onClick={contrast}>Contrast</button>
                </div>
                <div>
                    <button id="Sharpen" onClick={sharpen}>Sharpen</button>
                </div>
                <div>
                    <button id="Ascii" onClick={ascii}>Ascii</button>
                </div>
                <div>
                    <input id="Region" size="2"/>
                    <button id="Region" onClick={getRegion}>Region</button>
                </div>
            </div>
            <canvas id="canvas"> 

            </canvas>
        </div>
        
    );

    //draw image
    function draw(img){
        c = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        c.clearRect(0, 0, canvas.width, canvas.height);      
        c.drawImage(img,0,0);
    }

    //split photo into channels
    function dataToRGBA(imgData){
        let _r = [], _g = [], _b = [], _a = [];
        for(let i = 0, end = imgData.data.length; i < end; i+=4){
            _r.push( imgData.data[i] );
            _g.push( imgData.data[i+1] );
            _b.push( imgData.data[i+2] );
            _a.push( imgData.data[i+3] );
        }
        return {r:_r, g:_g, b:_b, a:_a, w: imgData.width, h: imgData.height};
    }

    //unite channels to photo
    function RGBAtoData(imgData){
        let img = new ImageData(imgData.w,imgData.h);
        for(let i = 0, j = 0; i < img.data.length-3; i+=4, j++){
            img.data[i] = imgData.r[j];
            img.data[i+1] = imgData.g[j];
            img.data[i+2] = imgData.b[j];
            img.data[i+3] = imgData.a[j];
        }
        return img;
    }

    //turn photo gray
    function RGBAtoGray(){
        if(!image)
            return
        let img = c.getImageData(0,0,canvas.width,canvas.height);
        for(let i = 0; i < img.data.length; i+=4){
            let v = (img.data[i] * 0.2126) + (img.data[i+1] * 0.7152) + (img.data[i+2] * 0.0722);
            img.data[i] = v;
            img.data[i+1] = v;
            img.data[i+2] = v;
        }
        c.putImageData( img, 0, 0 );
    }

    //noise removal algorithm
    function saltPepperRemoval(){
        if(!image)
            return
        let data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        let noiseRemove = function(colorData,w,h,window){
            for(let i = 0, end = h; i < end; i++){
                for(let j = 0, end = w; j < end; j++){
                    let n = [];
                    for(let y = -Math.floor(window/2); y < window-Math.floor(window/2); y++){
                        for(let x = -Math.floor(window/2); x < window-Math.floor(window/2); x++){
                            n.push( colorData[((i+y) * w + (j+x))] );
                        }
                    }
                    n.sort( function(a, b){ return a - b } );
                    colorData[ i * w + j ] = n[Math.floor((window*window)/2)];
                }
            }
            return colorData;
        }
        let w = document.getElementById("RemoveNoise").value;
        w = isNaN(w) || w > 9 || w < 3 ? 3 : w%2 ? w : w-1;
        data.r = noiseRemove(data.r, data.w, data.h, w);
        data.g = noiseRemove(data.g, data.w, data.h, w);
        data.b = noiseRemove(data.b, data.w, data.h, w);
        c.putImageData( RGBAtoData(data), 0, 0 );
    }

    //color drop on borders
    function sharpen(){
        if(!image)
            return
        let data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        let sharp = function(colorData,w,h){
            let newColorData = Array(h).fill().map(_=>Array(w).fill(0));
            for(let i = 1, end = h-1; i < end; i++){
                for(let j = 1, end = w-1; j < end; j++){
                    let v = ( colorData[ (i-1) * w + j ] + colorData[ (i+1) * w + j ]
                                    + colorData[ i * w + (j-1) ] + colorData[ i * w + (j+1) ] ) - (4*colorData[ i * w + j ]);
                    newColorData[i * w + j] = v;
                }
            }
            for(let i = 1; i < h-1; i++){
                for(let j = 1; j < w-1; j++){
                    colorData[i * w + j] -= newColorData[i * w + j]*0.5; 
                }
            }
            return colorData;
        }
        data.r = sharp(data.r, data.w, data.h);
        data.g = sharp(data.g, data.w, data.h);
        data.b = sharp(data.b, data.w, data.h);
        c.putImageData( RGBAtoData(data), 0, 0 );
    }

    //stretching colors to using absolute white and black
    function contrast(){
        if(!image)
            return
        let data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        let increaseContrast = function(colorData){
            let black = 255, white = 0;
            for (let i = 0; i < colorData.length; i++) {
                if (colorData[i] < black) {
                    black = colorData[i];
                }
                if (colorData[i] > white) {
                    white = colorData[i];
                }
            }
            for (let i = 0; i < colorData.length; i++) {
                colorData[i] = (colorData[i] - black) / (white - black) * 255;
            }
        return colorData;
        }
        data.r = increaseContrast(data.r);
        data.g = increaseContrast(data.g);
        data.b = increaseContrast(data.b);
        c.putImageData( RGBAtoData(data), 0, 0 );
    }

    //turning
    function transpose(d,width,height){
        let data = Array(d.length);
        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                data[j * height + i] = d[i * width + j];
            }
        }
        return data;	
    }

    //reverse array by Oy
    function reverseRow(d,width,height){
        let data = Array(d.length);
        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                data[i * width + j] = d[i * width + (width-1-j)];
            }
        }
        return data;
    }

    //reverse array by Ox
    function reverseColumn(d,width,height){
        let data = Array(d.length);
        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                data[i * width + j] = d[(height-1-i) * width + j];
            }
        }
        return data;
    }


    //reverse photo by Oy
    function flipHorizontal(){
        if(!image)
            return
        let data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        data.r = reverseRow(data.r, data.w, data.h);
        data.g = reverseRow(data.g, data.w, data.h);
        data.b = reverseRow(data.b, data.w, data.h);
        data.a = reverseRow(data.a, data.w, data.h);
        c.putImageData( RGBAtoData(data), 0, 0 );
    }

    //reverse photo by Ox
    function flipVertical(){
        if(!image)
            return
        let data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        data.r = reverseColumn(data.r, data.w, data.h);
        data.g = reverseColumn(data.g, data.w, data.h);
        data.b = reverseColumn(data.b, data.w, data.h);
        data.a = reverseColumn(data.a, data.w, data.h);
        c.putImageData( RGBAtoData(data), 0, 0 );
    }

    //turning photo
    function rotate(){
        if(!image)
            return
        let data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        data.r = transpose(data.r, data.w, data.h);
        data.g = transpose(data.g, data.w, data.h);
        data.b = transpose(data.b, data.w, data.h);
        data.a = transpose(data.a, data.w, data.h);
        let tmp = data.w;
        data.w = data.h;
        data.h = tmp;
        data.r = reverseRow(data.r, data.w, data.h);
        data.g = reverseRow(data.g, data.w, data.h);
        data.b = reverseRow(data.b, data.w, data.h);
        data.a = reverseRow(data.a, data.w, data.h);
        canvas.width = data.w;
        canvas.height = data.h;
        c.putImageData( RGBAtoData(data), 0, 0 );
    }

    function drawCanvasAux(){
        if(!image)
            return
        if(!canvasAux){
            canvasAux = document.createElement('canvas');
            document.body.appendChild( canvasAux );
        }
        let canvasPos = canvas.getBoundingClientRect();
        canvasAux.style.display = "block";
        canvasAux.style.position = "absolute";
        canvasAux.style.top = canvasPos.y+"px";
        canvasAux.style.left = canvasPos.x+"px";
        canvasAux.style.margin = "0px";
        canvasAux.style.zIndex = "1";
        canvasAux.width = canvas.width;
        canvasAux.height = canvas.height;
        cAux = canvasAux.getContext('2d');
    }

    //image to ascii
    function ascii(){
        if(!image)
            return
        RGBAtoGray();
        let data = c.getImageData(0,0,canvas.width,canvas.height);

        let chars = ["@","%","#","*","+","=","-",":","."," "];
        let chars2 = ["$","@","B","%","8","&","W","M","#","*","o","a","h","k","b","d","p","q","w","m","Z","O",
                                    "0","Q","L","C","J","U","Y","X","z","c","v","u","n","x","r","j","f","t","/","\\","|","(",
                                    ")","1","{","}","[","]","?","-","_","+","~","\<","\>","i","!","l","I",";",":",",","\"","^",
                                    "`","'","."," "];
        let string = "";
        let grayStep = Math.ceil( 255 / chars.length );
        c.fillStyle = "white";
        c.fillRect(0,0,canvas.width,canvas.height);
        c.font = "5px Courier";
        c.fillStyle = "black";
        for(let i = 0; i < canvas.height*4; i+=4){
            for(let j = 0; j < canvas.width*4; j+=4){
                for(let x = 0; x < chars.length; x++){
                    if( data.data[( i * canvas.width + j)*4] < (x*grayStep)+grayStep ){
                        c.fillText( chars[x], j, i );
                        break;
                    }
                }
            }
        }
    }

    function drawSelection(){
        if(!image || !selection)
            return
        cAux.fillStyle = "rgba(0,0,0,0.5)";
        cAux.fillRect(0,0,canvasAux.width,canvasAux.height);
        cAux.clearRect(selection.x,selection.y,selection.w,selection.h);
    }

    //finding region dependiong on multiplyer
    function region(e) {
            let th = document.getElementById("Region").value;
            let rect = canvas.getBoundingClientRect();
            let mouseX = Math.floor((e.clientX - rect.left) * originalImg.width / rect.width);
            let mouseY = Math.floor((e.clientY - rect.top) * originalImg.height / rect.height);
            let data = c.getImageData(0,0,canvas.width,canvas.height);
            let region = {};
            let toLook = [];
            let visited;
    
            region[ mouseX+','+mouseY ] = true;
            toLook.push( mouseX, mouseY );
            while(toLook.length !== 0){
                let x = toLook.shift();
                let y = toLook.shift();
                let indexM = (y * data.width + x)*4;
                let me = [
                    data.data[indexM],
                    data.data[indexM+1],
                    data.data[indexM+2],
                ];
                for(let i = -1; i < 2; i++){
                    for(let j = -1; j < 2; j++){
                        visited = false;
                        if( x+j >= 0 && x+j < data.width && y+i >= 0 && y+i < data.height ){
                            if( !region[(x+j)+','+(y+i)] ){
                                let indexN = ((y+i) * data.width + (x+j))*4;
                                let neighbour = [
                                    data.data[indexN],
                                    data.data[indexN+1],
                                    data.data[indexN+2],
                                ];
                                let dist = distance(me,neighbour);
                                if( dist < th ){
                                    region[ (x+j)+','+(y+i) ] = true;
                                    toLook.push( x+j, y+i );
                                }
                            }
                        }
                    }
                }
            }
    
            
            for(let key in region ){
                let value = key.split(',').map( v => parseInt(v) );
                let index = (value[1] * data.width + value[0])*4;
                data.data[ index+3 ] = 0;
            }
            
            c.putImageData( data, 0, 0 );
            

            document.getElementById("Region").onClick = removeEvent;
    }

    //setting listener region
    function getRegion(){
        if(!image)
            return
        canvas.addEventListener('click',  region);
    }

    //getting distance between dots
    function distance(a,b){
        let d = 0;
        for(let i = 0; i < a.length; i++){
            d += Math.abs( a[i]-b[i] );
        }
        return d;
    }

    //resetting listener region
    function removeEvent(){
        canvas.removeEventListener('click', region);
        document.getElementById("Region").onClick = getRegion;
    }

    //saving photo
    function saveToPNG(){
        var tempCtx=canvas.getContext('2d');
        tempCtx.crossOrigin = "anonymous";
        tempCtx.font="8px verdana";
        var textWidth=tempCtx.measureText(id).width;
        tempCtx.globalAlpha=.50;
        tempCtx.fillStyle='white';
        tempCtx.fillText(id,canvas.width-textWidth-10,canvas.height-20);
        tempCtx.fillStyle='black';
        tempCtx.fillText(id,canvas.width-textWidth-10+2,canvas.height-20+2);
        canvas.toBlob(function(blob) {
            saveAs(blob, "output.png");
        }, "image/png");
        draw(originalImg);
    }     
}