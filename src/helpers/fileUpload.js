
export const fileUpload = async ( file ) => {
    //https://api.cloudinary.com/v1_1/{ TU Cloud Name }/upload
    //const cloudUrl = 'https://439738576113468:mbwAbci0LiOO5RjGOv9eYlA_1S8@api.cloudinary.com/v1_1/udg/upload';
    const cloudUrl = 'https://api.cloudinary.com/v1_1/udg/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        // por defecto es get, cambiar por post
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (resp.ok) {
            // lo obtenido, es el json de la peticion en postman, es decir, JSON POSTMAN = RESP.JSON()
            const cloudResp = await resp.json()
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }

    } catch (err) {
        throw err;
    }

}
