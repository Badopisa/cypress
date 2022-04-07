export type TeamDataType = {
    id: string,
    name: string,
    category_id: string,
    location: string|null,
    country: string|null,
    club_id: string
}

export type TeamFormType = {
    name: string,
    club_id: string,
    category_id: string
}