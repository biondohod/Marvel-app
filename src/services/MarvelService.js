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
        const {name, description, thumbnail, urls, id, comics} = char;
        let comicsTransformed;
        try {
            comicsTransformed = comicsList.map((comic) => {
                return {
                    name: comic.title,
                    url: comic.urls[0].url
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
            comics: comics.items,
            comicsList: comicsTransformed
        };
    };

    const getAllComics = async (offset = baseOffset) =>{
        const res = await request(`${apiBase}comics?limit=8&offset=${offset}&${apiKey}`);
        return res.data.results.map(transformComicsData);
    };

    const transformComicsData = (comics) => {
        const {id, title, prices, thumbnail} = comics;

        let price = prices[0].price;

        if (!price || price === '0') {
            price = 'Not available';
        } else {
            price += '$';
        }

        return {
            id,
            title,
            price,
            thumbnail: `${thumbnail.path}.${thumbnail.extension}` 
        }
    };


    return {baseOffset, loading, error, getAllCharacters, getCharacter, getAllComics}
}

export default useMarvelService;