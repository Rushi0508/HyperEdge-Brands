'use client'

import { Toaster } from "react-hot-toast"

const ToastContext = ()=>{
    return(
        <Toaster
            containerClassName="text-sm 2xl:text-base"
            position="top-center"
            gutter={8}
            toastOptions={{
                duration: 2000
            }}
        />
    );
}

export default ToastContext;