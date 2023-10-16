'use client'
import {useState} from 'react'
import useRequest from 'hooks/useRequest'
import TextInput from "@components/Inputs"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignUp = () => {
  const [form,setForm] = useState({
    email: "",
    password: ""
  })

  const {push} = useRouter()

  const { doRequest, errors }:any = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: form,
    onSuccess: ()=>push("/")
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await doRequest();
  };
  
  const handleChange = (e:any)=>{
    const {name,value} = e.target;
    setForm({...form,[name]: value})
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      {errors}
      <TextInput 
        onChange={handleChange} name="email" 
        type={"email"} value={form.email} 
        placeholder="Enter email" label="Email"
      />
      <TextInput 
        onChange={handleChange} name="password" 
        type={"password"} value={form.password} 
        placeholder="Enter Password" label="Password"
      />
      <button type="submit" className="btn btn-primary">Submit</button>
      <div className='m-10'>
        <Link href="/auth/signup">Sign up</Link>
      </div>
    </form>
  )
}

export default SignUp