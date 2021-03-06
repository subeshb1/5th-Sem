// This action swaps two items in a list
export const swapItem = (i,j) => {
    return ({
        type: "LIST_SWAP",
        payload:[
            i,j
        ]
    })
}

//This action sets the list
export const setPivot = i => {
    return ({
        type: "LIST_SET_PIVOT",
        payload: i
        
    })
}

//This action sets the cursor position.
export const setCursor = i => {
    return {
         type: "LIST_SET_CURSOR",
         payload:i
    }
}

//This action highlights the compared 
export const compareItem = (i,j) => {
    return {
        type: "LIST_COMPARE",
        payload:[i,j]
    }
}

//This action highlights the stored
export const storeItem = (i,val )=> {
    return {
        type: "LIST_STORE",
        payload:{i,val}
    }
}
//This action sets the boundary positions

export const setBoundary = (i,j) => {
    return {
        type: "LIST_BOUNDARY",
        payload :[i,j]
        
    }
}

//Complete

export const completeList = val => {
    return {
        type: "LIST_COMPLETE",
        payload:val
    }
}