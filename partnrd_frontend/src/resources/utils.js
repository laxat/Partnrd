
export function convertSlugUrl(slug, parameters)
{
    let url = slug;
    Object.entries(parameters).forEach(([key, value]) => {
        url = url.replace(`:${key}`, value); 
    });
    return url; 
}
