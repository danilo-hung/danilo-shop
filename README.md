# 數據庫建立 - Google Firebase
透過數據庫的建立，本專案將應用該數據庫製作網站的登入系統
Firebase支援開發者使用Google登入系統

## 設定Google Firebase
支援開發者啟用database 服務，並使開發者可以使用該數據庫進行前端開發
1. 在firebase網站中建立一個新的專案 [https://firebase.google.com/](https://firebase.google.com/) 

## 建立使用用firebase的Component (sign-in.component.jsx)
2. 在src/routes中新建sign-in folder, sign-in.component.jsx
3. 在App.js中設定 "sign-in" Route, 在navigation.component.jsx中設定 "sign-in" link

## 建立firebase環境
1. 在src中建立utils/firebase/firebase.utils.js
2. 在firebase網站中打開建立的專案，點選web功能，註冊應用程式，跟著guidline
3. ` npm add firebase ` 讓react app可以使用firebase的功能
4. 依據guidline 置入以下編碼，初始化firebase針對本專案的配置
```js
import { initializeApp } from "firebase/app";

//啟動firebase在本專案的配置，包含CRUD操作的原始配置，由firebase完成
const firebaseConfig = {
    apiKey: "AIzaSyCgdnfl7j7RHh5xWJ4r5wrfO0Wm-rPmEsY",
    authDomain: "crwn-clothing-db-62b2f.firebaseapp.com",
    projectId: "crwn-clothing-db-62b2f",
    storageBucket: "crwn-clothing-db-62b2f.appspot.com",
    messagingSenderId: "765209954987",
    appId: "1:765209954987:web:1cf5be0c7c52aef59fc5ee"
};
//firebaseApp作為軟體開發套件(SDK)
const firebaseApp = initializeApp(firebaseConfig);
```
## 置入firebase的用戶驗證工具 (前端面)
1. 在firebase.utils.js 中 ` import {getAuth, signInWithRedirect, signInwithPopup, GoogleAuthProvider} from "firebase/auth" ` 
> firebase package中的 auth, 主要提供處理authentication有關的工具
> getAuth : 創建新的Auth - 驗證用戶 (一個web app需創建一個新的Auth來取用作為驗證的條件)
> signInWithRedirect, signInwithPopup : 一個是利用網頁Redirect到登入畫面，另一個是利用新的視窗作為登入窗口
> GoogleAuthProvider : 讓使用者可以透過google帳號作為登入方式
2. 以 ` const provider = new GoogleAuthProvider(); ` 創建provider作為登入驗證的參數，這邊的provider使用new GoogleAuthProvider()，讓使用者透過google帳號登入後的用戶數據作為驗證登入的身分
3. ` provider.setCustomParameters({prompt: "select_account"}); ` 當用戶點開google帳戶登入時，限制要求用戶選擇他要登入的google 帳號 (該command的參數設定都是firebase的設定值)
4. ` const auth = getAuth(); ` 創建驗證用戶
5. ` export const signInwithGooglePopup = () => signInWithPopup(auth, provider) ` 將2、3步驟的參數傳遞到彈出的登入窗口中

6. 在sign-in.component.jsx中 ` import { signInwithGooglePopup } from '../../utils/firebase/firebase.utils' ` 
7. 在component中新增button element, 並設定當 onclick時 運行 logGoogleUser function 來彈出google登入的畫面並在成功登入時回傳用戶數據到web app中
8. logGoogleUser function的設定為 ` const res = await signInwithGooglePopup(); ` ，當用戶在彈出視窗登入時，會回傳res以供web app進行驗證所需的相關參數
9. 進入firestore網頁，在本專案的Authentication功能中新增Sign-in Method, 選擇Google登入方法。

## fire store 儲存用戶數據資訊 (後端面)
1. 進入firestore網頁，在本專案的Firestore Database功能中新增database
>Create步驟中設定production mode
>新增完database後在工作區上選擇Rule，將 "allow read, write: if ~~false~~ 改成 true;"，這樣在開發階段我們可以調整數據庫內容
>設定完以上後，可以開始將用戶數據儲存在firestore這個雲端數據中
2. 在 firebase.utils.js中 ` import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore' `
> getFirestore : 提供在firebase中我們新增的專案裡面新增新的database
> doc : -method (access id) 取出firebase database中指定的database中指定的collections中指定的用戶id
> getDoc : -method (access data) 取出該指定id中的document(用戶名稱、用戶email、用戶資料)
> setDoc : -method (set data) 設定該指定id中的document(用戶名稱、用戶email、用戶資料)
3. 從fire store中取database，設定為db ` const db = getFirestore(); ` 
4. 設定並**export createUserDocumentFromAuth**函數，在函數中設定變數userDocRef，透過doc()取出該db的userCollections以及該collections中的user.uid
5. 設定變數userSnapshot，透過getDoc取得userDocRef內的data
6. 設定條件 : 如果userSnapshot不存在於database中，透過setDoc建立新的document儲存用戶資訊
7. 在 sign-in.component.jsx中 ` import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'` 
8. 在 component function中的 logGoogleUser function裡設定新變量 ` const userDoc = await createUserDocumentFromAuth(user) `，當用戶google登入時，查看該用戶是否已為database中的用戶，若是，將相關數據存在userDoc中調用，若不是，在userCollection建立新的document，並回傳該用戶數據在userDoc中調用