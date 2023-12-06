// jshint esversion:6

export type UserNoteResponse = {
    draft_id: number,
    user_id: number,
    title: string,
    content: string,
    date_created: Date | null,
    last_updated: Date | null
}

export type ReceivedNoteResponse = {
    "title": string,
    "content": string,
    "sent_by": string,
    "sent_time": Date
}

export type GetReceivedNotesResponse = ReceivedNoteResponse[]

export type GetUserNotesResponse = UserNoteResponse[]

export type SaveUserNotesRequest = {
    "title": string,
    "content": string,
    "date_created": Date
}

export type SaveUserNotesResponse = {
    msg?: string,
    details?: string
    draft_id: number
}

export type UpdateUserNoteRequest = {
    "draft_id": number,
    "title": string,
    "content": string,
    "last_updated": Date
}

export type UpdateUserNoteResponse = {
    "draft_id": string
    msg?: string,
    details?: string
}

export type DeleteUserNoteRequest = {
    d_id: number
}

export type DeleteUserNoteResponse = {
    msg?: string,
    detail?: string
    details?: string
}

export type SendNoteRequest = {
    "draftId": number,
    "toId": number
}

export type SendNoteResponse = {
    msg: string,
    draft_id: number
}
