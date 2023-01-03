# Context - 設定全局的數據供各個Component取用
1. 當我們使用變量供子輩Component使用時，通常使用props來傳遞
2. 但當父輩Component需使用變量供好幾層之下的子輩Component使用時，需傳遞好幾次，造成props drilling issue
3. 因此，React Hook中，提供環境數據的儲存，供不同的Component直接取用，這個儲存環境稱為Context

## Context的使用概念
Context的使用分為硬性的三個步驟 : 
1. 創造Context (createContext) : 在jsx中透過 ` createContext({數據}) ` React Function創造儲存數據的環境
2. 提供Context (myContext.Provider) : 透過 `<myContext.Provider> <App 或 myComponent/> <myContext.Provider/>` 指定Context 中的數據供包起來的 ` <App 或 myComponent> ` 取用，如果是指定的範圍之外，無法取用該Context中的內容 
> 取用的方式根據value的設定，不一定只能單向取用，也可以雙向取用
3. 取用Context (useContext) : 透過在Component中呼叫 `useContext(myContext)` React Function ， 將Context的Value傳遞至該Conponent中使用

### 本專案以用戶登入後Web app得以取用用戶資料為例 建立userContext
## 創造Context (createContext)
1. src/(新建)context/user.context.jsx中 ` import { createContext } from 'react'; `
2. 透過定義 UserContext 儲存 使用者資訊
```js 
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: () => null
}); 
```
> currentUser 初始值設定為null, 後續當用戶登入時，將用戶資料傳遞到currentUser中儲存
> 
> setCurrentUser 初始值設定為空白的function，後續Provide Context時將其變成[currentUser, setCurrentUser] = useState(null)中的function

## 提供Context(Provide)
1. src/(新建)context/user.context.jsx中 ` import { useState } from 'react'; `
2. 透過 React 語法 建立提供UserContext方法的function
```js
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
```
> * const [currentUser, setCurrentUser] = useState(null) 透過useState function 將 currentUser跟 setCurrentUser這兩個後續要傳遞到其他Component中使用的變數具有 useState 的功能
>
> * const value = { currentUser, setCurrentUser } 設定value。 Value將會是後續取用Context時傳遞的變數
>
> * return的內容 <UserContext.Provider> 是React的用法，其包圍起來的Components是可以使用UserContext數據的對象(本例中將設定為全部Components 見步驟3)
>
> * {children}是自定義的變數，代表被包起來的對象，如下
>```js
>     <UserProvider>
>       <App />
>     </UserProvider>
>```
> * `<App />` 就是 {children}
3. 在index.js中 ` import { UserProvider } from './context/user.context'; ` 並將原本的`<App/>`用`<UserProvider>`包覆
```js
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>

);
```

```js
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>

);
```
## 取用Context (useContext)
### 在Authentication的Component中取用UserContext中的setcurrentUser function，讓用戶在登入或是註冊時，webApp可以儲存該用戶資料
####  在 Sign in form 中 提取用戶資料儲存到 UserContext的 currentUser中
1. 在src/components/sign-in-form/sign-in-form.component.jsx中 ` import { useContext } from "react" ` 、 ` import { UserContext } from "../../context/user.context"; `
2. 透過 React Function - useContext(UserContext) ` const { setCurrentUser } = useContext(UserContext) ` 將setCurrentUser提取到sign in 的 Component中
3. 在 handleSubmit 的 function 中增加 ` setCurrentUser(user); ` ， 如此一來，當用戶成功登入時，user的data將會傳遞到Context的currentUser之中
handleSubmit function : 
```js 
const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            setCurrentUser(user);
            resetFromField();
            setLogInMsg("Successfully Log In !");
        } catch (error) {
            if (error.code == 'auth/wrong-password') {
                setErrorMsg("Wrong Email or Password :(")
            } else if (error.code == 'auth/user-not-found') {
                setErrorMsg("Eamil not Found :O ")
            } else {
                setErrorMsg(error.message)
            }
        }
    }
```
#### 將google signin的用戶資訊儲存到currentUser中 : 
```js
    const signInWithGoogle = async () => {
        const res = await signInWithGooglePopup();
        // console.log(res)
        const user = res.user;
        await createUserDocumentFromAuth(user);
        setCurrentUser(user);
    }
```
#### 將Sign up的用戶資訊儲存到currentUser中 : 
  1. 在sre/components/sign-up-form/sign-up-form.component.jsx中 `import { useContext } from "react"`
  2. 在SignUpForm中 `const {setCurrentUser}=useContext(UserContext)`
  3. 在handleSubmit function中 增加 `setCurrentUser(user)`
  

### 在navbar的Component中取用UserContext中currentUser的值
 
#### 讓navigation Component追蹤用戶是否登入，如果登入的話，將 "Login" link改成 "Logout"
1. 在 src/routes/navigation/navigation.component.jsx中 ` import { useContext } from 'react' ` 、` import { UserContext } from '../../context/user.context' `
2. 在 Navigation Component 中 Hook `const {currentUser} = useContext(UserContext) `  
> 提醒，因為currentUser是 useState中的變數，所以當Sign in component中的setCurrentUser被觸發時，navigation中的currentUser因為setState的原因，會Re Rander
3. 將原本的`<Link> Login <Link/>`改成藉由判斷currentUser是否存在來決定顯示Login或Logout
```js
                    {
                        currentUser ? (
                            <Link onClick={signOutHandler} className='nav-link' to='/'>
                                Logout
                            </Link>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                Login
                            </Link>
                        )
                    }
```
### FireBase設定登出
FirBase提供signOut方法，將Auth作為變數將用戶登出。in <u>src\utils\firebase\firebase.utils.js</u> :
```js
import {signOut} from "firebase/auth";
export const signOutUser = async() => await signOut(auth);
```
### navbar設定登出
in <u> src\routes\navigation\navigation.component.jsx </u> : 
```js
import { signOutUser } from '../../utils/firebase/firebase.utils'

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const signOutHandler = async () => {
       await signOutUser();
       setCurrentUser(null)
    }
    return (
        <Fragment>
            <nav className='navigation'>
                // other code
                <div className='nav-links-container'>
                    // other code
                    {
                        currentUser ? (
                            <Link onClick={signOutHandler} className='nav-link' to='/'>
                                Logout
                            </Link>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                Login
                            </Link>
                        )
                    }
                </div>
            </nav>
            <Outlet />
        </Fragment>
    )
}
```
# 集中組織UserContext
上述過程，透過在Sign in跟 Sign up Component中設定setCurrentUser來判斷用戶是否登入網站。另一個方法是透過FireBase提供的一個工具 - onAuthStateChanged，來追蹤用戶是否登入。使用這個工具的優點是 : 不需要在SignIn SignUp Component中反覆進行setCurrentUser,而是在userContext中透過useEffect運行onAuthStateChanged來追蹤用戶

```js
import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(()=>{
        onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user);
        }
            setCurrentUser(user) //null
        })
    },[])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
```