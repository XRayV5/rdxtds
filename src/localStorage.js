export const loadState = () => {
    try {
        console.log('run!')
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        console.log('load', err)
        return undefined
    }
}

export const saveState = (state) => {
    try {
        console.log('saved!')
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (err) {
        console.log(err)
    }
}