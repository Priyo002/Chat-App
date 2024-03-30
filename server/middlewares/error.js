const errorMiddleware=(err,req,res,next)=>{
    err.message ||= "Internal Server Error";
    err.statusCode ||=500;

    return res.status(err.statusCode).json({
        successs:false,
        message:err.message,
    });
};

const TryCatch=(passesFunc)=>async(req,res,next)=>{
    try{
        await passesFunc(req,res,next);
    }catch(error){
        next(error);
    }
};


export {errorMiddleware,TryCatch};