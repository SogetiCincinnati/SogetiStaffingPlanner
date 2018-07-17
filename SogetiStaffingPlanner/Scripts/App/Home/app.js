
new Vue({
    el: '#app',
    data: {
        addState: false,
        displayState: false,
        displayView: '',
        posts: [],
        users: []
    },
    methods: {
        displayDetails: function (data) {
            console.log(data);
            this.displayState = true;
            this.displayView = data;
        },
        displayDate: function (date) {
            try {
                console.log('displayDate fired');
                let returnDate = date;
                returnDate = parseInt(returnDate.slice(6));
                returnDate = new Date(returnDate);
                returnDate = returnDate.toISOString().slice(0, 10);
                return returnDate;
            }
            catch (e) {

            }       
        },
        displayUser: function (id) {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].UserId == id) {
                    return this.users[i].UserFullName;
                }
            }
        },
        displayStatusName: function (id) {
            switch (id) {
                case 1:
                    return "Initiate";
                    break;
                case 2:
                    return "In-Progress";
                    break;
                case 3:
                    return "Need Candidates";
                    break;
                case 4:
                    return "Closed";
                    break;
            }
        },
        displayGrade: function (id) {
            console.log('Display Grade');
            console.log(id);
            switch (id) {
                case 1:
                    return "A1";
                    break;
                case 2:
                    return "A2";
                    break;
                case 3:
                    return "A";
                    break;
                case 4:
                    return "B";
                    break;
                case 5:
                    return "C";
                    break;
                case 6:
                    return "Non-EC";
                    break;
                case 7:
                    return "Any";
                    break;
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
                console.log('Posts', data);
                this.posts = data;
            }.bind(this), error: function (e) {
                console.log('error');
                console.log(e);
            }
        });
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "Client/GetUserList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log('Users', data);
                this.users = data;
            }.bind(this), error: function (e) {
                console.log('error');
                console.log(e);
            }
        });
    }
});