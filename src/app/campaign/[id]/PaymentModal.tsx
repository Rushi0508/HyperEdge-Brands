import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import stripePromise from '@/app/libs/stripe';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

const CheckoutForm = ({ campaignId, creatorId, setPaymentModal, fetchCampaign }: any) => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setMessage("")
        if (!stripe || !elements) {
            return;
        }

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)!,
        });

        if (error) {
            setMessage(error.message);
            setLoading(false);
            return;
        }
        try {
            const { data } = await axios.post(
                '/api/pay',
                {
                    paymentMethodId: paymentMethod!.id,
                    amount: amount * 100,
                    creatorId: creatorId,
                    campaignId: campaignId
                },
            );

            if (data.hasOwnProperty('success')) {
                toast.success("Payment done successfully")
                fetchCampaign();
                setPaymentModal(false)
            }
        } catch (error) {
            setMessage('An error occurred while processing the payment.');
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Enter Amount' required />
            <div className='px-2 m-4'>
                <CardElement />
            </div>
            <Button size={"sm"} type="submit" disabled={!stripe || loading}>
                {loading && <ReloadIcon className='animate-spin mr-1' />} Pay
            </Button>
            {message && <div className='text-sm mt-2 text-red-600'>{message}</div>}
        </form>
    );
};

const PaymentModal = ({ paymentModal, setPaymentModal, campaignId, creatorId, fetchCampaign }: any) => {
    return (
        <Dialog open={paymentModal} onOpenChange={() => setPaymentModal(false)}>
            <DialogContent>
                <DialogTitle>Enter your card details</DialogTitle>
                <Elements stripe={stripePromise}>
                    <CheckoutForm setPaymentModal={setPaymentModal} campaignId={campaignId} creatorId={creatorId} fetchCampaign={fetchCampaign} />
                </Elements>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentModal;
