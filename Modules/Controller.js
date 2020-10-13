export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.renderSearchForm();
        this.view.showLoadingIndicator(this.view.categoryList);

        this.model.getCategories()
            .then(() => {
                this.view.renderCategoryList(this.model.jokeCategories);
            })

        this.model.getRandomJoke()
            .then(() => {
                this.view.renderRandomJoke(this.model.randomJoke);
            })

        this.view.searchInputEvent((searchTerm) => this.model.getFilteredJokes(searchTerm)
            .then(() => {
                this.view.renderFilteredJokeList(this.model.filteredJokes);
            }));

        this.view.selectCategoryEvent((category) => this.model.getRandomJoke(category)
            .then(() => {
                this.view.renderRandomJoke(this.model.randomJoke);
            }))
    }
}