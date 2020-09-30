export class Employee {
    _id: string;
    empID: string;
    firstName: string;
    lastName:string;
    address:string;
    dob:string;
    mobile:string;
    city:string;

    constructor(_id='',empID='',firstName='',lastName='',address='',dob='',mobile='', city='') {
        this._id = _id
        this.empID = empID
        this.firstName = firstName
        this.lastName = lastName
        this.address = address
        this.dob = dob
        this.mobile = mobile
        this.city = city
    }

}
