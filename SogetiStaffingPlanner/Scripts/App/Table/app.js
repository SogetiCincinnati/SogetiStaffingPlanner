new Vue({
    el: '#app',
    data: {
        posts: [],
        message: 'Planning view',
        testArr: [{ "name": "mark" }]
    },
    created: function () {
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "/Home/GetMainData",
            success: (data) => {
                this.posts = data;
            }
        })
    }
})