import React from "react"
import AddEditEarlyBirdPricing from './Early/AddEdit';
import AddEditHoliDay from './AddEdit';
import AddEditEarlyBirdInvantory from "./Inventory/AddEdit";
import AddEditEarlyBirdTimeframe from "./TimeFrames/AddEdit";
import AddEditLastminutefixeddates from "./LastMinuteFixedDates/AddEdit";
import AddEditLastminuteinventory from "./LastMinuteInventory/AddEdit";
const AddEditDynamicPricing=({dynamicPricingId,isCopy=false,productData,dType='',result})=>{

    return <>
    {dType=='publicHoliday'||dType=='schoolHoliday'||dType=='events'?<>
    <AddEditHoliDay
    dynamicPricingId={dynamicPricingId}
    dType={dType}
    isCopy={isCopy}
    productData={productData}
    result={result}
    />
    </>:<></>}
    {dType=='earlyBirdCustomDates'?<>
    <AddEditEarlyBirdPricing
    dynamicPricingId={dynamicPricingId}
    dType={dType}
    isCopy={isCopy}
    productData={productData}
    result={result}
    />
    </>:<></>}
    {dType=='earlybirdinventory'?<>
    <AddEditEarlyBirdInvantory
    dynamicPricingId={dynamicPricingId}
    dType={dType}
    isCopy={isCopy}
    productData={productData}
    result={result}
    />
    </>:<></>}
    {dType=='earlybirdtimeframes'?<>
    <AddEditEarlyBirdTimeframe
    dynamicPricingId={dynamicPricingId}
    dType={dType}
    isCopy={isCopy}
    productData={productData}
    result={result}
    />
    </>:<></>}
    {dType=='lastminutefixeddates'?<>
    <AddEditLastminutefixeddates
    dynamicPricingId={dynamicPricingId}
    dType={dType}
    isCopy={isCopy}
    productData={productData}
    result={result}
    />
    </>:<></>}
    {dType=='lastminuteinventory'?<>
    <AddEditLastminuteinventory
    dynamicPricingId={dynamicPricingId}
    dType={dType}
    isCopy={isCopy}
    productData={productData}
    result={result}
    />
    </>:<></>}
    
    </>
}

export default AddEditDynamicPricing