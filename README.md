# Redux

Redux類似於reducer+Context

Context vs Redux 範圍界定 : 

當使用Context時，會將Context要使用提取的內容儲存在createContext工具中，再透過CartProvider工具設置可以提取該內容的子component範圍

而使用Redux時，會將所有內容儲存在Redux Store中，並且該web app的所有Component都可以提取Redux Store的內容

useState vs Redux 功能差異 : 

通常使用Context時，會結合useState來操縱內容的變數，讓某個條件下透過setState改變Context內某一個變數的變量

在Redux中，透過reducer概念中的action去改變Redux store中某一變數的變量

## Redux使用

### Redux 基礎環境設定

1. 環境設定
    
    ```jsx
    npm add redux react-redux redux-logger
    ```
    
    *redux-logger 幫助查看reducer action 運行的關係
    
2. 建立資料夾系統
    
    在src中新增store folder, 所有的Redux Code都會放置在該資料夾中運作
    
    在src/store中新增 store.js (放置運算Redux的code, 包含dispatch, action…)
    
    ```jsx
    import {compose, createStore, applyMiddleware} from 'redux';
    import logger from  'redux-logger'
    ```
    
3. src/store 中新增 root-reducer.js
    
    ```jsx
    import {combineReducers} from 'redux'
    
    export const rootReducer = combineReducers({
         //放置userReducer, cartReducer, categoryReducer...等所需要的Reducer 
    })
    ```
    
    combineReducers 工具可以將不同的reducers合併成一個大型的Reducers提供Redux一併使用
    
4. src/store中新增user, cart, category folder, 並在user folder中新增user.reducer.js
    - user.reducer
        
        ```jsx
        //  src/store/user/user.reducer.js
        
        export const USER_ACTION_TYPES = {
            SET_CURRENT_USER: 'SET_CURRENT_USER' //預先設定trigger userReducer的條件type
        }
        const INITIAL_STATE = {
            currentUser: null //設定userReducer內含的初始state值
        }
        export const userReducer = (state = INITIAL_STATE, action) => { //state=INITIAL_STATE 設定當userReducer首次取用時的初始State內容
            const { type, payload } = action;
            switch (type) {
                case USER_ACTION_TYPES.SET_CURRENT_USER:
                    return {
                        ...state,
                        currentUser: payload
                    }
                default:
                    ~~throw new Error(`Unhandled type ${type} in userReducer`)~~
        						return state  //設定當沒有任何action影響userReducer時，回傳原先的state值
            }
        }
        
        ```
        
5. 在 src/store/root-reducer.js中 import userReducer
    
    ```jsx
    import {combineReducers} from 'redux'
    
    import { userReducer } from './user/user.reducer'
    
    export const rootReducer = combineReducers({
         user: userReducer,
    
    })
    ```
    
6. 在src/store/store.js中使用rootReducer
    
    ```jsx
    import {compose, createStore, applyMiddleware} from 'redux'
    import {logger} from 'redux-logger'
    import { rootReducer } from './root-reducer';
    
    const middleWares = [logger] //logger是一個工具，在app運行時顯示reducer action dispatched 前後的 state變化
    //設定middleWares的目的是，幫助在action dispatched的動作前，先運行middleWares, 好讓開發者可以透過logger看到state變化
    const composedEnhancers = compose(applyMiddleware(...middleWares))
    //為了在store中啟動logger函數，需要透過applyMiddleware()包裹該函數作為變數使用
    //compose 是redux中的工具，可將不同的函數組合起來按順序運行 ex: compose(applyMiddleware(logger), functionb(paras)...)
    export const store = createStore(rootReducer, undefined, composedEnhancers)
    //createStore需包含2個params : "rootReducer", "preloadedState(初始state)" 以及optional params : "enhancers"
    ```
    

### Redux Provider

1. 將Redux Provide到web app之中
    
    類似context中provider的做法，Redux提供”Porvider”工具，讓Web app中的children component 可以取用 redux store中的內容
    
    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import reportWebVitals from './reportWebVitals';
    import App from './App';
    
    import { BrowserRouter } from 'react-router-dom';
    import { UserProvider } from './context/user.context';
    import { CategoriesProvider } from './context/categories.context';
    import { CartProvider } from './context/cart.context';
    import { Provider } from 'react-redux';
    import { store } from './store/store';
    
    import './index.scss';
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Provider store={store}>
        <BrowserRouter>
          <UserProvider>
            <CategoriesProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </CategoriesProvider>
          </UserProvider>
        </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
    ```
    

### Redux dispatch

1. 將userContext 中的 useEffect放到 App.js中
    
    因為不再透過UserProvider將user的值回傳給children component使用，所以當用戶登入時App執行將user傳入Redux Store的運算過程直接搬到App..js中
    
    ```jsx
    // src/App.js
    
    import { useEffect } from 'react';
    import { useDispatch } from 'react-redux'; 
    
    import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
    import { setCurrentUser } from './store/user/user.action';
    
    const App = () => {
      const dispatch = useDispatch()
      useEffect(() => {
        onAuthStateChangedListener((user) => {
          if (user) {
            createUserDocumentFromAuth(user);
          }
          dispatch(setCurrentUser(user))
        })
      }, [dispatch])
    
      return (
        //set Routes
        <Routes>
    ```
    
    - useDispatch : 與reducer的dispatch 功能類似
        - Reducer的dispatch :
            
            需指定dispatch的reducer對象
            
            `const [<reducer's state>, dispatch] = useReducer(<defined reducer function>, <initiial state>);`
            
            再透過dispatch改變指定reducer內state的值
            
            `dispatch({type: <type name>, payload: <payload name>})`
            
        - Redux的dispatch :
            
            dispatch的功能會指向整個Redux store
            
            `const dispatch = useDispatch()`
            
            `dispatch({type: <type name>, payload: <payload name>})`
            
            ** `setCurrentUser(user) === {type: USER_ACTION_TYPES.SET_CURRENT_USER, payload:*user*}`
            
    
    ** useEffect的second argument “[dispatch]”，可加可不加，不加時的錯誤提示是因為react無法判斷dispatch來自Redux hook，而判讀成一個未在function中定義的函式
    

### Redux Selector (取用Redux store中的state)

1. 在navigation.component.jsx中import useSelector
    
    專案中會使用到currentUser的component是navigation , 因此在navigation中需要取用Redux store中的currentUser
    
    ```jsx
    import { useSelector } from 'react-redux'
    ```
    
2. 從redux store中提取currentUser

    ~~`const { currentUser } = useContext(UserContext);`~~

    `const currentUser = useSelector((state)=>state.user.currentUser)`