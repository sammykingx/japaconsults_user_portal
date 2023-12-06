// jshint esversion:6
import FolderAddIcon from "@/assets/global/folder-add.svg"
import UploadFolderAddIcon from "@/assets/global/uploadfolder.svg"
import CloseIcon from "@/assets/global/X.svg"
import InfoIcon from "@/assets/global/info-circle.svg"
import { useRef, ChangeEvent, useState } from "react"
import { FOLDER_NAME } from "@/data/users/files"

// Define accepted images format
const imageMimeType = /image\/(png|jpg|jpeg)|text\/plain|^application\/(csv|pdf|msword|(vnd\.(ms-|openxmlformats-).*))/i;

// MAx file upload
const MAXFILEUPLOAD = 10;

type UserUploadFileType = {
    setFolder?: FOLDER_NAME
    filesUploaded: File[],
    setFilesUploaded: React.Dispatch<React.SetStateAction<File[]>>
    action: (folderName: string) => void
    loading: boolean
}

export const UserUploadFile: React.FC<UserUploadFileType> = ({ filesUploaded, setFilesUploaded, action, loading, setFolder }) => {

    // Folder name
    const [folderName, setFolderName] = useState<FOLDER_NAME>(setFolder ?? FOLDER_NAME.GENERAL);

    // Ref for input element
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Change Handler
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // Alert users once if a wrong image type was selected
        let fileError = false;

        if (!e.target.files) return;

        const imageFilesInput = e.target.files;

        const imageFileArray: File[] = []

        Array.from(imageFilesInput).forEach((file) => {

            if (!file.type.match(imageMimeType)) {
                (!fileError && alert("A file of invalid mime type was selected and not uploaded!"));
                fileError = true
                return;
            }

            // File size
            if (file.size > 3000000) {
                (!fileError && alert("A file exceeding maxmimum size was selected and not uploaded!"));
                fileError = true
                return;
            }

            // Object.assign(file, { preview: URL.createObjectURL(file) })
            imageFileArray.push(file)
        })

        // const file = e.target.files[0];
        // Set the image files within the limit
        setFilesUploaded((previousFiles: any[]) => [...previousFiles, ...imageFileArray.slice(0, (MAXFILEUPLOAD - previousFiles.length))]);
    }

    // Delete Image
    function deleteImageHandler(index: number) {

        // Delete File
        const newFiles = filesUploaded.filter((_, fileIndex) => {
            return fileIndex != index
        })

        // Update Files 
        setFilesUploaded(newFiles);
    }

    // Image Picker
    function selectImage() {
        if (inputRef) {
            inputRef.current?.click();
        }
        return;
    }

    return (
        <>
            <h3 className="font-CabinetGrotesk-Bold">Upload File </h3>
            {/* Input ref to upload file */}
            <input ref={inputRef} className="hidden" id="inputImage" type="file" onChange={changeHandler} />

            {/* Upload File */}
            <div
                className="mt-3 flex items-center justify-center border-[1px] border-dashed border-[#DBDBDB] w-[300px] h-[200px] bg-[#F1F1F1] rounded cursor-pointer"
                onClick={selectImage}
            >
                <div className="flex flex-col gap-y-2">
                    <img className="w-[50px] h-[50px] mx-auto" src={FolderAddIcon} alt="add File" />
                    <p className="text-sm text-center">Drag or drop your file or <span className="text-brandColor">click to Upload</span></p>
                    <p className="font-Inter-Regular text-[14px] text-center text-placeholder">JPG,  PDF, PNG, SVG only</p>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <select
                    name="folder"
                    className="p-2 bg-white border-[1px] border-[#DBDBDB] rounded cursor-pointer capitalize"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setFolderName(e.target.value as FOLDER_NAME)
                    }}
                >
                    {setFolder ? (
                        <option className="capitalize" selected disabled>{setFolder.toLowerCase()}</option>
                    ) : (
                        <>
                            <option value={FOLDER_NAME.GENERAL} selected>General</option>
                            <option value={FOLDER_NAME.BILLING} >Billing</option>
                            <option value={FOLDER_NAME.ACADMEMICS} >Academics</option>
                            <option value={FOLDER_NAME.VISA} >Visa</option>
                            <option value={FOLDER_NAME.CONTRACT} >Contract</option>
                        </>
                    )}
                </select>
                <p className="flex gap-x-2 justify-end text-sm"><img src={InfoIcon} alt="info" /> <span>Maximum size: 3MB</span></p>
            </div >

            <div className="flex flex-col gap-y-2 mt-3">
                {
                    filesUploaded.map((file: File, index) => {
                        return (
                            <div key={index} className="flex items-center p-2 bg-[#FBF4E4] rounded">
                                <img className="mr-3" src={UploadFolderAddIcon} alt="file" />
                                <p className="text-sm w-[220px] truncate">{file.name}</p>
                                <img src={CloseIcon} alt="close" onClick={() => deleteImageHandler(index)} className="ml-auto cursor-pointer" />
                            </div>
                        )
                    })
                }
            </div>

            {
                filesUploaded.length > 0 && (
                    <div className="flex justify-end mt-3">
                        <button onClick={() => action(folderName)} className="font-Inter-Bold bg-brandColor text-white py-2 px-3 rounded">{loading ? "Uploading" : "Upload"}</button>
                    </div>
                )
            }
        </>
    )
}