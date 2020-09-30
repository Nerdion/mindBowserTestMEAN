export interface Manager {
    _id: string
    email: string
    firstName: string
    lastName:string
    address:string
    dob:Date
    company:string
    password:string
}

export interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    _id:string,
    firstName:string,
    lastName:string,
    email:string,
    company: string,
    dob:Date,
    address:string
}