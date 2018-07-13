
new Vue({
    el: '#app',
    data: {
        addState: false,
        displayState: false,
        displayView: '',
        posts: []
    },
    methods: {
        displayDetails: function (data) {
            console.log(data);
            this.displayState = true;
            this.displayView = data;
        },
        displayDate: function (date) {
            try {
                let returnDate = date;
                returnDate = parseInt(returnDate.slice(6));
                returnDate = new Date(returnDate);
                returnDate = returnDate.toISOString().slice(0, 10);
                return returnDate;
            } catch (e) {

            }
            
        }
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
                this.posts = data;
            }.bind(this), error: function (e) {
                console.log('error');
                console.log(e);
            }
        });
    }
});