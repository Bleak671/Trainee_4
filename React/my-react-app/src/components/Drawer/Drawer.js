import { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setState } from '../../redux/Draw/DrawerInputReducer';
import { setState as setGlobalState } from "../../redux/Global/GlobalVarReducer";
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
            <div id="toolbar" className="d-flex flex-row justify-content-between bg-info pt-2 pe-3 ps-3 pb-3 mb-5 border rounded-3">
                <div>
                    <button className="border rounded-3" id="Refresh" onClick={ dispatch.bind(null, {type: 'REFRESH_REQUESTED', payload: { canvas, c, img:originalImg }}) }>Refresh</button>
                </div>
                <div>
                    <button className="border rounded-3" id="Save" onClick={ dispatch.bind(null, {type: 'SAVE_REQUESTED', payload: { canvas, c, id, img:originalImg }}) }>Save</button>
                </div>
                <div>
                    <input type="text" size="2" onChange={handleChangeRemoveNoise.bind(null, drawerIn, dispatch, setState)}/>
                    <button className="border" onClick={dispatch.bind(null, {type: 'NOISE_REMOVE_REQUESTED', payload: { canvas, c, state:drawerIn }})}>Remove Noise</button>
                </div>
                <div>
                    <button className="border rounded-3" id="Rotate" onClick={ dispatch.bind(null, {type: 'ROTATE_REQUESTED', payload: { canvas, c }}) }>Rotate</button>
                </div>
                <div>
                    <button className="border rounded-3" id="Flip X" onClick={ dispatch.bind(null, {type: 'FLIPX_REQUESTED', payload: { canvas, c }}) }>Flip X</button>
                </div>
                <div>
                    <button className="border rounded-3" id="Flip Y" onClick={ dispatch.bind(null, {type: 'FLIPY_REQUESTED', payload: { canvas, c }}) }>Flip Y</button>
                </div>
                <div>
                    <button className="border rounded-3" id="Gray" onClick={ dispatch.bind(null, {type: 'GRAY_REQUESTED', payload: { canvas, c }}) }>Gray</button>
                </div>
                <div>
                    <button className="border rounded-3" id="Contrast" onClick={ dispatch.bind(null, {type: 'CONTRAST_REQUESTED', payload: { canvas, c }}) }>Cover all colors</button>
                </div>
                <div>
                    <button className="border rounded-3" id="Sharpen" onClick={ dispatch.bind(null, {type: 'SHARPEN_REQUESTED', payload: { canvas, c }}) }>Sharpen</button>
                </div>
                <div>
                    <button className="border rounded-3" id="Brighten" onClick={ dispatch.bind(null, {type: 'BRIGHTEN_REQUESTED', payload: { canvas, c }}) }>Increase color saturation</button>
                </div>
                <div>
                    <button className="border rounded-3" id="Ascii" onClick={ dispatch.bind(null, {type: 'ASCII_REQUESTED', payload: { canvas, c }}) }>Ascii</button>
                </div>
                <div>
                    <input type="text" size="2" onChange={handleChangeRegion.bind(null, drawerIn, dispatch, setState)}/>
                    <button className="border" onClick={dispatch.bind(null,{type: 'REGION_REQUESTED', payload: { canvas, c, state:drawerIn, originalImg }})}>Region</button>
                    <button className="border" onClick={dispatch.bind(null,{type: 'UNREGION_REQUESTED', payload: { canvas }})}>Unregion</button>
                </div>
            </div>
            <div className="w-100">
                <canvas ref={canvasRef} max-width="100px" id="canvas"></canvas>
            </div>       
        </div>
        
    );

    
}