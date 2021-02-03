//arrays are am & pm arrays of objects [{},{}, etc] sorted by days, descending (most recent first)
//arr1 =am, arr2 = pm so that am will show up before PM
function mergeDay(arr1, arr2) {
    let sorted =[];
    let i = 0;
    let j = 0;

    while(i < arr1.length && j < arr2.length){
        console.log("i",arr1[i].day,"j", arr2[j].day, "i<j?",arr1[i].day < arr2[j].day)
        //compare values and push larger day onto sorted
        if(arr1[i].day === arr2[j].day){
            console.log("i",arr1[i].day,"j", arr2[j].day )
            console.log("is equal")
            sorted.push({...arr1[i], ...arr2[j]});
            i++;
            j++;        
        } else if(arr1[i].day > arr2[j].day){
            sorted.push(arr1[i]);
            i++;
        } else {
            sorted.push(arr2[j]);
            j++;
        }
    }

    while(i < arr1.length){
        sorted.push(arr1[i]);
        i++;
    }

    while(j < arr2.length){
        sorted.push(arr2[j]);
        j++;
    }
    // console.log(sorted)
    return sorted;
}

export default mergeDay;
