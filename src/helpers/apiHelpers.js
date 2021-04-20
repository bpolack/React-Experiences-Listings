// Returns the terms of a specific taxonomy from a listing
export function getTaxonomyTerms( taxonomy, listing ) {

    const termObjects = {};
    const terms = [];
    
    for ( const taxonomyTerms of listing._embedded[ 'wp:term' ] ) {
        for ( const term of taxonomyTerms ) {
            termObjects[ term.id ] = term;
        }
    }

    for ( const termId of listing[ taxonomy ] ) {
        terms.push( termObjects[ termId ] );
    }

    return terms;
}