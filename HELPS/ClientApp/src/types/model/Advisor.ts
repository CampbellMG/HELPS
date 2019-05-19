export interface AdvisorVariable {
    firstName: string,
    lastName: string,
    staffNumber: number,
    email: string,
    status: string
}

export interface Advisor {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    isActive: boolean,
    variables: AdvisorVariable[]
}