const countryTbl = require('../models/countryTbl');
const stateTbl = require('../models/stateTbl');
const cityTbl = require('../models/cityTbl');

const addCountry = async (req,res) => {
    try {
        const{name} = req.body;
        let countryData = await countryTbl.create({
            name : name
        });
        if(countryData){
            res.json({ message : "Data added successfully", status : 1});
        }else{
            res.json({ message : "Data not added", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewCountry = async (req,res) => {
    try {
        let countries = await countryTbl.find({});
        if(countries){
            res.json({ Data : countries, status : 1});
        }else{
            res.json({ message : "Data not found", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const addState = async (req,res) => {
    try {
        const{countryId,name} = req.body;
        let stateData = await stateTbl.create({
            countryId : countryId,
            name:  name
        });
        if(stateData){
            res.json({ message : "State added successfully", status : 1});
        }else{
            res.json({ message : "State not added", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewState = async (req,res) => {
    try {
        let states = await stateTbl.find({}).populate('countryId');
        if(states){
            res.json({ Data : states, status : 1});
        }else{
            res.json({ message : "Data not found", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const addCity = async (req,res) => {
    try {
        const{countryId,stateId,name} = req.body;
        let cityData = await cityTbl.create({
            countryId : countryId,
            stateId : stateId,
            name:  name
        });
        if(cityData){
            res.json({ message : "State added successfully", status : 1});
        }else{
            res.json({ message : "State not added", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewCity = async (req,res) => {
    try {
        let cities = await cityTbl.find({}).populate('countryId').populate('stateId');
        if(cities){
            res.json({ Data : cities, status : 1});
        }else{
            res.json({ message : "Data not found", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}


const updateCountry = async (req,res) => {
    try {
        const{id,name} = req.body;
        let upCountry = await countryTbl.findByIdAndUpdate(id,{
            name : name
        });
        if(upCountry){
            res.json({ message : "Data updated", status : 1});
        }else{
            res.json({ message : "Data not updated", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updateState = async (req,res) => {
    try {
        const{id,countryId,name} = req.body;
        let upState = await stateTbl.findByIdAndUpdate(id,{
            countryId : countryId,
            name:  name
        });
        if(upState){
            res.json({ message : "Data updated", status : 1});
        }else{
            res.json({ message : "Data not updated", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updateCity = async (req,res) => {
    try {
        const{id,countryId,stateId,name} = req.body;
        let upCity = await cityTbl.findByIdAndUpdate(id,{
            countryId : countryId,
            stateId : stateId,
            name:  name
        });
        if(upCity){
            res.json({ message : "Data updated", status : 1});
        }else{
            res.json({ message : "Data not updated", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteCity = async (req,res) => {
    try {
        const{id} = req.body;
        let delCity = await cityTbl.findByIdAndDelete(id);
        if(delCity){
            res.json({ message : "Data deleted", status: 1});
        }else{
            res.json({ message : "Data not deleted", status: 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteState = async (req,res) => {
    try {
        const{id} = req.body;
        
        let ncity =  await cityTbl.find({ stateId : id});
        if(ncity){
            await cityTbl.findByIdAndDelete(ncity[0].id);
            let delState = await stateTbl.findByIdAndDelete(id);
            
            if(delState){
                res.json({ message : "Data deleted", status: 1});
            }else{
                res.json({ message : "Data not deleted", status: 0});
            }
        }else{
            res.json({ message : "Data not deleted", status: 0});
        }
        
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteCountry = async (req,res) => {
    try {
        const{id} = req.body;
        let nstate = await stateTbl.find({ countryId : id});
        if(nstate){
            await stateTbl.findByIdAndDelete(nstate[0].id);
            let ncity = await cityTbl.find({ countryId : id});

            if(ncity){
                await cityTbl.findByIdAndDelete(ncity[0].id);
                let ncountry = await countryTbl.findByIdAndDelete(id);

                if(ncountry){
                    res.json({ message : "Data deleted", status: 1});
                }else{
                    res.json({ message : "Data not deleted", status: 0});
                }
            }else{
                res.json({ message : "Data not deleted", status: 0});
            }
        }else{
            res.json({ message : "Data not deleted", status: 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    addCountry,
    viewCountry,
    addState,
    viewState,
    addCity,
    viewCity,
    deleteCountry,
    updateCountry,
    updateState,
    updateCity,
    deleteCity,
    deleteState
}