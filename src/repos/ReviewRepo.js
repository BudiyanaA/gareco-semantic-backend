const axios = require('axios')
const qs = require('qs')

const BASE_URL = process.env.BASE_URL_FUSEKI

const headers = {
    'Accept': 'application/sparql-results+json,*/*;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

exports.getAllReviews = async() => {
    const queryData = {
        query: `PREFIX data:<http://example.com/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        SELECT ?title ?description ?cover ?ign ?gamespot ?metacritic

        WHERE {
            ?sub rdf:type data:review.
            OPTIONAL {?sub data:title ?title.}
            OPTIONAL {?sub data:description ?description.}
            OPTIONAL {?sub data:cover ?cover.}
            OPTIONAL {?sub data:ign ?ign.}
            OPTIONAL {?sub data:gamespot ?gamespot.}
            OPTIONAL {?sub data:metacritic ?metacritic.}
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