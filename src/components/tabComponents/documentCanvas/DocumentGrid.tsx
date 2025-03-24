import * as React from 'react'; 
import { Rect, Text } from 'react-konva';

const DocumentGrid = (props: any) => {
  const {
    ncols,
    nrows,
    rectDims,
    storedData = [],
    setStoredData,
    data = [], 
    setData,
  } = props;

  

  interface GridColors {
    // since there is only 2 states just make it a boolean for now
    [key: string]: boolean;
  }

  const defaultGridTestValues = {
    "0_0" : true,
    "5_3" : true
  }

  const [grid, setGrid] = React.useState<GridColors>(defaultGridTestValues);
  const [test, setTest] = React.useState<number>(0);  


  const handleClickAvailablePos = (r: any, c: any) => {
    const key: string = `${r}_${c}`;
    setGrid(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setTest(prev => prev+1);
  }

  const textToGridHandler = (r: any, c: any, idx: any): any => {
    const key: string = `${r}_${c}`;
    let text = "";
    let valid: boolean = false;
    const storedDataSize = storedData.length; 
    // console.log(storedDataSize);
    if (idx<storedDataSize && 
      (grid[key]==false || grid[key]==undefined)
    ) {
      let rowData = storedData[idx];
      text = `${rowData.ndc} \n ${rowData.name} \n ${rowData.price}`;
      valid = true;
      // console.log("valid");
    } else {
      text = ``;
      valid = false;
    }
    return { text, valid };
  }

  const generateGrid = (test: any) => {
    const line = [];
    let subWidth = rectDims.width/ncols;
    let subHeight = rectDims.height/nrows;
    let idx = 0; 
    for (let r=nrows-1; r>=0; --r) {
      for (let c=ncols-1; c>=0; --c) {
        const key: string = `${r}_${c}`;
        // console.log(key);
        
        const { text, valid } = textToGridHandler(r, c, idx);
        if (valid) idx++; 
        line.push(
          <Text 
            // text={"Amoxicillin 400mg/5ml Suspension Reconstituted \n  00143-9887-50 \n 01.58 \n KeySource Acq"} 
            text={text}
            fill="none" 
            fontFamily="Arial"
            fontSize={11}
            x={rectDims.offsetX + subWidth*c + 2}
            y={rectDims.offsetY + subHeight*r + 2}
            width={subWidth-10}
          />
        )
        line.push(<Rect
          key={key}
          x={rectDims.offsetX + subWidth*c}
          y={rectDims.offsetY + subHeight*r}
          width={subWidth}
          height={subHeight}
          fill={grid[key] ? "rgba(179, 34, 11, 0.1)" : ""}
          stroke="grey"
          strokeWidth={1}
          onClick={() => handleClickAvailablePos(r, c)}
        />)
      }
    }
    // console.log(grid);
    return line;
  }

  // const [jsxGrid, setJsxGrid] = React.useState(generateGrid());

  // React.useEffect(() => {
  //   setJsxGrid(generateGrid())
  // }, [storedData]);



  return (
    <>
      {generateGrid(test)}
    </>
  )
}

export default DocumentGrid;