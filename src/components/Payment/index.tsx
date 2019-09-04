import React, {Component, ChangeEvent} from 'react';
import {
    CommonPaymentMethodData,
    PaymentMethodDataDetails
} from '../../models/CommonPaymentMethodData';
import { Networks, CardTypes, PaymentMethods } from "../../models/Enums";
import { PaymentDetails, CommonPaymentItem, CommonPaymentCurrencyAmount } from '../../models/PaymentDetails';

interface PaymentProps {}
interface PaymentStates {
    amount: Number
}

export default class Payment extends Component<PaymentProps, PaymentStates>  {
    
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

        let details = new PaymentDetails(
            "test-id",
            new CommonPaymentItem(
                new CommonPaymentCurrencyAmount("USD", this.state.amount.toString()),
                "total label text"
            ),
            [
                new CommonPaymentItem(
                    new CommonPaymentCurrencyAmount("USD", this.state.amount.toString()),
                    "details label text"
                )
            ]
        )

        let payreq = new PaymentRequest(paymentMethods, details)

        payreq.show().then(resp => {
            console.log(resp)
            setTimeout(() => {
                resp.complete("success")
            }, 1000)
        }).catch((reason: DOMException) => {
            console.log(reason)
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