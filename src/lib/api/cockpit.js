import qs from "query-string";
import aqs from "qs";

// import fetch from "isomorphic-fetch";

const defaultOptions = {
  mode: 'cors',
  cache: 'default'
}

export default class Cockpit {
  constructor ({ host, accessToken }) {
    this.host = host
    this.accessToken = accessToken
    this.queryParams = {
      token: this.accessToken
    }
  }

  // @param {string} apiPath
  // @param {object} options
  async fetchData (apiPath, options) {
    const requestInit = {
      ...options,
      ...defaultOptions
    }

    const hostWithToken = `${this.host}${apiPath}?${qs.stringify(this.queryParams)}`


    const response = await fetch(hostWithToken, requestInit)
    const json = await response.json()

    return json
  }

  // @param {string} apiPath
  async fetchDataText (apiPath, options, additionalOptions) {
    const requestInit = {
      ...options,
      ...defaultOptions
    }

    const hostWithToken = `${this.host}${apiPath}?${qs.stringify(this.queryParams)}&${aqs.stringify(additionalOptions)}`

    const response = await fetch(hostWithToken, requestInit)
    return await response.text()
  }


  // @param {string} apiPath
  async fetchText (apiPath, options, additionalOptions) {
    const requestInit = {
      ...options,
      ...defaultOptions
    }

    const hostWithToken = `${this.host}${apiPath}?${qs.stringify(this.queryParams)}&${aqs.stringify(additionalOptions)}`


    const response = await fetch(hostWithToken, requestInit)
    if(response.ok){
      return await response.text()
    }else {
      return ''
    }
  }


  // @param {string} collection
  async collectionSchema (collection) {
    return this.fetchData(`/api/collections/collection/${collection}`, { method: 'GET' })
  }

  // @param {string} collection
  async collectionEntries (collection) {
    return this.fetchData(`/api/collections/get/${collection}`, { method: 'GET' })
  }

  // @param {string} collection
  // @param {Request} options
  async collectionEntriesFiltered (collection, options) {
    return this.fetchData(`/api/collections/get/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    })
  }

  // @param {string} region
  async regionRenderedTemplate (region) {
    return this.fetchData(`/api/regions/get/${region}`, { method: 'GET' })
  }

  // @param {string} region
  async regionFormData (region) {
    return this.fetchData(`/api/regions/data/${region}`, { method: 'GET' })
  }

  async assets () {
    return this.fetchData(`/api/cockpit/assets`, { method: 'GET' })
  }

  async image (assetId, {width, height}) {
    return this.fetchDataText(`/api/cockpit/image`, { method: 'GET' }, {
      src: assetId,
      w: width,
      h: height,
      d: 1
    })
  }
}
