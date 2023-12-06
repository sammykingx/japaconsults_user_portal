import { FileResponseType } from "./file"

export type UploadUserFileRequest = {
    params: {
        folder_name: string,
    }
    body: FormData
}

export type UploadUserFileResponse = {
    "file_name": string,
    "file_url": string
}

export type GetFilesRequest = {
    folderName?: string
}

export type GetFilesResponse = FileResponseType[]

export type GetRecentFilesUploadedRequest = {
    folderName?: string;
}

export type GetRecentFilesUploadedResponse = FileResponseType[]

export type DeleteUserFileRequest = {
    fileId: string
}

export type DeleteUserFileResponse = {
    msg: string,
    file_id: string,
    file_name: string
}