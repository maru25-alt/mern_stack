import React, { useEffect, useState } from 'react';
import Post from '../components/user/Post'
import { useSelector, useDispatch } from 'react-redux';
import {selectUser, update} from '../features/user/userSlice'
import axiosInstance, {SentMessagesConnection} from '../api';
import {LoginString} from '../localStorage'
import EditProfile from '../components/user/EditProfile';
import NewPost from '../components/user/Create_Post'
import '../css/userPage.css';
import {  toast } from 'react-toastify';
import {getImgSrc} from '../utils'
import {Spinner} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import { FormattedMessage} from 'react-intl';


function UserProfile({match}) {
    const user = useSelector(selectUser);
    const [stateUser, setstateUser] = useState({});
    const id = match.params.id;
    const isLoggedin = user?.id === id ? true : false;
    const [file, setFile] = useState("");
    const [selectedFile, setselectedFile] = useState("")
    const [showEdit, setshowEdit] = useState(false)
    const [loading, setloading] = useState("");
    const [showPost, setshowPost] = useState(false)
    const dispatch  = useDispatch();
    const [pageLoading, setpageLoading] = useState(false);
    const [change, setchange] = useState(false);
    const [postFile, setpostFile] = useState("");
    const [postSelectedFile, setpostSelectedFile] = useState("")
    const [postCaption, setpostCaption] = useState("");
    const history = useHistory()


    useEffect(() => {
        setpageLoading(true)
        axiosInstance.get(`/users/${id}`).then(res => {
            let {data} = res;
            console.log(data)
            if(data.success){
               setstateUser(data.user)
            }
            else{
               setstateUser(false)
            }
            setpageLoading(false)
        }).catch(err => {
           setstateUser(false);
           setpageLoading(false)
        })
   }, [id])

   const handleSendMessage  = () => {
     SentMessagesConnection(id, history)
   }

      const handleChangeFile = (e) => {
         const selected = e.target.files[0];
          if(selected){
              setselectedFile(selected)
              const fileReader = new FileReader();
              fileReader.readAsDataURL(selected);
              fileReader.onloadend = () => {
                setFile(fileReader.result)   
              };
          } 
      }
      const  handleSubmitFile = (e) => {
          e.preventDefault()
          if(file){
             const fileData = new FormData();
             fileData.append("photo", selectedFile)
             axiosInstance.post(`/upload`, 
             fileData, { }).then(res => {
                const path= res.data.path;
                axiosInstance.put(`/users/update/${id}`,{photoUrl: path})
                .then(resp => {
                const response = resp.data;
                if(response?.success){
                     dispatch(update({
                         photoUrl: path
                     }));
                     setchange(true)
                     localStorage.setItem(LoginString.PhotoURL, path);
                     setshowEdit(false)
                }
                else{
                    toast.error("something when wrong try again later", {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                     })}
                   })
                 })
              .catch(()=> {
                  toast.error("something when wrong try again later", {
                      position: "top-right",
                      autoClose: false,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                  })  
              })
          }
      }
      const deletePost = (i) => {
        let filterdPost =  stateUser.posts.filter(e => e._id !== i);
        console.log(filterdPost)
        axiosInstance.put(`/users/update/${user?.id}`, 
        {posts: filterdPost})
        .then(e => {
            if(e.data.success){
              setloading(false);
              console.log(e.data);
              setstateUser(e.data.newData)
              setshowPost(false);
              setpostFile('')
              setpostSelectedFile('')
              setpostCaption('')
            }
        })
      }

      const handleCreateNewPost = () => {
        if(postCaption || postFile){
          setloading(true);
          if(postFile){
           const fileData = new FormData();
           fileData.append("photo", postSelectedFile)
           axiosInstance.post(`/users/upload/post`, 
            fileData, { })
            .then(res => {
                console.log(res.data);
                const path= res.data.path;
                axiosInstance.put(`/users/update/${user?.id}`, 
                {posts: [{caption: postCaption, img: path}, ...stateUser?.posts]})
                .then(e => {
                    if(e.data.success){
                      setloading(false);
                      console.log(e.data)
                      setstateUser(e.data.newData)
                      setshowPost(false);
                      setpostFile('')
                      setpostSelectedFile('')
                      setpostCaption('')
                    }
                })
            })
            .catch(err => {
              console.log(err)
              setloading(false)
            })
          }
          else{
            axiosInstance.put(`/users/update/${user?.id}`, 
            {posts: [{caption: postCaption}, ...stateUser?.posts]})
            .then(e => {
                if(e.data.success){
                  setloading(false);
                  console.log(e.data);
                  setstateUser(e.data.newData)
                  setshowPost(false);
                  setpostFile('')
                  setpostSelectedFile('')
                  setpostCaption('')
                }
            })
          }
        }
      }

      const handleChangePostImage = (e) =>{
        const selected = e.target.files[0];
        if(selected){
          if(selected.size > 2000000 ){
            alert("file is too large");
            return 0
           }
          setpostSelectedFile(selected)
          const fileReader = new FileReader();
          fileReader.readAsDataURL(selected);
          fileReader.onloadend = () => {
              setpostFile(fileReader.result)   
          };
       } 
     }
    
      
    console.log(stateUser.photoUrl)
    return (
        <div  className="userprofile ">
         {pageLoading ? 
             <div>
                 <Spinner animation="grow" size="sm" />
                 <Spinner animation="grow" size="sm" />
                 <Spinner animation="grow" size="sm" />
              </div> : 
          <>
            {!stateUser ? 
             <div className="profile__notfound">
                   <h3 ><FormattedMessage id="sorry"/></h3>
             </div>  
             :
            <>
              <div className=" profile__header">
                <>
                   {change ? <img className="avatar" 
                     src={file} alt=""/> :
                     <>
                         {stateUser.photoUrl ?  
                          <img className="avatar" 
                          src={ getImgSrc() + '/'+ stateUser.photoUrl} alt=""/> 
                          : <strong className="initial">{stateUser?.name?.slice(0, 1)}</strong> }
                     </>
                     }
                   {isLoggedin &&    <strong className="btn" onClick={() => setshowEdit(true)}> <i class="fas fa-edit    "></i>  </strong>}  
                </>
                <div className="profileHeader__username">
                    <h5> <strong> {stateUser?.name} </strong></h5>
                    <div>{stateUser?.email}</div>
                    <span className="text-muted">{stateUser?._id}</span>
                </div>
                 
                  <div>
                  { isLoggedin ?
                    <button 
                      onClick={() => setshowPost(true)} 
                      className="btn primary-btn">
                      <FormattedMessage id="create"/>
                    </button> :
                    <button 
                      onClick={handleSendMessage} 
                      className="btn primary-btn">
                        <FormattedMessage id="sendMsg"/>
                      </button>
                    }
                  </div>
            </div>
            <div className="profile__body">
                 <h4> <strong><FormattedMessage id="posts"/></strong> </h4>
                 <div className="post__container">
                     { (!stateUser?.posts || stateUser.posts.length <= 0) && <div> No Posts yet</div> }
                     {stateUser.posts && stateUser.posts.map(e => 
                          <Post 
                          key={e._id} 
                          img={e.img} 
                          id={e._id}
                          isLoggedin ={isLoggedin}
                          deletePost={deletePost}
                          caption={e.caption} 
                          date={e.date}/>
                     )}
                 </div>
            </div>
           </>
            }
          </>}
          {/* <TestUpload /> */}
            <EditProfile 
               show={showEdit} 
               handleClose={() => setshowEdit(false)}
               file={file} 
               handleChangeFile={handleChangeFile} 
               handleSubmitFile={handleSubmitFile} 
               loading={loading}/>

               <NewPost 
               show={showPost}
               posts={stateUser?.posts} 
               setpostCaption={setpostCaption}
               postFile={postFile}
               loading={loading}
               handleCreateNewPost={ handleCreateNewPost}
               handleClose={() => setshowPost(false)} 
               handleChangePostImage={handleChangePostImage}
               user={user}/>
        </div>
    )
}

export default UserProfile
