'use server';

export async function uploadProduct(formdata: FormData) {
    const data = {
        photo: formdata.get('photo'),
        title: formdata.get('title'),
        price: formdata.get('price'),
        description: formdata.get('description'),
    };
    console.log(data);
}
