////////////
// step -1 DL
////////////

const calculateLoad = () => {
   const slabThickness = document.getElementById('Self-weight').value;
   const selfWeight = (slabThickness / 100) * 2400;
   const LiveLoad = getInputValue('Live-load');
   const DeadLoad = getInputValue('Dead-load');
   const FloorCeiling = getInputValue('Floor-ceiling');
   const FalseCeiling = getInputValue('False-ceiling');

   let sumLoad = (selfWeight) + (LiveLoad) + (DeadLoad) + (FloorCeiling) + (FalseCeiling);
   setInnerText('resultDesignLoad', sumLoad);

}

// input value//
const getInputValue = (id) => {
   const numberValue = parseFloat(document.getElementById(id).value);
   return numberValue;
}

const getInnerText = (id) => {
   const innerTextNumber = parseFloat(document.getElementById(id).innerText);
   return innerTextNumber;
}
// set inner text //
const setInnerText = (id, value) => {
   parseFloat(document.getElementById(id).innerText = value.toFixed(2));
}

//////////////
// step-2 SF
/////////////

const calculateSF = () => {
   const designLoad = getInnerText('resultDesignLoad');
   const slabWidth = getInputValue('slab-Width');
   const longSpanSF = (slabWidth * designLoad) / 3;
   setInnerText('result-longSpan-sf', longSpanSF)

   const slabLength = getInputValue('slab-Length');
   const m = slabWidth / slabLength;
   const shortSpanSF = ((slabWidth * designLoad) / 3) * ((3 - (m * m)) / 2);
   setInnerText('result-shortSpan-sf', shortSpanSF);
}

////////////
// step-2 BM
////////////

const calculateBM = () => {
   const designLoad = getInnerText('resultDesignLoad');
   const slabWidth = getInputValue('slab-Width');
   const slabLength = getInputValue('slab-Length');
   // Short span
   const c_cont_short = getInputValue('c-cont-short');
   const BM_cont_short = (c_cont_short * designLoad * (slabWidth * slabWidth)) * 100;
   setInnerText('short-Cont-BM', BM_cont_short);
   const c_middle_short = getInputValue('c-middle-short');
   const BM_middle_short = (c_middle_short * designLoad * (slabWidth * slabWidth)) * 100;
   setInnerText('short-Middle-BM', BM_middle_short);
   const c_discont_short = getInputValue('c-discont-short');
   const BM_discont_short = (c_discont_short * designLoad * (slabWidth * slabWidth)) * 100;
   setInnerText('short-DisC-BM', BM_discont_short);
   // long span
   const c_cont_long = getInputValue('c-cont-long');
   const BM_cont_long = (c_cont_long * designLoad * (slabLength * slabLength)) * 100;
   setInnerText('long-Cont-BM', BM_cont_long);
   const c_middle_long = getInputValue('c-middle-long');
   const BM_middle_long = (c_middle_long * designLoad * (slabLength * slabLength)) * 100;
   setInnerText('long-Middle-BM', BM_middle_long);
   const c_discont_long = getInputValue('c-discont-long');
   const BM_discont_long = (c_discont_long * designLoad * (slabLength * slabLength)) * 100;
   setInnerText('long-DisC-BM', BM_discont_long);
}

///////////////////////////
// calculate effective Depth
////////////////////////////

const calculateDepth = () => {
   const covering = parseFloat(document.getElementById('covering').value);
   const rs = parseFloat(document.getElementById('rod-size').value);
   const n = getInputValue('n');
   const fs = getInputValue('fs');
   const fc = getInputValue('fc');
   const k = (n / (n + (fs / fc)));
   const j = 1 - (k / 3);
   setInnerText('j', j)
   const R = .5 * (fc * j * k);
   const b = 100;
   const M_short = getInputValue('max-BM-short');
   const ds = Math.pow((M_short / (R * b)), .5);
   setInnerText('Short-span-EffectiveDepth', ds);
   const Ds = ds + covering + (rs / 2);
   setInnerText('Short-span-TotalDepth', Ds);
   // long
   const M_long = getInputValue('max-BM-long');
   const dl = Math.pow((M_long / (R * b)), .5);
   setInnerText('long-span-EffectiveDepth', dl)
   const Dl = dl + covering + rs + (rs / 2);
   setInnerText('long-span-TotalDepth', Dl);
}

//////////////////////
// calculateTotalDepth
/////////////////////

const calculateTotalDepth = () => {
   const covering = parseFloat(document.getElementById('covering').value);
   const rs = parseFloat(document.getElementById('rod-size').value);
   const D = parseFloat(document.getElementById('minimum-depth').value);
   const totalDepthShort = D - (covering + (rs / 2));
   setInnerText('Short-span-safe-effective-depth', totalDepthShort);
   const totalDepthLong = D - (covering + rs + (rs / 2));
   setInnerText('long-span-safe-effective-depth', totalDepthLong)

}

///////////////////////////
// calculateReinforcement//
///////////////////////////
const calculateReinforcement = () => {
   // continuous short
   const m_continuous = getInnerText('short-Cont-BM');
   const fs = getInputValue('fs');
   const j = getInnerText('j');
   const ds = getInnerText('Short-span-safe-effective-depth');
   const rs = getInputValue('rod-size');
   const As_continuous = m_continuous / (fs * j * ds);
   const as = ((3.14 * (rs * rs)) / 4);
   const s_continuous = Math.floor(Math.round((100 * as) / As_continuous));
   setInnerText('reinforcement-Continuous', s_continuous);
   // middle
   const m_middle = getInnerText('short-Middle-BM');
   const As_middle = m_middle / (fs * j * ds);
   const s_middle = Math.floor(Math.round((100 * as) / As_middle));
   setInnerText('reinforcement-Middle', s_middle);
   //discontinuous
   const m_discontinuous = getInnerText('short-DisC-BM');
   const As_discontinuous = m_discontinuous / (fs * j * ds);
   const s_discontinuous = Math.floor(Math.round((100 * as) / As_discontinuous));
   setInnerText('reinforcement-DisContinuous', s_discontinuous);

   //// continuous long
   const dl = getInnerText('long-span-safe-effective-depth');
   const m_continuous_long = getInnerText('long-Cont-BM');
   const As_continuous_long = m_continuous_long / (fs * j * dl);
   const s_continuous_long = Math.floor(Math.round((100 * as) / As_continuous_long));
   setInnerText('reinforcement-Continuous-long', s_continuous_long);
   //middle
   const m_middle_long = getInnerText('long-Middle-BM');
   const As_middle_long = m_middle_long / (fs * j * dl);
   const s_middle_long = Math.floor(Math.round((100 * as) / As_middle_long));
   setInnerText('reinforcement-Middle-long', s_middle_long);
   //discontinuous
   const m_discontinuous_long = getInnerText('long-DisC-BM');
   const As_discontinuous_long = m_discontinuous_long / (fs * j * dl);
   const s_discontinuous_long = Math.floor(Math.round((100 * as) / As_discontinuous_long));
   setInnerText('reinforcement-DisContinuous-long', s_discontinuous_long);
}

//////////////////////
// calculateShareStress
//////////////////////
const calculateShareStress = () => {
// short
const ds = getInnerText('Short-span-safe-effective-depth');
const Vs = getInnerText('result-shortSpan-sf');
const vs = Vs / (100 * ds);
setInnerText('share-stress-short-span', vs);

const dl = getInnerText('long-span-safe-effective-depth');
const Vl = getInnerText('result-longSpan-sf');
const vl = Vl / (100 * dl);
setInnerText('share-stress-long-span', vl);
}

// /////////////////////////
// calculateBondStress
////////////////////////////
const calculateBondStress = () => {
   //short
   const j = getInnerText('j');
   const rs = getInputValue('rod-size');
   const Spacing_short = getInputValue('minimum-spacing-short-span');
   const ds = getInnerText('Short-span-safe-effective-depth');
   const Vs = getInnerText('result-shortSpan-sf');
   const rodNos = 100 / Spacing_short;
   setInnerText('needed-rod-short', rodNos);
   const perimeter = rodNos * 3.14 * rs;
   const us = Vs / (perimeter * j * ds);
   setInnerText('bond-stress-short-span', us);

   //long
   const Spacing_long = getInputValue('minimum-spacing-long-span');
   const dl = getInnerText('long-span-safe-effective-depth');
   const Vl = getInnerText('result-longSpan-sf');
   const rodNosLong = 100 / Spacing_long;
   setInnerText('needed-rod-long', rodNosLong);
   const perimeterLong = rodNosLong * 3.14 * rs;
   const ul = Vl / (perimeterLong * j * dl);
   setInnerText('bond-stress-long-span', ul);

}