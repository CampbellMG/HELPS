export interface Workshop {
    id: number,
    title: string
    time: string,
    duration: number,
    skillset: Skill[]
}

export interface Skill {
    skillName: string
}