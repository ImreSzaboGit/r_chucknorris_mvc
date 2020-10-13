export class Model {
    constructor() {
        this.jokeCategories = [];
        this.randomJoke = null;
        this.filteredJokes = [];
        this.baseUrl = "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/"
        this.fetchInit = {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
                "x-rapidapi-key": "f50841a3bamsh35b2cb62aa4fdc8p163de9jsne7fdd1f4c278",
                "accept": "application/json"
            }
        }
    }

    async getRandomJoke(selectedCategory) {
        let url = selectedCategory ? `${this.baseUrl}random?category=${selectedCategory}` : `${this.baseUrl}random`;
        await fetch(url, this.fetchInit)
            .then((response) => this.errorHandler(response))
            .then((response) => response.json())
            .then((data) => this.randomJoke = data.value)
            .catch(reason => console.log(reason));
    }

    async getCategories() {
        await fetch(`${this.baseUrl}categories`, this.fetchInit)
            .then((response) => this.errorHandler(response))
            .then((response) => response.json())
            .then((data) => {
                data.unshift('ALL');
                this.jokeCategories = data;
            })
            .catch(reason => console.log(reason));
    }

    async getFilteredJokes(searchTerm) {
        await fetch(`${this.baseUrl}search?query=${searchTerm}`, this.fetchInit)
            .then((response) => this.errorHandler(response))
            .then((response) => response.json())
            .then((data) => {
                this.filteredJokes = data.result;
            })
            .catch(reason => console.log(reason));
    }

    errorHandler(response) {
        if (!response.ok) {
            throw Error(`Error: ${response.status}`);
        }
        return response;
    }

}