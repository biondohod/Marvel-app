class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=feadd863341af4064806e0d8817d09c1'
    _baseOffset = 194;
    getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            res.reject();
        }
        return res.json();
    };

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformData);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        const comics = await this.getResource(`${this._apiBase}characters/${id}/comics?${this._apiKey}`);
        return this._transformData(res.data.results[0], comics.data.results);
    }

    _transformData = (char, comicsList) => {
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
    }
}

export default MarvelService;