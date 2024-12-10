import React, { useState } from 'react'
import { toast } from 'react-toastify'

import Resize from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from '../../api/product'
import uesEcomStore from '../../store/ecom-store'
import { Loader } from 'lucide-react';

const Uploadfile = ({ form, setForm }) => {

    const token = uesEcomStore((state) => state.token)
    const [isLoading, setisLoading] = useState(false)
    // const [form ,setForm] = useState()
    const handleOnChange = (i) => {
        setisLoading(true)
        const files = i.target.files
        if (files) {
            setisLoading(true)
            let allFiles = form.images
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])

                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} don't image`)
                    continue
                }
                // image Resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // endpoint Backend
                        // console.log('data',data)
                        uploadFiles(token, data)
                            .then((res) => {
                                // console.log(res)
                                allFiles.push(res.data)
                                console.log('allfile', res.data)


                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setisLoading(false)
                                toast.success('Upload image succsee!!!')
                            })
                            .catch((err) => {
                                console.log(err)
                                setisLoading(false)
                            })
                    },
                    "base64"
                )
            }
        }
        // console.log(files)
    }
    // console.log(form)

    const handleDelete = (public_id) => {
        const image = form.images
        removeFiles(token, public_id)
        .then((res) => {
            console.log(res)
            const filterImages = image.filter((item) => {
                return item.public_id !== public_id
            })
            console.log('filter images',filterImages)
            setForm({
                ...form,
                images: filterImages
            })
            toast.error(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <div className='flex mx-4 gap-4 my-4' >
                {
                    isLoading && <Loader className='text-red-600 w-16 h-16 animate-spin' />
                    
                }
                {
                    form.images.map((item, index)=>
                        <div className='relative' key={index}>
                            <img 
                            className='w-24 h-24 hover:scale-110'  
                            src={item.url}
                            />
                            <span onClick={()=>handleDelete(item.public_id)} className='absolute top-0 right-0 bg-red-700 p-1 rounded-md'>X</span>
                        </div>
                    )
                }
            </div>
            <div>

                <input
                    onChange={handleOnChange}
                    type='file'
                    name='images'
                    multiple
                />
            </div>
        </div>
    )
}

export default Uploadfile