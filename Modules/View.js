export class View {
    constructor() {
        this.categoryList = this.selectElement('#category-list');
        this.randomJoke = this.selectElement('#random-joke');
        this.searchField = this.selectElement('#search-field');
        this.filteredList = this.selectElement('#joke-list');

        this.searchInput = this.createElement('input', 'search-input');
        this.searchMessage = this.createElement('span', 'search-message');
    }

    searchInputEvent(modelFunction) {
        this.searchInput.addEventListener('input', () => {
            this.searchMessage.textContent = '';
            const searchTerm = this.searchInput.value;
            if (searchTerm.length >= 4) {
                this.showLoadingIndicator(this.filteredList);
                modelFunction(searchTerm);
            } else {
                this.searchMessage.textContent = "minimum 4 character!";
                this.deleteFilteredList();
            }
        })
    }

    selectCategoryEvent(modelFunction) {
        this.showLoadingIndicator(this.randomJoke);
        this.categoryList.addEventListener('click', (event) => {
            if (event.target.nodeName === 'LI') {
                const categoryName = event.target.innerText === 'ALL' ? '' : event.target.innerText;
                modelFunction(categoryName);
            }
        })
    }

    deleteFilteredList() {
        while (this.filteredList.firstChild) {
            this.filteredList.firstChild.remove();
        }
    }

    renderFilteredJokeList(filteredJokeList) {
        this.deleteFilteredList();
        const newFilteredList = this.createElement('ul');
        filteredJokeList.forEach((joke) => {
            const newFilteredListItem = this.createElement('li', 'joke-list-item');
            newFilteredListItem.textContent = joke.value;
            newFilteredList.append(newFilteredListItem);
        })
        this.filteredList.append(newFilteredList);
    }

    renderSearchForm() {
        this.searchInput.placeholder = '...search text (min 4 char)...';
        this.searchMessage.textContent = '';
        this.searchField.append(this.searchInput, this.searchMessage);
    }

    renderCategoryList(categories) {
        const newCategoryList = this.createElement('ul');
        categories.forEach((item) =>{
            const newCategoryListItem = this.createElement('li', 'category-list-item');
            newCategoryListItem.textContent = item;
            newCategoryList.append(newCategoryListItem);
        })
        this.categoryList.textContent = '';
        this.categoryList.append(newCategoryList);
    }

    renderRandomJoke(randomJokeText) {
        const newRandomJoke = this.createElement('span');
        newRandomJoke.textContent = randomJokeText;
        this.randomJoke.textContent = '';
        this.randomJoke.append(newRandomJoke);
    }

    showLoadingIndicator(element) {
        element.textContent = '';
        const loadingIndicator = this.createElement('span','loading-indicator');
        loadingIndicator.textContent = 'Loading...';
        element.append(loadingIndicator);
    }

    createElement(tagName, className) {
        const newElement = document.createElement(tagName);
        if (className) {
            newElement.classList.add(className);
        }
        return newElement;
    }

    selectElement(selector) {
        return document.querySelector(selector);
    }
}