export interface Manager {
    _id: string
    email: string
    firstName: string
    lastName:string
    address:string
    dob:string
    company:string
    exp:number
    iat:number
}

export interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    _id:string,
    firstName:string,
    lastName:string,
    email:string
}