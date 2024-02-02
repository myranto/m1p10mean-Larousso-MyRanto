export function getProfileStorage(){
  const user = localStorage.getItem('person_profil')
  if (user==null) throw new Error("Veuillez-vous connecter")
  return JSON.parse(user)
}
// appel a la function fetch
// afaka manampy configuration eto pour chaque methode *RADO ho amin'ny hoavy
export async function getCall(url: string) {
  const profile = getProfileStorage()
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization':`Bearer ${profile?.token}`,
      'role':profile?.role
    },
  }
  const response = await fetch(url,config)
  if (response.status < 200 || response.status >= 300) {
    throw new Error(JSON.parse(await response.text()))
  }
  return response.json()
}
export async function putCall(url: string, body: any) {
  const profile = getProfileStorage()
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization':`Bearer ${profile?.token}`,
      'role':profile?.role
    },
    body:JSON.stringify(body)
  }

  const response = await fetch(url, config)
  if (response.status < 200 || response.status >= 300)  {
    // return Promise.reject(new Error(await response.text()));
    throw new Error(JSON.parse(await response.text()))
  }
  return response.json()
}
export async function deleteCall(url: string, body: any) {
  const profile = getProfileStorage()
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization':`Bearer ${profile?.token}`,
      'role':profile?.role
    },
    body:JSON.stringify(body)
  }
  const response = await fetch(url, config)
  if (response.status < 200 || response.status >= 300)  {
    // return Promise.reject(new Error(await response.text()));
    throw new Error(JSON.parse(await response.text()))
  }
  return response.json()
}
export async function postCall(url: string, body: any) {
  const profile = getProfileStorage()
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization':`Bearer ${profile?.token}`,
      'role':profile?.role
    },
    body:JSON.stringify(body)
  }
  const response = await fetch(url, config)
  if (response.status < 200 || response.status >= 300)  {
    // return Promise.reject(new Error(await response.text()));
    throw new Error(JSON.parse(await response.text()))
  }
  return response.json()
}
