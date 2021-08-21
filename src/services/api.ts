const API_URL = 'http://localhost:3001/api'
const HEADERS = {
  'Content-Type': 'application/json'
}

const getFramesFromURL = async (id: string, url: string) => {
  const response = await fetch(`${API_URL}/frames`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      videoId: id,
      videoUrl: url
    })
  })

  let json = await response.json()

  return json
}

export {
  API_URL,
  getFramesFromURL
}