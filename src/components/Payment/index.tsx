import React, {Component} from 'react';
import {
    CommonPaymentMethodData,
    PaymentMethodDataDetails
} from '../../models/CommonPaymentMethodData';
import { Networks, CardTypes, PaymentMethods, Currencies } from "../../models/Enums";
import { PaymentDetails, CommonPaymentItem, CommonPaymentCurrencyAmount } from '../../models/PaymentDetails';

interface PaymentProps {}
interface PaymentStates {
    amount: Number
}

export default class Payment extends Component<PaymentProps, PaymentStates>  {
    private TOTAL_LABEL_TEXT = "Total"
    private ORDER_LABEL_TEXT = "Something"
    
    constructor(props: PaymentProps) {
        super(props);
        this.state = ({amount: 0} as PaymentStates)

        this.changeAmount = this.changeAmount.bind(this)
        this.pay = this.pay.bind(this)
    }

    changeAmount(event: any) {
        console.log(event)
        this.setState({amount: event.target.value})
    }

    pay () {
        let paymentMethods = [
            new CommonPaymentMethodData(
                PaymentMethods.BASIC_CARD,
                new PaymentMethodDataDetails(
                    [Networks.VISA, Networks.MASTERCARD],
                    [CardTypes.DEBIT, CardTypes.CREDIT]
                )
            )
        ]

        let amount = new CommonPaymentCurrencyAmount(
            Currencies.USD,
            this.state.amount.toString()
        )

        let details = new PaymentDetails(
            "test-id",
            new CommonPaymentItem(amount, this.TOTAL_LABEL_TEXT),
            [new CommonPaymentItem(amount, this.ORDER_LABEL_TEXT)]
        )

        let payreq = new PaymentRequest(paymentMethods, details)
        
        payreq.canMakePayment().then(result => {
            if (result) {
                payreq.show().then(resp => {
                    resp.complete("success")
                    console.log("success")
                }).catch((reason: DOMException) => {
                    console.log(reason)
                })
            }
        })
    }

    render() {
        return(
            <div>
                <input className="pay-amount"
                    type="text"
                    name="amount"
                    placeholder="Enter some amount"
                    autoComplete="off"
                    value={this.state.amount.toString()}
                    onChange={this.changeAmount}
                />
                <button className="pay-button" onClick={this.pay}>Pay</button>
            </div>
        )
    }
}