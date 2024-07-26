window.addEventListener('DOMContentLoaded', main)

function main() {
  const pagination = document.querySelector('.collection-pagination')
  if (!pagination) {
    return
  }
  const links = document.querySelectorAll('.collection-pagination__item a')
  if (!links.length) {
    return
  }
  const topSelector = pagination.dataset?.top ?? 'header'
  const contentSelector = pagination.dataset?.content
  if (!contentSelector) {
    return
  }
  const offset = pagination?.dataset?.offset ?? 0
  const top = document.querySelector(topSelector)
  const content = document.querySelector(contentSelector)

  if (!content) {
    return
  }

  links.forEach(listenPaginationEvent)

  function listenPaginationEvent(link) {
    link.addEventListener('click', async (event) => {
      event.preventDefault()
      const page = event.target.closest('a').getAttribute('data-page')

      const pageName = pagination.dataset?.pagename ?? ''
      const url = `${window.location.href.split('#')[0]}${pageName}.json/page:${page}`

      try {
        const response = await fetch(url)
        const { html, pagination } = await response.json()
        content.innerHTML = html
        document.querySelector('.collection-pagination').outerHTML = pagination
        const links = document.querySelectorAll('.collection-pagination__item a')
        window.scrollTo({ top: top.offsetTop - offset })
        links.forEach(listenPaginationEvent)
      }
      catch (error) {
        console.log('Fetch error: ', error)
      }
    })
  }
}
