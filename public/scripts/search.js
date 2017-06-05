$('#post-search').on('input', function() {
  var search = $(this).serialize();
  if(search === "search=") {
    search = "all"
  }
  $.get('/blogs?' + search, function(data) {
    $('#post-grid').html('');
    data.forEach(function(blog) {
      $('#post-grid').append(`
        <div class="item">
            <div class="image">
                <img src="${ blog.image }">
            </div>
            <div class="content">
                <a class="header" href="/blogs/${blog._id}">${blog.title}<a>
                <div class="meta">
                    <span>${blog.created.substring(0,10)}</span>
                </div>
                <div class="description">
                    <p>${blog.body.substring(0,100) }.....</p>
                </div>
                <div class="extra">
                    <a class="ui blue basic button" href="/blogs/${blog._id}"}>Read More</a>
                </div>
            </div>
        </div>
      `);
    });
  });
});
