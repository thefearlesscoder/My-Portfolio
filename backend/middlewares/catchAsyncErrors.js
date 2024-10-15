// this funtion will accect another function as a promise and try to resolve it, if not resolve then 
//return the error and move to the next function.
export const catchAsyncErrors = (theFunction) =>{
    return (req,res,next) =>{
        Promise.resolve(theFunction(req,res,next)).catch(next)
    }
}