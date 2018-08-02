let sorting = {
    sortData: function (data, that) {
        console.log(data);
        //This will sort data based on even and odd attempts the sort.  The data is originally presented in an order retrieved from the database.
        if (that.sorting[data] % 2 !== 0) {
            function compare(a, b) {
                if (a[data] > b[data])
                    return -1;
                if (a[data] < b[data])
                    return 1;
                return 0;
            }
        } else {
            function compare(a, b) {
                if (a[data] < b[data])
                    return -1;
                if (a[data] > b[data])
                    return 1;
                return 0;
            }
        }
        console.log('BOOL', that.sorting.OpportunityName);
        that.sorting[data]++;
        console.log(that.sorting[data]);
        console.log(that.posts.sort(compare));
        that.sorter = data;
    }
}

