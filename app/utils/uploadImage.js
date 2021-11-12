import axios from "axios";

const uploadImage = async (imageData) => {
    try {
        const body = new FormData();
        body.set("key", "9f71d9cff4efa4e7eda61275e33df975");
        body.append("image", imageData);

        const result = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload",
            data: body
        });

        if (result.data.success) {
            return {
                success: true,
                url: result.data.data.url
            };
        } else {
            return {
                success: false
            };
        }
    } catch (error) {
        return {
            success: false
        };
    }
};

export default uploadImage;
