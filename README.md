# 將Data上傳Google FireBase，以及撈取FireBase中的數據

## FireBase中的數據型態
Firebase 屬於 noSQL <br>
數據類型為一個**集合**>>包含不同的**文件**>>儲存相對應的**數據內容** <br>
例如 : <br>
**Collection Name** : categories <br>
**Documents Name (title)** : hats, jackets, mens, sneakers, womens <br>
**Data in Documents hats (items)**: 
```
{
    id: 1,
    name: "Blue Brim",
    imageUrl: "xxx.url",
    price: 25
},
{
    id: 2,
    name: "Blue Beanie",
    imageUrl: "xxx.url",
    price: 18
}
...
```

## 在ReactJs App中初始化FireBase環境
1. 為了使用firebase的功能，下載firebase package到使用的專案
   ``` npm add firebase ```
2. 初始化FireBase, 取得已建立的Firebase專案位置
    ```js
    import { initializeApp } from "firebase/app";
    //依據firebase指引，建立Config, 提供專案位置
    //本專案建置的Firebase專案為 "crwn-clothing-db"
    const firebaseConfig = {
        apiKey: "AIzaSyCgdnfl7j7RHh5xWJ4r5wrfO0Wm-rPmEsY",
        authDomain: "crwn-clothing-db-62b2f.firebaseapp.com",
        projectId: "crwn-clothing-db-62b2f",
        storageBucket: "crwn-clothing-db-62b2f.appspot.com",
        messagingSenderId: "765209954987",
        appId: "1:765209954987:web:1cf5be0c7c52aef59fc5ee"
    };
    initializeApp(firebaseConfig);
    ```
3. Firebase數據的使用需使用Package中firestore的功能
4. 建立Database
    ```js
    import {getFirestore} from 'firebase/firestore'
    export const db = getFirestore();
    ```
## 上傳Data到Firebase
1. 上傳Data需要使用 firebase/firestore中的 "doc, collection, writeBatch"
    ```js
    import {doc, collection, writeBatch} from 'firebase/firestore'
    ```
2. 製作**上傳data(包含collection, documents)到firbase**的function
    ```js
    //collectionKey 是 firebase database中的collection名稱 (ex : categories)
    //documentsArr 是要上傳的data內容(ex : [{title:hats, items: [{id:1, name:"Blue Brim",price:25}, {...}]}] 詳見src/shop-data.js)
    export const addCollectionAndDocuments = async(collectionKey, documentsArr) => {
        //設定collection所在的db位置跟名稱(ex : db >> categories)
        const collectionRef = collection(db, collectionKey);
        //設定批次的目標為本專案的db位置
        const batch = writeBatch(db);
        
        documentsArr.forEach((object) => {
        //設定document所在的collection位置跟名稱(ex : categories >> hats, categories >> jackets ...)
            const docRef = doc(collectionRef, object.title.toLowerCase());
        //上傳document的數據
        //當forEach迴圈運行到title : "hats" 時，將 {title:hats, items:[{...},{...}]}寫入batch中
            batch.set(docRef, object)
        })
        //當所有數據寫入batch鐘之後，commit上傳到firebase data之中
        await batch.commit();
        console.log('done')
    }
    ```
3. 運行上傳data的function
    <br>
    ReactJS中透過useEffect設定當webApp運行時運行上傳data的function，確定上傳成功後command out該function
    ```js
    // push data to fire store
    useEffect(()=>{
        addCollectionAndDocuments("categories", SHOP_DATA)
    },[])
    ```

## 從firebase中撈取數據
1. 上傳Data需要使用 firebase/firestore中的 "query, collection, getDocs"
   ```js 
       import {query, collection, getDocs} from 'firebase/firestore'
    ```
2. 製作撈取Data的Function
    ```js
    export const getCategoriesAndDocument = async() => {
        //設定撈取的collection目標是db中的'categories' collection
        const collectionRef = collection(db, 'categories');
        //將collection目標設定為撈取數據請求的參數
        const q = query(collectionRef);
        //將collection中的docs撈取下來，儲存在snap shot中
        const querySnapshot = await getDocs(q);
        //將snap shot中的document數據(title跟items)提取出來
        const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
            const {title, items} = docSnapshot.data();
            acc[title.toLowerCase()] = items;
            return acc
        }, {});
        return categoryMap;
    }
    ```