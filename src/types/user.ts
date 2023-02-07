export type TUserData = {
    user: IUserFromDb,
    accessToken: string,
    refershToken: string,
}

export interface IUserFromDb{
    _id: number,
    email: string,
    password: string,
    name: string,
    activationLink: string,
    imageUrl: string,
} 

export interface IUserFromGoogle{
    googleId: number,
    name: string,
    email: string,
    imageUrl: string,
    givenName: string,
    familyName: string
}

export type IUserFromClient = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmedPassword: string,
}