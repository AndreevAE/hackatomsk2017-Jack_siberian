const initialState = {
    superTest: 'SUPER TEST'
}


export default function main(state = initialState, action) {
    switch (action.type) {
        default:
            return {...state}
    }
}
