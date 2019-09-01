var $loading = $('#loader').hide();
$(document)
.ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  });
  
$('#searchForm').submit(function(event){
    event.preventDefault();
    $('#results').html('Loading...');
    
    var searchTerm = $('#searchItem').val();
    let promise = $.ajax({
        type: 'GET',
        url: 'https://www.reddit.com/r/subreddits/search.json',
        data: {q: searchTerm},
        beforeSend: function(){
            $('#loader').show();
        },
        complete: function(){
            $('#loader').hide();
        }
    });

    promise.then(function(responseData) {
        
        let fragment = document.createDocumentFragment();
        let html = '';
        $.each(responseData.data.children, function(idx, searchResult){
            let div = document.createElement('div');
            let a = document.createElement('a');
            let p = document.createElement('p');
            let p1 = document.createElement('p');

            a.innerText = 'Title: ' + searchResult.data.title;
            a.href = searchResult.data.url;
            a.target = "_blank";
            p.innerText = 'Author: ' + searchResult.data.author;
            p1.innerText = 'Score: ' + searchResult.data.score;

            div.append(a);
            div.append(p);
            div.append(p1);
            fragment.append(div);
        });
        
        $('#results').html(fragment);    
    });
});


