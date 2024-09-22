const {buildModule}=require("@nomicfoundation/hardhat-ignition/modules");

module.exports=buildModule("LearningtrackerdappModule",(m)=>{
    const learn=m.contract("Learn");
    return (learn);
})