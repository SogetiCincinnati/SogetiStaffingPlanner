new Vue({
    el: '#createClient',
    data: {
        ClientName: '',
        ClientSubbusiness: ''
    },
    methods: {
        onSubmit: function () {
            var data = {};
            data.clientName = this.ClientName;
            data.clientSubbusiness = this.ClientSubbusiness;
            console.log(data);

            /*$.ajax({
                type: "POST",
                url: "AddClient",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    //Receives message from backend for you to do what you want with it
                    alert(data);
                },
                error: function (e) {
                    console.log(e, "Error adding data! Please try again.");
                }
            });*/
        }
    }
})