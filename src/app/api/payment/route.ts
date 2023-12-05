import { NextRequest, NextResponse } from 'next/server'
import Payment from '@/models/payment';
import Appointment from '@/models/appointment';

export async function POST(request: NextRequest) {

    const { name, mobileNumber, appointmentId } = await request.json()

    try {
        const res = await fetch('https://api.zarinpal.com/pg/v4/payment/request.json', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // eslint-disable-next-line camelcase
                merchant_id: process.env.ZARINPAL_MERCHANT_ID,
                amount: 1000,
                currency: 'IRT',
                // eslint-disable-next-line camelcase
                callback_url: `${process.env.NEXTAUTH_URL}/api/payment?Amount=${1000}&Name=${name}&MobileNumber=${mobileNumber}&AppointmentId=${appointmentId}`,
                description: 'رزرو جدید در اپوینت‌ منت',
            }),
        })

        const resData = await res.json()

        return NextResponse.json({ authority: resData.data.authority })
    } catch (err) {
        console.error('err Zarinpal: ', err)
        return NextResponse.json(false)
    }
}

// ZARIN PALL
export async function GET(req: NextRequest) {
    const status = req.nextUrl.searchParams.get('Status')
    const authority = req.nextUrl.searchParams.get('Authority')
    const amount = req.nextUrl.searchParams.get('Amount')
    const name = req.nextUrl.searchParams.get('Name')
    const mobileNumber = req.nextUrl.searchParams.get('MobileNumber')
    const appointmentId = req.nextUrl.searchParams.get('AppointmentId')

    if (status == 'OK' && authority?.length == 36) {
        const verifyPayment = async () => {
            const res = await fetch('https://api.zarinpal.com/pg/v4/payment/verify.json', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'merchant_id': process.env.ZARINPAL_MERCHANT_ID,
                    amount,
                    authority
                })
            })

            const resData = await res.json()

            return resData.data
        }

        const verifyRes = await verifyPayment()

        if (verifyRes.code == 100 || verifyRes.code == 101) {  // 100=success, 101=verified successs before

            await Appointment.findOneAndUpdate({ _id: appointmentId }, { paid: true })


            const payment = await Payment.create({
                clientName: name,
                clientMobileNumber: mobileNumber,
                amount,
                cardNumber: verifyRes.card_pan,
                refId: verifyRes.ref_id
            })

            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment?Status=OK&ID=${payment._id}&AppointmentId=${appointmentId}&Name=${name}`)
        } else {
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment?Status=NOK`)
        }
    } else {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment?Status=NOK`)
    }
}