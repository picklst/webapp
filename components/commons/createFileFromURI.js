
export default async function createFileFromURI({ dataURI, fileName = false, }){
    let response = await fetch(dataURI);
    let data = await response.blob();
    return new File([data], fileName);
}