class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=feadd863341af4064806e0d8817d09c1'
    getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            res.reject();
        }
        return res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&${this._apiKey}`);
        return res.data.results.map(this._transformData);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformData(res.data.results[0]);
    }

    _transformData = (char) => {
        const {name, description, thumbnail, urls, id} = char;
        return {
            name: name,
            description: description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: thumbnail.path + '.' + char.thumbnail.extension,
            homepage: urls[0].url,
            wiki: urls[1].url, 
            id: id
        };
    }
}

export default MarvelService;