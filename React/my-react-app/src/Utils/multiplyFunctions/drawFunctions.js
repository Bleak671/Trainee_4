import { saveAs } from 'file-saver';
  //draw image
export function draw(payload){
    return new Promise((resolve) => {
        var canvas = payload.canvas;
        var c = payload.c;
        var img = payload.img;
        canvas.width = img.width;
        canvas.height = img.height;
        c.clearRect(0, 0, canvas.width, canvas.height);      
        c.drawImage(img,0,0);
        resolve();
    })
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
  export function RGBAtoGray(payload){
    return new Promise((resolve) => {
        var canvas = payload.canvas;
        var c = payload.c;
        let img = c.getImageData(0,0,canvas.width,canvas.height);
        for(let i = 0; i < img.data.length; i+=4){
            let v = (img.data[i] * 0.2126) + (img.data[i+1] * 0.7152) + (img.data[i+2] * 0.0722);
            img.data[i] = v;
            img.data[i+1] = v;
            img.data[i+2] = v;
        }
        c.putImageData( img, 0, 0 );
        resolve();
    })
  }

  //noise removal algorithm
  export function saltPepperRemoval(payload){
    return new Promise(() => {
        var canvas = payload.canvas;
        var c = payload.c;
        var state = payload.state;
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
        let w = state.removeNoise;
        w = isNaN(w) || w > 9 || w < 3 ? 3 : w%2 ? w : w-1;
        data.r = noiseRemove(data.r, data.w, data.h, w);
        data.g = noiseRemove(data.g, data.w, data.h, w);
        data.b = noiseRemove(data.b, data.w, data.h, w);
        c.putImageData( RGBAtoData(data), 0, 0 );
    });
  }

  //color drop on borders
  export function sharpen(payload){
    return new Promise((resolve) => {
        var canvas = payload.canvas;
        var c = payload.c;
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
        resolve();
    })
  }

  //stretching colors to using absolute white and black
  export function contrast(payload){
    return new Promise((resolve) => {
        var canvas = payload.canvas;
        var c = payload.c;
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
        resolve();
    })
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
  export function flipHorizontal(payload) {
    return new Promise((resolve) => {
        var canvas = payload.canvas;
        var c = payload.c;
        let data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        data.r = reverseRow(data.r, data.w, data.h);
        data.g = reverseRow(data.g, data.w, data.h);
        data.b = reverseRow(data.b, data.w, data.h);
        data.a = reverseRow(data.a, data.w, data.h);
        c.putImageData( RGBAtoData(data), 0, 0 );
        resolve();
    })
  }

  //reverse photo by Ox
  export function flipVertical(payload) {
    return new Promise((resolve) => {
        var canvas = payload.canvas;
        var c = payload.c;
        let data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        data.r = reverseColumn(data.r, data.w, data.h);
        data.g = reverseColumn(data.g, data.w, data.h);
        data.b = reverseColumn(data.b, data.w, data.h);
        data.a = reverseColumn(data.a, data.w, data.h);
        c.putImageData( RGBAtoData(data), 0, 0 );
        resolve();
    })
  }

  //turning photo
  export function rotate(payload){
    return new Promise((resolve) => {
        var canvas = payload.canvas;
        var c = payload.c;
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
        resolve();
    })
  }

  //image to ascii
  export function ascii(payload){
    return new Promise((resolve) => {
        var canvas = payload.canvas;
        var c = payload.c;
        RGBAtoGray(payload);
        let data = c.getImageData(0,0,canvas.width,canvas.height);
        let text = [];
    
        let chars = ["@","%","#","*","+","=","-",":","."," "];
        let chars2 = ["$","@","B","%","8","&","W","M","#","*","o","a","h","k","b","d","p","q","w","m","Z","O",
                                    "0","Q","L","C","J","U","Y","X","z","c","v","u","n","x","r","j","f","t","/","\\","|","(",
                                    ")","1","{","}","[","]","?","-","_","+","~","\<","\>","i","!","l","I",";",":",",","\"","^",
                                    "`","'","."," "];
        let string = "";
        let grayStep = Math.ceil( 255 / chars.length );
        c.fillStyle = "white";
        c.fillRect(0,0,canvas.width,canvas.height);
        c.font = "4px Courier";
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
        resolve();
    })
  }

  //finding region dependiong on multiplyer
  function region(payload, e) {
        var canvas = payload.canvas;
        var c = payload.c;
        var state = payload.state;
        var originalImg = payload.originalImg;
        let th = state.region;
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
  }

  //setting listener region
  export function getRegion(payload){
    return new Promise((resolve) => {
        payload.canvas.onclick = region.bind(null, payload);
        resolve();
    })
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
  export function removeRegion(payload){
    return new Promise((resolve) => {
        payload.canvas.onclick = null;
        resolve();
    })
  }

  //saving photo
  export function saveToPNG(payload){
    return new Promise((resolve) => {
        var canvas = payload.canvas;
        var tempCtx = payload.c;
        var img = payload.img;
        var id = payload.id;
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
        draw(canvas, tempCtx, img);
        resolve();
    })
  }      