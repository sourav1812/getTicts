import axios from "axios";
import { headers } from 'next/headers'

const API = ()=>{
    if(typeof window === "undefined"){
        //we are on server
        const headersObj = {};
        const headersList = headers().forEach((header, key) => {
          //@ts-ignore
          headersObj[key] = header;
        });

        // console.log("headersObj",headersObj);

        return axios.create({
            baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
            headers:headersObj
        })
    }else{
        //we must be on the browser
        return axios.create({
            baseURL: "/"
        })
    }
}

export default API