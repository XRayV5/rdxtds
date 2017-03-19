import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
// import { loadState, saveState } from './localStorage'
import { throttle } from 'lodash'
import promise from 'redux-promise'
import createLogger from 'redux-logger'

const logger = (store) => (next) => {
    if(!console.group) {
        return next
    }
    return action => {
        console.group(action.type)
        console.log('%c prev state', 'color: gray', store.getState())
        console.log('%c action', 'color: blue', action)
        const returnValue = next(action)
        console.log('%c next state', 'color: green', store.getState())
        console.groupEnd(action.type)
        return returnValue
    }
}

// const logger = (store) => {
//     return (next) => {
//         if(!console.group) {
//             return next
//         }
//         return action => {
//             console.group(action.type)
//             console.log('%c prev state', 'color: gray', store.getState())
//             console.log('%c action', 'color: blue', action)
//             const returnValue = next(action)
//             console.log('%c next state', 'color: green', store.getState())
//             console.groupEnd(action.type)
//             return returnValue
//         }
//     }
// }

// refactored with arrow functions
const _promise = (store) => (next) => (action) => {
    if (typeof action.then === 'function'){
        return action.then(next)
    }
    return next(action)
}

// const promise = (store) => {
//     return (next) => {
//         return (action) => {
//             if (typeof action.then === 'function'){
//                 return action.then(next)
//             }
//             return next(action)
//         }
//     }
// }


// use applyMiddleware instead###
// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//     middlewares.slice().reverse().forEach( middleware => 
//         store.dispatch = middleware(store)(store.dispatch)
//     )
// } 


const configureStore = () => {

    // ### Not using local storage, changed to use a fake backend
    // const persistedState = loadState()

// {
//   todos: [{
//     id : '0',
//     text : 'Welcome back!',
//     completed : false
//   }],
//   visibilityFilter: undefined
// }

    // const store = createStore(reducer, persistedState)
    // fix the sequence of middleware invokation in middlewares array
    const middlewares = [promise]
    if (process.env.NODE_ENV !== 'production') {
        // use redux-logger instead of logger 
        middlewares.push(createLogger())
    }
    
    // middlewares.push(promise)
    return createStore(
        reducer, 
        applyMiddleware(...middlewares)
    )
    // wrapDispatchWithMiddlewares(store, middlewares)

    // store.subscribe(throttle(() => {
    // saveState({todos : store.getState().todos})
    // }, 1000))
    // store.dispatch = promise(store)
    // return store
}

export default configureStore