function attachEvents() {
    let url = 'https://baas.kinvey.com/appdata/kid_BJwSX6w5G';
    let base64auth = btoa('psycho:realm');
    let authHeaders = {'Authorization':'Basic ' + base64auth};
    $('#btnLoadPosts').on('click', function () {
        $.ajax({
           method: 'GET',
            url: url + '/posts',
            headers: authHeaders
        }).then(displayPosts);
    });

    function displayPosts(data) {
        for (let post of data) {
            $('#posts').append($('<option>')
                .attr('value', post._id).text(post.title));
        }
    }

    $('#btnViewPost').on('click', function () {
        let postId = $('#posts').val();
        let requestPosts = $.ajax({
          method: 'GET',
            url: url + `/posts/${postId}`,
           headers: authHeaders
       });

        let requestComments = $.ajax({
            method: 'GET',
            url: url + `/comments/?query={"post_id":"${postId}"}`,
            headers: authHeaders
        });

        Promise.all([requestPosts, requestComments])
            .then(displayPostWithComments);
    });

    function displayPostWithComments([post, comments]) {
        $('#post-title').text(post.title);
        $('#post-body').text(post.body);
        let list = $('#post-comments');
        list.empty();
        for (let comment of comments) {
            list.append($(`<li>${comment.text}</li>`));
        }
    }
}