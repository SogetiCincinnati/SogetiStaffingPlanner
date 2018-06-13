new Vue({
    el: '#app',
    data: {
        posts: [],
        message: 'Planning view',
        testArr: [{ "name": "mark" }]
    },
    created: function () {
        axios.get('/Scripts/App/Seed/seed.json').then((res) => {
            this.posts = res.data.opprotunities;
            console.log(this.posts);
        })
    }
})