import * as React from 'react';
import styles from './dc.module.css';
import { Image as KonvaImage, Layer, Rect, Stage, Text, Transformer } from 'react-konva';
import Konva from 'konva';
import DocumentGrid from './DocumentGrid';

interface DocumentCanvasInterface {
  description?: string; 
  nrows?: number;
  ncols?: number;
  adjustGrid?: boolean;

}

<<<<<<< HEAD
const DocumentCanvas = () => {
  return <></>
=======
const DocumentCanvas = (props: DocumentCanvasInterface) => {
  const {
    description,
    nrows=11,
    ncols=4,
    adjustGrid=false,
    storedData,
    setStoredData,
    data, 
    setData
  } = props; 
  const width = 950; //850
  const height = 1250; //1100
  const [backgroundImage, setBackgroundImage] = React.useState<CanvasImageSource | undefined>();
  const imgRef = React.useRef(null);
  // const [adjustGrid, setAdjustGrid] = React.useState<boolean>(true);
  const [rectDims, setRectDims] = React.useState({
    offsetX: 50,
    offsetY: 25,
    width: 950,
    height: 1250,
  }); 
  const [gridRectDims, setGridRectDims] = React.useState({
    offsetX: 50,
    offsetY: 25,
    width: 950,
    height: 1250,
  })
  

  React.useEffect(() => {
    const img = new Image();
    img.src = '/healthsourceSticker.jpg';
    img.onload = () => {
      setBackgroundImage(img);
    }
    // generateGrid();
  }, []);

  const boxRef = React.useRef<Konva.Rect>(null);
  const transformerRef = React.useRef<any>(null);

  const handleClick = () => {
    if (transformerRef) transformerRef.current.nodes([boxRef.current]);
  };

  React.useEffect(() => {
    if (adjustGrid) {
      if (transformerRef) transformerRef.current.nodes([boxRef.current]);
    } else {
      if (transformerRef) transformerRef.current.nodes([]);
    }
  }, [adjustGrid])

  const handleStageClick = (e: any) => {
    // console.log(e.target.getStage());
    if (!adjustGrid && e.target!=boxRef.current) {
      transformerRef.current.nodes([]);
    }
  }

  

  const rectDragMove = () => {
    const node = boxRef.current;
    if (!node) return; 
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    setGridRectDims((prev) => ({
      ...prev,
      offsetX: node.x(),
      offsetY: node.y(),
      width: node.width()*scaleX,
      height: node.height()*scaleY,
    }))
  }

  return (
    <>
      <Stage width={width} height={height} className={styles.stage}
        onClick={handleStageClick}
      >
        <Layer
          listening={true}
        >
          {/* <KonvaImage 
            image={backgroundImage}
            x={-50}
            y={-50}
            width={850}
            height={1100}
            ref={imgRef}
          /> */}
          {/* <Text text="example text" fill="green" fontFamily="Arial"
            x={425}
            y={0}
          /> */}
          
          
          <Rect
            ref={boxRef}
            x={rectDims.offsetX}
            y={rectDims.offsetY}
            width={rectDims.width}
            height={rectDims.height}
            // fill="rgba(140, 140, 140, 0.26)"
            // stroke="grey"
            strokeWidth={2}
            draggable
            onClick={handleClick}
            onTransform={rectDragMove}
            onDragMove={rectDragMove}
          />

          <DocumentGrid nrows={nrows} ncols={ncols} rectDims={gridRectDims} 
            description={description}
            storedData={storedData} setStoredData={setStoredData} data={data} setData={setData}
          />
          
          
          <Transformer 
            ref={transformerRef}
            // node={boxRef}
            resizeEnabled={true}
            rotateEnabled={false}
          />
        </Layer>
      </Stage>
    </>
  )
>>>>>>> 9dfb4df (somewhat working single page for cardinal)
}

export default DocumentCanvas;
