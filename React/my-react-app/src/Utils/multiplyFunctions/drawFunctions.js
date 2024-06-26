import { saveAs } from 'file-saver';
  //draw image
export function draw(payload){
    return new Promise((resolve) => {
        var canvas = payload.canvas;
        var c = payload.c;
        var img = payload.img;
        var w = Math.min(window.innerWidth - remToPix(6), img.width);
        var h = Math.min(window.innerHeight, img.height);
        canvas.width = w;
        canvas.height = h;
        c.clearRect(0, 0, canvas.width, canvas.height);      
        c.drawImage(img,0,0, w, h);
        resolve(true);
    })
  }

  //split photo into channels
  function dataToRGBA(imgData){
    var _r = [], _g = [], _b = [], _a = [];
    for(var i = 0, end = imgData.data.length; i < end; i+=4){
        _r.push( imgData.data[i] );
        _g.push( imgData.data[i+1] );
        _b.push( imgData.data[i+2] );
        _a.push( imgData.data[i+3] );
    }
    return {r:_r, g:_g, b:_b, a:_a, w: imgData.width, h: imgData.height};
  }

  //unite channels to photo
  function RGBAtoData(imgData){
    var img = new ImageData(imgData.w,imgData.h);
    for(var i = 0, j = 0; i < img.data.length-3; i+=4, j++){
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
        var img = c.getImageData(0,0,canvas.width,canvas.height);
        for(var i = 0; i < img.data.length; i+=4){
            var v = (img.data[i] * 0.2126) + (img.data[i+1] * 0.7152) + (img.data[i+2] * 0.0722);
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
        var data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        var noiseRemove = function(colorData,w,h,window){
            for(var i = 0, end1 = h; i < end1; i++){
                for(var j = 0, end2 = w; j < end2; j++){
                    var n = [];
                    for(var y = -Math.floor(window/2); y < window-Math.floor(window/2); y++){
                        for(var x = -Math.floor(window/2); x < window-Math.floor(window/2); x++){
                            n.push( colorData[((i+y) * w + (j+x))] );
                        }
                    }
                    n.sort( function(a, b){ return a - b } );
                    colorData[ i * w + j ] = n[Math.floor((window*window)/2)];
                }
            }
            return colorData;
        }
        var w = state.removeNoise;
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
        var data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        var sharp = function(colorData,w,h){
            var newColorData = Array(h).fill().map(_=>Array(w).fill(0));
            for(var i = 1, end1 = h-1; i < end1; i++){
                for(var j = 1, end2 = w-1; j < end2; j++){
                    var v = ( colorData[ (i-1) * w + j ] + colorData[ (i+1) * w + j ]
                                    + colorData[ i * w + (j-1) ] + colorData[ i * w + (j+1) ] ) - (4*colorData[ i * w + j ]);
                    newColorData[i * w + j] = v;
                }
            }
            for(var i = 1; i < h-1; i++){
                for(var j = 1; j < w-1; j++){
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
        var data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        var increaseContrast = function(colorData){
            var black = 255, white = 0;
            for (var i = 0; i < colorData.length; i++) {
                if (colorData[i] < black) {
                    black = colorData[i];
                }
                if (colorData[i] > white) {
                    white = colorData[i];
                }
            }
            for (var i = 0; i < colorData.length; i++) {
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

   //stretching colors to using absolute white and black
   export function colorBrighten(payload){
    return new Promise((resolve) => {
        var tone;
        var canvas = payload.canvas;
        var c = payload.c;
        var data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        var HSL = [];
        for (var i = 0; i < data.r.length; i++) {
            HSL[i] = RGB_TO_HSL(data.r[i], data.g[i], data.b[i]);
        };
        for (var i = 0; i < data.r.length; i++) {
            var hsl = HSL[i];
            if (hsl.H != 0 && hsl.S > 0.25) {
                tone = (
                        hsl.S +
                        (HSL[i+2] != undefined ? HSL[i+2].S : 1) +
                        (HSL[i-canvas.width+1] != undefined ? HSL[i-canvas.width+1].S : 1) +
                        (HSL[i+canvas.width+1] != undefined ? HSL[i+canvas.width+1].S : 1)) / 4;
                hsl.S = (1 - hsl.S) * 0.2 + hsl.S;
            }
            else {
                if (tone !== undefined)
                    hsl.S = tone;
            }
                
            var rgb = HSL_TO_RGB(hsl.H, hsl.S, hsl.L);
            data.r[i] = rgb.R;
            data.g[i] = rgb.G;
            data.b[i] = rgb.B;
        }
        c.putImageData( RGBAtoData(data), 0, 0 );
        resolve();
    })

    /*return new Promise((resolve) => {
        const maxDiff = 50;
        var canvas = payload.canvas;
        var c = payload.c;
        var data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        var increaseContrast = function(colorData){
            for (var i = 0; i < colorData.r.length; i++) {
                var max;
                if (colorData.r[i] > colorData.g[i]) {
                    if (colorData.r[i] > colorData.b[i])
                        max = colorData.r[i]
                    else
                        max = colorData.b[i]
                }
                else {
                    if (colorData.g[i] > colorData.b[i])
                        max = colorData.g[i]
                    else
                        max = colorData.b[i]
                }

                if (max < 255) {
                    var multiplier = 255 / max;
                    colorData.r[i] = multiplier * colorData.r[i] > maxDiff ? colorData.r[i] + maxDiff : multiplier * colorData.r[i];
                    colorData.g[i] = multiplier * colorData.g[i] > maxDiff ? colorData.g[i] + maxDiff : multiplier * colorData.g[i];
                    colorData.b[i] = multiplier * colorData.b[i] > maxDiff ? colorData.b[i] + maxDiff : multiplier * colorData.b[i];
                }
            }
            return colorData;
        }
        data = increaseContrast(data);
        c.putImageData( RGBAtoData(data), 0, 0 );
        resolve();
    })*/
  }

  //turning
  function transpose(d,width,height){
    var data = Array(d.length);
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            data[j * height + i] = d[i * width + j];
        }
    }
    return data;	
  }

  //reverse array by Oy
  function reverseRow(d,width,height){
    var data = Array(d.length);
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            data[i * width + j] = d[i * width + (width-1-j)];
        }
    }
    return data;
  }

  //reverse array by Ox
  function reverseColumn(d,width,height){
    var data = Array(d.length);
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
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
        var data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
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
        var data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
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
        var data = dataToRGBA(c.getImageData(0,0,canvas.width,canvas.height));
        data.r = transpose(data.r, data.w, data.h);
        data.g = transpose(data.g, data.w, data.h);
        data.b = transpose(data.b, data.w, data.h);
        data.a = transpose(data.a, data.w, data.h);
        var tmp = data.w;
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
        var data = c.getImageData(0,0,canvas.width,canvas.height);
        var text = [];
    
        var chars = ["@","%","#","*","+","=","-",":","."," "];
        var chars2 = ["$","@","B","%","8","&","W","M","#","*","o","a","h","k","b","d","p","q","w","m","Z","O",
                                    "0","Q","L","C","J","U","Y","X","z","c","v","u","n","x","r","j","f","t","/","\\","|","(",
                                    ")","1","{","}","[","]","?","-","_","+","~","\<","\>","i","!","l","I",";",":",",","\"","^",
                                    "`","'","."," "];
        var string = "";
        var grayStep = Math.ceil( 255 / chars.length );
        c.fillStyle = "white";
        c.fillRect(0,0,canvas.width,canvas.height);
        c.font = "5px Courier";
        c.fillStyle = "black";
        for(var i = 0; i < canvas.height*4; i+=4){
            for(var j = 0; j < canvas.width*4; j+=4){
                for(var x = 0; x < chars.length; x++){
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
        var th = state.value.region;
        var rect = canvas.getBoundingClientRect();
        var mouseX = Math.floor((e.clientX - rect.left) * originalImg.width / rect.width);
        var mouseY = Math.floor((e.clientY - rect.top) * originalImg.height / rect.height);
        var data = c.getImageData(0,0,canvas.width,canvas.height);
        var region = {};
        var toLook = [];
        var visited;

        region[ mouseX+','+mouseY ] = true;
        toLook.push( mouseX, mouseY );
        while(toLook.length !== 0){
            var x = toLook.shift();
            var y = toLook.shift();
            var indexM = (y * data.width + x)*4;
            var me = [
                data.data[indexM],
                data.data[indexM+1],
                data.data[indexM+2],
            ];
            for(var i = -1; i < 2; i++){
                for(var j = -1; j < 2; j++){
                    visited = false;
                    if( x+j >= 0 && x+j < data.width && y+i >= 0 && y+i < data.height ){
                        if( !region[(x+j)+','+(y+i)] ){
                            var indexN = ((y+i) * data.width + (x+j))*4;
                            var neighbour = [
                                data.data[indexN],
                                data.data[indexN+1],
                                data.data[indexN+2],
                            ];
                            var dist = distance(me,neighbour);
                            if( dist < th ){
                                region[ (x+j)+','+(y+i) ] = true;
                                toLook.push( x+j, y+i );
                            }
                        }
                    }
                }
            }
        }

        
        for(var key in region ){
            var value = key.split(',').map( v => parseInt(v) );
            var index = (value[1] * data.width + value[0])*4;
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
    var d = 0;
    for(var i = 0; i < a.length; i++){
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
        draw(payload);
        resolve();
    })
  }      

  export function RGB_TO_HSL(R1,G1,B1) { 
    var H = 0, S = 0, L = 0;
    var R = R1 / 255.0; 
    var G = G1 / 255.0; // Приводим к диапазону от 0 до 1 
    var B = B1 / 255.0; // 
    var Max = Math.max(R, Math.max(G, B)); 
    var Min = Math.min(R, Math.min(G, B)); //Вычисляем тон 
    if (Max == Min) { H = 0; } 
    else 
    if (Max == R && G >= B) 
        { H = 60.0 * (G - B) / (Max - Min); } 
    else 
    if (Max == R && G < B) 
        { H = 60.0 * (G - B) / (Max - Min) + 360.0; } 
    else 
    if (Max == G) 
        { H = 60.0 * (B - R) / (Max - Min) + 120.0; } 
    else 
    if (Max == B) 
        { H = 60.0 * (R - G) / (Max - Min) + 240.0; } 

    //Вычисляем светлоту 
    L = (Max + Min) / 2.0; 
    //Вычисляем насыщенность 
    if (L == 0 || Max == Min) 
        { S = 0; } 
    else 
    if (0 < L && L <= 0.5) 
        { S = (Max - Min) / (Max + Min); } 
    else 
    if (L > 0.5) 
        { S = (Max - Min) / (2 - (Max + Min)); } 
    return {H:H, S:S, L:L}
  }

  export function HSL_TO_RGB(H,S,L) { 
    var R, G, B; 
    if (S == 0) { 
        R = Math.round(L * 255.0); // 
        G = Math.round(L * 255.0); //Округляем значения 
        B = Math.round(L * 255.0); // 
    } 
    else { 
        var Q = (L < 0.5) ? (L * (1.0 +  S)) : ( L +  S - ( L *  S)); 
        var P = (2.0 *  L) - Q; 
        var HK =  H / 360.0; 
        var T = []; //Массив для хранения значений R,G,B 
        T[0] = HK + (1.0 / 3.0); // R 
        T[1] = HK; // G 
        T[2] = HK - (1.0 / 3.0); // B 
        
        for (var i = 0; i < 3; i++) { 
            if (T[i] < 0) T[i] += 1.0; 
            if (T[i] > 1) T[i] -= 1.0; 

            if ((T[i] * 6) < 1) 
                { T[i] = P + ((Q - P) * 6.0 * T[i]); } 
            else 
            if ((T[i] * 2.0) < 1) 
                { T[i] = Q; } 
            else 
            if ((T[i] * 3.0) < 2) 
                { T[i] = P + (Q - P) * ((2.0 / 3.0) - T[i]) * 6.0; } 
            else 
                { T[i] = P; } 
        } 
        
        R = (T[0] * 255.0); // 
        G = (T[1] * 255.0); //Приводим к диапазону от 0 до 255 
        B = (T[2] * 255.0); // 
    } 
    return {R:R, G:G, B:B}; 
}

function remToPix(rem) {    
    return rem * 18;
}