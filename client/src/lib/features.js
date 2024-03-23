
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

const transformImage = (url="", width=100) => url;


export { fileFormat , transformImage}