const axios = require('axios')
const qs = require('qs')

const BASE_URL = process.env.BASE_URL_FUSEKI

const headers = {
    'Accept': 'application/sparql-results+json,*/*;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

exports.getAllReviews = async(param) => {
    const queryData = {
        query: `PREFIX data:<http://example.com/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        SELECT ?uri ?title ?description ?cover ?ign ?gamespot ?metacritic

        WHERE {
            ?uri rdf:type data:review.
            OPTIONAL {?uri data:title ?title.}
            OPTIONAL {?uri data:description ?description.}
            OPTIONAL {?uri data:cover ?cover.}
            OPTIONAL {?uri data:ign ?ign.}
            OPTIONAL {?uri data:gamespot ?gamespot.}
            OPTIONAL {?uri data:metacritic ?metacritic.}
            FILTER(regex(str(?uri), "${param.uri ? param.uri : ''}", "i"))
            FILTER(regex(str(?title), "${param.title ? param.title : ''}", "i"))
            FILTER(regex(str(?description), "${param.description ? param.description : ''}", "i"))
        }`
    }

    try {
        const { data } = await axios(`${BASE_URL}/gareco/query`, {
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        })
        return data.results;
    } catch (err) {
        return Promise.reject(err)
    }
}

exports.getCategoryByReview = async(param) => {
    const queryData = {
        query: `PREFIX data:<http://example.com/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        
        SELECT DISTINCT ?categoryID ?categoryName
        
        WHERE {
          ?uri rdf:type data:review.
          ?uri data:isCategorized ?categoryID.
          ?categoryID data:category ?categoryName.
          FILTER(regex(str(?uri), "${param.uri ? param.uri : ''}", "i"))
        }`
    }

    try {
        const { data } = await axios(`${BASE_URL}/gareco/query`, {
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        })
        return data.results;
    } catch (err) {
        return Promise.reject(err)
    }
}

exports.getReviewByCategory = async(param) => {
    const queryData = {
        query: `PREFIX data:<http://example.com/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        SELECT ?uri ?title ?description ?cover ?ign ?gamespot ?metacritic ?categoryName

        WHERE {
            ?uri rdf:type data:review.
            OPTIONAL {?uri data:title ?title.}
            OPTIONAL {?uri data:description ?description.}
            OPTIONAL {?uri data:cover ?cover.}
            OPTIONAL {?uri data:ign ?ign.}
            OPTIONAL {?uri data:gamespot ?gamespot.}
            OPTIONAL {?uri data:metacritic ?metacritic.}
            ?uri data:isCategorized ?categoryID.
            ?categoryID data:category ?categoryName.
          FILTER(regex(str(?categoryName), "${param.category ? param.category : ''}", "i"))
        }`
    }

    try {
        const { data } = await axios(`${BASE_URL}/gareco/query`, {
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        })
        return data.results;
    } catch (err) {
        return Promise.reject(err)
    }
}

module.exports = exports;