const redux = require("redux");
const createStore = redux.createStore;  //Redux method that creates an store
const combineReducers = redux.combineReducers; //Redux method that combines multiple reducers

// Actions

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// Action creators

function buyCake() {
    return {
        type: BUY_CAKE,
        info: "First redux action",
    };
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM,
        info: "Second redux action",
    };
}


//------------------------

// initial states
const initialCakeState = {
    numOfCakes: 10,
};
const initialIceCreamState = {
    numOfIceCreams: 20,
};


//-------------------------

// Reducers (prevState, action) => newState
/*
    Here we define a single reducer for each state, this is for scability, and a better architecture to find possible future bugs.
*/
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            };

        default:
            return state;
    }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1,
            };

        default:
            return state;
    }
};
// combine the multiple reducers to have just one global state object
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
});

// Store
// The createStore method acccept only one reducer that tells to the store how the state changes depending of the actions received.

const store = createStore(rootReducer); //This method only accepts one reducer, that's why we need to combine de reducers.

console.log("Initial State :", store.getState()); // Print the initial global state
const unsubscribe = store.subscribe(() =>
    console.log("updated state", store.getState())
); //Subscribe a listener to know how the state is changing, ¿and unsubscribe at the same time?

store.dispatch(buyCake()); //Dispatch the actions
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe(); // finally unsubscribe the listener from the store
