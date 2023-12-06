export enum FOLDER_NAME {
    GENERAL = "general",
    BILLING = 'billing',
    ACADMEMICS = 'academics',
    VISA = 'visa',
    CONTRACT = 'contract'
}

export type FileResponseType = {
    "file_id": string,
    "name": string,
    "file_url": string,
    "folder": string,
    "size"?: string,
    "date_uploaded"?: Date
}