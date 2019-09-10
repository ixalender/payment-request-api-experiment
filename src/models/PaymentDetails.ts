import { PaymentMethods } from "./Enums"

export class PaymentDetails implements PaymentDetailsInit {
    readonly id: string
    readonly total: PaymentItem
    readonly displayItems?: PaymentItem[]
    readonly modifiers?: PaymentDetailsModifier[]
    readonly shippingOptions?: PaymentShippingOption[]
    
    constructor(
        id: string,
        total: PaymentItem,
        displayItems?: PaymentItem[],
        modifiers?: PaymentDetailsModifier[],
        shippingOptions?: PaymentShippingOption[]
    ) {
        this.id = id
        this.total = total
        this.displayItems = displayItems
        this.modifiers = modifiers
        this.shippingOptions = shippingOptions
    }
}

export class CommonPaymentItem implements PaymentItem {
    readonly amount: PaymentCurrencyAmount
    readonly label: string
    readonly pending?: boolean
    
    constructor(amount: PaymentCurrencyAmount, label: string, pending?: boolean) {
        this.amount = amount
        this.label = label
        this.pending = pending
    }
}

export class CommonPaymentCurrencyAmount implements PaymentCurrencyAmount {
    readonly currency: string
    readonly value: string
    readonly currencySystem?: string
    
    constructor(currency: string, value: string, currencySystem?: string) {
        this.currency = currency
        this.value = value
        this.currencySystem = currencySystem
    }
}

class CommonPaymentDetailsModifier implements PaymentDetailsModifier {
    readonly additionalDisplayItems?: PaymentItem[]
    readonly data?: any
    readonly supportedMethods: PaymentMethods | PaymentMethods[]
    readonly total?: PaymentItem
    
    constructor(
        supportedMethods: PaymentMethods | PaymentMethods[],
        additionalDisplayItems?: PaymentItem[],
        total?: PaymentItem,
        data?: any
    ) {
        this.supportedMethods = supportedMethods
        this.additionalDisplayItems = additionalDisplayItems
        this.data = data
        this.total = total
    }
}

class CommonPaymentShippingOption implements PaymentShippingOption {
    amount: PaymentCurrencyAmount
    id: string
    label: string
    selected?: boolean
    
    constructor(amount: PaymentCurrencyAmount, id: string, label: string, selected?: boolean) {
        this.amount = amount
        this.id = id
        this.label = label
        this.selected = selected
    }
}
