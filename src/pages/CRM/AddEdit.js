import React, { useState, useEffect, useRef } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import {  crmType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import methodModel from "../../methods/methods";
import ImageUpload from "../../components/common/ImageUpload";
import { Editor } from "@tinymce/tinymce-react";

const AddEditCRM = () => {
    const defaultvalue = () => {
        let keys = { ...crmType }
        Object.keys(crmType).map(itm => {
            if (itm != 'permissions') keys[itm] = ''
        })
        keys.status = 'active'
        return keys
    }
    const { id } = useParams()
    const [images, setImages] = useState({ image: ''});
    const [form, setform] = useState({...crmType})
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'name', required: true }
    ]
    const specialChars=useRef([])

    const getConstants=()=>{
        ApiClient.get('api/constants').then(res=>{
            if(res.success){
                let data=res.data.map(itm=>{
                    return {
                        text: itm, value: itm
                    }
                })
                // console.log("data",data)
                specialChars.current=data
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/contract/template'
        let value = {
            ...form,
            image:images.image,
            content: form.tiny_body,
            isAdmin:false
        }
        if (value.id && !methodModel.getPrams('copy')) {
            method = 'put'
            url = 'api/contract/template/update'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/crm")
            }
            loader(false)
        })
    }

    const imageResult = (e, key) => {
        images[key] = e.value
        setImages(images)
        console.log("imageResult", e)
    }

    const back=()=>{
        history.goBack()
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/contract/template/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = crmType

                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })

                    payload.tiny_body = value.content

                    if(methodModel.getPrams('copy')) payload.name=`Copy of ${payload.name}`

                    setform({
                        ...payload
                    })
                    images.image = payload?.image
                    setImages(images)
                }
                loader(false)
            })
        } else {
            setform(defaultvalue())
        }
        getConstants()
    }, [id])

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">{form && form.id && !methodModel.getPrams('copy')? 'Edit' : 'Add'} Contract Template</h3>

                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label>Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.name}
                                onChange={e => setform({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6  mb-3">
                            <label className='lablefontcls'>Image</label><br></br>
                            <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} multiple={false} />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Body<span className="star">*</span></label>
                            <Editor textareaName='content'
                             initialValue={form.content ? form.content : ''} className='tuncketcls'
                                onEditorChange={(newValue, editor) => {
                                    setform({ ...form, tiny_body: newValue })
                                }}
                              
                                init={{
                                    selector: 'textarea#autocompleter-cardmenuitem',
                                    height: 250,
                                    setup: (editor) => {
                                      const onAction = (autocompleteApi, rng, value) => {
                                        editor.selection.setRng(rng);
                                        editor.insertContent(value);
                                        autocompleteApi.hide();
                                        console.log("specialChars",specialChars)
                                      };
                                      const getMatchedChars = (pattern) => {
                                        return specialChars.current.filter(char => char.text.indexOf(pattern) !== -1);
                                      };
                                     
                                      /**
                                       * An autocompleter that allows you to insert special characters.
                                       * Items are built using the CardMenuItem.
                                       */
                                      editor.ui.registry.addAutocompleter('specialchars_cardmenuitems', {
                                        trigger: '$',
                                        minChars: 0,
                                        columns: 1,
                                        highlightOn: ['char_name'],
                                        onAction: onAction,
                                        fetch: (pattern) => {
                                          return new Promise((resolve) => {
                                           
                                            const results = getMatchedChars(pattern).map(char => ({
                                              type: 'cardmenuitem',
                                              value: '${'+char.value+'}',
                                              label: char.text,
                                              items: [
                                                {
                                                  type: 'cardcontainer',
                                                  direction: 'vertical',
                                                  items: [
                                                    {
                                                      type: 'cardtext',
                                                      text: char.text,
                                                      name: 'char_name'
                                                    }
                                                  ]
                                                }
                                              ]
                                            }));
                                            resolve(results);
                                          });
                                        }
                                      });
                                    }
                                  }}
                                // init={{
                                //     selector: "#tinymce-textarea",
                                //     setup: function (ed) {
                                //         ed.on("keyup", function (data) {
                                //             if (data.key == '@') {
                                //                 ApiClient.get(`api/users/listing`).then(res => {
                                //                     if (res.success) {
                                //                         setuserlist(res.data)
                                //                         console.log(res.data, 'dsfsd');
                                //                     }
                                //                 })
                                //             }
                                //         });
                                //     },
                                // }}
                                required
                            />
                        </div>
                    </div>
                    <div className="text-right">
                    <button type="button" className="btn btn-secondary discard mr-2" onClick={e=>back()}>Back</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>


            </form>
        </Layout>
    </>
}

export default AddEditCRM