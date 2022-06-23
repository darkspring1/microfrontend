import { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { IMicroFrontend } from "./typesAndInterfaces";


type AppFactoryType = (history: any) => ReactNode
export class MicroFrontend implements IMicroFrontend {

    static create(name: string, appFactory: AppFactoryType): MicroFrontend {
        const microFrontendInstance = new MicroFrontend(name, appFactory)
        window.microFrontends = window.microFrontends || {}
        window.microFrontends[name] = microFrontendInstance
        return microFrontendInstance
    }


    private constructor(name: string, appFactory: AppFactoryType) {
        this._appFactory = appFactory
        this._name = name
        this._isRendered = false
    }

    private readonly _name: string
    private readonly _appFactory: AppFactoryType
    private _root: ReactDOM.Root | undefined
    private _isRendered: boolean

    get isRendered() {
        return this._isRendered
    }

    render(containerId: string, history: any) {
        if(this._root) {
            console.warn(`Double rendering, call unmount first. Frontend name ${this._name}`)
            return
        }
        this._root = ReactDOM.createRoot(document.getElementById(containerId)!);
        this._root.render(this._appFactory(history));
        this._isRendered = true
    }

    unmount() {
        if(!this._root) {
            console.warn(`Call unmount before render. Frontend name ${this._name}`)
            return
        }
        this._root.unmount()
        this._root = undefined
        this._isRendered = false
    }

}