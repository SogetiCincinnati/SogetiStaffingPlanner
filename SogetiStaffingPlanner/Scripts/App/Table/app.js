Vue.component('modal', {
    template: '#modal-template'
});

new Vue({
    el: '#app',
    data: {
        showModal: false,
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
            success: function(data) {
                this.posts = data;
            }.bind(this)
        })
    }
})