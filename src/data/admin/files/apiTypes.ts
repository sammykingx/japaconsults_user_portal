import { FileResponseType } from "@/data/users/files/file"

export type GetAllFilesUploadedResponse = {
    "academics": FileResponseType[],
    "billing": FileResponseType[],
    "contracts": FileResponseType[],
    "general": FileResponseType[],
    "visa": FileResponseType[]
}

export type GetUserFilesRequest = {
    user_id: number,
    folderName: string
}

export type GetUserFilesResponse = FileResponseType[]

export type DeleteUserFileRequest = {
    fileId: string
}

export type DeleteUserFileResponse = {
    msg: string,
    file_id: string,
    file_name: string
}