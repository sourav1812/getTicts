import axios,{AxiosRequestConfig,Method} from "axios";
import { useState } from "react";

interface IProps {
    url: string;
    method: Method | undefined;
    body?: any;
    onSuccess: any
  }

const useRequest = ({url,method,body,onSuccess}:IProps)=>{
    const [errors, setErrors] = useState<any>([]);

    const doRequest = async () => {
      setErrors([]);
        try {
          // set config up to have dinamyc hook use of url, method and boyd
          let config: AxiosRequestConfig = {
            url: url,
            method: method,
            data: body,
          };
          const response = await axios.request(config);
          onSuccess();
          return response;
        } catch (err: any) {
          setErrors(
            <div className="alert alert-danger">
              <h4>Oppos</h4>
              <ul className="my-0">
                {err.response.data.errors.map((err: Error) => (
                  <li key={err.message}>{err.message}</li>
                ))}
              </ul>
            </div>
          );
         /*
          !What below code will do?
          *I added this line because when await doReqest(); will faild then nothing is going to execute after this 
          * eg. push("/") -> so prevent this other if everything is success push("/") will be executed
          * But we better option using callback
         */
          // throw new Error("I will make sure nothing will execute after doRequest fails. where ever you call me");
        }
      };

  return { doRequest, errors };
}

export default useRequest;