new Vue({
    el: '#createClient',
    data: {
        clients: '',
        ClientName: '',
        ClientSubbusiness: ''
    },
    methods: {
        onSubmit: function () {
            /* This will set up an object 'data' - this will be the object send to the database.
             * The object 'refreshData' will be the object that is used to update the view upon
             * a successful POST request.  The difference in casing is because the attributes 
             * are using camelCase in this controller.  
             */
            let data = {};
            let refreshData = {};
            refreshData.ClientName = this.ClientName;
            refreshData.ClientSubbusiness = this.ClientSubbusiness;
            data.clientName = this.ClientName;
            data.clientSubbusiness = this.ClientSubbusiness;
            
            $.ajax({
                type: "POST",
                url: "AddClient",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    /* This will update the data property on the 
                     * VUE instance as soon as a POST request is succsessful. */
                    this.clients.push(refreshData);
                }.bind(this),
                error: function (e) {
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        }
    },
    created: function () {
        /* 
         * This function will fire as soon as this script loads on the page.
         * It will fetch the initial dataload from the database.
         */
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetClients",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(this.clients);
                this.clients = data;
            }.bind(this)
        });
    }
});