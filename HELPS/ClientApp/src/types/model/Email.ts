export interface EmailVariable {
    name: string,
    variable: string,
    example: string
}

export interface Email {
    id: number,
    title: string,
    content: string,
    variables: EmailVariable[]
}