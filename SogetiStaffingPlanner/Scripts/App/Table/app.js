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
            url: "Home/GetMainData",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                this.posts = data;
            }.bind(this)
        })
    }
})