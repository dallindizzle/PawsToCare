describe("Sorting", function() {
    it("Should be a Asc sorted array", function() {
        let data = ["Dallin", "Is", "Awesome"];
        data.sort(sortAsc);
        expect(data[0]).toEqual('Awesome');
    });
 });

 describe("Filtering", function() {
     it("Should filter out Strings that don't start with the letter B", function() {
         let filter = "B";
         let data = ["Dallin", "Bo", "Ian", "Bob", "Bobby", "Collin"];
         data = data.filter(val => filterString(val, filter));
         for (let str of data) {
             expect(str.startsWith(filter)).toEqual(true);
         }
     });

     it("Should filter out FALSE", function() {
        let filter = true;
        let data = [true, false, false, true];
        data = data.filter(val => filterBool(val, filter));
        for (let val of data) {
            expect(val).toEqual(filter);
        }
     });

     it("Should filter out TRUE", function() {
        let filter = false;
        let data = [true, false, false, true];
        data = data.filter(val => filterBool(val, filter));
        for (let val of data) {
            expect(val).toEqual(filter);
        }
     });
 });