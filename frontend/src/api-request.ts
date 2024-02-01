// appel a la function fetch
// afaka manampy configuration eto pour chaque methode *RADO ho amin'ny hoavy
export async function getCall(url: string) {
  const response = await fetch(url)
  if (response.status < 200 || response.status >= 300) {
    // return Promise.reject(new Error(await response.text()));
    throw new Error(await response.text())
  }
  return response.json()
}
export async function putCall(url: string, body: any) {
  const config = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  }
  const response = await fetch(url, config)
  if (response.status < 200 || response.status >= 300)  {
    // return Promise.reject(new Error(await response.text()));
    throw new Error(await response.text())
  }
  return response.json()
}
export async function deleteCall(url: string, body: any) {
  const config = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  }
  const response = await fetch(url, config)
  if (response.status < 200 || response.status >= 300)  {
    // return Promise.reject(new Error(await response.text()));
    throw new Error(await response.text())
  }
  return response.json()
}
export async function postCall(url: string, body: any) {
  const config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  }
  const response = await fetch(url, config)
  if (response.status < 200 || response.status >= 300)  {
    // return Promise.reject(new Error(await response.text()));
    throw new Error(await response.text())
  }
  return response.json()
}
