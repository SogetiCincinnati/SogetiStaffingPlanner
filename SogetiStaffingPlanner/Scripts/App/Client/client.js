﻿var content = new Vue({
    el: '#Client',
    data: {
        clients: [],
        selected: null,
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        nextNum: 10,
        message: '',
        formData: {
            clientName: '',
            clientSubbusiness: '',
        },
        states: {
            addState: false,
            updateState: false,
        },
        errors: {
            clientName: null,
            clientSubbusiness: null
        }
    },
    computed: {
        computeClientName() {
            return this.formData.clientName;
        },
        computeClientSubbusiness() {
            return this.formData.clientSubbusiness;
        },
        isDisabled() {
            console.log('working');
            let count = 0;
            if (this.errors.clientName) { count += 1 };
            if (this.errors.clientSubbusiness) { count += 1 };
            if (count > 0) {
                return true;
            } else {
                return false;
            }
        }
    },
    watch: {
        computeClientName: function (val) {

            try {
                if (val || val.length) { this.errors.clientName = ''; }
                else { this.errors.clientName = 'Client name required'; }
            } catch (e) { }


            if (!this.states.updateState) {
                for (let i = 0; i < this.clients.length; i++) {
                    if (val == this.clients[i].ClientName) {
                        this.errors.clientName = '"' + this.clients[i].ClientName + '" already exists.';
                        break;
                    }
                }
            }
        },
    },
    methods: {
        onSubmit: function () {
            let errorCount = this.checkForm();
            if (errorCount == 0) {
                if (this.states.updateState) {
                    console.log('called update client');
                    this.updateClient();
                }
                else if (this.states.addState) {
                    console.log('called add client');
                    this.addClient();

                }
            } 
        },
        updateClient: function () {
            requests.editClient(this);
        },
        addClient: function () {
            requests.addClient(this);
        },
        add: function () {
            this.formData = {};
            this.states.addState = true;
            window.scrollTo(0, 100);
        },
        onEdit: function (client) {
            this.errors.clientName = null;
            this.errors.clientSubbusiness = null;
            this.states.addState = true;
            this.states.updateState = true;
            this.formData.clientId = client.ClientId;
            this.formData.clientName = client.ClientName;
            this.formData.clientSubbusiness = client.ClientSubbusiness;
            this.formData.active = true;
            window.scrollTo(0, 100);
        },
        cancel: function () {
            this.states.addState = false;
            this.states.updateState = false;
            this.errors.clientName = null;
            this.errors.clientSubbusiness = null;
            this.formData = [];
            window.scrollTo(0, 0);
        },
        checkForm: function () { // Check to see if there are errors on submit      
            let errorCount = 0;
            try {
                let input = this.formData.clientName.trim();
            } catch {
                this.errors.clientName = 'Client Name required';
            }
            if (!this.formData.clientName) {
                this.errors.clientName = 'Client Name required';
                errorCount++;
            } else { this.errors.clientName = ''; }

            if (!this.states.updateState) {
                for (let i = 0; i < this.clients.length; i++) {
                    if (this.formData.clientName == this.clients[i].ClientName) {
                        this.errors.clientName = '"' + this.clients[i].ClientName + '" already exists.';
                        errorCount++;
                        break;
                    }
                }
            } else { }
            return errorCount;
        },
        scrollDown: function () {    // Add a 1 second delay so the table can update before scrolling down
            try {
                let container = document.querySelector(".scrollBar"); // looks for table scrollbar
                let scrollDistance = this.selected * (container.scrollHeight / this.clients.length); // calculate how far to scroll down
                setTimeout(function () { // wait for the table to update, then scroll to the entrys
                    container.scrollTo(0, scrollDistance);
                }, 100);
            } catch (e) {

            }
           
        },
        findSelected: function () {
            for (client in this.clients) { // Highlights the updated row
                if (this.clients[client].ClientName == this.formData.clientName &&
                    this.clients[client].ClientSubbusiness == this.formData.clientSubbusiness) {
                    this.selected = client;
                    break;
                }
            }
        }
    },
    created: function () {
       requests.fetchClients(this);
    }
});