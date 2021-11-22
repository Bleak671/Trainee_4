import { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setState } from '../../redux/Draw/DrawerInputReducer';
import { setState as setGlobalState } from "../../redux/Global/GlobalVarReducer";
import { getRegion, ascii, sharpen, contrast, RGBAtoGray, flipHorizontal, flipVertical, rotate, saltPepperRemoval, init, saveToPNG, draw } from '../../Utils/multiplyFunctions/drawFunctions';
import { handleChangeRegion, handleChangeRemoveNoise } from "../../Utils/handlers/handleDrawer";


export function Drawer(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const drawerIn = useSelector((state) => state.DrawerInput);
    const id = props.match.params.PhotoId.toString();
    const globals = useSelector((state) => state.GlobalVar).value;
    const canvasRef = useRef(null);
    var canvas = globals.canvas;
    var c = globals.c;
    var image = globals.link;
    var originalImg = new Image();
    originalImg.src = image;
    originalImg.crossOrigin = 'Anonymous';

    if (globals.link == null)
    history.push({
      pathname: '/',
    });  

    //load once
    useEffect(() => {       
        canvas = canvasRef.current;
        c = canvas.getContext('2d');  
        var tmpState = Object.assign({}, globals);
        tmpState.canvas = canvas;
        tmpState.c = c;
        dispatch(setGlobalState(tmpState));
        //init(canvas, c, image);
        originalImg.onload = () => {
            dispatch({type: 'REFRESH_REQUESTED', payload: { canvas, c, img:originalImg}})
        }
     }, []);

    //render, depending on state of loading
    return (
        <div>
            <div id="toolbar" className="d-flex flex-row justify-content-between">
                <div>
                    <button id="Refresh" onClick={ dispatch.bind(null, {type: 'REFRESH_REQUESTED', payload: { canvas, c, img:originalImg }}) }>Refresh</button>
                </div>
                <div>
                    <button id="Save" onClick={ dispatch.bind(null, {type: 'SAVE_REQUESTED', payload: { canvas, c, id, img:originalImg }}) }>Save</button>
                </div>
                <div>
                    <input type="text" size="2" onChange={handleChangeRemoveNoise.bind(null, drawerIn, dispatch, setState)}/>
                    <button onClick={dispatch.bind(null, {type: 'NOISE_REMOVE_REQUESTED', payload: { canvas, c, state:drawerIn }})}>Remove Noise</button>
                </div>
                <div>
                    <button id="Rotate" onClick={ dispatch.bind(null, {type: 'ROTATE_REQUESTED', payload: { canvas, c }}) }>Rotate</button>
                </div>
                <div>
                    <button id="Flip X" onClick={ dispatch.bind(null, {type: 'FLIPX_REQUESTED', payload: { canvas, c }}) }>Flip X</button>
                </div>
                <div>
                    <button id="Flip Y" onClick={ dispatch.bind(null, {type: 'FLIPY_REQUESTED', payload: { canvas, c }}) }>Flip Y</button>
                </div>
                <div>
                    <button id="Gray" onClick={ dispatch.bind(null, {type: 'GRAY_REQUESTED', payload: { canvas, c }}) }>Gray</button>
                </div>
                <div>
                    <button id="Contrast" onClick={ dispatch.bind(null, {type: 'CONTRAST_REQUESTED', payload: { canvas, c }}) }>Contrast</button>
                </div>
                <div>
                    <button id="Sharpen" onClick={ dispatch.bind(null, {type: 'SHARPEN_REQUESTED', payload: { canvas, c }}) }>Sharpen</button>
                </div>
                <div>
                    <button id="Ascii" onClick={ dispatch.bind(null, {type: 'ASCII_REQUESTED', payload: { canvas, c }}) }>Ascii</button>
                </div>
                <div>
                    <input type="text" size="2" onChange={handleChangeRegion.bind(null, drawerIn, dispatch, setState)}/>
                    <button onClick={dispatch.bind(null,{type: 'REGION_REQUESTED', payload: { canvas, c, state:drawerIn, originalImg }})}>Region</button>
                    <button onClick={dispatch.bind(null,{type: 'UNREGION_REQUESTED', payload: { canvas }})}>Unregion</button>
                </div>
            </div>
            <canvas ref={canvasRef} id="canvas"> 
            </canvas>
        </div>
        
    );

    
}