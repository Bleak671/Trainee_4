import { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setState } from '../../redux/Draw/DrawerInputReducer';
import { getRegion, ascii, sharpen, contrast, RGBAtoGray, flipHorizontal, flipVertical, rotate, saltPepperRemoval, init, saveToPNG, draw } from '../../Utils/multiplyFunctions/drawFunctions';
import { handleChangeRegion, handleChangeRemoveNoise } from "../../Utils/handlers/handleDrawer";


export function Drawer(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const drawerIn = useSelector((state) => state.DrawerInput);
    const id = props.match.params.PhotoId.toString();
    const globals = useSelector((state) => state.GlobalVar).value;
    var image = globals.link;
    if (globals.link == null)
      history.push({
        pathname: '/',
      });  
    let canvas
    let c;
    var originalImg = new Image();
    originalImg.src = image;
    originalImg.crossOrigin = 'Anonymous';

    //load once
    useEffect(() => { 
        init(image);
     }, []);

    //render, depending on state of loading
    return (
        <div>
            <div id="toolbar" className="d-flex flex-row justify-content-between">
                <div>
                    <button id="Refresh" onClick={ draw.bind(null, originalImg)}>Refresh</button>
                </div>
                <div>
                    <button id="Save" onClick={ saveToPNG.bind(null, id, originalImg)}>Save</button>
                </div>
                <div>
                    <input type="text" size="2" onChange={handleChangeRemoveNoise.bind(null, drawerIn, dispatch, setState)}/>
                    <button onClick={dispatch.bind(null,{type: 'NOISE_REMOVE_REQUESTED', payload: { drawerIn, image}})}>Remove Noise</button>
                </div>
                <div>
                    <button id="Rotate" onClick={ rotate.bind(null, image)}>Rotate</button>
                </div>
                <div>
                    <button id="Flip X" onClick={ flipHorizontal.bind(null, image)}>Flip X</button>
                </div>
                <div>
                    <button id="Flip Y" onClick={ flipVertical.bind(null, image)}>Flip Y</button>
                </div>
                <div>
                    <button id="Gray" onClick={ RGBAtoGray.bind(null, image)}>Gray</button>
                </div>
                <div>
                    <button id="Contrast" onClick={ contrast.bind(null, image)}>Contrast</button>
                </div>
                <div>
                    <button id="Sharpen" onClick={ sharpen.bind(null, image)}>Sharpen</button>
                </div>
                <div>
                    <button id="Ascii" onClick={ ascii.bind(null, image)}>Ascii</button>
                </div>
                <div>
                    <input type="text" size="2" onChange={handleChangeRegion.bind(null, drawerIn, dispatch, setState)}/>
                    <button onClick={dispatch.bind(null,{type: 'REGION_REQUESTED', payload: {drawerIn, originalImg}})}>Region</button>
                </div>
            </div>
            <canvas id="canvas"> 

            </canvas>
        </div>
        
    );

    
}