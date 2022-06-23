import type { IMicroFrontendWindowExtension } from "../common/microfrontend/typesAndInterfaces"

declare global {
    interface Window extends IMicroFrontendWindowExtension {
      
    }
}