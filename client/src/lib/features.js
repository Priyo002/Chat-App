import moment from "moment";

const fileFormat = (url="") => {
    const fileExt = url.split(".").pop();

    if(fileExt==="mp4" || fileExt=="webm" || fileExt==="ogg")
        return "video";
    else if(fileExt==="mp3" || fileExt=="wav" )
        return "audio";
    else if(fileExt==="png" || fileExt==="jpg" || fileExt==="jpeg" || fileExt==="gif")
        return "image";
    else return "file";

}

const transformImage = (url="", width=100) => {
    // const newUrl = url.replace("upload/",`upload/dpr_auto/w_${width}/`);
    // return newUrl;
    return url;
};

const getLast7Days =()=>{
    const currentDate=moment();
    const last7Days=[];
    for(let i=0;i<7;i++){
        const dayDate=currentDate.clone().subtract(i,"days");
        const dayName=dayDate.format("dddd");

        last7Days.unshift(dayName);
    }
    return last7Days;
};

export { fileFormat , transformImage , getLast7Days}