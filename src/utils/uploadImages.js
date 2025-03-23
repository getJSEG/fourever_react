import axios from "axios";

export const uploadImage = async(urls, images) => {

    // console.log("this si the images array",images);
    
    // const newArray = images.filter( (obj) => obj?.image !== undefined);
    // console.log(newArray[0]?.image);

    const uploadPromises = urls.map((url, index) => {
        if(images[index]?.image !== undefined) {
            let formData = new FormData();

            formData.append('file', images[index]?.image);
        
            return axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'blob',
            });
        }
      });
    


    try{

        const responses = await Promise.all(uploadPromises);
        return responses;
    }catch (error) {
        console.log(JSON.stringify(error))
    }
    
}
