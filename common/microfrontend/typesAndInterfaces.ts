
export interface IMicroFrontend {
    isRendered: boolean
    render: (containerId: string, history: any) => void
    unmount: () => void
}

interface IMicroFrontendDictionary {
    [Key: string]: IMicroFrontend
}

export interface IMicroFrontendWindowExtension {
    microFrontends: IMicroFrontendDictionary
}