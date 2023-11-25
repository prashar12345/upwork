import React, { useEffect, useState } from "react"
import { ToastsStore } from "react-toasts"
import Layout from "../../components/global/layout"
import ApiClient from "../../methods/api/apiClient"

const ContactDetails = () => {
    const [form, setform] = useState({ email: '', contactNo: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        ApiClient.post('contact/detail', { email: form.email, contactNo: form.contactNo }).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
            }
        })
    }

    useEffect(() => {
        ApiClient.get('contact/detail').then(res => {
            if (res.success) {
                setform(res.data)
            }
        })
    }, [])

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <h3>Contact Detail</h3>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" value={form.email} onChange={e => setform({ ...form, email: e.target.value })} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Mobile</label>
                        <input type="number" className="form-control" value={form.contactNo} onChange={e => setform({ ...form, contactNo: e.target.value })} />
                    </div>
                    <div className="col-md-12 text-right">
                        <button className="btn btn-primary">Update</button>
                    </div>
                </div>
            </form>
        </Layout>
    </>
}

export default ContactDetails