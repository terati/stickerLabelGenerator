import * as React from 'react'; 
import { Rect, Text } from 'react-konva';

const DocumentGrid = (props: any) => {
<<<<<<< HEAD
  return <></>
=======
  const {
    description,
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
   // "0_0" : true,
   // "5_3" : true
  }

  const [grid, setGrid] = React.useState<GridColors>(defaultGridTestValues);
  const [test, setTest] = React.useState<number>(0);
  const [expandedStoredData, setExpandedStoredData] = React.useState<any>(storedData); // stored data expanded by being multiplied by the quantity.  

  React.useEffect(() => {
    let expanded = [];
    for (let element of storedData) {
      let qty = parseInt(element.qty);
      for (; qty-- > 0;) expanded.push(element);
    }
    setExpandedStoredData(expanded);
  }, [storedData]);

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
    let qty = 0; 
    const expandedStoredDataSize = expandedStoredData.length; 
    if (idx<expandedStoredDataSize && 
      (grid[key]==false || grid[key]==undefined)
    ) {
      let rowData = expandedStoredData[idx];
      text = `${description} \n${rowData.ndc}\n${rowData.name}\n ${rowData.price}`;
      valid = true;
      qty = parseInt(rowData.qty);
      // console.log("valid");
    } else {
      text = ``;
      valid = false;
    }
    return { text, valid, qty };
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
        
        const { text, valid, qty } = textToGridHandler(r, c, idx);
        if (valid) idx++; 
        line.push(
          <Text 
            // text={"Amoxicillin 400mg/5ml Suspension Reconstituted \n  00143-9887-50 \n 01.58 \n KeySource Acq"} 
            text={text}
            fill="none" 
            fontFamily="Arial"
            fontSize={11}
            x={rectDims.offsetX + subWidth*c + 12}
            y={rectDims.offsetY + subHeight*r + 12}
            width={subWidth-12}
          />
        )
        line.push(<Rect
          key={key}
          x={rectDims.offsetX + subWidth*c}
          y={rectDims.offsetY + subHeight*r}
          width={subWidth}
          height={subHeight}
          fill={grid[key] ? "rgba(179, 33, 11, 0.14)" : "rgba(0, 0, 0, 0)"}
          // stroke="grey"
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
>>>>>>> 9dfb4df (somewhat working single page for cardinal)
}

export default DocumentGrid;