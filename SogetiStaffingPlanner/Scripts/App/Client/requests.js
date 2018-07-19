let requests = {
    fetchClients: function (that) {
        console.log('fetching');
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetClients",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
  
                function compare(a, b) {
                    if (a.ClientName.toUpperCase() < b.ClientName.toUpperCase())
                        return -1;
                    if (a.ClientName.toUpperCase() > b.ClientName.toUpperCase())
                        return 1;
                    return 0;
                }

                data.sort(compare);
                that.clients = data;
                that.findSelected();
                that.scrollDown();
               
            }.bind(that)
        });
    },
    editClient: function (that) {
        console.log(that.formData);
        console.log('editing')
        $.ajax({
            type: "POST",
            url: "EditClient",
            dataType: "json",
            data: JSON.stringify(that.formData),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                //Receives message from backend for you to do what you want with it
                console.log('POST request success');
                that.states.addState = false;
                that.states.updateState = false;
                requests.fetchClients(that);
                requests.updateMessage(that.formData.clientName, that);
            }.bind(that),
            error: function (e) {
                console.log(e, "Error adding data! Please try again.");
            }
        });
    },
    addClient: function (that) {
        $.ajax({
            type: "POST",
            url: "AddClient",
            dataType: "json",
            data: JSON.stringify(that.formData),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                //Receives message from backend for you to do what you want with it
                console.log('POST request success');
                that.states.addState = false;
                requests.fetchClients(that);
                requests.addMessage(that.formData.clientName, that);
            }.bind(that),
            error: function (e) {
                console.log(e, "Error adding data! Please try again.");
            }
        });
    },
    addMessage: function (message, that) {
        setTimeout(function () {
            that.message = '';
        }, 6000);
        that.message = `Added ${message}!`;
    },
    updateMessage: function (message, that) {
        setTimeout(function () {
            that.message = '';
        }, 6000);
        that.message = `Updated ${message}!`;
    }
}