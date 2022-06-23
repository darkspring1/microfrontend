import { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { IMicroFrontend } from "./typesAndInterfaces";


type AppFactoryType = (history: any) => ReactNode
export class MicroFrontend implements IMicroFrontend {

    static create(name: string, appFactory: AppFactoryType): MicroFrontend {
        const microFrontendInstance = new MicroFrontend(appFactory)
        window.microFrontends = window.microFrontends || {}
        window.microFrontends[name] = microFrontendInstance
        return microFrontendInstance
    }


    constructor(appFactory: AppFactoryType) {
        this._appFactory = appFactory
    }

    private _appFactory: AppFactoryType
    private _root: ReactDOM.Root | undefined

    render(containerId: string, history: any) {
        const root = ReactDOM.createRoot(document.getElementById(containerId)!);
        root.render(this._appFactory(history));
    }

    unmount() {
        debugger
        this._root!.unmount()
    }

}