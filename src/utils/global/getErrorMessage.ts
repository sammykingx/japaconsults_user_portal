// jshint esversion:6
export function getErrorMessage(error: unknown): string {

    let errorMessage = ""

    if (error instanceof Error) {
        errorMessage = error.message;
    }

    else if ('status' in (error as any)) {
        switch ((error as any).status) {
            case "FETCH_ERROR": {
                errorMessage = "NetworkError when attempting to fetch resource";
                break;
            }

            case "PARSING_ERROR": {
                errorMessage = "Could not parse data!"
                break;
            }
            case 500: {
                errorMessage = (error as any).data.detail
                break;
            }
            case 502: {
                errorMessage = "Server not available to fetch requested resource!"
                break;
            }
            case 401: {
                errorMessage = (error as any).data.detail
                break;
            }
            case 400: {
                console.log("Case matched")
                errorMessage = (error as any).data.detail
                break;
            }
            case 404: {
                errorMessage = (error as any).data.detail
                break;
            }
            case 409: {
                errorMessage = (error as any).data.detail
                break;
            }
            default: {
                errorMessage = "Could not connect to the server, try again!"
                break;
            }
        }
    } else {
        errorMessage = "An error occurred. Try again"
    }
    return errorMessage;
}