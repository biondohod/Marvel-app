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
        return res.map(this._transformData);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformData(res.data.results[0]);
    }

    _transformData = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        };
    }
}

export default MarvelService;