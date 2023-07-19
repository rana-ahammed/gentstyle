async function ImagetoBase64(file) {
    let reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
    }

    const data = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
    });

    return data;
}

export default ImagetoBase64;
