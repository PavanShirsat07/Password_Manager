import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordref = useRef();

    const [PasswordArray, setPasswordArray] = useState([]);
    const [form, setform] = useState({ id: '', site: '', userName: '', password: '' });

    // Show/Hide password functionality
    const showPassword = () => {
        if (passwordref.current.type === 'password') {
            passwordref.current.type = 'text';
            ref.current.src = "public/eye.png";
        } else {
            passwordref.current.type = 'password';
            ref.current.src = "public/eyecolor.png";
        }
    };

    const getPassword=async ()=>{
        const req=await fetch("http://localhost:3000/")
        const passswords=await req.json();
        setPasswordArray(passswords)
        console.log(passswords)
    }
    
    useEffect(() => {
    getPassword();
    }, []);

    // Handle form input changes
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast('🦄 Coped to clickbord', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
                });
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });}
    // Save password (add new or update existing)
    const savePassword =async () => {
        if(form.site.length>3&&form.password.length>3&&form.userName.length>3){
        if (form.id) {
            // Update existing password
            const updatedPasswordArray = PasswordArray.map(item => 
                item.id === form.id ? form : item
            );
            setPasswordArray(updatedPasswordArray);
            await fetch(`http://localhost:3000/`, {
                method: "DELETE",
                headers: { "Content-type": "Application/json" },
                body:JSON.stringify({id:form.id})
            });
            let req=await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-type":"Application/json"},body:JSON.stringify({...form,id:uuidv4()})})        } else {
            // Add new password
            const newPasswordArray = [...PasswordArray, { ...form, id: uuidv4() }];
            setPasswordArray(newPasswordArray);
            // localStorage.setItem("Password", JSON.stringify(newPasswordArray));
            let req=await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-type":"Application/json"},body:JSON.stringify({...form,id:uuidv4()})})
        }

        // Reset the form after saving
        setform({ id: '', site: '', userName: '', password: '' });
    }else{
    }
    };

    // Delete password
    const deletePassword =async (id) => {
        const updatedPasswordArray = PasswordArray.filter(item => item.id !== id);
        setPasswordArray(updatedPasswordArray);
        const req = await fetch(`http://localhost:3000/`, {
            method: "DELETE",
            headers: { "Content-type": "Application/json" }
        });
    };

    // Edit password - populate the form with the selected password's data
    const editPassword = (id) => {
        const passwordToEdit = {...PasswordArray.find(item => item.id === id),id:id};
        if (passwordToEdit) {
            setform(passwordToEdit);
        }
    };

    return (
        <>
             <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
/>
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] bg-black">
            </div>
            <div className='text-white flex justify-center align-middle m-5 '>
                <div className='flex flex-col gap-2 w-3/4 m-auto justify-center align-middle'>
                    <div className='font-semibold text-5xl ml-3 flex justify-center align-middle'>
                        <span className='text-blue-400'>&lt;</span>
                        Pass
                        <span className='text-blue-400'>Op&gt;</span>
                    </div>
                    <div className='flex justify-center ml-3'>
                        <span className='text-xl text-blue-100 '>Your Own Password Manager</span>
                    </div>
                    <div className='flex flex-col gap-4 bg-transparent'>
                        <input 
                            type="text" 
                            placeholder='Enter Website Url' 
                            value={form.site} 
                            onChange={handlechange} 
                            className='pl-2 p-1 w-full border border-gray-800 rounded-xl bg-transparent' 
                            name='site' 
                        />
                        <div className='flex flex-row gap-3'>
                            <span className='pl-2 p-1 w-full bg-transparent border border-gray-800 rounded-xl'>
                                <input 
                                    type="text" 
                                    placeholder='Enter UserName' 
                                    value={form.userName} 
                                    onChange={handlechange} 
                                    className='w-full bg-transparent appearance-none border-none focus:outline-none' 
                                    name='userName' 
                                />
                            </span>
                            <span className='flex pl-2 w-full bg-transparent border border-gray-800 rounded-xl pr-2'>
                                <input 
                                    ref={passwordref} 
                                    type='password' 
                                    placeholder='Enter Password' 
                                    value={form.password} 
                                    onChange={handlechange} 
                                    className='pl-2 p-1 w-full bg-transparent appearance-none border-none focus:outline-none' 
                                    name='password' 
                                />
                                <img 
                                    src="public/eyecolor.png" 
                                    alt="eye" 
                                    height={30} 
                                    width={30} 
                                    ref={ref} 
                                    onClick={showPassword} 
                                />
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-center mt-2 text-center'>
                        <button onClick={savePassword}>
                            <span className='border border-gray-800 rounded-xl flex justify-center p-1 w-80 gap-2'>
                                <img src="public/add3.png" height="40px" width="40px" alt="" />
                                <span className='font-bold text-blue-100 bg-transparent mt-2 text-center flex justify-center align-middle text-center'>
                                    {form.id ? 'Update Password' : 'Add Password'}
                                </span>
                            </span>
                        </button>
                    </div>
                    <div className='m-2'>
                        <span className='font-bold text-blue-200 text-xl'>Your Passwords</span>
                        <div className='border border-gray-500 m-1 rounded-md'>
                            <table className="table-auto w-full border-g overflow-hidden rounded-md border border-red-400">
                                <thead>
                                    <tr className='bg-black-200 border border-gray-500'>
                                        <th className='border border-gray-500'>Site</th>
                                        <th className='border border-gray-500'>UserName</th>
                                        <th className='border border-gray-500'>Password</th>
                                        <th className='border border-gray-500'>Action</th>
                                    </tr>
                                    {PasswordArray.length === 0 && <div className='m-1'>No passwords To Display</div>}
                                </thead>
                                {PasswordArray.length !== 0 &&
                                    <tbody className='overflow-hidden'>
                                        {PasswordArray.map((item, index) => (
                                            <tr key={index} className='border border-gray-500'>
                                                <td className='text-center border-gray-500 overflow-hidden'>
                                                    <div className='flex text-center gap-2 justify-between align-middle overflow-clip'>
                                                        <a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a>
                                                        <span className='cursor-pointer' onClick={() => copyToClipboard(item.site)}>
                                                            <img src="public/copy.png" width={25} alt="copy" />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className='text-center border border-gray-500'>
                                                    <div className='flex justify-between'>
                                                        <span>{item.userName}</span>
                                                        <span className='cursor-pointer' onClick={() => copyToClipboard(item.userName)}>
                                                            <img src="public/copy.png" width={25} alt="copy" />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className='text-center border-gray-500 overflow-hidden'>
                                                    <div className='flex justify-center align-middle'>
                                                        <span>{item.password}</span>
                                                        <span className='cursor-pointer' onClick={() => copyToClipboard(item.password)}>
                                                            <img src="public/copy.png" width={25} alt="copy" />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className='text-center border border-gray-500'>
                                                    <div className='flex gap-2 cursor-pointer'>
                                                        <span onClick={() => editPassword(item.id)}><img src="public/pencil.png" alt="" width={25} /></span>
                                                        <span onClick={() => deletePassword(item.id)}><img src="public/delete.png" alt="" width={25} /></span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Manager;
