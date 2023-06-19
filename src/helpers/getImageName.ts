const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}


export const getImageName = (str:string) => {
    return removeAccents(str).toLowerCase().replaceAll(" ", "_",);
}