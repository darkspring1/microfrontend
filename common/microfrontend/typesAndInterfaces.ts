
export interface IMicroFrontend {
    render: (containerId: string, history: any) => void
    unmount: () => void
}

interface IMicroFrontendDictionary {
    [Key: string]: IMicroFrontend
}

export interface IMicroFrontendWindowExtension {
    microFrontends: IMicroFrontendDictionary
}