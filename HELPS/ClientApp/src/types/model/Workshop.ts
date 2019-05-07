export interface Workshop {
    id: number,
    title: string
    time: string,
    duration: number,
    skillset: Skill[]
}

export interface Skill {
    skillName: string
    room: string,
    targetGroup: string,
    description: string,
    availablePlaces: number
}