import axios from "axios";

const uploadImage = async (imageData) => {

    const body = new FormData();
    body.set("key", "9f71d9cff4efa4e7eda61275e33df975");
    body.append("image", imageData);

    return await axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload",
        data: body
    });
};

export default uploadImage;
