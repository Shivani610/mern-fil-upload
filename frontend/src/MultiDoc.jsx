import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

export default function MultiDoc() {
    const [dob, setDob] = useState()
    const [adhar, setAdhar] = useState()
    const [tc, setTc] = useState()
    const [users, setUsers] = useState([])
    const userInstance = axios.create({
        baseURL: "http://localhost:5000"
    })
    const handelSubmit = async (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append("dob", dob)
        fd.append("adhar", adhar)
        fd.append("tc", tc)
        const { data } = await userInstance.post("doc/add", fd)
        console.log(data);
    }
    const getAllUsers = async e => {
        const { data: { result } } = await userInstance.get("/doc")
        console.log(result, "result");
        setUsers(result)
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    return <>
        <div className="conatiner">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <form action="" onSubmit={handelSubmit}>
                        <div>
                            <label for="name" class="form-label">Dob</label>
                            <input
                                type="file"
                                class="form-control" id="name"
                                onClick={e => setDob(e.target.files[0])}
                                placeholder="Enter Your Dob" />

                        </div>
                        <div>
                            <label for="name" class="form-label">Adhar</label>
                            <input type="file" class="form-control"
                                onClick={e => setAdhar(e.target.files[0])}
                                id="name" placeholder="Enter Your Adhar" />

                        </div>
                        <div>
                            <label for="name" class="form-label">Tc</label>
                            <input type="file"
                                onClick={e => setTc(e.target.files[0])}
                                class="form-control" id="name" placeholder="Enter Your Tc" />

                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
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
                                    <div class="card-body">
                                        {
                                            <>
                                                <img src={`http://localhost:5000/${item.userAdhar}`}
                                                    height={100} width={100}
                                                    className="img-fluid"
                                                />
                                                <img src={`http://localhost:5000/${item.userTc}`}
                                                    height={100} width={100}
                                                    className="img-fluid"
                                                />
                                                <img src={`http://localhost:5000/${item.userDob}`}
                                                    height={100} width={100}
                                                    className="img-fluid"
                                                />
                                            </>
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
