import View from './View.js'
import icons from 'url:../../img/icons.svg'
import * as model from '../model.js'

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination')

  // Switching pages | publisher
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline')

      if (!btn) return

      const goToPage = +btn.dataset.goto

      handler(goToPage)
    })
  }

  // Generate pagination button Markup
  _generateMarkup() {
    const currentPage = this._data.page
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    )

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButtonNext(currentPage)
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButtonPrev(currentPage)
    }

    // Other page
    if (currentPage < numPages) {
      return this._generateMarkupButtonOther(currentPage)
    }

    // Page 1, and there are not other pages
    return ''
  }

  // Generate pagination button markup (helper)
  _generateMarkupButtonOther(page) {
    return `
        <button data-goto='${
          page - 1
        }' class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
        
        <button data-goto='${
          page + 1
        }' class="btn--inline pagination__btn--next">
          <span>Page ${page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button> 
      `
  }

  _generateMarkupButtonPrev(page) {
    return `
        <button data-goto='${
          page - 1
        }' class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
      `
  }

  _generateMarkupButtonNext(page) {
    return `
        <button data-goto='${
          page + 1
        }' class="btn--inline pagination__btn--next">
          <span>Page ${page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button> 
      `
  }
}

export default new PaginationView()
