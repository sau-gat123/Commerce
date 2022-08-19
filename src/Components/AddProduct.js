import{React, useState } from "react"
import { fs,auth,storage } from "./Config"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { upload } from "@testing-library/user-event/dist/upload"
import { addDoc, collection, doc } from "firebase/firestore"




const AddProduct = () => {
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [image,setImage]=useState(null)
    const [successMsg,setSuccessMsg]=useState()
    const [UploadErr,setUploadErr] =useState();
    const [progess,setProgress]=useState(null)
    const [category,setCategory]=useState("")
   
    const [imageError,setEmageError]=useState('');
     const types=['image/jpg','image/png',"image/PNG",'image/jpeg'];
    const handleProductImg=(e)=>{
        let selectedFile=e.target.files[0]
        if(selectedFile&&types.includes(selectedFile.type)){
              setImage(selectedFile);
              console.log("success")

            
        }
        else{
            setEmageError("Please upload a fily type of 'PNG'or'JPG")
            setImage(null)
            console.log("sda")
        }
        

    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      console.log(title,description,price);
      console.log(image); 
     
      const storageRef = ref(storage, `files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log(progress);
          setProgress(progress)
        
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log(downloadURL);
        addDoc(collection(fs, "Product"), {
         title:title,
         description:description,
         category:category,
         price:Number(price),
         downloadURL
        }).then(()=>{
          setSuccessMsg("product Upload Succssfully")
          setImage('');
          setTitle('')
          setDescription('')
          setCategory('')
          document.getElementById("file").value='';

        })
        })
      }
    )
      }
    



    

return(
<>
      
    <div className="container">
        <br></br>
        <br></br>
        <h1>AddProduct</h1>
        <hr></hr>
        {successMsg&&<>
        <div className="success-msg">{successMsg}</div>
        </>}

      <form autoComplete="off" className="form-group " onSubmit={handleSubmit}>
          <label>Product Title</label>
          <input type="text" className="form-control" required value={title} onChange={((e)=>{
setTitle(e.target.value)
          })} />
          <br></br>
          <label>Product Description</label>
          <input type="text" className="form-control" required value={description}  onChange={((e)=>{setDescription(e.target.value)})}/>
          <br></br>
          <label>Product Price</label>
          <input type="text" className="form-control" required value={price} onChange={((e)=>{setPrice(e.target.value)})}/>
          <br></br>
          <label>Product Category</label>
                <select className='form-control' required
                value={category} onChange={(e)=>setCategory(e.target.value)}>                                    
                    <option value="">Select Product Category</option>                   
                    <option>Men</option>
                    <option>Women</option>
                    <option>Casual</option>
                    <option>Formal</option>
                    <option>Summer</option>
                    <option>Winter</option>
                  
                </select>
                <br></br>
          <label>Upload Product Image</label>
          <input type="file" id="file" className="form-control" required   onChange={handleProductImg }/>
          <br></br>
          {progess&&<><div>{progess}</div></>}
          {imageError&&<>
          <div className="error-msg">{imageError}</div>
          </>}

          <div style={{display:'flex',justifyContent:"flex-end"}}>
          <button type="submit" className='btn btn-success btn-md'>
                        SUBMIT
                    </button>
          </div>
      </form>
      
       {UploadErr&&<>
       <br></br>
       <div className="error-msg">{UploadErr}</div></>}
    </div>
    </>
  ) 
}


export  {AddProduct} 