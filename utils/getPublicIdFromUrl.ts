export const getPublicIdFromUrl = (url: string) => {
    const regex = /\/upload\/v\d+\/(.+?)\.\w{3,4}$/;
    console.log(url)
    const match = String(url).match(regex);
    return match ? match[1] : null;
}