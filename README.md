# Reducer
設置Reducer包含兩個概念 :  ( someReducer = (state, action) ⇒ { … }  )

1. State object : object屬性，代表Reducer中初始State
2. Action : 類似setState，但用法不同，須包含”type”以及”payload”
    + type : 必須是String屬性，代表要trigger的類型
    + payload : 可以是任何屬性，代表要更新到myReducer state object的內容

## 將userContext中的useState以useReducer取代

userContext是一個當使用者登入後，將使用者的基本資料儲存以供取用的Context。並透過useState跟useEffect，當使用者登入時setCurrentUser

```jsx
import { createContext, useEffect, useState } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    useEffect(() => {
        onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user)
        })
    }, [])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
```

以Reducer取代useState的步驟 : 

1. `import {useReducer} from ‘react’;` 
2. 自定義userReducer : 
    
    函數變數需要符合useReducer取用的格式，所以需要包含 state, action
    
    ```jsx
    const userReducer = (state, action) => {
    	//從action中提取type 跟 payload
    	const {type, payload} = action;
    	//當type等於"SET_CURRENT_USER"時，return 包含使用者資料的 object
    	switch(type){
    		case "SET_CURRENT_USER" : 
    			return{
    				...state,  //將原本的state回傳進使用者資料中
    				currentUser: payload  //將object中的currentUser更新為 payload
    		}
    		case default : 
    			throw new Error(`Unhandled type ${type} in userReducer`)
    	}
    }
    ```
    
3. 設定type的條件跟state的初始值
    
    ```jsx
    export const USER_ACTION_TYPES = {
        SET_CURRENT_USER: 'SET_CURRENT_USER'
    }
    
    const INITIAL_STATE = {
        currentUser: null
    }
    ```
    
4. 將userReducer中的switch(type)進行調整
    
    ```jsx
    	switch(type){
    		case "SET_CURRENT_USER" : //刪除此行 
    		case USER_ACTION_TYPES.SET_CURRENT_USER:
    			...
    			...
    	}
    ```
    
5. 將 UserProvider中的useState換成useReducer
    
    ```jsx
    export const UserProvider = ({children}) => {
    	const [currentUser, setCurrentUser] = useState(null); //刪除此行
    	const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    }
    ```
    
    useReducer中，INITIAL_STATE會被使用作為userReducer的初始state
    
    dispatch是更改userReducer中的state object所需要呼叫的函式
    
6. 自定義setCurrentUser函式，利用dispatch功能改變currentUser的值
    
    ```jsx
    const setCurrentUser = (user) => {
            dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
        }
    ```
    
    代表trigger userReducer中運行type == USER_ACTION.SET_CURRENT_USER條件時運行相對應的函式，將payload賦值為user回傳到條件成立的userReducer中
    
    userReducer : 
    
    ```jsx
    const userReducer = (state, action) => {
    	const {type, payload} = action;
    	switch(type){
    		case "SET_CURRENT_USER" : 
    			return{
    				...state, 
    				currentUser: payload  //payload : user會被回傳，使currentUser : user
    		}
    		case default : 
    			throw new Error(`Unhandled type ${type} in userReducer`)
    	}
    }
    ```