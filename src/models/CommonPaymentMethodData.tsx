import { PaymentMethods, Networks, CardTypes } from "./Enums"

export class CommonPaymentMethodData implements PaymentMethodData {
    readonly supportedMethods: string
    readonly data: PaymentMethodDataDetails

    constructor(supportedMethod: PaymentMethods, data: PaymentMethodDataDetails) {
        this.supportedMethods = supportedMethod
        this.data = data
    }
}

export class PaymentMethodDataDetails {
    readonly supportedNetworks: Networks[]
    readonly supportedTypes: CardTypes[]
    
    constructor(supportedNetworks: Networks[], supportedTypes: CardTypes[]) {
        this.supportedNetworks = supportedNetworks
        this.supportedTypes = supportedTypes
    }
}

