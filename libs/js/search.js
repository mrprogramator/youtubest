function search(searchResultsId, searchInputId){
    var searchResults = document.getElementById(searchResultsId);
    var searchInput = document.getElementById(searchInputId);

    searchResults.innerHTML = "<div style=\"text-align:center\">Searching...</div>";
    var searchText = searchInput.value;

    makeHTTPRequest('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=' 
                + searchText + '&type=video&key=AIzaSyB5aNLXS6p869esiJFZMxsoxniDDWvmEgg','GET', function (response){
        response = JSON.parse(response);
        console.log(response);
        if(!response || !response.items || response.items.length == 0){
            searchResults.innerHTML = "<div style=\"text-align:center\">No results</div>"
        }
        else{
            var html = "<table style=\"width:100%\">";
            response.items.forEach(function (item){
                html += getSearchResultItemTemplate(item);
            })
            html += "</table>";
            searchResults.innerHTML = html;
        }
    }, function (error){
        searchResults.innerHTML = "<div style=\"text-align:center\"><strong>Error: </strong>" + error + "</div>";
    });
    
    return false;
}

