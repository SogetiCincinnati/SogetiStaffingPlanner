
new Vue({
    el: '#app',
    data: {
        newForm: false,
        buttonText: 'Add New',
        posts: [],
        message: 'Planning view',
        newPosition: {
            PositionId: 0,
            OpportunityId: '',
            UnitPracticeId: '',
            MaxConsultantGradeId: '',
            MinConsultantGradeId: '',
            PositionName: 'Tester',
            NumberOfPositions: '4',
            Skillset: 'test',
            Rate: '',
            ExpectedStartDate: '?',
            Duration: '',
            ProposedCandidate: '',
            RejectedCandidate: '',
            AcceptedCandidate: '',
            PositionNote: ''
        },
        
    },
    methods: {
        displayAdd: function () {
            this.newForm = !this.newForm;
            if (this.newForm === true) {
                this.buttonText = 'Collapse';
            } else {
                this.buttonText = 'Add New';
            }
        },
        submitNew: function () {
            this.newForm = false; 
            var data = this.newPosition;
            console.log(this.newPosition);
           /* $.ajax({
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
            }); */
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
                console.log(data);
                this.posts = data;
            }.bind(this)
        })
    }
})