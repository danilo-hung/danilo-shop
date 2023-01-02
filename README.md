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
> const [currentUser, setCurrentUser] = useState(null) 透過useState function 將 currentUser跟 setCurrentUser這兩個後續要傳遞到其他Component中使用的變數具有 useState 的功能
 
> const value = { currentUser, setCurrentUser } 設定value。 Value將會是後續取用Context時傳遞的變數
 
> return的內容 <UserContext.Provider> 是React的用法，其包圍起來的Components是可以使用UserContext數據的對象(本例中將設定為全部Components 見步驟3)
 
> {children}是自定義的變數，代表被包起來的對象，例如
```js
      <UserProvider>
        <App />
      </UserProvider>
```
> `<App />` 就是 {children}
3. 在index.js中 ` import { UserProvider } from './context/user.context'; ` 並將原本的
```js
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>

);
```
改成
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
### 在登入的Component中取用UserContext中的setcurrentUser function
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
### 在navbar的Component中取用UserContext中currentUser的值
1. 在 src/routes/navigation/navigation.component.jsx中 ` import { useContext } from 'react' ` 、` import { UserContext } from '../../context/user.context' `
2. 在 return 中 增加 `const {currentUser} = useContext(UserContext) `  
> 提醒，因為currentUser是 useState中的變數，所以當Sign in component中的setCurrentUser被觸發時，navigation中的currentUser因為setState的原因，會Re Rander