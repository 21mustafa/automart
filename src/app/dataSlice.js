import { data } from "../common/data";
import { createSlice } from '@reduxjs/toolkit'

const shuffleArr = (array) => {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

const setData = (carParts) => {
    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const getDiscount = (price) => {
        const discountPercentage = (Math.random() * 75) + 5; 
        return {
            discounterPrice: (((100 - discountPercentage) * price) / 100).toFixed(2),
            discount: discountPercentage
        };
    }

    const clonedCarParts = [];
    carParts.forEach((carPart, index) => {
        const carPartInfo = {...carPart};
        // carPartInfo.price = ((Math.random() * 1000) + 250).toFixed(2);
        carPartInfo.year = [2016, 2017, 2018, 2019];

        if (index >= 30) {
            const discountInfo =  getDiscount(carPartInfo.price);
            carPartInfo.discount = discountInfo.discount;
            carPartInfo.discountedPrice = discountInfo.discounterPrice;
        }

        if (index >= 25 && index <= 45) {
            carPartInfo.isBestSeller = true;
        }

        clonedCarParts.push(carPartInfo);
    });

    return clonedCarParts;
}

const carParts = shuffleArr(setData(shuffleArr(data)));

export const dataSlice = createSlice({
    name: "data",
    initialState: {
      carParts,
    },
    reducers: {
    },
  })
  
  export const dataReducer = dataSlice.reducer;
