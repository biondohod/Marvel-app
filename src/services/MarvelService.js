import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
    const {request, loading, error} = useHttp();

    const apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const apiKey = 'apikey=feadd863341af4064806e0d8817d09c1'
    const baseOffset = 194;

    const getAllCharacters = async (offset = baseOffset) => {
        const res = await request(`${apiBase}characters?limit=9&offset=${offset}&${apiKey}`);
        return res.data.results.map(transformData);
    };

    const getCharacter = async (id) => {
        const res = await request(`${apiBase}characters/${id}?${apiKey}`);
        const comics = await request(`${apiBase}characters/${id}/comics?${apiKey}`);
        return transformData(res.data.results[0], comics.data.results);
    };


    const transformData = (char, comicsList) => {
        const {name, description, thumbnail, urls, id} = char;
        let comicsTransformed;
        try {
            comicsTransformed = comicsList.map((comic) => {
                return {
                    name: comic.title,
                    id: comic.id
                }
            })
        } catch(e) {comicsTransformed = []}
        return {
            name: name,
            description: description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: thumbnail.path + '.' + char.thumbnail.extension,
            homepage: urls[0].url,
            wiki: urls[1].url, 
            id: id,
            comicsList: comicsTransformed
        };
    };

    const getAllComics = async (offset = baseOffset) =>{
        const res = await request(`${apiBase}comics?limit=8&offset=${offset}&${apiKey}`);
        return res.data.results.map(transformComicsData);
    };

    const getComic = async (id) =>{
        let errorCode;
        const res = await request(`${apiBase}comics/${id}?${apiKey}`)
                            .then((res) => {
                                return transformComicsData(res.data.results[0])
                            })
                            .catch(e => {
                                errorCode = +e.message.slice(-3);
                            })
        return {res, errorCode};
    };

    const transformComicsData = (comics) => {
        const {id, title, prices, thumbnail, textObjects, urls} = comics;

        return {
            id,
            title,
            url: urls[0].url,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the number of pages',
            thumbnail: thumbnail.path + '.' + thumbnail.extension,
            language: textObjects.language || 'en-us',
            price: prices[0].price ? `${prices[0].price}$` : 'Not available'
        }
    };


    return {baseOffset, loading, error, getAllCharacters, getCharacter, getAllComics, getComic}
}

export default useMarvelService;