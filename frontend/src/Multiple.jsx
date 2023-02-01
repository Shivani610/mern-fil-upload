import React, { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'
export default function Multi() {
    const [name, setName] = useState("kate")
    const [documents, setDocuments] = useState()
    const [users, setUsers] = useState([])

    const userInstance = axios.create({
        baseURL: "http://localhost:5000"
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(documents)
        const fd = new FormData()
        fd.append("name", name)
        for (let d of documents) {
            // console.log(d);
            fd.append("doc", d)
        }
        const { data } = await userInstance.post("user/add/gallery", fd)
        console.log(data);

        // form data printing
        // for (const x of fd.entries()) {
        //     console.log(x);
        // }

    }
    const getAllUsers = async e => {
        const { data: { result } } = await userInstance.get("/user/fetch")
        setUsers(result)
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    return <>

        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header">Login</div>
                        <form onSubmit={handleSubmit}>
                            <div class="card-body">
                                <div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        class="form-control"
                                        id="name"
                                        placeholder="Enter Your name"
                                    />

                                </div>
                                <div className='my-5'>
                                    <input
                                        onChange={e => setDocuments(e.target.files)}
                                        type="file"
                                        multiple
                                        class="form-control"
                                        placeholder='please choose docs'
                                    />

                                </div>

                                <button type="submit" class="btn btn-primary">Add Docs</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="conatainer">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <form>

                        {
                            users.map(item => <>
                                <div class="card">
                                    <div class="card-header"><h3> {item.name} </h3></div>
                                    <div class="card-body">
                                        {
                                            item.docs.map(url => <img src={`http://localhost:5000/${url}`}
                                                height={100} width={100}
                                                className="img-fluid"
                                            />)
                                        }
                                    </div>
                                </div>
                            </>)
                        }
                    </form>
                </div>
            </div>
        </div>
    </>
}