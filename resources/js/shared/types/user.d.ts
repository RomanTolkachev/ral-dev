export interface IUser {
    id: string
    email: string
    name: string
    roles?: string[]
}
export interface IRole {
    id: string
    name: string
}
export interface IPermission {
    id: string
    name: string
}

