const wikiTitleMap = {
  'Taj Mahal, Agra': 'Taj Mahal',
  'Jaipur, Rajasthan': 'Jaipur',
  'Goa, India': 'Goa',
  'Varanasi, Uttar Pradesh': 'Varanasi',
  'Kerala Backwaters': 'Kerala backwaters',
  'Leh-Ladakh': 'Ladakh',
  'Gateway of India, Mumbai': 'Gateway of India',
  'Golden Temple, Amritsar': 'Golden Temple, Amritsar'
}

export function getWikiTitle(destinationName) {
  return wikiTitleMap[destinationName] || destinationName.split(',')[0].trim()
}

export async function fetchWikipediaSummary(title) {
  const safeTitle = encodeURIComponent(title.replace(/\s+/g, '_'))
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${safeTitle}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Wikipedia summary failed for ${title}`)
  }

  const data = await response.json()
  const image = data.originalimage?.source || data.thumbnail?.source || null
  return {
    image,
    description: data.extract || null,
    pageUrl: data.content_urls?.desktop?.page || null,
  }
}

export async function fetchDestinationWikiData(destination) {
  const title = destination.wikiTitle || getWikiTitle(destination.name)
  return fetchWikipediaSummary(title)
}

export async function searchAndFetchSummary(query) {
  // Use MediaWiki search API to find the best matching page title, then fetch its summary
  const safeQuery = encodeURIComponent(query)
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${safeQuery}&srlimit=1`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Wikipedia search failed')
  const data = await res.json()
  const first = data?.query?.search?.[0]
  if (!first) throw new Error('No Wikipedia match found')

  return fetchWikipediaSummary(first.title)
}
