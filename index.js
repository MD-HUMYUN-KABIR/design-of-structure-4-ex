// step -1 DL

const calculateLoad = () => {
const slabThickness = document.getElementById('Self-weight').value;
const selfWeight = (slabThickness / 100) * 2400;
const LiveLoad = getInputValue('Live-load');
const DeadLoad = getInputValue('Dead-load');
const FloorCeiling = getInputValue('Floor-ceiling');
const FalseCeiling = getInputValue('False-ceiling');

let sumLoad = (selfWeight) + (LiveLoad) + (DeadLoad) + (FloorCeiling) + (FalseCeiling) ;
 setInnerText('resultDesignLoad',sumLoad);

}

// input value//
const getInputValue = (id) => {
   return parseFloat(document.getElementById(id).value);
}

const getInnerText = (id) => {
   return parseFloat(document.getElementById(id).innerText);
}
// set inner text //
const setInnerText = (id,value) => {
   parseFloat(document.getElementById(id).innerText = value.toFixed(2));
}
// step-2 SF
const calculateSF = () => {
    const designLoad =  getInnerText('resultDesignLoad');
    const longSpanInputValue = getInputValue('longSpan-sf');
    const longSpanSF = (longSpanInputValue * designLoad) / 3;
   setInnerText('result-longSpan-sf',longSpanSF)

    const shortSpanInputValue = getInputValue('shortSpan-sf');
    const slabWidth = getInputValue('slab-Width');
    const slabLength = getInputValue('slab-Length');
    const m = slabWidth / slabLength;
    const shortSpanSF = ((shortSpanInputValue * designLoad)/3) * ((3-(m*m))/2);
  setInnerText('result-shortSpan-sf', shortSpanSF);
}
// step-2 BM
const calculateBM = () => {
   const designLoad =  getInnerText('resultDesignLoad');
   const slabWidth = getInputValue('slab-Width');
   const slabLength = getInputValue('slab-Length');
   // Short span
   const c_cont_short = getInputValue('c-cont-short');
   const BM_cont_short = (c_cont_short * designLoad * (slabWidth * slabWidth))*100;
   setInnerText('short-Cont-ends', BM_cont_short);
   const c_middle_short = getInputValue('c-middle-short');
   const BM_middle_short = (c_middle_short * designLoad * (slabWidth * slabWidth)) * 100;
   setInnerText('short-Middle-span', BM_middle_short);
   const c_discont_short = getInputValue('c-discont-short');
   const BM_discont_short = (c_discont_short * designLoad * (slabWidth * slabWidth)) * 100;
   setInnerText('short-DisC-ends', BM_discont_short);
   // long span
   const c_cont_long = getInputValue('c-cont-long');
   const BM_cont_long = (c_cont_long * designLoad * (slabLength * slabLength)) * 100;
   setInnerText('long-Cont-ends', BM_cont_long);
   const c_middle_long = getInputValue('c-middle-long');
   const BM_middle_long = (c_middle_long * designLoad * (slabLength * slabLength)) * 100;
   setInnerText('long-Middle-span', BM_middle_long);
   const c_discont_long = getInputValue('c-discont-long');
   const BM_discont_long = (c_discont_long * designLoad * (slabLength * slabLength)) * 100;
   setInnerText('long-DisC-ends', BM_discont_long);
}

// calculateDepth
const calculateDepth = () => {
   const M_short = getInputValue('max-BM-short');
   const n = getInputValue('n');
   const fs = getInputValue('fs');
   const fc = getInputValue('fc');
   const k = (n / (n+(fs/fc)));
   const j = 1 - (k/3);
   const R = .5*(fc*j*k);
   const b = 100;
   const ds = Math.pow((M_short/(R*b)), .5);
   setInnerText('Short-span-depth', ds);
   // long
   const M_long = getInputValue('max-BM-long');
   const dl = Math.pow((M_long/(R*b)), .5);
   setInnerText('long-span-depth', dl)
}
// calculateTotalDepth
const calculateTotalDepth = () => {
   const covering = getInputValue('covering');
   const rs = getInputValue('rod-size');
   const ds = getInputValue('effective-depth-short')
   const totalDepthShort = ds + covering + (rs/2);
   setInnerText('Short-span-Total_depth', totalDepthShort);
   const dl = getInputValue('effective-depth-long');
   const totalDepthLong = dl + covering + rs + (rs/2);
   setInnerText('long-span-Total_depth', totalDepthLong)
   
}