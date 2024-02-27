export const MaxRows = 5
export function getProfileStorage(auth:boolean = true){
  const user = sessionStorage.getItem('person_profil')
  if (user==null && auth) throw new Error("Veuillez-vous connecter")
  if (user==null) return null
  return JSON.parse(user)
}
export function removeProfileStorage(){
    sessionStorage.removeItem('person_profil')
}
// config nle header, afaka manampy header hafa via additionalHeaders
function setConfig(method: string, token: string, role: string, body: any = null, additionalHeaders: object = {}) {
  return  {
    method: method,
    headers: Object.assign({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
      'role': role
    }, additionalHeaders),
    body: body ? JSON.stringify(body) : null
  }
}


// appel a la function fetch
// afaka manampy configuration eto pour chaque methode *RADO ho amin'ny hoavy
export async function getCall(url: string, auth:boolean=true) {
  const profile = getProfileStorage(auth)
  const response = await fetch(url,setConfig('GET',profile?.token,profile?.role))
  if (response.status < 200 || response.status >= 300) {
    throw new Error(JSON.parse(await response.text()))
  }
  return response.json()
}
export async function putCall(url: string, body: any, auth:boolean=true) {
  const profile = getProfileStorage(auth)
  const response = await fetch(url, setConfig('PUT',profile?.token,profile?.role,body))
  if (response.status < 200 || response.status >= 300)  {
    throw new Error(JSON.parse(await response.text()))
  }
  return response.json()
}
export async function deleteCall(url: string, body: any, auth:boolean=true) {
  const profile = getProfileStorage(auth)
  const response = await fetch(url, setConfig('DELETE',profile?.token,profile?.role))
  if (response.status < 200 || response.status >= 300)  {
    throw new Error(JSON.parse(await response.text()))
  }
  return response.json()
}
export async function postCall(url: string, body: any, auth:boolean=true) {
  const profile = getProfileStorage(auth)
  console.log(url)
  const response = await fetch(url, setConfig('POST',profile?.token,profile?.role,body))
  if (response.status < 200 || response.status >= 300)  {
    throw new Error(JSON.parse(await response.text()))
  }
  return response.json()
}
