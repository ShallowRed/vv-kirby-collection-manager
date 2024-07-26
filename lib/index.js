window.addEventListener('DOMContentLoaded', main)

function main() {
  const pagination = document.querySelector('.collection-pagination')
  const links = document.querySelectorAll('.collection-pagination__item a')
  const topSelector = pagination.dataset.top
  const contentSelector = pagination.dataset.content
  const top = document.querySelector(topSelector)
  const content = document.querySelector(contentSelector)

  if (!links.length || !top || !content) {
    return
  }

  links.forEach(listenPaginationEvent)

  function listenPaginationEvent(link) {
    link.addEventListener('click', async (event) => {
      event.preventDefault()
      const page = event.target.closest('a').getAttribute('data-page')
      const url = new URL(`${window.location.href.split('#')[0]}.json/page:${page}`)

      try {
        const response = await fetch(url)
        const { html, pagination } = await response.json()
        content.innerHTML = html
        document.querySelector('.collection-pagination').outerHTML = pagination
        const links = document.querySelectorAll('.collection-pagination__item a')
        window.scrollTo({ top: top.offsetTop })
        links.forEach(listenPaginationEvent)
      }
      catch (error) {
        console.log('Fetch error: ', error)
      }
    })
  }
}
